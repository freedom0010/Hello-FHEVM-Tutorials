# Writing a Confidential Token Contract

Now that your environment is set up, let's create something exciting: a confidential ERC20 token where balances are completely private! This chapter will teach you the fundamentals of writing FHEVM smart contracts.

## Understanding Encrypted Types

FHEVM introduces new data types for encrypted values:

- `euint8` - Encrypted 8-bit unsigned integer (0 to 255)
- `euint16` - Encrypted 16-bit unsigned integer (0 to 65,535)
- `euint32` - Encrypted 32-bit unsigned integer (0 to 4,294,967,295)
- `euint64` - Encrypted 64-bit unsigned integer
- `ebool` - Encrypted boolean (true/false)
- `eaddress` - Encrypted Ethereum address

## Our Confidential Token Contract

Let's build a token where:
- ✅ Balances are completely private
- ✅ Only the owner can see their balance
- ✅ Transfer amounts are hidden
- ✅ Total supply remains public for transparency

Create `contracts/ConfidentialToken.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "fhevm/lib/TFHE.sol";

contract ConfidentialToken {
    // Public token information
    string public name = "Confidential Token";
    string public symbol = "CTOKEN";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    // Owner of the contract
    address public owner;
    
    // Encrypted balances - completely private!
    mapping(address => euint64) private balances;
    
    // Encrypted allowances for spending
    mapping(address => mapping(address => euint64)) private allowances;
    
    // Events (amounts are encrypted, so we emit encrypted values)
    event Transfer(address indexed from, address indexed to, bytes encryptedAmount);
    event Approval(address indexed owner, address indexed spender, bytes encryptedAmount);
    
    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        totalSupply = _initialSupply;
        
        // Give all initial tokens to the contract creator
        // Convert to encrypted value
        balances[msg.sender] = TFHE.asEuint64(_initialSupply);
    }
    
    // Get your own balance (decrypted)
    function getMyBalance() public view returns (uint64) {
        return TFHE.decrypt(balances[msg.sender]);
    }
    
    // Get encrypted balance (for composability with other contracts)
    function getEncryptedBalance(address account) public view returns (euint64) {
        require(msg.sender == account || msg.sender == owner, "Not authorized");
        return balances[account];
    }
    
    // Transfer tokens confidentially
    function transfer(address to, uint64 amount) public returns (bool) {
        return _transfer(msg.sender, to, amount);
    }
    
    // Internal transfer function
    function _transfer(address from, address to, uint64 amount) internal returns (bool) {
        require(to != address(0), "Transfer to zero address");
        
        euint64 encryptedAmount = TFHE.asEuint64(amount);
        
        // Check if sender has enough balance
        ebool hasEnoughBalance = TFHE.le(encryptedAmount, balances[from]);
        require(TFHE.decrypt(hasEnoughBalance), "Insufficient balance");
        
        // Perform the transfer
        balances[from] = TFHE.sub(balances[from], encryptedAmount);
        balances[to] = TFHE.add(balances[to], encryptedAmount);
        
        // Emit event with encrypted amount
        emit Transfer(from, to, TFHE.reencrypt(encryptedAmount, to));
        
        return true;
    }
    
    // Approve spending allowance
    function approve(address spender, uint64 amount) public returns (bool) {
        euint64 encryptedAmount = TFHE.asEuint64(amount);
        allowances[msg.sender][spender] = encryptedAmount;
        
        emit Approval(msg.sender, spender, TFHE.reencrypt(encryptedAmount, spender));
        return true;
    }
    
    // Transfer from allowance
    function transferFrom(address from, address to, uint64 amount) public returns (bool) {
        euint64 encryptedAmount = TFHE.asEuint64(amount);
        
        // Check allowance
        ebool hasEnoughAllowance = TFHE.le(encryptedAmount, allowances[from][msg.sender]);
        require(TFHE.decrypt(hasEnoughAllowance), "Insufficient allowance");
        
        // Reduce allowance
        allowances[from][msg.sender] = TFHE.sub(allowances[from][msg.sender], encryptedAmount);
        
        // Perform transfer
        return _transfer(from, to, amount);
    }
    
    // Get your allowance for a spender
    function getAllowance(address spender) public view returns (uint64) {
        return TFHE.decrypt(allowances[msg.sender][spender]);
    }
    
    // Mint new tokens (only owner)
    function mint(address to, uint64 amount) public {
        require(msg.sender == owner, "Only owner can mint");
        require(to != address(0), "Mint to zero address");
        
        euint64 encryptedAmount = TFHE.asEuint64(amount);
        balances[to] = TFHE.add(balances[to], encryptedAmount);
        totalSupply += amount;
        
        emit Transfer(address(0), to, TFHE.reencrypt(encryptedAmount, to));
    }
    
    // Burn tokens from your own balance
    function burn(uint64 amount) public {
        euint64 encryptedAmount = TFHE.asEuint64(amount);
        
        // Check balance
        ebool hasEnoughBalance = TFHE.le(encryptedAmount, balances[msg.sender]);
        require(TFHE.decrypt(hasEnoughBalance), "Insufficient balance to burn");
        
        balances[msg.sender] = TFHE.sub(balances[msg.sender], encryptedAmount);
        totalSupply -= amount;
        
        emit Transfer(msg.sender, address(0), TFHE.reencrypt(encryptedAmount, msg.sender));
    }
}
```

## Key FHEVM Concepts Explained

### 1. Encrypted Operations
```solidity
// Addition
euint64 result = TFHE.add(a, b);

// Subtraction  
euint64 result = TFHE.sub(a, b);

// Comparison (returns encrypted boolean)
ebool isLessOrEqual = TFHE.le(a, b);

// Convert plaintext to encrypted
euint64 encrypted = TFHE.asEuint64(plainValue);
```

### 2. Decryption
```solidity
// Decrypt for viewing (expensive operation!)
uint64 plainValue = TFHE.decrypt(encryptedValue);

// Only decrypt when necessary for business logic
require(TFHE.decrypt(hasEnoughBalance), "Insufficient balance");
```

### 3. Re-encryption for Sharing
```solidity
// Re-encrypt data for a specific address
bytes memory reencrypted = TFHE.reencrypt(encryptedValue, targetAddress);
```

## Testing Your Contract

Create `test/ConfidentialToken.test.ts`:

```typescript
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ConfidentialToken", function () {
  let token: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const ConfidentialToken = await ethers.getContractFactory("ConfidentialToken");
    token = await ConfidentialToken.deploy(1000000); // 1M tokens
    await token.deployed();
  });

  it("Should have correct initial supply", async function () {
    expect(await token.totalSupply()).to.equal(1000000);
  });

  it("Should give all tokens to owner initially", async function () {
    expect(await token.getMyBalance()).to.equal(1000000);
  });

  it("Should transfer tokens confidentially", async function () {
    await token.transfer(addr1.address, 1000);
    
    // Owner should have less tokens
    expect(await token.getMyBalance()).to.equal(999000);
    
    // Recipient should have tokens (they can check their own balance)
    expect(await token.connect(addr1).getMyBalance()).to.equal(1000);
  });

  it("Should handle approvals and transferFrom", async function () {
    // Owner approves addr1 to spend 500 tokens
    await token.approve(addr1.address, 500);
    
    // addr1 transfers from owner to addr2
    await token.connect(addr1).transferFrom(owner.address, addr2.address, 300);
    
    // Check balances
    expect(await token.getMyBalance()).to.equal(999700);
    expect(await token.connect(addr2).getMyBalance()).to.equal(300);
    
    // Check remaining allowance
    expect(await token.getAllowance(addr1.address)).to.equal(200);
  });
});
```

Run the tests:
```bash
npx hardhat test
```

## Security Considerations

### 1. Access Control
```solidity
// Always verify who can decrypt data
function getEncryptedBalance(address account) public view returns (euint64) {
    require(msg.sender == account || msg.sender == owner, "Not authorized");
    return balances[account];
}
```

### 2. Minimize Decryption
```solidity
// ❌ Bad: Unnecessary decryption
uint64 balance = TFHE.decrypt(balances[msg.sender]);
if (balance >= amount) { ... }

// ✅ Good: Keep operations encrypted
ebool hasEnough = TFHE.le(TFHE.asEuint64(amount), balances[msg.sender]);
require(TFHE.decrypt(hasEnough), "Insufficient balance");
```

### 3. Gas Optimization
- Encrypted operations are more expensive than regular operations
- Batch operations when possible
- Cache encrypted values if used multiple times

## Advanced Features

### Conditional Transfers
```solidity
function conditionalTransfer(address to, uint64 amount, uint64 minBalance) public {
    ebool hasMinBalance = TFHE.le(TFHE.asEuint64(minBalance), balances[msg.sender]);
    ebool hasEnoughForTransfer = TFHE.le(TFHE.asEuint64(amount), balances[msg.sender]);
    
    ebool canTransfer = TFHE.and(hasMinBalance, hasEnoughForTransfer);
    require(TFHE.decrypt(canTransfer), "Conditions not met");
    
    _transfer(msg.sender, to, amount);
}
```

### Private Voting with Tokens
```solidity
mapping(uint256 => euint64) private votes; // proposalId => encrypted vote count

function vote(uint256 proposalId, uint64 tokenAmount) public {
    // Use tokens as voting weight, but keep votes private
    votes[proposalId] = TFHE.add(votes[proposalId], TFHE.asEuint64(tokenAmount));
}
```

## What's Next?

You've just created a fully confidential token! In the next chapter, we'll learn how to deploy this contract to the FHEVM testnet and interact with it.

Key takeaways:
- ✅ Encrypted types keep data private
- ✅ TFHE library provides encrypted operations
- ✅ Only decrypt when absolutely necessary
- ✅ Re-encryption allows secure data sharing

---

**Previous**: [← Environment Setup](02-environment-setup) | **Next**: [Deploy Contract →](04-deploy-contract)