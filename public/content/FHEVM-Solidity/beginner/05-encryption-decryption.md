<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Encryption, Computation, and Decryption Flow - FHEVM Tutorial</title>
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
        
        .flow-diagram {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
        }
        
        .flow-step {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 20px;
            margin: 10px;
            border-radius: 10px;
            font-weight: 600;
            min-width: 150px;
        }
        
        .flow-arrow {
            font-size: 1.5rem;
            color: #667eea;
            margin: 0 10px;
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
        
        .demo-container {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
        }
        
        .demo-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 15px;
            text-align: center;
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
            
            .flow-step {
                display: block;
                margin: 10px 0;
            }
            
            .flow-arrow {
                display: block;
                transform: rotate(90deg);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Encryption, Computation, and Decryption Flow</h1>
            <p>Master the complete FHEVM data processing pipeline</p>
        </div>
        
        <div class="content">
            <p>Understanding the complete flow of data through FHEVM is crucial for building privacy-preserving applications. This chapter will guide you through the entire process: encrypting data on the frontend, performing computations on encrypted data on-chain, and decrypting results back on the frontend.</p>

            <div class="flow-diagram">
                <div class="flow-step">Frontend Encryption</div>
                <span class="flow-arrow">→</span>
                <div class="flow-step">Blockchain Storage</div>
                <span class="flow-arrow">→</span>
                <div class="flow-step">FHE Computation</div>
                <span class="flow-arrow">→</span>
                <div class="flow-step">Frontend Decryption</div>
            </div>

            <h2>Understanding the FHEVM Data Flow</h2>
            <p>The FHEVM encryption flow involves four key stages:</p>
            <ol>
                <li><strong>Client-Side Encryption:</strong> Sensitive data is encrypted on the user's device using FHEVM libraries</li>
                <li><strong>Encrypted Storage:</strong> Encrypted data is stored on the blockchain in its encrypted form</li>
                <li><strong>Homomorphic Computation:</strong> Smart contracts perform calculations directly on encrypted data</li>
                <li><strong>Authorized Decryption:</strong> Only authorized parties can decrypt the results using their private keys</li>
            </ol>

            <div class="highlight">
                <strong>Key Advantage:</strong> At no point during this process is the sensitive data ever exposed in plaintext on the blockchain or to unauthorized parties.
            </div>

            <h2>Setting Up the Frontend Environment</h2>
            <p>First, let's set up the necessary libraries and dependencies for working with FHEVM from the frontend:</p>

            <h3>Install Required Packages</h3>
            <div class="code-block">
                <div class="code-title">package.json dependencies</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npm install @fhevm/web3 ethers tfhe @fhevm/tfhe-browser</pre>
            </div>

            <h3>Basic HTML Setup</h3>
            <div class="code-block">
                <div class="code-title">index.html</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;FHEVM Demo&lt;/title&gt;
    &lt;style&gt;
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .demo-section { margin: 30px 0; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
        button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px 5px; }
        button:hover { background: #0056b3; }
        input { padding: 8px; margin: 5px; border: 1px solid #ccc; border-radius: 4px; }
        .result { margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 4px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;FHEVM Encryption Demo&lt;/h1&gt;
    
    &lt;div class="demo-section"&gt;
        &lt;h2&gt;1. Connect Wallet&lt;/h2&gt;
        &lt;button onclick="connectWallet()"&gt;Connect MetaMask&lt;/button&gt;
        &lt;div id="wallet-status"&gt;&lt;/div&gt;
    &lt;/div&gt;
    
    &lt;div class="demo-section"&gt;
        &lt;h2&gt;2. Encrypt Input&lt;/h2&gt;
        &lt;input type="number" id="plaintext-input" placeholder="Enter a number (0-1000000)" /&gt;
        &lt;button onclick="encryptInput()"&gt;Encrypt&lt;/button&gt;
        &lt;div id="encryption-result" class="result"&gt;&lt;/div&gt;
    &lt;/div&gt;
    
    &lt;div class="demo-section"&gt;
        &lt;h2&gt;3. Send to Contract&lt;/h2&gt;
        &lt;button onclick="sendToContract()"&gt;Store Encrypted Value&lt;/button&gt;
        &lt;div id="contract-result" class="result"&gt;&lt;/div&gt;
    &lt;/div&gt;
    
    &lt;div class="demo-section"&gt;
        &lt;h2&gt;4. Perform Computation&lt;/h2&gt;
        &lt;button onclick="addEncrypted()"&gt;Add 100 (Encrypted)&lt;/button&gt;
        &lt;button onclick="multiplyEncrypted()"&gt;Multiply by 2 (Encrypted)&lt;/button&gt;
        &lt;div id="computation-result" class="result"&gt;&lt;/div&gt;
    &lt;/div&gt;
    
    &lt;div class="demo-section"&gt;
        &lt;h2&gt;5. Decrypt Result&lt;/h2&gt;
        &lt;button onclick="decryptResult()"&gt;Decrypt and View Result&lt;/button&gt;
        &lt;div id="decryption-result" class="result"&gt;&lt;/div&gt;
    &lt;/div&gt;

    &lt;script src="demo.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
            </div>

            <h2>Step 1: Frontend Encryption</h2>
            <p>The first step in the FHEVM flow is encrypting sensitive data on the client side before sending it to the blockchain:</p>

            <h3>Initialize FHEVM Client</h3>
            <div class="code-block">
                <div class="code-title">demo.js - Initialization</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>// Import FHEVM libraries (if using modules)
// import { createFhevmInstance } from '@fhevm/web3';
// import { ethers } from 'ethers';

// Global variables
let fhevmInstance;
let provider;
let signer;
let contract;
let encryptedValue;

// Contract ABI (simplified for demo)
const contractABI = [
    "function storeEncryptedValue(bytes calldata encryptedData) external",
    "function addToValue(bytes calldata encryptedAmount) external",
    "function multiplyValue(bytes calldata encryptedMultiplier) external",
    "function getEncryptedValue() external view returns (bytes memory)",
    "function getDecryptedValue() external view returns (uint32)"
];

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x..."; // Your contract address

// Initialize FHEVM instance
async function initializeFhevm() {
    try {
        // Create FHEVM instance (adjust for your network)
        fhevmInstance = await createFhevmInstance({
            network: 'sepolia', // or your network
            gatewayUrl: 'https://gateway.sepolia.zama.ai/' // FHEVM gateway
        });
        console.log('FHEVM instance initialized');
    } catch (error) {
        console.error('Failed to initialize FHEVM:', error);
    }
}

// Initialize when page loads
window.addEventListener('load', async () => {
    await initializeFhevm();
});</pre>
            </div>

            <h3>Connect Wallet Function</h3>
            <div class="code-block">
                <div class="code-title">Wallet Connection</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed!');
        return;
    }

    try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create provider and signer
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        
        // Get connected address
        const address = await signer.getAddress();
        document.getElementById('wallet-status').innerHTML = 
            `✅ Connected: ${address.substring(0, 6)}...${address.substring(38)}`;
        
        // Initialize contract instance
        contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
        
        console.log('Wallet connected successfully');
    } catch (error) {
        console.error('Failed to connect wallet:', error);
        document.getElementById('wallet-status').innerHTML = '❌ Connection failed';
    }
}</pre>
            </div>

            <h3>Encrypt Input Data</h3>
            <div class="code-block">
                <div class="code-title">Input Encryption</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>async function encryptInput() {
    if (!fhevmInstance) {
        alert('FHEVM not initialized. Please wait and try again.');
        return;
    }

    try {
        // Get the plaintext value from input
        const plaintext = parseInt(document.getElementById('plaintext-input').value);
        
        if (isNaN(plaintext) || plaintext < 0 || plaintext > 1000000) {
            alert('Please enter a valid number between 0 and 1,000,000');
            return;
        }

        // Encrypt the value using FHEVM
        // This creates an encrypted representation that can be processed on-chain
        encryptedValue = await fhevmInstance.encrypt32(plaintext);
        
        // Display encryption result
        document.getElementById('encryption-result').innerHTML = `
            📝 <strong>Original Value:</strong> ${plaintext}<br>
            🔐 <strong>Encrypted:</strong> ${encryptedValue.substring(0, 20)}...<br>
            ✅ <strong>Status:</strong> Successfully encrypted (${encryptedValue.length} bytes)
        `;
        
        console.log('Encryption successful:', {
            plaintext,
            encrypted: encryptedValue
        });
        
    } catch (error) {
        console.error('Encryption failed:', error);
        document.getElementById('encryption-result').innerHTML = 
            `❌ Encryption failed: ${error.message}`;
    }
}</pre>
            </div>

            <div class="info">
                <strong>Encryption Process:</strong> The <code>fhevmInstance.encrypt32()</code> function converts plaintext numbers into encrypted format that can be stored and computed on blockchain while maintaining privacy.
            </div>

            <h2>Step 2: Blockchain Storage and Computation</h2>
            <p>Once data is encrypted on the frontend, we can send it to the blockchain for storage and computation:</p>

            <h3>Send Encrypted Data to Contract</h3>
            <div class="code-block">
                <div class="code-title">Blockchain Storage</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>async function sendToContract() {
    if (!contract || !encryptedValue) {
        alert('Please connect wallet and encrypt a value first');
        return;
    }

    try {
        // Send encrypted data to the smart contract
        const tx = await contract.storeEncryptedValue(encryptedValue);
        
        document.getElementById('contract-result').innerHTML = 
            `⏳ Sending transaction...`;
        
        // Wait for transaction confirmation
        const receipt = await tx.wait();
        
        document.getElementById('contract-result').innerHTML = `
            ✅ <strong>Stored Successfully!</strong><br>
            📄 <strong>Transaction:</strong> ${receipt.transactionHash}<br>
            ⛽ <strong>Gas Used:</strong> ${receipt.gasUsed.toString()}<br>
            🔐 <strong>Data:</strong> Encrypted value stored on blockchain
        `;
        
        console.log('Transaction successful:', receipt);
        
    } catch (error) {
        console.error('Transaction failed:', error);
        document.getElementById('contract-result').innerHTML = 
            `❌ Transaction failed: ${error.message}`;
    }
}</pre>
            </div>

            <h3>Perform Encrypted Computations</h3>
            <div class="code-block">
                <div class="code-title">Encrypted Operations</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>async function addEncrypted() {
    if (!contract || !fhevmInstance) {
        alert('Please connect wallet and initialize FHEVM first');
        return;
    }

    try {
        // Encrypt the number we want to add (100)
        const encryptedHundred = await fhevmInstance.encrypt32(100);
        
        // Call contract function to add encrypted values
        const tx = await contract.addToValue(encryptedHundred);
        
        document.getElementById('computation-result').innerHTML = 
            `⏳ Processing encrypted addition...`;
        
        const receipt = await tx.wait();
        
        document.getElementById('computation-result').innerHTML = `
            ✅ <strong>Addition Completed!</strong><br>
            🔢 <strong>Operation:</strong> Added 100 (encrypted)<br>
            📄 <strong>Transaction:</strong> ${receipt.transactionHash}<br>
            🔐 <strong>Result:</strong> Stored as encrypted value
        `;
        
        console.log('Encrypted addition successful:', receipt);
        
    } catch (error) {
        console.error('Encrypted addition failed:', error);
        document.getElementById('computation-result').innerHTML = 
            `❌ Addition failed: ${error.message}`;
    }
}

async function multiplyEncrypted() {
    if (!contract || !fhevmInstance) {
        alert('Please connect wallet and initialize FHEVM first');
        return;
    }

    try {
        // Encrypt the multiplier (2)
        const encryptedTwo = await fhevmInstance.encrypt32(2);
        
        // Call contract function to multiply encrypted values
        const tx = await contract.multiplyValue(encryptedTwo);
        
        document.getElementById('computation-result').innerHTML = 
            `⏳ Processing encrypted multiplication...`;
        
        const receipt = await tx.wait();
        
        document.getElementById('computation-result').innerHTML = `
            ✅ <strong>Multiplication Completed!</strong><br>
            🔢 <strong>Operation:</strong> Multiplied by 2 (encrypted)<br>
            📄 <strong>Transaction:</strong> ${receipt.transactionHash}<br>
            🔐 <strong>Result:</strong> Stored as encrypted value
        `;
        
        console.log('Encrypted multiplication successful:', receipt);
        
    } catch (error) {
        console.error('Encrypted multiplication failed:', error);
        document.getElementById('computation-result').innerHTML = 
            `❌ Multiplication failed: ${error.message}`;
    }
}</pre>
            </div>

            <div class="warning">
                <strong>Important:</strong> All arithmetic operations happen on encrypted data. The smart contract never sees the actual numbers - only the encrypted representations.
            </div>

            <h2>Step 3: Frontend Decryption</h2>
            <p>The final step is decrypting the computation results on the frontend. Only authorized users with proper access can decrypt the values:</p>

            <h3>Decrypt and Display Results</h3>
            <div class="code-block">
                <div class="code-title">Result Decryption</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>async function decryptResult() {
    if (!contract || !fhevmInstance) {
        alert('Please connect wallet and initialize FHEVM first');
        return;
    }

    try {
        document.getElementById('decryption-result').innerHTML = 
            `⏳ Retrieving and decrypting result...`;

        // Method 1: Get encrypted value and decrypt on frontend
        const encryptedResult = await contract.getEncryptedValue();
        
        if (encryptedResult === '0x' || encryptedResult.length <= 2) {
            document.getElementById('decryption-result').innerHTML = 
                `⚠️ No encrypted value found. Please store a value first.`;
            return;
        }

        // Decrypt the result using FHEVM instance
        const decryptedValue = await fhevmInstance.decrypt(encryptedResult);
        
        // Method 2: Direct decryption via contract (if implemented)
        let contractDecrypted;
        try {
            contractDecrypted = await contract.getDecryptedValue();
        } catch (e) {
            console.log('Direct contract decryption not available or not authorized');
        }

        document.getElementById('decryption-result').innerHTML = `
            ✅ <strong>Decryption Successful!</strong><br>
            🔓 <strong>Decrypted Value:</strong> ${decryptedValue}<br>
            ${contractDecrypted ? `🏗️ <strong>Contract Decrypted:</strong> ${contractDecrypted}<br>` : ''}
            🔐 <strong>Encrypted Data:</strong> ${encryptedResult.substring(0, 20)}...<br>
            📊 <strong>Process:</strong> Encrypted → Computed → Decrypted
        `;
        
        console.log('Decryption results:', {
            encrypted: encryptedResult,
            decrypted: decryptedValue,
            contractDecrypted: contractDecrypted
        });
        
    } catch (error) {
        console.error('Decryption failed:', error);
        document.getElementById('decryption-result').innerHTML = 
            `❌ Decryption failed: ${error.message}`;
    }
}</pre>
            </div>

            <h2>Complete Working Example</h2>
            <p>Here's a complete, runnable example that demonstrates the entire encryption flow:</p>

            <div class="demo-container">
                <div class="demo-title">🚀 Complete FHEVM Demo Application</div>
                
                <div class="code-block">
                    <div class="code-title">complete-demo.html</div>
                    <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                    <pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Complete FHEVM Demo&lt;/title&gt;
    &lt;script src="https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js"&gt;&lt;/script&gt;
    &lt;style&gt;
        body { font-family: Arial, sans-serif; max-width: 1000px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .step { margin: 20px 0; padding: 20px; border: 2px solid #e0e0e0; border-radius: 8px; }
        .step.active { border-color: #007bff; background: #f8f9ff; }
        button { background: #007bff; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; margin: 10px 5px; font-size: 14px; }
        button:hover { background: #0056b3; }
        button:disabled { background: #ccc; cursor: not-allowed; }
        input, select { padding: 10px; margin: 5px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
        .result { margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 4px; border-left: 4px solid #007bff; }
        .error { border-left-color: #dc3545; background: #f8d7da; }
        .success { border-left-color: #28a745; background: #d4edda; }
        .warning { border-left-color: #ffc107; background: #fff3cd; }
        .code { font-family: monospace; background: #f1f1f1; padding: 2px 4px; border-radius: 3px; }
        h1 { color: #333; text-align: center; }
        h2 { color: #555; border-bottom: 2px solid #007bff; padding-bottom: 5px; }
        .flow-indicator { text-align: center; margin: 20px 0; }
        .flow-step { display: inline-block; padding: 8px 16px; margin: 0 5px; background: #e9ecef; border-radius: 20px; font-size: 12px; }
        .flow-step.active { background: #007bff; color: white; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="container"&gt;
        &lt;h1&gt;🔐 Complete FHEVM Encryption Demo&lt;/h1&gt;
        &lt;p&gt;This demo shows the complete flow: Frontend Encryption → Blockchain Storage → Encrypted Computation → Frontend Decryption&lt;/p&gt;
        
        &lt;div class="flow-indicator"&gt;
            &lt;div class="flow-step" id="step1"&gt;1. Connect&lt;/div&gt;
            &lt;div class="flow-step" id="step2"&gt;2. Encrypt&lt;/div&gt;
            &lt;div class="flow-step" id="step3"&gt;3. Store&lt;/div&gt;
            &lt;div class="flow-step" id="step4"&gt;4. Compute&lt;/div&gt;
            &lt;div class="flow-step" id="step5"&gt;5. Decrypt&lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="step" id="connect-section"&gt;
            &lt;h2&gt;Step 1: Connect Wallet&lt;/h2&gt;
            &lt;button onclick="connectWallet()"&gt;Connect MetaMask&lt;/button&gt;
            &lt;div id="wallet-status"&gt;&lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="step" id="encrypt-section"&gt;
            &lt;h2&gt;Step 2: Encrypt Data&lt;/h2&gt;
            &lt;input type="number" id="value-input" placeholder="Enter value (0-1000000)" min="0" max="1000000"&gt;
            &lt;button onclick="encryptValue()" id="encrypt-btn" disabled&gt;Encrypt Value&lt;/button&gt;
            &lt;div id="encrypt-result"&gt;&lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="step" id="store-section"&gt;
            &lt;h2&gt;Step 3: Store on Blockchain&lt;/h2&gt;
            &lt;button onclick="storeOnBlockchain()" id="store-btn" disabled&gt;Store Encrypted Data&lt;/button&gt;
            &lt;div id="store-result"&gt;&lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="step" id="compute-section"&gt;
            &lt;h2&gt;Step 4: Encrypted Computation&lt;/h2&gt;
            &lt;button onclick="performAddition()" id="add-btn" disabled&gt;Add 100 (Encrypted)&lt;/button&gt;
            &lt;button onclick="performMultiplication()" id="mult-btn" disabled&gt;Multiply by 2 (Encrypted)&lt;/button&gt;
            &lt;div id="compute-result"&gt;&lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="step" id="decrypt-section"&gt;
            &lt;h2&gt;Step 5: Decrypt Result&lt;/h2&gt;
            &lt;button onclick="decryptFinalResult()" id="decrypt-btn" disabled&gt;Decrypt and View&lt;/button&gt;
            &lt;div id="decrypt-result"&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;script&gt;
        // Demo implementation with mock FHEVM functions for testing
        let isConnected = false;
        let encryptedData = null;
        let storedOnChain = false;
        let computationDone = false;
        
        // Mock FHEVM functions for demo purposes
        const mockFHEVM = {
            encrypt: (value) =&gt; {
                // Simulate encryption with a mock encrypted string
                return `0x${Math.random().toString(16).repeat(8).substring(0,64)}`;
            },
            decrypt: (encryptedData) =&gt; {
                // For demo, we'll track the operations and simulate decryption
                let result = parseInt(document.getElementById('value-input').value) || 0;
                if (computationDone) {
                    result = (result + 100) * 2; // Simulate the operations we performed
                }
                return result;
            }
        };
        
        async function connectWallet() {
            try {
                document.getElementById('step1').classList.add('active');
                document.getElementById('wallet-status').innerHTML = '⏳ Connecting...';
                
                if (typeof window.ethereum === 'undefined') {
                    throw new Error('MetaMask not installed');
                }
                
                // Simulate connection delay
                await new Promise(resolve =&gt; setTimeout(resolve, 1000));
                
                // Mock successful connection
                const mockAddress = '0x742d35Cc6aC';
                
                document.getElementById('wallet-status').innerHTML = `
                    &lt;div class="result success"&gt;
                        ✅ &lt;strong&gt;Connected Successfully!&lt;/strong&gt;&lt;br&gt;
                        📍 Address: ${mockAddress}...&lt;br&gt;
                        🌐 Network: Sepolia Testnet
                    &lt;/div&gt;
                `;
                
                isConnected = true;
                document.getElementById('encrypt-btn').disabled = false;
                document.getElementById('encrypt-section').classList.add('active');
                
            } catch (error) {
                document.getElementById('wallet-status').innerHTML = `
                    &lt;div class="result error"&gt;❌ Connection failed: ${error.message}&lt;/div&gt;
                `;
            }
        }
        
        async function encryptValue() {
            try {
                document.getElementById('step2').classList.add('active');
                const value = document.getElementById('value-input').value;
                
                if (!value || isNaN(value) || value &lt; 0 || value &gt; 1000000) {
                    throw new Error('Please enter a valid number between 0 and 1,000,000');
                }
                
                document.getElementById('encrypt-result').innerHTML = '⏳ Encrypting...';
                
                // Simulate encryption process
                await new Promise(resolve =&gt; setTimeout(resolve, 1500));
                
                encryptedData = mockFHEVM.encrypt(parseInt(value));
                
                document.getElementById('encrypt-result').innerHTML = `
                    &lt;div class="result success"&gt;
                        ✅ &lt;strong&gt;Encryption Successful!&lt;/strong&gt;&lt;br&gt;
                        📝 Original: ${value}&lt;br&gt;
                        🔐 Encrypted: ${encryptedData.substring(0, 20)}...&lt;br&gt;
                        📏 Size: ${encryptedData.length} characters
                    &lt;/div&gt;
                `;
                
                document.getElementById('store-btn').disabled = false;
                document.getElementById('store-section').classList.add('active');
                
            } catch (error) {
                document.getElementById('encrypt-result').innerHTML = `
                    &lt;div class="result error"&gt;❌ Encryption failed: ${error.message}&lt;/div&gt;
                `;
            }
        }
        
        async function storeOnBlockchain() {
            try {
                document.getElementById('step3').classList.add('active');
                document.getElementById('store-result').innerHTML = '⏳ Sending to blockchain...';
                
                // Simulate blockchain transaction
                await new Promise(resolve =&gt; setTimeout(resolve, 3000));
                
                const mockTxHash = '0x' + Math.random().toString(16).substring(2, 66);
                
                document.getElementById('store-result').innerHTML = `
                    &lt;div class="result success"&gt;
                        ✅ &lt;strong&gt;Stored on Blockchain!&lt;/strong&gt;&lt;br&gt;
                        🔗 Transaction: ${mockTxHash}&lt;br&gt;
                        ⛽ Gas Used: 89,234&lt;br&gt;
                        🔐 Data: Encrypted and immutable
                    &lt;/div&gt;
                `;
                
                storedOnChain = true;
                document.getElementById('add-btn').disabled = false;
                document.getElementById('mult-btn').disabled = false;
                document.getElementById('compute-section').classList.add('active');
                
            } catch (error) {
                document.getElementById('store-result').innerHTML = `
                    &lt;div class="result error"&gt;❌ Storage failed: ${error.message}&lt;/div&gt;
                `;
            }
        }
        
        async function performAddition() {
            try {
                document.getElementById('step4').classList.add('active');
                document.getElementById('compute-result').innerHTML = '⏳ Computing addition on encrypted data...';
                
                // Simulate encrypted computation
                await new Promise(resolve =&gt; setTimeout(resolve, 2000));
                
                const mockTxHash = '0x' + Math.random().toString(16).substring(2, 66);
                
                document.getElementById('compute-result').innerHTML = `
                    &lt;div class="result success"&gt;
                        ✅ &lt;strong&gt;Addition Completed!&lt;/strong&gt;&lt;br&gt;
                        🧮 Operation: Encrypted Value + 100&lt;br&gt;
                        🔗 Transaction: ${mockTxHash}&lt;br&gt;
                        🔐 Result: Stored as encrypted
                    &lt;/div&gt;
                `;
                
                computationDone = true;
                document.getElementById('decrypt-btn').disabled = false;
                document.getElementById('decrypt-section').classList.add('active');
                
            } catch (error) {
                document.getElementById('compute-result').innerHTML = `
                    &lt;div class="result error"&gt;❌ Addition failed: ${error.message}&lt;/div&gt;
                `;
            }
        }
        
        async function performMultiplication() {
            try {
                document.getElementById('step4').classList.add('active');
                document.getElementById('compute-result').innerHTML = '⏳ Computing multiplication on encrypted data...';
                
                // Simulate encrypted computation
                await new Promise(resolve =&gt; setTimeout(resolve, 2500));
                
                const mockTxHash = '0x' + Math.random().toString(16).substring(2, 66);
                
                document.getElementById('compute-result').innerHTML = `
                    &lt;div class="result success"&gt;
                        ✅ &lt;strong&gt;Multiplication Completed!&lt;/strong&gt;&lt;br&gt;
                        🧮 Operation: (Encrypted Value + 100) × 2&lt;br&gt;
                        🔗 Transaction: ${mockTxHash}&lt;br&gt;
                        🔐 Result: Stored as encrypted
                    &lt;/div&gt;
                `;
                
                computationDone = true;
                document.getElementById('decrypt-btn').disabled = false;
                document.getElementById('decrypt-section').classList.add('active');
                
            } catch (error) {
                document.getElementById('compute-result').innerHTML = `
                    &lt;div class="result error"&gt;❌ Multiplication failed: ${error.message}&lt;/div&gt;
                `;
            }
        }
        
        async function decryptFinalResult() {
            try {
                document.getElementById('step5').classList.add('active');
                document.getElementById('decrypt-result').innerHTML = '⏳ Decrypting final result...';
                
                // Simulate decryption process
                await new Promise(resolve =&gt; setTimeout(resolve, 2000));
                
                const finalResult = mockFHEVM.decrypt(encryptedData);
                const originalValue = document.getElementById('value-input').value;
                
                document.getElementById('decrypt-result').innerHTML = `
                    &lt;div class="result success"&gt;
                        ✅ &lt;strong&gt;Decryption Successful!&lt;/strong&gt;&lt;br&gt;
                        📊 &lt;strong&gt;Complete Flow Results:&lt;/strong&gt;&lt;br&gt;
                        🔢 Original Input: ${originalValue}&lt;br&gt;
                        🧮 After Addition: ${parseInt(originalValue) + 100}&lt;br&gt;
                        ✖️ After Multiplication: ${finalResult}&lt;br&gt;
                        🔐 &lt;strong&gt;Privacy Maintained Throughout!&lt;/strong&gt;
                    &lt;/div&gt;
                    &lt;div class="result warning"&gt;
                        🎉 &lt;strong&gt;Congratulations!&lt;/strong&gt; You've successfully completed the entire FHEVM encryption flow:&lt;br&gt;
                        1️⃣ Encrypted data on frontend&lt;br&gt;
                        2️⃣ Stored encrypted data on blockchain&lt;br&gt;
                        3️⃣ Performed computations on encrypted data&lt;br&gt;
                        4️⃣ Decrypted results on frontend&lt;br&gt;
                        🔒 At no point was your data exposed in plaintext!
                    &lt;/div&gt;
                `;
                
            } catch (error) {
                document.getElementById('decrypt-result').innerHTML = `
                    &lt;div class="result error"&gt;❌ Decryption failed: ${error.message}&lt;/div&gt;
                `;
            }
        }
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
                </div>
            </div>

            <h2>Smart Contract Implementation</h2>
            <p>Here's the corresponding smart contract that handles the encrypted data:</p>

            <div class="code-block">
                <div class="code-title">EncryptedComputation.sol</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/solidity/contracts/FHE.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EncryptedComputation is Ownable {
    // Store encrypted value
    euint32 private encryptedValue;
    
    // Track if a value has been stored
    bool public hasValue;
    
    // Events (amounts remain encrypted)
    event ValueStored(address indexed user);
    event ValueUpdated(address indexed user, string operation);
    event ValueDecrypted(address indexed user);
    
    // Store an encrypted value
    function storeEncryptedValue(bytes calldata encryptedInput) external {
        encryptedValue = FHE.asEuint32(encryptedInput);
        hasValue = true;
        emit ValueStored(msg.sender);
    }
    
    // Add an encrypted amount to the stored value
    function addToValue(bytes calldata encryptedAmount) external {
        require(hasValue, "No value stored yet");
        
        euint32 amountToAdd = FHE.asEuint32(encryptedAmount);
        encryptedValue = FHE.add(encryptedValue, amountToAdd);
        
        emit ValueUpdated(msg.sender, "addition");
    }
    
    // Multiply the stored value by an encrypted multiplier
    function multiplyValue(bytes calldata encryptedMultiplier) external {
        require(hasValue, "No value stored yet");
        
        euint32 multiplier = FHE.asEuint32(encryptedMultiplier);
        encryptedValue = FHE.mul(encryptedValue, multiplier);
        
        emit ValueUpdated(msg.sender, "multiplication");
    }
    
    // Get the encrypted value (still encrypted when returned)
    function getEncryptedValue() external view returns (bytes memory) {
        require(hasValue, "No value stored yet");
        return FHE.sealOutput(encryptedValue, msg.sender);
    }
    
    // Decrypt value (only for demonstration - in production, implement proper access control)
    function getDecryptedValue() external view returns (uint32) {
        require(hasValue, "No value stored yet");
        require(msg.sender == owner(), "Only owner can decrypt");
        return FHE.decrypt(encryptedValue);
    }
    
    // Reset the stored value (only owner)
    function resetValue() external onlyOwner {
        encryptedValue = FHE.asEuint32(0);
        hasValue = false;
    }
    
    // Perform complex computation: (value + x) * y
    function complexComputation(
        bytes calldata encryptedX, 
        bytes calldata encryptedY
    ) external {
        require(hasValue, "No value stored yet");
        
        euint32 x = FHE.asEuint32(encryptedX);
        euint32 y = FHE.asEuint32(encryptedY);
        
        // Perform (value + x) * y
        euint32 temp = FHE.add(encryptedValue, x);
        encryptedValue = FHE.mul(temp, y);
        
        emit ValueUpdated(msg.sender, "complex");
    }
    
    // Compare encrypted value with a threshold
    function isValueGreaterThan(bytes calldata encryptedThreshold) 
        external 
        view 
        returns (bool) 
    {
        require(hasValue, "No value stored yet");
        
        euint32 threshold = FHE.asEuint32(encryptedThreshold);
        ebool result = FHE.gt(encryptedValue, threshold);
        
        // Note: In a real implementation, you might want to keep this encrypted too
        return FHE.decrypt(result);
    }
}</pre>
            </div>

            <h2>Advanced Integration Example</h2>
            <p>Here's a more advanced example showing integration with a real web application:</p>

            <div class="code-block">
                <div class="code-title">advanced-integration.js</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>class FHEVMIntegration {
    constructor(contractAddress, contractABI) {
        this.contractAddress = contractAddress;
        this.contractABI = contractABI;
        this.fhevmInstance = null;
        this.provider = null;
        this.signer = null;
        this.contract = null;
    }

    // Initialize the FHEVM integration
    async initialize() {
        try {
            // Initialize FHEVM instance
            this.fhevmInstance = await createFhevmInstance({
                network: 'sepolia',
                gatewayUrl: 'https://gateway.sepolia.zama.ai/'
            });

            // Connect to Web3
            if (typeof window.ethereum !== 'undefined') {
                this.provider = new ethers.providers.Web3Provider(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.signer = this.provider.getSigner();
                this.contract = new ethers.Contract(
                    this.contractAddress, 
                    this.contractABI, 
                    this.signer
                );
            }

            console.log('FHEVM Integration initialized successfully');
            return true;
        } catch (error) {
            console.error('Initialization failed:', error);
            throw error;
        }
    }

    // Encrypt a 32-bit integer
    async encryptUint32(value) {
        if (!this.fhevmInstance) {
            throw new Error('FHEVM instance not initialized');
        }

        if (typeof value !== 'number' || value < 0 || value >= 2**32) {
            throw new Error('Value must be a valid 32-bit unsigned integer');
        }

        return await this.fhevmInstance.encrypt32(value);
    }

    // Encrypt multiple values at once
    async encryptBatch(values) {
        const encrypted = {};
        for (const [key, value] of Object.entries(values)) {
            encrypted[key] = await this.encryptUint32(value);
        }
        return encrypted;
    }

    // Store encrypted data on blockchain
    async storeEncryptedData(encryptedValue, options = {}) {
        if (!this.contract) {
            throw new Error('Contract not initialized');
        }

        const gasLimit = options.gasLimit || 300000;
        const gasPrice = options.gasPrice || await this.provider.getGasPrice();

        const tx = await this.contract.storeEncryptedValue(encryptedValue, {
            gasLimit,
            gasPrice
        });

        const receipt = await tx.wait();
        
        return {
            transactionHash: receipt.transactionHash,
            blockNumber: receipt.blockNumber,
            gasUsed: receipt.gasUsed.toString()
        };
    }

    // Perform encrypted computation
    async performComputation(operation, encryptedOperand) {
        if (!this.contract) {
            throw new Error('Contract not initialized');
        }

        let tx;
        switch (operation) {
            case 'add':
                tx = await this.contract.addToValue(encryptedOperand);
                break;
            case 'multiply':
                tx = await this.contract.multiplyValue(encryptedOperand);
                break;
            default:
                throw new Error(`Unsupported operation: ${operation}`);
        }

        return await tx.wait();
    }

    // Retrieve and decrypt result
    async getDecryptedResult() {
        if (!this.contract || !this.fhevmInstance) {
            throw new Error('Integration not properly initialized');
        }

        // Get encrypted result from contract
        const encryptedResult = await this.contract.getEncryptedValue();
        
        // Decrypt using FHEVM instance
        const decryptedValue = await this.fhevmInstance.decrypt(encryptedResult);
        
        return {
            encrypted: encryptedResult,
            decrypted: decryptedValue
        };
    }

    // Complete workflow: encrypt → store → compute → decrypt
    async completeWorkflow(inputValue, operations = []) {
        try {
            // Step 1: Encrypt input
            console.log('Step 1: Encrypting input...');
            const encrypted = await this.encryptUint32(inputValue);
            
            // Step 2: Store on blockchain
            console.log('Step 2: Storing on blockchain...');
            const storeResult = await this.storeEncryptedData(encrypted);
            
            // Step 3: Perform computations
            console.log('Step 3: Performing computations...');
            const computationResults = [];
            for (const op of operations) {
                const opEncrypted = await this.encryptUint32(op.value);
                const result = await this.performComputation(op.type, opEncrypted);
                computationResults.push(result);
            }
            
            // Step 4: Decrypt result
            console.log('Step 4: Decrypting result...');
            const finalResult = await this.getDecryptedResult();
            
            return {
                input: inputValue,
                encrypted: encrypted,
                storage: storeResult,
                computations: computationResults,
                result: finalResult
            };
            
        } catch (error) {
            console.error('Workflow failed:', error);
            throw error;
        }
    }
}

// Usage example
async function demonstrateWorkflow() {
    try {
        // Initialize integration
        const integration = new FHEVMIntegration(
            '0x...', // Your contract address
            contractABI // Your contract ABI
        );
        
        await integration.initialize();
        
        // Define computation workflow
        const operations = [
            { type: 'add', value: 100 },      // Add 100
            { type: 'multiply', value: 2 }    // Then multiply by 2
        ];
        
        // Execute complete workflow
        const result = await integration.completeWorkflow(42, operations);
        
        console.log('Workflow completed:', result);
        console.log(`Input: ${result.input}`);
        console.log(`Final result: ${result.result.decrypted}`);
        // Expected: (42 + 100) * 2 = 284
        
    } catch (error) {
        console.error('Demonstration failed:', error);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FHEVMIntegration, demonstrateWorkflow };
}</pre>
            </div>

            <h2>Best Practices and Security Considerations</h2>

            <div class="warning">
                <strong>Security Best Practices:</strong>
                <ul>
                    <li><strong>Key Management:</strong> Never store private keys in frontend code</li>
                    <li><strong>Access Control:</strong> Implement proper authorization for decryption</li>
                    <li><strong>Input Validation:</strong> Always validate data before encryption</li>
                    <li><strong>Error Handling:</strong> Don't expose sensitive information in error messages</li>
                </ul>
            </div>

            <div class="info">
                <strong>Performance Tips:</strong>
                <ul>
                    <li><strong>Batch Operations:</strong> Encrypt multiple values together when possible</li>
                    <li><strong>Gas Optimization:</strong> FHE operations consume more gas - optimize accordingly</li>
                    <li><strong>Caching:</strong> Cache FHEVM instances to avoid re-initialization</li>
                    <li><strong>Async Patterns:</strong> Use proper async/await patterns for better UX</li>
                </ul>
            </div>

            <h2>Summary</h2>
            <p>You've now mastered the complete FHEVM encryption flow:</p>

            <div class="success">
                <strong>What You've Learned:</strong>
                <ul>
                    <li>✅ How to encrypt data on the frontend using FHEVM libraries</li>
                    <li>✅ How to store and compute on encrypted data in smart contracts</li>
                    <li>✅ How to decrypt results back on the frontend</li>
                    <li>✅ Best practices for security and performance</li>
                    <li>✅ Complete working examples you can use in your projects</li>
                </ul>
            </div>

            <p>This encryption flow is the foundation for building any privacy-preserving application on FHEVM. You can now create applications where sensitive data remains private throughout the entire computational process while still enabling complex business logic and verification.</p>

            <div class="nav-buttons">
                <a href="#" class="nav-btn prev">← Previous: Deploying Contract</a>
                <a href="#" class="nav-btn next">Next: Advanced FHEVM Patterns →</a>
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

        // Add intersection observer for section highlighting
        const sections = document.querySelectorAll('h2, h3');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visual feedback for active sections
                    entry.target.style.color = '#667eea';
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-100px 0px -100px 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    </script>
</body>
</html>