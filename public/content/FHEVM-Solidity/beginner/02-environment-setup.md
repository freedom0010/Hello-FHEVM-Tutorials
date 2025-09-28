<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Environment Setup - FHEVM Tutorial</title>
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
            max-width: 900px;
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
        
        ul {
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
        
        .warning {
            background: #fef5e7;
            border: 1px solid #f6ad55;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        
        .warning::before {
            content: "⚠️ ";
            font-size: 1.2rem;
        }
        
        .success {
            background: #f0fff4;
            border: 1px solid #68d391;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        
        .success::before {
            content: "✅ ";
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
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Environment Setup</h1>
            <p>Get your development environment ready for FHEVM programming</p>
        </div>
        
        <div class="content">
            <p>Before we start building privacy-preserving smart contracts, we need to set up our development environment. This chapter will guide you through installing all the necessary tools and dependencies.</p>

            <h2>Prerequisites</h2>
            <p>You'll need a computer running Windows, macOS, or Linux. We'll cover both local installation and GitHub Codespaces setup options.</p>

            <h2>Option 1: GitHub Codespaces (Recommended for Beginners)</h2>
            <p>GitHub Codespaces provides a cloud-based development environment that's perfect for getting started quickly without installing anything locally.</p>

            <div class="step">
                <span class="step-number">1</span>
                <span class="step-title">Create a New Repository</span>
                <p>Go to GitHub and create a new repository for your FHEVM project, or use the template repository if available.</p>
            </div>

            <div class="step">
                <span class="step-number">2</span>
                <span class="step-title">Launch Codespaces</span>
                <p>Click the green "Code" button and select "Create codespace on main". GitHub will set up a Ubuntu environment with Node.js pre-installed.</p>
            </div>

            <div class="success">
                <strong>Codespaces Benefits:</strong> No local setup required, consistent environment, pre-configured with development tools, and accessible from any device with a web browser.
            </div>

            <h2>Option 2: Local Environment Setup</h2>

            <h3>Step 1: Install Node.js and npm</h3>
            <p>Node.js is a JavaScript runtime that includes npm (Node Package Manager) for managing dependencies.</p>

            <h4>For Windows:</h4>
            <p>Download the LTS version from <a href="https://nodejs.org" target="_blank">nodejs.org</a> and run the installer, or use Chocolatey:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>choco install nodejs</pre>
            </div>

            <h4>For macOS:</h4>
            <p>Download from nodejs.org or use Homebrew:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>brew install node</pre>
            </div>

            <h4>For Linux (Ubuntu/Debian):</h4>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs</pre>
            </div>

            <h4>Verify Installation:</h4>
            <p>Check that Node.js and npm are installed correctly:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>node --version
npm --version</pre>
            </div>

            <div class="warning">
                <strong>Version Requirements:</strong> Make sure you have Node.js version 16 or higher. FHEVM tools require modern JavaScript features.
            </div>

            <h3>Step 2: Create Your Project Directory</h3>
            <p>Create a new directory for your FHEVM project:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>mkdir my-fhevm-project
cd my-fhevm-project</pre>
            </div>

            <h3>Step 3: Initialize npm Project</h3>
            <p>Initialize a new npm project with default settings:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npm init -y</pre>
            </div>

            <h2>Install Hardhat Framework</h2>
            <p>Hardhat is a development environment for Ethereum and FHEVM smart contracts. It provides tools for compiling, testing, and deploying contracts.</p>

            <h3>Install Hardhat and Dependencies</h3>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox</pre>
            </div>

            <h3>Initialize Hardhat Project</h3>
            <p>Run the Hardhat initialization command and select "Create a JavaScript project":</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npx hardhat</pre>
            </div>

            <div class="warning">
                <strong>Interactive Setup:</strong> Hardhat will ask you several questions. Choose "Create a JavaScript project" and accept the default options for a basic setup.
            </div>

            <h2>Install FHEVM Solidity Library</h2>
            <p>The @fhevm/solidity package provides the essential tools and types for writing FHEVM smart contracts.</p>

            <h3>Install FHEVM Package</h3>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npm install @fhevm/solidity</pre>
            </div>

            <h3>Install Additional FHEVM Dependencies</h3>
            <p>Install additional packages needed for FHEVM development:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npm install --save-dev @fhevm/hardhat-plugin @fhevm/cli</pre>
            </div>

            <h2>Verify Your Installation</h2>
            <p>Let's verify that everything is installed correctly by checking the project structure and running a test compilation.</p>

            <h3>Check Project Structure</h3>
            <p>Your project directory should now look like this:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>ls -la</pre>
            </div>

            <p>You should see:</p>
            <ul>
                <li><code>contracts/</code> - Directory for your smart contracts</li>
                <li><code>scripts/</code> - Deployment and utility scripts</li>
                <li><code>test/</code> - Test files</li>
                <li><code>hardhat.config.js</code> - Hardhat configuration</li>
                <li><code>package.json</code> - Project dependencies</li>
                <li><code>node_modules/</code> - Installed packages</li>
            </ul>

            <h3>Test Hardhat Installation</h3>
            <p>Compile the example contracts to verify everything works:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npx hardhat compile</pre>
            </div>

            <h3>Run Sample Tests</h3>
            <p>Run the default tests to ensure the environment is working:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>npx hardhat test</pre>
            </div>

            <div class="success">
                <strong>Success!</strong> If you see compilation completed without errors and tests pass, your FHEVM development environment is ready to go!
            </div>

            <h2>Configure Hardhat for FHEVM</h2>
            <p>Update your <code>hardhat.config.js</code> file to include FHEVM plugin:</p>
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                <pre>require("@nomicfoundation/hardhat-toolbox");
require("@fhevm/hardhat-plugin");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      // FHEVM local network configuration
    }
  }
};</pre>
            </div>

            <h2>What's Next?</h2>
            <p>Congratulations! You now have a complete FHEVM development environment set up. You're ready to:</p>
            <ul>
                <li>Write your first FHEVM smart contract</li>
                <li>Learn about encrypted data types (euint32, ebool, etc.)</li>
                <li>Explore FHEVM operations and functions</li>
                <li>Deploy contracts to FHEVM networks</li>
            </ul>

            <div class="warning">
                <strong>Keep Your Environment Updated:</strong> FHEVM is actively developed. Check for updates regularly with <code>npm update</code> to get the latest features and security patches.
            </div>

            <div class="nav-buttons">
                <a href="#" class="nav-btn prev">← Previous: Introduction to FHEVM</a>
                <a href="#" class="nav-btn next">Next: Your First FHEVM Contract →</a>
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
                // Fallback for older browsers
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
    </script>
</body>
</html>