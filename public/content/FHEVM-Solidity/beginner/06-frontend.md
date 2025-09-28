<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Building the Frontend - FHEVM Tutorial</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px;
        }
        
        h2 {
            color: #4a5568;
            font-size: 1.8rem;
            margin-bottom: 20px;
            margin-top: 40px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e2e8f0;
        }
        
        h2:first-child {
            margin-top: 0;
        }
        
        h3 {
            color: #2d3748;
            font-size: 1.3rem;
            margin-bottom: 15px;
            margin-top: 30px;
        }
        
        h4 {
            color: #4a5568;
            font-size: 1.1rem;
            margin-bottom: 10px;
            margin-top: 20px;
        }
        
        p {
            margin-bottom: 15px;
            font-size: 1.05rem;
            color: #4a5568;
        }
        
        ul, ol {
            margin: 15px 0;
            padding-left: 20px;
        }
        
        li {
            margin-bottom: 8px;
            color: #4a5568;
        }
        
        .code-block {
            background: #1a202c;
            color: #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            position: relative;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 0.9rem;
            overflow-x: auto;
        }
        
        .code-block pre {
            margin: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        
        .code-title {
            background: #2d3748;
            color: #e2e8f0;
            padding: 8px 15px;
            margin: -20px -20px 15px -20px;
            font-weight: 600;
            font-size: 0.85rem;
            border-radius: 12px 12px 0 0;
        }
        
        .copy-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: #4c51bf;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 8px 12px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
        }
        
        .copy-btn:hover {
            background: #5a67d8;
            transform: translateY(-1px);
        }
        
        .copy-btn.copied {
            background: #38a169;
            transform: scale(0.95);
        }
        
        .highlight {
            background: #fef5e7;
            border-left: 4px solid #f6ad55;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .highlight::before {
            content: "💡 ";
            font-size: 1.2rem;
        }
        
        .warning {
            background: #fed7d7;
            border-left: 4px solid #fc8181;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .warning::before {
            content: "⚠️ ";
            font-size: 1.2rem;
        }
        
        .success {
            background: #f0fff4;
            border-left: 4px solid #68d391;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .success::before {
            content: "✅ ";
            font-size: 1.2rem;
        }
        
        .info {
            background: #ebf8ff;
            border-left: 4px solid #4299e1;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .info::before {
            content: "ℹ️ ";
            font-size: 1.2rem;
        }
        
        .file-structure {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 0.9rem;
        }
        
        .file-structure .folder {
            color: #667eea;
            font-weight: 600;
        }
        
        .file-structure .file {
            color: #4a5568;
            margin-left: 20px;
        }
        
        .nav-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid #e2e8f0;
        }
        
        .nav-btn {
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .nav-btn.prev {
            background: #e2e8f0;
            color: #4a5568;
        }
        
        .nav-btn.next {
            background: #667eea;
            color: white;
        }
        
        .nav-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        @media (max-width: 768px) {
            .content {
                padding: 20px;
            }
            
            .header {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Building the Frontend</h1>
            <p>Create a modern React frontend with Next.js and Wagmi for your FHEVM application</p>
        </div>
        
        <div class="content">
            <p>In this chapter, we'll build a complete frontend application using Next.js and Wagmi to interact with our deployed Confidential Token contract. We'll implement wallet connection, encrypted input handling, transaction sending, and result decryption - creating a full-featured privacy-preserving DApp.</p>

            <h2>Project Overview</h2>
            <p>We'll build a modern web application with the following features:</p>
            <ul>
                <li><strong>Wallet Connection</strong> - Connect MetaMask and manage user accounts</li>
                <li><strong>Token Operations</strong> - Transfer tokens with encrypted amounts</li>
                <li><strong>Balance Management</strong> - View encrypted and decrypted balances</li>
                <li><strong>FHEVM Integration</strong> - Handle encryption/decryption seamlessly</li>
                <li><strong>Modern UI</strong> - Responsive design with Tailwind CSS</li>
            </ul>

            <h2>Step 1: Initialize Next.js Project</h2>
            <p>Let's start by creating a new Next.js project with all necessary dependencies:</p>

            <div class="code-block">
                <div class="code-title">Create Next.js Project</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npx create-next-app@latest fhevm-frontend --typescript --tailwind --eslint --app</pre>
            </div>

            <div class="code-block">
                <div class="code-title">Navigate to project directory</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>cd fhevm-frontend</pre>
            </div>

            <h3>Install Required Dependencies</h3>
            <div class="code-block">
                <div class="code-title">Install Wagmi and FHEVM packages</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npm install wagmi @wagmi/core @wagmi/connectors viem @tanstack/react-query</pre>
            </div>

            <div class="code-block">
                <div class="code-title">Install FHEVM packages</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npm install @fhevm/web3 @fhevm/tfhe-browser tfhe</pre>
            </div>

            <div class="code-block">
                <div class="code-title">Install additional UI dependencies</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npm install @headlessui/react @heroicons/react clsx</pre>
            </div>

            <h2>Step 2: Configure Wagmi and Web3 Setup</h2>
            <p>Set up Wagmi configuration for Web3 connectivity:</p>

            <div class="code-block">
                <div class="code-title">lib/wagmi.ts</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>import { createConfig, http } from 'wagmi'
import { sepolia, mainnet } from 'wagmi/chains'
import { metaMask, walletConnect, injected } from 'wagmi/connectors'

// Project ID from WalletConnect (optional)
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your-project-id'

export const config = createConfig({
  chains: [sepolia, mainnet],
  connectors: [
    metaMask(),
    injected(),
    walletConnect({ 
      projectId,
      metadata: {
        name: 'FHEVM Token DApp',
        description: 'Privacy-preserving token application',
        url: 'https://your-domain.com',
        icons: ['https://your-domain.com/icon.png']
      }
    }),
  ],
  transports: {
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`),
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`)
  },
  ssr: true,
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}</pre>
            </div>

            <h3>Environment Variables</h3>
            <div class="code-block">
                <div class="code-title">.env.local</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Your deployed contract address
NEXT_PUBLIC_FHEVM_GATEWAY_URL=https://gateway.sepolia.zama.ai/</pre>
            </div>

            <h2>Step 3: FHEVM Integration Setup</h2>
            <p>Create utilities for FHEVM encryption and decryption:</p>

            <div class="code-block">
                <div class="code-title">lib/fhevm.ts</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>import { createFhevmInstance } from '@fhevm/web3'
import { BrowserProvider } from 'ethers'

let fhevmInstance: any = null

export async function initFHEVM() {
  if (fhevmInstance) return fhevmInstance

  try {
    fhevmInstance = await createFhevmInstance({
      network: 'sepolia',
      gatewayUrl: process.env.NEXT_PUBLIC_FHEVM_GATEWAY_URL || 'https://gateway.sepolia.zama.ai/'
    })
    
    console.log('FHEVM instance initialized successfully')
    return fhevmInstance
  } catch (error) {
    console.error('Failed to initialize FHEVM:', error)
    throw error
  }
}

export async function encryptUint32(value: number): Promise<string> {
  if (!fhevmInstance) {
    await initFHEVM()
  }
  
  if (value < 0 || value >= 2**32) {
    throw new Error('Value must be a valid 32-bit unsigned integer')
  }
  
  return await fhevmInstance.encrypt32(value)
}

export async function decryptUint32(encryptedValue: string): Promise<number> {
  if (!fhevmInstance) {
    await initFHEVM()
  }
  
  return await fhevmInstance.decrypt(encryptedValue)
}

export function getFHEVMInstance() {
  return fhevmInstance
}</pre>
            </div>

            <h3>Contract ABI and Configuration</h3>
            <div class="code-block">
                <div class="code-title">lib/contract.ts</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>export const CONFIDENTIAL_TOKEN_ABI = [
  // Read functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (bytes)",
  "function getDecryptedBalance(address account) view returns (uint32)",
  "function totalSupply() view returns (bytes)",
  "function allowance(address owner, address spender) view returns (bytes)",
  
  // Write functions
  "function transfer(address to, bytes encryptedAmount) returns (bool)",
  "function transferPlain(address to, uint32 amount) returns (bool)",
  "function approve(address spender, bytes encryptedAmount) returns (bool)",
  "function approvePlain(address spender, uint32 amount) returns (bool)",
  "function transferFrom(address from, address to, bytes encryptedAmount) returns (bool)",
  
  // Owner functions
  "function mint(address to, uint32 amount) returns (bool)",
  "function burn(uint32 amount) returns (bool)",
  
  // Events
  "event Transfer(address indexed from, address indexed to)",
  "event Approval(address indexed owner, address indexed spender)"
] as const

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

if (!CONTRACT_ADDRESS) {
  throw new Error('Contract address not found in environment variables')
}</pre>
            </div>

            <h2>Step 4: Wagmi Providers Setup</h2>
            <p>Configure the app with Wagmi and React Query providers:</p>

            <div class="code-block">
                <div class="code-title">app/providers.tsx</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/wagmi'
import { ReactNode, useState } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 3,
      },
    },
  }))

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}</pre>
            </div>

            <div class="code-block">
                <div class="code-title">app/layout.tsx</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FHEVM Token DApp',
  description: 'Privacy-preserving token application built with FHEVM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}</pre>
            </div>

            <h2>Step 5: Wallet Connection Component</h2>
            <p>Create a component to handle wallet connections:</p>

            <div class="code-block">
                <div class="code-title">components/WalletConnection.tsx</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useState } from 'react'
import { WalletIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

export function WalletConnection() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  const [selectedConnector, setSelectedConnector] = useState<number | null>(null)

  const handleConnect = (connector: any, index: number) => {
    setSelectedConnector(index)
    connect({ connector })
  }

  if (isConnected && address) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <div>
              <p className="text-sm text-gray-600">Connected to</p>
              <p className="text-lg font-mono">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>
          </div>
          <button
            onClick={() => disconnect()}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            <span>Disconnect</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="text-center mb-6">
        <WalletIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-900">Connect Your Wallet</h3>
        <p className="text-sm text-gray-600">Choose a wallet to connect to the FHEVM network</p>
      </div>

      <div className="space-y-3">
        {connectors.map((connector, index) => (
          <button
            key={connector.uid}
            onClick={() => handleConnect(connector, index)}
            disabled={isPending}
            className={clsx(
              "w-full flex items-center justify-between p-4 border rounded-lg transition-all",
              "hover:border-blue-500 hover:bg-blue-50",
              {
                "border-blue-500 bg-blue-50": selectedConnector === index && isPending,
                "opacity-50 cursor-not-allowed": isPending,
              }
            )}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <WalletIcon className="w-4 h-4 text-gray-600" />
              </div>
              <span className="font-medium">{connector.name}</span>
            </div>
            {selectedConnector === index && isPending && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            )}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error.message}</p>
        </div>
      )}
    </div>
  )
}</pre>
            </div>

            <h2>Step 6: Token Operations Component</h2>
            <p>Create a component for token operations with encryption:</p>

            <div class="code-block">
                <div class="code-title">components/TokenOperations.tsx</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONFIDENTIAL_TOKEN_ABI, CONTRACT_ADDRESS } from '@/lib/contract'
import { encryptUint32, decryptUint32, initFHEVM } from '@/lib/fhevm'
import { PaperAirplaneIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

export function TokenOperations() {
  const { address, isConnected } = useAccount()
  const [fhevmReady, setFhevmReady] = useState(false)
  const [transferTo, setTransferTo] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [isTransferring, setIsTransferring] = useState(false)
  const [showDecryptedBalance, setShowDecryptedBalance] = useState(false)
  const [decryptedBalance, setDecryptedBalance] = useState<number | null>(null)
  const [isDecrypting, setIsDecrypting] = useState(false)

  const { writeContract, data: hash, isPending: isWritePending, error: writeError } = useWriteContract()

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Read token information
  const { data: tokenName } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONFIDENTIAL_TOKEN_ABI,
    functionName: 'name',
  })

  const { data: tokenSymbol } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONFIDENTIAL_TOKEN_ABI,
    functionName: 'symbol',
  })

  const { data: encryptedBalance, refetch: refetchBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONFIDENTIAL_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  // Initialize FHEVM on component mount
  useEffect(() => {
    const initialize = async () => {
      try {
        await initFHEVM()
        setFhevmReady(true)
        console.log('FHEVM ready for operations')
      } catch (error) {
        console.error('Failed to initialize FHEVM:', error)
      }
    }
    initialize()
  }, [])

  // Refetch balance after successful transaction
  useEffect(() => {
    if (isConfirmed) {
      refetchBalance()
      setDecryptedBalance(null) // Reset decrypted balance
    }
  }, [isConfirmed, refetchBalance])

  const handleTransfer = async () => {
    if (!isConnected || !fhevmReady || !transferTo || !transferAmount) return

    try {
      setIsTransferring(true)
      
      // Encrypt the transfer amount
      const amount = parseInt(transferAmount)
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid amount')
      }

      const encryptedAmount = await encryptUint32(amount)
      
      // Execute the transfer
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONFIDENTIAL_TOKEN_ABI,
        functionName: 'transfer',
        args: [transferTo as `0x${string}`, encryptedAmount as `0x${string}`],
      })

    } catch (error: any) {
      console.error('Transfer failed:', error)
      alert(`Transfer failed: ${error.message}`)
    } finally {
      setIsTransferring(false)
    }
  }

  const handleDecryptBalance = async () => {
    if (!isConnected || !fhevmReady || !encryptedBalance) return

    try {
      setIsDecrypting(true)
      
      // Try to get decrypted balance directly from contract first
      const { data: directDecrypted } = await useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONFIDENTIAL_TOKEN_ABI,
        functionName: 'getDecryptedBalance',
        args: [address],
      })

      if (directDecrypted) {
        setDecryptedBalance(Number(directDecrypted))
      } else {
        // If direct decryption fails, try client-side decryption
        const decrypted = await decryptUint32(encryptedBalance as string)
        setDecryptedBalance(decrypted)
      }
      
      setShowDecryptedBalance(true)
    } catch (error: any) {
      console.error('Decryption failed:', error)
      alert(`Decryption failed: ${error.message}`)
    } finally {
      setIsDecrypting(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">Please connect your wallet to access token operations</p>
      </div>
    )
  }

  if (!fhevmReady) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Initializing FHEVM...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Token Information */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Token Name</p>
            <p className="text-lg font-medium">{tokenName || 'Loading...'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Token Symbol</p>
            <p className="text-lg font-medium">{tokenSymbol || 'Loading...'}</p>
          </div>
        </div>
      </div>

      {/* Balance Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Balance</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Encrypted Balance</p>
            <p className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
              {encryptedBalance ? 
                (typeof encryptedBalance === 'string' ? encryptedBalance : 'Encrypted data available') 
                : 'No balance data'}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDecryptBalance}
              disabled={isDecrypting || !encryptedBalance}
              className={clsx(
                "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors