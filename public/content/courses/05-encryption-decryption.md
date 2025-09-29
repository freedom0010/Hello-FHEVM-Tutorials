# Encryption and Decryption Patterns

Understanding when and how to encrypt, decrypt, and re-encrypt data is crucial for building secure and efficient FHEVM applications. This chapter explores advanced patterns and best practices.

## Understanding FHEVM Encryption Lifecycle

### 1. Plaintext → Encrypted (Encryption)
```solidity
// Convert plaintext to encrypted
euint32 encrypted = TFHE.asEuint32(42);
ebool encryptedBool = TFHE.asEbool(true);
```

### 2. Encrypted → Plaintext (Decryption)
```solidity
// Decrypt for business logic (expensive!)
uint32 plaintext = TFHE.decrypt(encrypted);
bool plainBool = TFHE.decrypt(encryptedBool);
```

### 3. Encrypted → Re-encrypted (Sharing)
```solidity
// Re-encrypt for another address
bytes memory reencrypted = TFHE.reencrypt(encrypted, targetAddress);
```

## Access Control Patterns

### Pattern 1: Owner-Only Decryption
```solidity
contract PrivateVault {
    address public owner;
    euint64 private secretValue;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    function getSecretValue() public view onlyOwner returns (uint64) {
        return TFHE.decrypt(secretValue);
    }
    
    function getEncryptedValue() public view onlyOwner returns (euint64) {
        return secretValue;
    }
}
```

### Pattern 2: Self-Access Only
```solidity
contract PersonalWallet {
    mapping(address => euint64) private balances;
    
    function getMyBalance() public view returns (uint64) {
        return TFHE.decrypt(balances[msg.sender]);
    }
    
    function getMyEncryptedBalance() public view returns (euint64) {
        return balances[msg.sender];
    }
}
```

### Pattern 3: Conditional Access
```solidity
contract ConditionalAccess {
    mapping(address => euint64) private data;
    mapping(address => bool) public authorized;
    
    function getData() public view returns (uint64) {
        require(authorized[msg.sender], "Not authorized");
        return TFHE.decrypt(data[msg.sender]);
    }
}
```

## Advanced Encryption Patterns

### Encrypted Input Validation

```solidity
contract SecureAuction {
    struct Bid {
        euint64 amount;
        address bidder;
        bool revealed;
    }
    
    mapping(uint256 => Bid[]) public bids;
    euint64 public minimumBid;
    
    function placeBid(uint256 auctionId, uint64 bidAmount) public {
        euint64 encryptedBid = TFHE.asEuint64(bidAmount);
        
        // Validate bid meets minimum (without revealing amount)
        ebool isValidBid = TFHE.le(minimumBid, encryptedBid);
        require(TFHE.decrypt(isValidBid), "Bid too low");
        
        bids[auctionId].push(Bid({
            amount: encryptedBid,
            bidder: msg.sender,
            revealed: false
        }));
    }
    
    function revealBid(uint256 auctionId, uint256 bidIndex) public {
        Bid storage bid = bids[auctionId][bidIndex];
        require(bid.bidder == msg.sender, "Not your bid");
        require(!bid.revealed, "Already revealed");
        
        // Only the bidder can decrypt their own bid
        uint64 amount = TFHE.decrypt(bid.amount);
        bid.revealed = true;
        
        emit BidRevealed(auctionId, msg.sender, amount);
    }
}
```

### Encrypted Comparisons

```solidity
contract PrivateComparison {
    function compareSecretNumbers(uint64 a, uint64 b) public pure returns (bool) {
        euint64 encA = TFHE.asEuint64(a);
        euint64 encB = TFHE.asEuint64(b);
        
        // Compare without revealing the numbers
        ebool aIsGreater = TFHE.lt(encB, encA);
        return TFHE.decrypt(aIsGreater);
    }
    
    function findMax(uint64[] memory numbers) public pure returns (uint64) {
        require(numbers.length > 0, "Empty array");
        
        euint64 max = TFHE.asEuint64(numbers[0]);
        
        for (uint i = 1; i < numbers.length; i++) {
            euint64 current = TFHE.asEuint64(numbers[i]);
            ebool currentIsGreater = TFHE.lt(max, current);
            
            // Conditional assignment: max = currentIsGreater ? current : max
            max = TFHE.cmux(currentIsGreater, current, max);
        }
        
        return TFHE.decrypt(max);
    }
}
```

### Encrypted State Machines

```solidity
contract PrivateStateMachine {
    enum State { Pending, Active, Completed, Cancelled }
    
    struct PrivateProcess {
        euint8 state;  // Encrypted state
        euint64 value;
        address owner;
    }
    
    mapping(uint256 => PrivateProcess) private processes;
    uint256 private nextId;
    
    function createProcess(uint64 initialValue) public returns (uint256) {
        uint256 id = nextId++;
        
        processes[id] = PrivateProcess({
            state: TFHE.asEuint8(uint8(State.Pending)),
            value: TFHE.asEuint64(initialValue),
            owner: msg.sender
        });
        
        return id;
    }
    
    function advanceState(uint256 processId) public {
        PrivateProcess storage process = processes[processId];
        require(process.owner == msg.sender, "Not owner");
        
        euint8 currentState = process.state;
        euint8 pendingState = TFHE.asEuint8(uint8(State.Pending));
        euint8 activeState = TFHE.asEuint8(uint8(State.Active));
        euint8 completedState = TFHE.asEuint8(uint8(State.Completed));
        
        // If current state is Pending, move to Active
        ebool isPending = TFHE.eq(currentState, pendingState);
        euint8 newState = TFHE.cmux(isPending, activeState, currentState);
        
        // If current state is Active, move to Completed
        ebool isActive = TFHE.eq(currentState, activeState);
        newState = TFHE.cmux(isActive, completedState, newState);
        
        process.state = newState;
    }
    
    function getProcessState(uint256 processId) public view returns (uint8) {
        PrivateProcess storage process = processes[processId];
        require(process.owner == msg.sender, "Not owner");
        
        return TFHE.decrypt(process.state);
    }
}
```

## Re-encryption for Data Sharing

### Secure Data Sharing Contract

```solidity
contract SecureDataSharing {
    struct SharedData {
        euint64 value;
        address owner;
        mapping(address => bool) authorized;
    }
    
    mapping(uint256 => SharedData) private dataStore;
    uint256 private nextId;
    
    function storeData(uint64 value) public returns (uint256) {
        uint256 id = nextId++;
        
        dataStore[id].value = TFHE.asEuint64(value);
        dataStore[id].owner = msg.sender;
        
        return id;
    }
    
    function authorizeAccess(uint256 dataId, address user) public {
        require(dataStore[dataId].owner == msg.sender, "Not owner");
        dataStore[dataId].authorized[user] = true;
    }
    
    function revokeAccess(uint256 dataId, address user) public {
        require(dataStore[dataId].owner == msg.sender, "Not owner");
        dataStore[dataId].authorized[user] = false;
    }
    
    function getSharedData(uint256 dataId) public view returns (bytes memory) {
        SharedData storage data = dataStore[dataId];
        require(
            data.owner == msg.sender || data.authorized[msg.sender],
            "Not authorized"
        );
        
        // Re-encrypt for the requesting user
        return TFHE.reencrypt(data.value, msg.sender);
    }
    
    function decryptMyData(uint256 dataId) public view returns (uint64) {
        SharedData storage data = dataStore[dataId];
        require(data.owner == msg.sender, "Not owner");
        
        return TFHE.decrypt(data.value);
    }
}
```

## Performance Optimization Patterns

### 1. Lazy Decryption
```solidity
contract LazyDecryption {
    euint64 private encryptedValue;
    uint64 private cachedValue;
    bool private isCached;
    
    function getValue() public returns (uint64) {
        if (!isCached) {
            cachedValue = TFHE.decrypt(encryptedValue);
            isCached = true;
        }
        return cachedValue;
    }
    
    function updateValue(uint64 newValue) public {
        encryptedValue = TFHE.asEuint64(newValue);
        isCached = false; // Invalidate cache
    }
}
```

### 2. Batch Processing
```solidity
contract BatchProcessor {
    euint64[] private values;
    
    function batchProcess(uint64[] memory inputs) public returns (uint64) {
        euint64 sum = TFHE.asEuint64(0);
        
        // Process all inputs in encrypted form
        for (uint i = 0; i < inputs.length; i++) {
            euint64 encrypted = TFHE.asEuint64(inputs[i]);
            sum = TFHE.add(sum, encrypted);
        }
        
        // Only decrypt the final result
        return TFHE.decrypt(sum);
    }
}
```

### 3. Conditional Execution
```solidity
contract ConditionalExecution {
    function conditionalTransfer(
        address to,
        uint64 amount,
        uint64 minBalance
    ) public {
        euint64 balance = getEncryptedBalance(msg.sender);
        euint64 encAmount = TFHE.asEuint64(amount);
        euint64 encMinBalance = TFHE.asEuint64(minBalance);
        
        // Check conditions without decryption
        ebool hasMinBalance = TFHE.le(encMinBalance, balance);
        ebool hasEnoughForTransfer = TFHE.le(encAmount, balance);
        ebool canTransfer = TFHE.and(hasMinBalance, hasEnoughForTransfer);
        
        // Only decrypt the final boolean
        require(TFHE.decrypt(canTransfer), "Conditions not met");
        
        // Proceed with transfer
        _transfer(msg.sender, to, amount);
    }
}
```

## Security Best Practices

### 1. Input Validation
```solidity
function secureFunction(uint64 input) public {
    // Validate input range before encryption
    require(input > 0 && input <= MAX_VALUE, "Invalid input");
    
    euint64 encrypted = TFHE.asEuint64(input);
    // ... rest of function
}
```

### 2. Access Control
```solidity
modifier canDecrypt(uint256 dataId) {
    require(
        isOwner(dataId, msg.sender) || isAuthorized(dataId, msg.sender),
        "Cannot decrypt"
    );
    _;
}
```

### 3. Prevent Information Leakage
```solidity
// ❌ Bad: Reveals information through revert messages
function badFunction(uint64 amount) public {
    uint64 balance = TFHE.decrypt(getBalance(msg.sender));
    require(balance >= amount, string(abi.encodePacked("Need ", balance - amount, " more")));
}

// ✅ Good: Generic error messages
function goodFunction(uint64 amount) public {
    ebool hasEnough = TFHE.le(TFHE.asEuint64(amount), getBalance(msg.sender));
    require(TFHE.decrypt(hasEnough), "Insufficient balance");
}
```

## Testing Encrypted Functions

```typescript
describe("Encryption Patterns", function () {
  it("Should handle encrypted comparisons correctly", async function () {
    const contract = await deployContract();
    
    // Test with known values
    const result = await contract.compareSecretNumbers(10, 5);
    expect(result).to.be.true; // 10 > 5
    
    const result2 = await contract.compareSecretNumbers(3, 8);
    expect(result2).to.be.false; // 3 < 8
  });
  
  it("Should maintain privacy in state transitions", async function () {
    const contract = await deployContract();
    
    const processId = await contract.createProcess(100);
    
    // State should not be visible to others
    await expect(
      contract.connect(otherUser).getProcessState(processId)
    ).to.be.revertedWith("Not owner");
    
    // Owner can see their own state
    const state = await contract.getProcessState(processId);
    expect(state).to.equal(0); // Pending state
  });
});
```

## What's Next?

You now understand the core patterns for encryption and decryption in FHEVM! In the next chapter, we'll build a frontend application that interacts with our confidential contracts, showing users how to work with encrypted data in web applications.

Key concepts mastered:
- ✅ Access control patterns for encrypted data
- ✅ Performance optimization techniques
- ✅ Secure data sharing mechanisms
- ✅ Advanced encrypted operations

---

**Previous**: [← Deploy Contract](04-deploy-contract) | **Next**: [Frontend Integration →](06-frontend)