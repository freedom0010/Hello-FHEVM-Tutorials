<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Writing a Confidential Token Contract - FHEVM Tutorial</title>
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
        
        .comparison {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        
        .comparison-item {
            background: #f7fafc;
            border-radius: 12px;
            padding: 20px;
            border: 2px solid #e2e8f0;
        }
        
        .comparison-item h4 {
            color: #2d3748;
            margin-bottom: 15px;
            text-align: center;
            font-size: 1.1rem;
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
            .comparison {
                grid-template-columns: 1fr;
            }
            
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

        /* Syntax highlighting */
        .keyword { color: #c792ea; }
        .string { color: #c3e88d; }
        .comment { color: #546e7a; }
        .function { color: #82aaff; }
        .number { color: #f78c6c; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Writing a Confidential Token Contract</h1>
            <p>Build your first privacy-preserving ERC20 token with FHEVM</p>
        </div>
        
        <div class="content">
            <p>In this chapter, we'll create a confidential token contract that maintains all the functionality of a standard ERC20 token while keeping balances and transfer amounts completely private. This is where FHEVM truly shines!</p>

            <h2>Understanding the Challenge</h2>
            <p>Traditional ERC20 tokens expose all balances and transaction amounts publicly. With FHEVM, we can create tokens where:</p>
            <ul>
                <li>Individual balances remain encrypted and private</li>
                <li>Transfer amounts are hidden from public view</li>
                <li>Only authorized parties can decrypt their own balance</li>
                <li>The contract logic still validates transfers correctly</li>
            </ul>

            <div class="comparison">
                <div class="comparison-item">
                    <h4>🔍 Traditional ERC20</h4>
                    <ul>
                        <li>All balances public</li>
                        <li>Transfer amounts visible</li>
                        <li>Complete transaction history exposed</li>
                        <li>No financial privacy</li>
                    </ul>
                </div>
                <div class="comparison-item">
                    <h4>🔐 Confidential Token</h4>
                    <ul>
                        <li>Encrypted balance storage</li>
                        <li>Hidden transfer amounts</li>
                        <li>Private transaction details</li>
                        <li>Selective disclosure control</li>
                    </ul>
                </div>
            </div>

            <h2>Import Required Libraries</h2>
            <p>First, let's import the necessary FHEVM libraries and create our contract file:</p>

            <div class="code-block">
                <div class="code-title">contracts/ConfidentialERC20.sol</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/solidity/contracts/FHE.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ConfidentialERC20 is Ownable {
    // Contract implementation will go here
}</pre>
            </div>

            <div class="highlight">
                <strong>Key Imports:</strong>
                <ul>
                    <li><code>FHE.sol</code> - Provides encrypted data types and operations</li>
                    <li><code>Ownable.sol</code> - Standard OpenZeppelin access control</li>
                </ul>
            </div>

            <h2>Define Contract State Variables</h2>
            <p>Now let's define our contract's state variables using FHEVM's encrypted types:</p>

            <div class="code-block">
                <div class="code-title">State Variables</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>contract ConfidentialERC20 is Ownable {
    // Token metadata (public like standard ERC20)
    string public name;
    string public symbol;
    uint8 public decimals;
    
    // Encrypted total supply
    euint32 private _totalSupply;
    
    // Encrypted balances mapping
    mapping(address => euint32) private _balances;
    
    // Allowances (encrypted amounts)
    mapping(address => mapping(address => euint32)) private _allowances;
    
    // Events (amounts are encrypted)
    event Transfer(address indexed from, address indexed to);
    event Approval(address indexed owner, address indexed spender);
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint32 _initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = 6; // Using 6 decimals for euint32 compatibility
        
        // Encrypt initial supply and assign to contract deployer
        _totalSupply = FHE.asEuint32(_initialSupply);
        _balances[msg.sender] = FHE.asEuint32(_initialSupply);
    }
}</pre>
            </div>

            <div class="warning">
                <strong>Important:</strong> Notice we use <code>euint32</code> for encrypted 32-bit integers. The events don't include amounts since they're encrypted - we only emit the addresses involved in the transaction.
            </div>

            <h2>Implement Core Token Functions</h2>

            <h3>Balance Query Function</h3>
            <p>Users need to be able to check their balance, but only they should be able to decrypt it:</p>

            <div class="code-block">
                <div class="code-title">Balance Functions</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>// Returns encrypted balance - only the owner can decrypt it
function balanceOf(address account) public view returns (euint32) {
    return _balances[account];
}

// Returns encrypted total supply
function totalSupply() public view returns (euint32) {
    return _totalSupply;
}

// Decrypt balance (requires proper permissions)
function getDecryptedBalance(address account) public view returns (uint32) {
    require(msg.sender == account || msg.sender == owner(), "Not authorized");
    return FHE.decrypt(_balances[account]);
}</pre>
            </div>

            <h3>Transfer Function</h3>
            <p>The core transfer function that maintains privacy while ensuring valid transfers:</p>

            <div class="code-block">
                <div class="code-title">Transfer Function</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>function transfer(address to, euint32 encryptedAmount) public returns (bool) {
    require(to != address(0), "Transfer to zero address");
    
    address from = msg.sender;
    
    // Check if sender has sufficient balance (encrypted comparison)
    ebool hasSufficientBalance = FHE.gte(_balances[from], encryptedAmount);
    require(FHE.decrypt(hasSufficientBalance), "Insufficient balance");
    
    // Perform the transfer
    _balances[from] = FHE.sub(_balances[from], encryptedAmount);
    _balances[to] = FHE.add(_balances[to], encryptedAmount);
    
    emit Transfer(from, to);
    return true;
}

// Helper function to transfer using plaintext amount (encrypted internally)
function transferPlain(address to, uint32 amount) public returns (bool) {
    euint32 encryptedAmount = FHE.asEuint32(amount);
    return transfer(to, encryptedAmount);
}</pre>
            </div>

            <div class="highlight">
                <strong>Key FHEVM Operations:</strong>
                <ul>
                    <li><code>FHE.gte()</code> - Greater than or equal comparison on encrypted values</li>
                    <li><code>FHE.sub()</code> - Subtraction on encrypted values</li>
                    <li><code>FHE.add()</code> - Addition on encrypted values</li>
                    <li><code>FHE.decrypt()</code> - Decrypt values when necessary</li>
                </ul>
            </div>

            <h3>Approval and TransferFrom Functions</h3>
            <p>Implement the standard ERC20 approval mechanism with encryption:</p>

            <div class="code-block">
                <div class="code-title">Approval Functions</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>function approve(address spender, euint32 encryptedAmount) public returns (bool) {
    require(spender != address(0), "Approve to zero address");
    
    _allowances[msg.sender][spender] = encryptedAmount;
    emit Approval(msg.sender, spender);
    return true;
}

function approvePlain(address spender, uint32 amount) public returns (bool) {
    euint32 encryptedAmount = FHE.asEuint32(amount);
    return approve(spender, encryptedAmount);
}

function allowance(address owner, address spender) public view returns (euint32) {
    return _allowances[owner][spender];
}

function transferFrom(
    address from,
    address to,
    euint32 encryptedAmount
) public returns (bool) {
    require(from != address(0), "Transfer from zero address");
    require(to != address(0), "Transfer to zero address");
    
    // Check allowance
    euint32 currentAllowance = _allowances[from][msg.sender];
    ebool hasAllowance = FHE.gte(currentAllowance, encryptedAmount);
    require(FHE.decrypt(hasAllowance), "Insufficient allowance");
    
    // Check balance
    ebool hasSufficientBalance = FHE.gte(_balances[from], encryptedAmount);
    require(FHE.decrypt(hasSufficientBalance), "Insufficient balance");
    
    // Update allowance
    _allowances[from][msg.sender] = FHE.sub(currentAllowance, encryptedAmount);
    
    // Perform transfer
    _balances[from] = FHE.sub(_balances[from], encryptedAmount);
    _balances[to] = FHE.add(_balances[to], encryptedAmount);
    
    emit Transfer(from, to);
    return true;
}</pre>
            </div>

            <h2>Minting and Burning Functions</h2>
            <p>Add functions for the contract owner to mint new tokens or burn existing ones:</p>

            <div class="code-block">
                <div class="code-title">Mint and Burn Functions</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>function mint(address to, uint32 amount) public onlyOwner {
    require(to != address(0), "Mint to zero address");
    
    euint32 encryptedAmount = FHE.asEuint32(amount);
    
    _totalSupply = FHE.add(_totalSupply, encryptedAmount);
    _balances[to] = FHE.add(_balances[to], encryptedAmount);
    
    emit Transfer(address(0), to);
}

function burn(uint32 amount) public {
    euint32 encryptedAmount = FHE.asEuint32(amount);
    
    // Check if user has sufficient balance
    ebool hasSufficientBalance = FHE.gte(_balances[msg.sender], encryptedAmount);
    require(FHE.decrypt(hasSufficientBalance), "Insufficient balance");
    
    _balances[msg.sender] = FHE.sub(_balances[msg.sender], encryptedAmount);
    _totalSupply = FHE.sub(_totalSupply, encryptedAmount);
    
    emit Transfer(msg.sender, address(0));
}</pre>
            </div>

            <h2>Complete Contract Code</h2>
            <p>Here's the complete confidential token contract:</p>

            <div class="code-block">
                <div class="code-title">Complete ConfidentialERC20.sol</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/solidity/contracts/FHE.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ConfidentialERC20 is Ownable {
    string public name;
    string public symbol;
    uint8 public decimals;
    
    euint32 private _totalSupply;
    mapping(address => euint32) private _balances;
    mapping(address => mapping(address => euint32)) private _allowances;
    
    event Transfer(address indexed from, address indexed to);
    event Approval(address indexed owner, address indexed spender);
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint32 _initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = 6;
        
        _totalSupply = FHE.asEuint32(_initialSupply);
        _balances[msg.sender] = FHE.asEuint32(_initialSupply);
    }
    
    function balanceOf(address account) public view returns (euint32) {
        return _balances[account];
    }
    
    function totalSupply() public view returns (euint32) {
        return _totalSupply;
    }
    
    function getDecryptedBalance(address account) public view returns (uint32) {
        require(msg.sender == account || msg.sender == owner(), "Not authorized");
        return FHE.decrypt(_balances[account]);
    }
    
    function transfer(address to, euint32 encryptedAmount) public returns (bool) {
        require(to != address(0), "Transfer to zero address");
        
        address from = msg.sender;
        ebool hasSufficientBalance = FHE.gte(_balances[from], encryptedAmount);
        require(FHE.decrypt(hasSufficientBalance), "Insufficient balance");
        
        _balances[from] = FHE.sub(_balances[from], encryptedAmount);
        _balances[to] = FHE.add(_balances[to], encryptedAmount);
        
        emit Transfer(from, to);
        return true;
    }
    
    function transferPlain(address to, uint32 amount) public returns (bool) {
        euint32 encryptedAmount = FHE.asEuint32(amount);
        return transfer(to, encryptedAmount);
    }
    
    function approve(address spender, euint32 encryptedAmount) public returns (bool) {
        require(spender != address(0), "Approve to zero address");
        
        _allowances[msg.sender][spender] = encryptedAmount;
        emit Approval(msg.sender, spender);
        return true;
    }
    
    function approvePlain(address spender, uint32 amount) public returns (bool) {
        euint32 encryptedAmount = FHE.asEuint32(amount);
        return approve(spender, encryptedAmount);
    }
    
    function allowance(address owner, address spender) public view returns (euint32) {
        return _allowances[owner][spender];
    }
    
    function transferFrom(
        address from,
        address to,
        euint32 encryptedAmount
    ) public returns (bool) {
        require(from != address(0), "Transfer from zero address");
        require(to != address(0), "Transfer to zero address");
        
        euint32 currentAllowance = _allowances[from][msg.sender];
        ebool hasAllowance = FHE.gte(currentAllowance, encryptedAmount);
        require(FHE.decrypt(hasAllowance), "Insufficient allowance");
        
        ebool hasSufficientBalance = FHE.gte(_balances[from], encryptedAmount);
        require(FHE.decrypt(hasSufficientBalance), "Insufficient balance");
        
        _allowances[from][msg.sender] = FHE.sub(currentAllowance, encryptedAmount);
        _balances[from] = FHE.sub(_balances[from], encryptedAmount);
        _balances[to] = FHE.add(_balances[to], encryptedAmount);
        
        emit Transfer(from, to);
        return true;
    }
    
    function mint(address to, uint32 amount) public onlyOwner {
        require(to != address(0), "Mint to zero address");
        
        euint32 encryptedAmount = FHE.asEuint32(amount);
        _totalSupply = FHE.add(_totalSupply, encryptedAmount);
        _balances[to] = FHE.add(_balances[to], encryptedAmount);
        
        emit Transfer(address(0), to);
    }
    
    function burn(uint32 amount) public {
        euint32 encryptedAmount = FHE.asEuint32(amount);
        
        ebool hasSufficientBalance = FHE.gte(_balances[msg.sender], encryptedAmount);
        require(FHE.decrypt(hasSufficientBalance), "Insufficient balance");
        
        _balances[msg.sender] = FHE.sub(_balances[msg.sender], encryptedAmount);
        _totalSupply = FHE.sub(_totalSupply, encryptedAmount);
        
        emit Transfer(msg.sender, address(0));
    }
}</pre>
            </div>

            <h2>Understanding the Encryption Flow</h2>

            <h3>Storage Process</h3>
            <ol>
                <li><strong>Input:</strong> Plain values (uint32) or pre-encrypted values (euint32)</li>
                <li><strong>Encryption:</strong> Use <code>FHE.asEuint32()</code> to convert plain to encrypted</li>
                <li><strong>Storage:</strong> Store encrypted values in contract state</li>
                <li><strong>Operations:</strong> Perform computations using FHE operations</li>
            </ol>

            <h3>Decryption Process</h3>
            <ol>
                <li><strong>Access Control:</strong> Verify caller is authorized to decrypt</li>
                <li><strong>Decryption:</strong> Use <code>FHE.decrypt()</code> to reveal the value</li>
                <li><strong>Return:</strong> Return the plain value to authorized caller</li>
            </ol>

            <div class="warning">
                <strong>Gas Considerations:</strong> FHE operations are more gas-intensive than regular operations. Always consider the trade-off between privacy and cost in your application design.
            </div>

            <h2>Testing Your Contract</h2>
            <p>Create a simple deployment script to test your confidential token:</p>

            <div class="code-block">
                <div class="code-title">scripts/deploy.js</div>
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>const hre = require("hardhat");

async function main() {
    const ConfidentialERC20 = await hre.ethers.getContractFactory("ConfidentialERC20");
    
    // Deploy with initial supply of 1,000,000 tokens
    const token = await ConfidentialERC20.deploy(
        "ConfidentialToken",
        "CONF",
        1000000
    );
    
    await token.deployed();
    
    console.log("ConfidentialERC20 deployed to:", token.address);
    
    // Test basic functionality
    const [owner, addr1] = await hre.ethers.getSigners();
    
    console.log("Owner balance:", await token.getDecryptedBalance(owner.address));
    
    // Transfer some tokens
    await token.transferPlain(addr1.address, 1000);
    console.log("After transfer - Addr1 balance:", await token.getDecryptedBalance(addr1.address));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });</pre>
            </div>

            <h2>Compile and Deploy</h2>
            <p>Compile and deploy your confidential token contract:</p>

            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npx hardhat compile
npx hardhat run scripts/deploy.js</pre>
            </div>

            <div class="success">
                <strong>Congratulations!</strong> You've successfully created a confidential token contract that maintains privacy while providing all the functionality of a standard ERC20 token. Users can now transfer tokens without revealing their balances or transaction amounts to the public.
            </div>

            <h2>Key Features Achieved</h2>
            <ul>
                <li>✅ <strong>Private Balances:</strong> Individual balances are encrypted and hidden</li>
                <li>✅ <strong>Confidential Transfers:</strong> Transfer amounts remain private</li>
                <li>✅ <strong>Access Control:</strong> Only authorized parties can decrypt balances</li>
                <li>✅ <strong>Standard Interface:</strong> Compatible with ERC20 patterns</li>
                <li>✅ <strong>FHE Operations:</strong> All computations happen on encrypted data</li>
            </ul>

            <h2>What's Next?</h2>
            <p>Now that you have a working confidential token, you can:</p>
            <ul>
                <li>Add more sophisticated access controls</li>
                <li>Implement confidential voting mechanisms</li>
                <li>Create private DeFi applications</li>
                <li>Build confidential NFT marketplaces</li>
                <li>Develop privacy-preserving DAOs</li>
            </ul>

            <div class="nav-buttons">
                <a href="#" class="nav-btn prev">← Previous: Environment Setup</a>
                <a href="#" class="nav-btn next">Next: Testing and Deployment →</a>
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
    </script>
</body>
</html>