# Environment Setup

Setting up your development environment for FHEVM is straightforward. In this chapter, we'll install all the necessary tools and create your first FHEVM project.

## Prerequisites

Before we begin, make sure you have:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- A code editor like **VS Code**

## Step 1: Install Node.js and npm

If you don't have Node.js installed:

### Windows
```bash
# Download from https://nodejs.org/
# Or use Chocolatey
choco install nodejs
```

### macOS
```bash
# Using Homebrew
brew install node
```

### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify installation:
```bash
node --version
npm --version
```

## Step 2: Install Hardhat

Hardhat is our development framework for FHEVM contracts:

```bash
npm install --global hardhat
```

## Step 3: Create Your FHEVM Project

Let's create a new project directory:

```bash
mkdir my-fhevm-project
cd my-fhevm-project
npm init -y
```

## Step 4: Install FHEVM Dependencies

Install the core FHEVM libraries:

```bash
# Core FHEVM library
npm install fhevm

# Development dependencies
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install --save-dev hardhat
```

## Step 5: Initialize Hardhat

Create a Hardhat configuration:

```bash
npx hardhat init
```

Choose:
- ✅ "Create a TypeScript project"
- ✅ Accept default project root
- ✅ Add a .gitignore
- ✅ Install dependencies

## Step 6: Configure Hardhat for FHEVM

Replace your `hardhat.config.ts` with:

```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
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
    // FHEVM Testnet configuration
    fhevmTestnet: {
      url: "https://devnet.zama.ai/",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 8009,
    },
    // Local development
    hardhat: {
      chainId: 1337,
    },
  },
};

export default config;
```

## Step 7: Set Up Environment Variables

Create a `.env` file in your project root:

```bash
# Your private key (never commit this!)
PRIVATE_KEY=your_private_key_here

# Optional: Etherscan API key for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key
```

Add `.env` to your `.gitignore`:

```bash
echo ".env" >> .gitignore
```

## Step 8: Install VS Code Extensions

For the best development experience, install these VS Code extensions:

- **Solidity** by Juan Blanco
- **Hardhat Solidity** by Nomic Foundation
- **GitLens** for Git integration
- **Prettier** for code formatting

## Step 9: Test Your Setup

Let's create a simple test to verify everything works:

Create `contracts/HelloFHEVM.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "fhevm/lib/TFHE.sol";

contract HelloFHEVM {
    euint32 private secretNumber;
    
    constructor(uint32 _initialValue) {
        secretNumber = TFHE.asEuint32(_initialValue);
    }
    
    function addToSecret(uint32 _value) public {
        secretNumber = TFHE.add(secretNumber, TFHE.asEuint32(_value));
    }
    
    function getSecret() public view returns (uint32) {
        return TFHE.decrypt(secretNumber);
    }
}
```

Compile the contract:

```bash
npx hardhat compile
```

If everything is set up correctly, you should see:
```
Compiled 1 Solidity file successfully
```

## Step 10: Project Structure

Your project should now look like this:

```
my-fhevm-project/
├── contracts/
│   └── HelloFHEVM.sol
├── scripts/
├── test/
├── hardhat.config.ts
├── package.json
├── .env
└── .gitignore
```

## Common Issues and Solutions

### Issue: "Cannot find module 'fhevm'"
**Solution**: Make sure you installed the fhevm package:
```bash
npm install fhevm
```

### Issue: Compilation errors
**Solution**: Ensure you're using Solidity version 0.8.19:
```typescript
solidity: {
  version: "0.8.19"
}
```

### Issue: Network connection problems
**Solution**: Check your internet connection and try:
```bash
npm config set registry https://registry.npmjs.org/
```

## Development Workflow

Now that your environment is set up, here's the typical development workflow:

1. **Write** your smart contracts in `contracts/`
2. **Compile** with `npx hardhat compile`
3. **Test** with `npx hardhat test`
4. **Deploy** with `npx hardhat run scripts/deploy.ts`
5. **Verify** on block explorer (optional)

## Next Steps

Congratulations! Your FHEVM development environment is ready. In the next chapter, we'll write our first confidential smart contract and explore the power of encrypted computations.

---

**Previous**: [← Introduction](01-introduction) | **Next**: [Writing Contracts →](03-writing-contract)