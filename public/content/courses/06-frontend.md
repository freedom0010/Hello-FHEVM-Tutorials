# Frontend Integration

Building user interfaces for FHEVM applications requires special consideration for encrypted data. This chapter shows you how to create a React frontend that seamlessly works with confidential smart contracts.

## Project Setup

Let's create a React application that interacts with our ConfidentialToken contract:

```bash
# Create new React app
npx create-react-app fhevm-frontend --template typescript
cd fhevm-frontend

# Install Web3 dependencies
npm install ethers @metamask/detect-provider
npm install @types/react @types/react-dom

# Install UI components
npm install @headlessui/react @heroicons/react
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Configure Tailwind CSS

Update `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3B82F6',
          600: '#2563EB',
        }
      }
    },
  },
  plugins: [],
}
```

Add to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Web3 Connection Hook

Create `src/hooks/useWeb3.ts`:

```typescript
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

interface Web3State {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
}

export const useWeb3 = () => {
  const [web3State, setWeb3State] = useState<Web3State>({
    provider: null,
    signer: null,
    account: null,
    chainId: null,
    isConnected: false,
  });

  const connectWallet = async () => {
    try {
      const ethereumProvider = await detectEthereumProvider();
      
      if (!ethereumProvider) {
        alert('Please install MetaMask!');
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereumProvider as any);
      
      // Request account access
      await provider.send('eth_requestAccounts', []);
      
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      const network = await provider.getNetwork();

      setWeb3State({
        provider,
        signer,
        account,
        chainId: network.chainId,
        isConnected: true,
      });

      // Switch to FHEVM testnet if not already
      if (network.chainId !== 8009) {
        await switchToFHEVMTestnet(provider);
      }

    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const switchToFHEVMTestnet = async (provider: ethers.providers.Web3Provider) => {
    try {
      await provider.send('wallet_switchEthereumChain', [
        { chainId: '0x1F49' } // 8009 in hex
      ]);
    } catch (error: any) {
      // Chain not added to MetaMask
      if (error.code === 4902) {
        await provider.send('wallet_addEthereumChain', [
          {
            chainId: '0x1F49',
            chainName: 'FHEVM Testnet',
            nativeCurrency: {
              name: 'ZAMA',
              symbol: 'ZAMA',
              decimals: 18,
            },
            rpcUrls: ['https://devnet.zama.ai/'],
            blockExplorerUrls: ['https://explorer.zama.ai/'],
          },
        ]);
      }
    }
  };

  const disconnectWallet = () => {
    setWeb3State({
      provider: null,
      signer: null,
      account: null,
      chainId: null,
      isConnected: false,
    });
  };

  useEffect(() => {
    // Auto-connect if previously connected
    const checkConnection = async () => {
      const ethereumProvider = await detectEthereumProvider();
      if (ethereumProvider) {
        const provider = new ethers.providers.Web3Provider(ethereumProvider as any);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          connectWallet();
        }
      }
    };

    checkConnection();
  }, []);

  return {
    ...web3State,
    connectWallet,
    disconnectWallet,
  };
};
```

## Contract Interaction Hook

Create `src/hooks/useConfidentialToken.ts`:

```typescript
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './useWeb3';

// Contract ABI (simplified for demo)
const CONTRACT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function getMyBalance() view returns (uint64)",
  "function transfer(address to, uint64 amount) returns (bool)",
  "function approve(address spender, uint64 amount) returns (bool)",
  "function getAllowance(address spender) view returns (uint64)",
  "event Transfer(address indexed from, address indexed to, bytes encryptedAmount)"
];

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";

export const useConfidentialToken = () => {
  const { provider, signer, isConnected } = useWeb3();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [tokenInfo, setTokenInfo] = useState({
    name: '',
    symbol: '',
    totalSupply: '0',
  });
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (provider && signer && isConnected) {
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(contractInstance);
      loadTokenInfo(contractInstance);
      loadBalance(contractInstance);
    }
  }, [provider, signer, isConnected]);

  const loadTokenInfo = async (contractInstance: ethers.Contract) => {
    try {
      const [name, symbol, totalSupply] = await Promise.all([
        contractInstance.name(),
        contractInstance.symbol(),
        contractInstance.totalSupply(),
      ]);

      setTokenInfo({
        name,
        symbol,
        totalSupply: totalSupply.toString(),
      });
    } catch (error) {
      console.error('Failed to load token info:', error);
    }
  };

  const loadBalance = async (contractInstance?: ethers.Contract) => {
    if (!contractInstance && !contract) return;
    
    try {
      setLoading(true);
      const currentContract = contractInstance || contract;
      const userBalance = await currentContract!.getMyBalance();
      setBalance(userBalance.toString());
    } catch (error) {
      console.error('Failed to load balance:', error);
      setBalance('0');
    } finally {
      setLoading(false);
    }
  };

  const transfer = async (to: string, amount: string) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      setLoading(true);
      const tx = await contract.transfer(to, amount);
      await tx.wait();
      
      // Reload balance after transfer
      await loadBalance();
      
      return tx.hash;
    } catch (error) {
      console.error('Transfer failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const approve = async (spender: string, amount: string) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      setLoading(true);
      const tx = await contract.approve(spender, amount);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Approval failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllowance = async (spender: string) => {
    if (!contract) return '0';
    
    try {
      const allowance = await contract.getAllowance(spender);
      return allowance.toString();
    } catch (error) {
      console.error('Failed to get allowance:', error);
      return '0';
    }
  };

  return {
    contract,
    tokenInfo,
    balance,
    loading,
    transfer,
    approve,
    getAllowance,
    refreshBalance: () => loadBalance(),
  };
};
```

## Main App Component

Update `src/App.tsx`:

```typescript
import React from 'react';
import { useWeb3 } from './hooks/useWeb3';
import { useConfidentialToken } from './hooks/useConfidentialToken';
import WalletConnection from './components/WalletConnection';
import TokenDashboard from './components/TokenDashboard';
import TransferForm from './components/TransferForm';

function App() {
  const { isConnected, account } = useWeb3();
  const { tokenInfo, balance, loading } = useConfidentialToken();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔐 Confidential Token DApp
          </h1>
          <p className="text-lg text-gray-600">
            Experience privacy-preserving transactions with FHEVM
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {!isConnected ? (
            <WalletConnection />
          ) : (
            <div className="space-y-8">
              <TokenDashboard 
                tokenInfo={tokenInfo}
                balance={balance}
                account={account}
                loading={loading}
              />
              <TransferForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
```

## Wallet Connection Component

Create `src/components/WalletConnection.tsx`:

```typescript
import React from 'react';
import { useWeb3 } from '../hooks/useWeb3';

const WalletConnection: React.FC = () => {
  const { connectWallet } = useWeb3();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
        <p className="text-gray-600">
          Connect your MetaMask wallet to start using confidential tokens
        </p>
      </div>

      <button
        onClick={connectWallet}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Connect MetaMask
      </button>

      <div className="mt-6 text-sm text-gray-500">
        <p>Make sure you're connected to the FHEVM Testnet</p>
      </div>
    </div>
  );
};

export default WalletConnection;
```

## Token Dashboard Component

Create `src/components/TokenDashboard.tsx`:

```typescript
import React from 'react';

interface TokenDashboardProps {
  tokenInfo: {
    name: string;
    symbol: string;
    totalSupply: string;
  };
  balance: string;
  account: string | null;
  loading: boolean;
}

const TokenDashboard: React.FC<TokenDashboardProps> = ({
  tokenInfo,
  balance,
  account,
  loading
}) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatNumber = (num: string) => {
    return new Intl.NumberFormat().format(parseInt(num));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Wallet</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-sm text-gray-600">Connected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your Balance</h3>
            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-white bg-opacity-20 rounded mb-2"></div>
              <div className="h-4 bg-white bg-opacity-20 rounded w-1/2"></div>
            </div>
          ) : (
            <>
              <div className="text-3xl font-bold mb-1">
                {formatNumber(balance)}
              </div>
              <div className="text-blue-100">
                {tokenInfo.symbol}
              </div>
            </>
          )}
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">Address</label>
              <div className="font-mono text-sm text-gray-900">
                {account ? formatAddress(account) : 'Not connected'}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Network</label>
              <div className="text-sm text-gray-900">FHEVM Testnet</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{tokenInfo.name}</div>
            <div className="text-sm text-gray-500">Token Name</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{tokenInfo.symbol}</div>
            <div className="text-sm text-gray-500">Symbol</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(tokenInfo.totalSupply)}
            </div>
            <div className="text-sm text-gray-500">Total Supply</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDashboard;
```

## Transfer Form Component

Create `src/components/TransferForm.tsx`:

```typescript
import React, { useState } from 'react';
import { useConfidentialToken } from '../hooks/useConfidentialToken';

const TransferForm: React.FC = () => {
  const { transfer, loading } = useConfidentialToken();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTxHash('');

    if (!recipient || !amount) {
      setError('Please fill in all fields');
      return;
    }

    if (!recipient.match(/^0x[a-fA-F0-9]{40}$/)) {
      setError('Invalid recipient address');
      return;
    }

    if (parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    try {
      const hash = await transfer(recipient, amount);
      setTxHash(hash);
      setRecipient('');
      setAmount('');
    } catch (err: any) {
      setError(err.message || 'Transfer failed');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Tokens</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            min="0"
            step="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {txHash && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="text-green-800 font-medium">Transfer successful!</div>
                <div className="text-green-600 text-sm mt-1">
                  Transaction: {txHash.slice(0, 10)}...{txHash.slice(-8)}
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Tokens'
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex">
          <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-blue-800 text-sm">
            <strong>Privacy Note:</strong> Transfer amounts are encrypted and only visible to you and the recipient.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferForm;
```

## Running the Frontend

Start your React application:

```bash
npm start
```

Your frontend will be available at `http://localhost:3000`.

## Key Features Implemented

### 1. **Wallet Connection**
- MetaMask integration
- Automatic network switching to FHEVM testnet
- Connection state management

### 2. **Encrypted Balance Display**
- Only shows your own balance (decrypted)
- Real-time balance updates
- Loading states for better UX

### 3. **Private Transfers**
- Form validation
- Transaction status feedback
- Error handling

### 4. **Responsive Design**
- Mobile-friendly interface
- Modern UI with Tailwind CSS
- Accessible components

## Security Considerations

### 1. **Private Key Management**
```typescript
// Never store private keys in frontend code
// Always use MetaMask or similar wallet providers
const signer = provider.getSigner(); // ✅ Secure
```

### 2. **Input Validation**
```typescript
// Validate addresses and amounts before sending
if (!recipient.match(/^0x[a-fA-F0-9]{40}$/)) {
  setError('Invalid recipient address');
  return;
}
```

### 3. **Error Handling**
```typescript
// Don't expose sensitive information in error messages
catch (err: any) {
  setError('Transfer failed'); // Generic message
  console.error(err); // Detailed logging for debugging
}
```

## Testing Your DApp

1. **Connect MetaMask** to FHEVM testnet
2. **Get test tokens** from the faucet
3. **Deploy your contract** and update the address
4. **Test all features**:
   - Wallet connection
   - Balance display
   - Token transfers
   - Error handling

## What's Next?

Congratulations! You've built a complete frontend for your confidential token. In the final chapter, we'll wrap up with advanced topics and next steps for your FHEVM journey.

Key achievements:
- ✅ Built a React frontend for FHEVM
- ✅ Integrated MetaMask wallet connection
- ✅ Implemented encrypted balance display
- ✅ Created secure transfer functionality
- ✅ Added proper error handling and UX

---

**Previous**: [← Encryption & Decryption](05-encryption-decryption) | **Next**: [Conclusion →](07-conclusion)