<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deploying Your FHEVM Contract - FHEVM Tutorial</title>
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
            max-width: 1000px;
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
        
        .step {
            background: #f7fafc;
            border-left: 4px solid #667eea;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .step-number {
            background: #667eea;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.9rem;
            margin-right: 15px;
        }
        
        .step-title {
            display: inline-block;
            font-weight: 600;
            color: #2d3748;
            font-size: 1.1rem;
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
        
        .network-card {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin: 15px 0;
        }
        
        .network-card h4 {
            color: #2d3748;
            margin-bottom: 10px;
        }
        
        .network-details {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 10px;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 0.9rem;
        }
        
        .network-details .label {
            color: #4a5568;
            font-weight: 600;
        }
        
        .network-details .value {
            color: #2d3748;
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
            <h1>Deploying Your FHEVM Contract</h1>
            <p>Deploy your Confidential Token to Sepolia Testnet and the real world</p>
        </div>
        
        <div class="content">
            <p>Now that we have our Confidential Token contract ready, it's time to deploy it to a live network. In this chapter, we'll configure Hardhat, connect to Sepolia Testnet, get test ETH, and deploy our FHEVM contract to the blockchain.</p>

            <h2>Overview of Deployment Process</h2>
            <p>Deploying an FHEVM contract involves several key steps:</p>
            <ol>
                <li>Configure Hardhat with network settings and environment variables</li>
                <li>Set up your wallet with a mnemonic phrase</li>
                <li>Get test ETH from Sepolia faucets</li>
                <li>Configure FHEVM-specific settings</li>
                <li>Deploy the contract using Hardhat scripts</li>
                <li>Verify the deployment and interact with your contract</li>
            </ol>

            <h2>Step 1: Configure Environment Variables</h2>
            <p>First, we need to set up environment variables for secure configuration. Create a <code>.env</code> file in your project root:</p>

            <div class="code-block">
                <div class="code-title">.env</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre># Mnemonic phrase (12 words) for your wallet
MNEMONIC="your twelve word mnemonic phrase goes here like this example phrase"

# Infura Project ID for Ethereum testnet access
INFURA_API_KEY="your_infura_project_id_here"

# Etherscan API key for contract verification
ETHERSCAN_API_KEY="your_etherscan_api_key_here"</pre>
            </div>

            <div class="warning">
                <strong>Security Warning:</strong> Never commit your <code>.env</code> file to version control! Add it to your <code>.gitignore</code> file. Your mnemonic phrase controls access to your wallet and funds.
            </div>

            <h3>Install Required Dependencies</h3>
            <p>Install the necessary packages for deployment:</p>

            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npm install --save-dev dotenv @nomiclabs/hardhat-etherscan</pre>
            </div>

            <h3>Add .env to .gitignore</h3>
            <p>Protect your sensitive information:</p>

            <div class="code-block">
                <div class="code-title">.gitignore</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>node_modules
.env
coverage
coverage.json
typechain
typechain-types

# Hardhat files
cache
artifacts</pre>
            </div>

            <h2>Step 2: Configure Hardhat for FHEVM and Sepolia</h2>
            <p>Update your <code>hardhat.config.js</code> file to include network configurations and FHEVM settings:</p>

            <div class="code-block">
                <div class="code-title">hardhat.config.js</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>require("@nomicfoundation/hardhat-toolbox");
require("@fhevm/hardhat-plugin");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Local development network
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    // Sepolia Ethereum Testnet
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: "",
      },
      chainId: 11155111,
    },
    // FHEVM Devnet (if available)
    fhevmDev: {
      url: "https://devnet.zama.ai/",
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      chainId: 8009,
    }
  },
  // Etherscan configuration for contract verification
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY
    }
  },
  // FHEVM specific configuration
  fhevm: {
    network: "sepolia", // or "localhost" for local development
    tfheExecutorAddress: "0x05fD9B5EFE0a996095f42Ed7e77c390810CF660c",
    tfhePaymentAddress: "0xFb03BE574d14C256D56F09b5f3B603C58ebf2814"
  }
};</pre>
            </div>

            <div class="info">
                <strong>Configuration Explained:</strong>
                <ul>
                    <li><strong>networks.sepolia:</strong> Ethereum Sepolia testnet configuration</li>
                    <li><strong>fhevmDev:</strong> FHEVM development network (when available)</li>
                    <li><strong>tfheExecutorAddress:</strong> TFHE computation executor contract</li>
                    <li><strong>tfhePaymentAddress:</strong> TFHE gas payment contract</li>
                </ul>
            </div>

            <h2>Step 3: Set Up Your Wallet</h2>

            <h3>Generate a Mnemonic Phrase</h3>
            <p>You need a 12-word mnemonic phrase to generate your wallet. You can:</p>
            <ul>
                <li><strong>Use MetaMask:</strong> Create a new wallet and copy the seed phrase</li>
                <li><strong>Generate online:</strong> Use a trusted generator like <a href="https://iancoleman.io/bip39/" target="_blank">BIP39 Mnemonic Code Converter</a></li>
                <li><strong>Use Hardhat:</strong> Generate one programmatically</li>
            </ul>

            <div class="code-block">
                <div class="code-title">Generate mnemonic with Node.js</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>// Create a simple script to generate a mnemonic
const { ethers } = require("hardhat");

async function main() {
  const wallet = ethers.Wallet.createRandom();
  console.log("Mnemonic:", wallet.mnemonic.phrase);
  console.log("Address:", wallet.address);
}

main();</pre>
            </div>

            <h3>Import Wallet to MetaMask</h3>
            <p>Import your wallet to MetaMask for easy balance management:</p>
            <ol>
                <li>Open MetaMask extension</li>
                <li>Click "Import Wallet"</li>
                <li>Enter your 12-word mnemonic phrase</li>
                <li>Set a strong password</li>
                <li>Add Sepolia network if not already present</li>
            </ol>

            <div class="network-card">
                <h4>Sepolia Testnet Network Details</h4>
                <div class="network-details">
                    <span class="label">Network Name:</span>
                    <span class="value">Sepolia</span>
                    <span class="label">RPC URL:</span>
                    <span class="value">https://sepolia.infura.io/v3/YOUR_INFURA_KEY</span>
                    <span class="label">Chain ID:</span>
                    <span class="value">11155111</span>
                    <span class="label">Currency Symbol:</span>
                    <span class="value">ETH</span>
                    <span class="label">Block Explorer:</span>
                    <span class="value">https://sepolia.etherscan.io</span>
                </div>
            </div>

            <h2>Step 4: Get Sepolia Test ETH</h2>
            <p>You need Sepolia ETH to pay for gas fees during deployment. Use these reliable faucets:</p>

            <h3>Recommended Faucets</h3>
            <div class="step">
                <span class="step-number">1</span>
                <span class="step-title">Sepolia ETH Faucet</span>
                <p>Visit <a href="https://sepoliafaucet.com" target="_blank">sepoliafaucet.com</a> and enter your wallet address. You'll receive 0.5 ETH per day.</p>
            </div>

            <div class="step">
                <span class="step-number">2</span>
                <span class="step-title">Alchemy Faucet</span>
                <p>Use <a href="https://sepoliafaucet.com" target="_blank">Alchemy's Sepolia faucet</a> - requires creating a free Alchemy account.</p>
            </div>

            <div class="step">
                <span class="step-number">3</span>
                <span class="step-title">Chainlink Faucet</span>
                <p>Visit <a href="https://faucets.chain.link/sepolia" target="_blank">faucets.chain.link/sepolia</a> and connect your wallet.</p>
            </div>

            <h3>Verify Your Balance</h3>
            <p>Check that you received the test ETH:</p>

            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre># Check your wallet balance on Sepolia
npx hardhat run --network sepolia scripts/check-balance.js</pre>
            </div>

            <div class="code-block">
                <div class="code-title">scripts/check-balance.js</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Checking balance for:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance:", hre.ethers.formatEther(balance), "ETH");
  
  if (balance === 0n) {
    console.log("❌ No ETH found. Please get some from a faucet!");
  } else {
    console.log("✅ Ready to deploy!");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });</pre>
            </div>

            <h2>Step 5: Create Deployment Script</h2>
            <p>Create a deployment script specifically for your Confidential Token:</p>

            <div class="code-block">
                <div class="code-title">scripts/deploy-confidential-token.js</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)));

  // Deploy the Confidential Token
  const ConfidentialERC20 = await hre.ethers.getContractFactory("ConfidentialERC20");
  
  console.log("Deploying ConfidentialERC20...");
  
  const confidentialToken = await ConfidentialERC20.deploy(
    "PrivacyCoin",           // Token name
    "PRIV",                  // Token symbol
    1000000                  // Initial supply (1 million tokens)
  );

  await confidentialToken.waitForDeployment();
  const tokenAddress = await confidentialToken.getAddress();

  console.log("✅ ConfidentialERC20 deployed to:", tokenAddress);
  console.log("🎉 Deployment successful!");

  // Verify deployment
  console.log("\n📋 Contract Details:");
  console.log("- Token Name:", await confidentialToken.name());
  console.log("- Token Symbol:", await confidentialToken.symbol());
  console.log("- Decimals:", await confidentialToken.decimals());
  console.log("- Owner:", deployer.address);

  // Check owner's encrypted balance
  try {
    const ownerBalance = await confidentialToken.getDecryptedBalance(deployer.address);
    console.log("- Owner Balance:", ownerBalance.toString(), "tokens");
  } catch (error) {
    console.log("- Owner Balance: Encrypted (use getDecryptedBalance to view)");
  }

  // Save deployment info
  const deploymentInfo = {
    contractAddress: tokenAddress,
    deployer: deployer.address,
    network: hre.network.name,
    blockNumber: await hre.ethers.provider.getBlockNumber(),
    timestamp: new Date().toISOString()
  };

  console.log("\n💾 Deployment Info:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });</pre>
            </div>

            <h2>Step 6: Deploy to Sepolia Testnet</h2>
            <p>Now let's deploy your Confidential Token to the Sepolia testnet:</p>

            <h3>Compile Your Contracts</h3>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npx hardhat compile</pre>
            </div>

            <h3>Deploy to Sepolia</h3>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npx hardhat run scripts/deploy-confidential-token.js --network sepolia</pre>
            </div>

            <div class="success">
                <strong>Expected Output:</strong> You should see the deployment address, transaction hash, and confirmation that your contract is live on Sepolia testnet.
            </div>

            <h2>Step 7: Verify Contract on Etherscan</h2>
            <p>Verify your contract to make it publicly viewable and trustworthy:</p>

            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre># Replace CONTRACT_ADDRESS with your actual deployed contract address
npx hardhat verify --network sepolia CONTRACT_ADDRESS "PrivacyCoin" "PRIV" 1000000</pre>
            </div>

            <h3>Manual Verification (if automatic fails)</h3>
            <ol>
                <li>Go to <a href="https://sepolia.etherscan.io" target="_blank">sepolia.etherscan.io</a></li>
                <li>Search for your contract address</li>
                <li>Click "Contract" tab</li>
                <li>Click "Verify and Publish"</li>
                <li>Select "Solidity (Single file)"</li>
                <li>Upload your flattened contract code</li>
                <li>Enter constructor parameters</li>
            </ol>

            <h2>Step 8: Interact with Your Deployed Contract</h2>
            <p>Test your deployed contract with a simple interaction script:</p>

            <div class="code-block">
                <div class="code-title">scripts/interact-with-contract.js</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>const hre = require("hardhat");

async function main() {
  // Replace with your deployed contract address
  const CONTRACT_ADDRESS = "0x..."; // Your contract address here
  
  const [owner, addr1] = await hre.ethers.getSigners();
  
  // Get contract instance
  const ConfidentialERC20 = await hre.ethers.getContractFactory("ConfidentialERC20");
  const contract = ConfidentialERC20.attach(CONTRACT_ADDRESS);
  
  console.log("Interacting with contract at:", CONTRACT_ADDRESS);
  
  // Check basic info
  console.log("Token Name:", await contract.name());
  console.log("Token Symbol:", await contract.symbol());
  
  // Check owner balance (only owner can decrypt)
  try {
    const balance = await contract.getDecryptedBalance(owner.address);
    console.log("Owner Balance:", balance.toString());
  } catch (error) {
    console.log("Owner Balance: Encrypted");
  }
  
  // Transfer some tokens
  console.log("\n🔄 Transferring 1000 tokens...");
  const tx = await contract.transferPlain(addr1.address, 1000);
  await tx.wait();
  console.log("✅ Transfer completed!");
  
  // Check recipient balance
  try {
    const addr1Balance = await contract.connect(addr1).getDecryptedBalance(addr1.address);
    console.log("Recipient Balance:", addr1Balance.toString());
  } catch (error) {
    console.log("Recipient Balance: Encrypted");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });</pre>
            </div>

            <h3>Run the Interaction Script</h3>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npx hardhat run scripts/interact-with-contract.js --network sepolia</pre>
            </div>

            <h2>Troubleshooting Common Issues</h2>

            <h3>Insufficient Gas</h3>
            <div class="warning">
                <strong>Error:</strong> "insufficient funds for gas * price + value"
                <br><strong>Solution:</strong> Get more Sepolia ETH from faucets or reduce gas price in config.
            </div>

            <h3>Invalid Mnemonic</h3>
            <div class="warning">
                <strong>Error:</strong> "invalid mnemonic phrase"
                <br><strong>Solution:</strong> Verify your mnemonic has exactly 12 words and is properly formatted.
            </div>

            <h3>Network Connection Issues</h3>
            <div class="warning">
                <strong>Error:</strong> "could not detect network"
                <br><strong>Solution:</strong> Check your Infura API key and internet connection.
            </div>

            <h3>Contract Verification Fails</h3>
            <div class="warning">
                <strong>Issue:</strong> Etherscan verification fails
                <br><strong>Solution:</strong> Ensure constructor parameters match exactly and use the flattened contract.
            </div>

            <h2>Post-Deployment Checklist</h2>
            <div class="success">
                <strong>Verify these items after successful deployment:</strong>
                <ul>
                    <li>✅ Contract deployed and confirmed on Etherscan</li>
                    <li>✅ Contract verified and source code visible</li>
                    <li>✅ Basic functions (transfer, balance check) work correctly</li>
                    <li>✅ FHEVM encryption is functioning properly</li>
                    <li>✅ Gas costs are reasonable for your use case</li>
                    <li>✅ Access controls are working as expected</li>
                </ul>
            </div>

            <h2>Next Steps</h2>
            <p>Congratulations! Your Confidential Token is now live on Sepolia testnet. You can now:</p>
            <ul>
                <li><strong>Build a Frontend:</strong> Create a web interface for your token</li>
                <li><strong>Add More Features:</strong> Implement additional privacy features</li>
                <li><strong>Test Extensively:</strong> Run comprehensive tests on testnet</li>
                <li><strong>Deploy to Mainnet:</strong> When ready, deploy to Ethereum mainnet</li>
                <li><strong>Create Documentation:</strong> Document your contract for users</li>
            </ul>

            <div class="highlight">
                <strong>Remember:</strong> Always test thoroughly on testnet before deploying to mainnet. FHEVM is cutting-edge technology, so consider gas costs and user experience carefully.
            </div>

            <h2>Deployment Summary</h2>
            <p>You've successfully completed the entire FHEVM deployment process:</p>
            
            <div class="step">
                <span class="step-number">✓</span>
                <span class="step-title">Environment Setup Complete</span>
                <p>Configured Hardhat, environment variables, and network settings.</p>
            </div>

            <div class="step">
                <span class="step-number">✓</span>
                <span class="step-title">Wallet and Funds Ready</span>
                <p>Set up wallet with mnemonic and obtained Sepolia test ETH.</p>
            </div>

            <div class="step">
                <span class="step-number">✓</span>
                <span class="step-title">Contract Deployed</span>
                <p>Successfully deployed your Confidential Token to Sepolia testnet.</p>
            </div>

            <div class="step">
                <span class="step-number">✓</span>
                <span class="step-title">Contract Verified</span>
                <p>Verified your contract on Etherscan for transparency and trust.</p>
            </div>

            <div class="step">
                <span class="step-number">✓</span>
                <span class="step-title">Testing Complete</span>
                <p>Interacted with your deployed contract and confirmed functionality.</p>
            </div>

            <h2>Quick Reference Commands</h2>
            <p>Keep these commands handy for future deployments:</p>

            <div class="code-block">
                <div class="code-title">Essential Commands</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre># Check balance
npx hardhat run scripts/check-balance.js --network sepolia

# Deploy contract
npx hardhat run scripts/deploy-confidential-token.js --network sepolia

# Verify contract (replace ADDRESS with actual address)
npx hardhat verify --network sepolia ADDRESS "PrivacyCoin" "PRIV" 1000000

# Interact with contract
npx hardhat run scripts/interact-with-contract.js --network sepolia

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test</pre>
            </div>

            <div class="info">
                <strong>Pro Tips for Production:</strong>
                <ul>
                    <li>Always use a hardware wallet for mainnet deployments</li>
                    <li>Set up automated testing pipelines</li>
                    <li>Monitor gas prices and deploy during low-traffic periods</li>
                    <li>Consider using CREATE2 for deterministic addresses</li>
                    <li>Implement upgradeability patterns if needed</li>
                    <li>Set up monitoring and alerting for your contracts</li>
                </ul>
            </div>

            <h2>Further Resources</h2>
            <ul>
                <li><a href="https://docs.zama.ai/fhevm" target="_blank">FHEVM Official Documentation</a></li>
                <li><a href="https://hardhat.org/docs" target="_blank">Hardhat Documentation</a></li>
                <li><a href="https://sepolia.etherscan.io" target="_blank">Sepolia Etherscan</a></li>
                <li><a href="https://faucets.chain.link" target="_blank">Testnet Faucets</a></li>
                <li><a href="https://docs.openzeppelin.com" target="_blank">OpenZeppelin Contracts</a></li>
            </ul>

            <div class="nav-buttons">
                <a href="#" class="nav-btn prev">← Previous: Writing Confidential Token</a>
                <a href="#" class="nav-btn next">Next: Building a Frontend →</a>
            </div>
        </div>
    </div>

    <script>
        function copyCode(button) {
            const codeBlock = button.parentNode;
            const code = codeBlock.querySelector('pre').textContent;
            
            navigator.clipboard.writeText(code).then(function() {
                button.textContent = 'Copied!';
                button.classList.add('copied');
                
                setTimeout(function() {
                    button.textContent = 'Copy';
                    button.classList.remove('copied');
                }, 2000);
            }).catch(function(err) {
                console.error('Could not copy code: ', err);
                const textArea = document.createElement('textarea');
                textArea.value = code;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                button.textContent = 'Copied!';
                button.classList.add('copied');
                setTimeout(function() {
                    button.textContent = 'Copy';
                    button.classList.remove('copied');
                }, 2000);
            });
        }

        // Add smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Highlight current section in navigation
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('h2[id]');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
        });
    </script>
</body>
</html>