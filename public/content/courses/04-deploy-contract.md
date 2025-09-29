# Deploying Your FHEVM Contract

Now that we've written our confidential token contract, it's time to deploy it to the FHEVM testnet and see it in action! This chapter covers deployment, verification, and initial testing.

## Deployment Script

First, let's create a deployment script. Create `scripts/deploy.ts`:

```typescript
import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting FHEVM Contract Deployment...");
  
  // Get the contract factory
  const ConfidentialToken = await ethers.getContractFactory("ConfidentialToken");
  
  // Deploy with 1 million initial tokens
  const initialSupply = 1000000;
  console.log(`📝 Deploying ConfidentialToken with ${initialSupply} initial supply...`);
  
  const token = await ConfidentialToken.deploy(initialSupply);
  await token.deployed();
  
  console.log("✅ ConfidentialToken deployed successfully!");
  console.log(`📍 Contract Address: ${token.address}`);
  console.log(`🔗 Transaction Hash: ${token.deployTransaction.hash}`);
  
  // Wait for a few confirmations
  console.log("⏳ Waiting for confirmations...");
  await token.deployTransaction.wait(3);
  
  console.log("🎉 Deployment completed!");
  
  // Display contract info
  console.log("\n📊 Contract Information:");
  console.log(`Name: ${await token.name()}`);
  console.log(`Symbol: ${await token.symbol()}`);
  console.log(`Total Supply: ${await token.totalSupply()}`);
  console.log(`Owner: ${await token.owner()}`);
  
  return token.address;
}

main()
  .then((address) => {
    console.log(`\n🎯 Save this address: ${address}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
```

## Local Deployment (Testing)

First, let's test our deployment locally:

```bash
# Start local Hardhat network
npx hardhat node
```

In another terminal, deploy to local network:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

You should see output like:
```
🚀 Starting FHEVM Contract Deployment...
📝 Deploying ConfidentialToken with 1000000 initial supply...
✅ ConfidentialToken deployed successfully!
📍 Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## FHEVM Testnet Deployment

### Step 1: Get Testnet Tokens

Visit the FHEVM testnet faucet:
- **Faucet URL**: https://faucet.zama.ai/
- Request test tokens for your wallet address
- Wait for confirmation (usually takes 1-2 minutes)

### Step 2: Configure Your Private Key

Add your private key to `.env`:

```bash
# Replace with your actual private key (never share this!)
PRIVATE_KEY=0x1234567890abcdef...
```

⚠️ **Security Warning**: Never commit your private key to version control!

### Step 3: Deploy to Testnet

```bash
npx hardhat run scripts/deploy.ts --network fhevmTestnet
```

## Verification Script

Create `scripts/verify.ts` to verify your contract:

```typescript
import { ethers } from "hardhat";

async function main() {
  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
  const initialSupply = 1000000;
  
  console.log("🔍 Verifying contract...");
  
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [initialSupply],
    });
    console.log("✅ Contract verified successfully!");
  } catch (error) {
    console.error("❌ Verification failed:", error);
  }
}

main().catch(console.error);
```

## Interaction Script

Let's create a script to interact with our deployed contract. Create `scripts/interact.ts`:

```typescript
import { ethers } from "hardhat";

async function main() {
  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
  
  // Get contract instance
  const ConfidentialToken = await ethers.getContractFactory("ConfidentialToken");
  const token = ConfidentialToken.attach(contractAddress);
  
  // Get signers
  const [owner, user1, user2] = await ethers.getSigners();
  
  console.log("🔗 Interacting with ConfidentialToken at:", contractAddress);
  console.log("👤 Owner:", owner.address);
  console.log("👤 User1:", user1.address);
  console.log("👤 User2:", user2.address);
  
  // Check initial balance
  console.log("\n📊 Initial State:");
  const ownerBalance = await token.getMyBalance();
  console.log(`Owner balance: ${ownerBalance}`);
  
  // Transfer tokens to user1
  console.log("\n💸 Transferring 1000 tokens to user1...");
  const transferTx = await token.transfer(user1.address, 1000);
  await transferTx.wait();
  console.log("✅ Transfer completed!");
  
  // Check balances after transfer
  console.log("\n📊 After Transfer:");
  const newOwnerBalance = await token.getMyBalance();
  const user1Balance = await token.connect(user1).getMyBalance();
  
  console.log(`Owner balance: ${newOwnerBalance}`);
  console.log(`User1 balance: ${user1Balance}`);
  
  // Test approval and transferFrom
  console.log("\n🔐 Testing approval mechanism...");
  const approveTx = await token.approve(user1.address, 500);
  await approveTx.wait();
  console.log("✅ Approval granted!");
  
  // User1 transfers from owner to user2
  console.log("💸 User1 transferring 300 tokens from owner to user2...");
  const transferFromTx = await token.connect(user1).transferFrom(owner.address, user2.address, 300);
  await transferFromTx.wait();
  console.log("✅ TransferFrom completed!");
  
  // Final balances
  console.log("\n📊 Final Balances:");
  console.log(`Owner balance: ${await token.getMyBalance()}`);
  console.log(`User1 balance: ${await token.connect(user1).getMyBalance()}`);
  console.log(`User2 balance: ${await token.connect(user2).getMyBalance()}`);
  
  // Check remaining allowance
  const remainingAllowance = await token.getAllowance(user1.address);
  console.log(`Remaining allowance for user1: ${remainingAllowance}`);
}

main().catch(console.error);
```

Run the interaction script:

```bash
npx hardhat run scripts/interact.ts --network fhevmTestnet
```

## Gas Optimization Tips

FHEVM operations are more expensive than regular EVM operations. Here are optimization strategies:

### 1. Batch Operations
```solidity
// Instead of multiple transfers
function batchTransfer(address[] memory recipients, uint64[] memory amounts) public {
    require(recipients.length == amounts.length, "Arrays length mismatch");
    
    for (uint i = 0; i < recipients.length; i++) {
        _transfer(msg.sender, recipients[i], amounts[i]);
    }
}
```

### 2. Cache Encrypted Values
```solidity
// ❌ Bad: Multiple reads
function inefficientFunction(uint64 amount) public {
    require(TFHE.decrypt(TFHE.le(TFHE.asEuint64(amount), balances[msg.sender])), "Insufficient");
    balances[msg.sender] = TFHE.sub(balances[msg.sender], TFHE.asEuint64(amount));
}

// ✅ Good: Cache values
function efficientFunction(uint64 amount) public {
    euint64 encryptedAmount = TFHE.asEuint64(amount);
    euint64 currentBalance = balances[msg.sender];
    
    require(TFHE.decrypt(TFHE.le(encryptedAmount, currentBalance)), "Insufficient");
    balances[msg.sender] = TFHE.sub(currentBalance, encryptedAmount);
}
```

### 3. Minimize Decryption
```solidity
// Only decrypt for essential business logic
ebool canProceed = TFHE.and(condition1, condition2);
require(TFHE.decrypt(canProceed), "Conditions not met");
```

## Monitoring Your Contract

### Using Block Explorer

Visit the FHEVM testnet explorer:
- **Explorer URL**: https://explorer.zama.ai/
- Search for your contract address
- View transactions and events

### Event Monitoring Script

Create `scripts/monitor.ts`:

```typescript
import { ethers } from "hardhat";

async function main() {
  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
  const ConfidentialToken = await ethers.getContractFactory("ConfidentialToken");
  const token = ConfidentialToken.attach(contractAddress);
  
  console.log("👀 Monitoring contract events...");
  
  // Listen for Transfer events
  token.on("Transfer", (from, to, encryptedAmount, event) => {
    console.log(`\n💸 Transfer Event:`);
    console.log(`From: ${from}`);
    console.log(`To: ${to}`);
    console.log(`Encrypted Amount: ${encryptedAmount}`);
    console.log(`Block: ${event.blockNumber}`);
  });
  
  // Listen for Approval events
  token.on("Approval", (owner, spender, encryptedAmount, event) => {
    console.log(`\n🔐 Approval Event:`);
    console.log(`Owner: ${owner}`);
    console.log(`Spender: ${spender}`);
    console.log(`Encrypted Amount: ${encryptedAmount}`);
    console.log(`Block: ${event.blockNumber}`);
  });
  
  console.log("✅ Event monitoring started. Press Ctrl+C to stop.");
}

main().catch(console.error);
```

## Troubleshooting Common Issues

### Issue: "Insufficient funds for gas"
**Solution**: Make sure you have enough testnet tokens:
```bash
# Check your balance
npx hardhat run scripts/checkBalance.ts --network fhevmTestnet
```

### Issue: "Nonce too high"
**Solution**: Reset your account nonce:
```bash
# In MetaMask: Settings > Advanced > Reset Account
```

### Issue: "Contract not verified"
**Solution**: Run the verification script:
```bash
npx hardhat run scripts/verify.ts --network fhevmTestnet
```

### Issue: "Transaction reverted"
**Solution**: Check the revert reason:
```typescript
try {
  const tx = await token.transfer(recipient, amount);
  await tx.wait();
} catch (error) {
  console.error("Transaction failed:", error.reason);
}
```

## Production Deployment Checklist

Before deploying to mainnet:

- [ ] ✅ All tests pass
- [ ] ✅ Contract audited by security experts
- [ ] ✅ Gas costs optimized
- [ ] ✅ Access controls properly implemented
- [ ] ✅ Emergency pause mechanism (if needed)
- [ ] ✅ Upgrade mechanism (if needed)
- [ ] ✅ Documentation complete

## What's Next?

Congratulations! Your confidential token is now live on the FHEVM testnet. In the next chapter, we'll explore encryption and decryption patterns, and learn how to handle more complex privacy scenarios.

Key achievements:
- ✅ Successfully deployed to FHEVM testnet
- ✅ Verified contract on block explorer
- ✅ Tested all major functions
- ✅ Set up monitoring and interaction scripts

---

**Previous**: [← Writing Contracts](03-writing-contract) | **Next**: [Encryption & Decryption →](05-encryption-decryption)