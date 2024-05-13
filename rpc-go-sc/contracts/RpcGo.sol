// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library IterableMapping {
    // Iterable mapping from address to uint;
    struct Map {
        address[] keys;
        mapping(address => uint256) values;
        mapping(address => uint256) indexOf;
        mapping(address => bool) inserted;
    }

    function get(Map storage map, address key) public view returns (uint256) {
        return map.values[key];
    }

    function getKeyAtIndex(Map storage map, uint256 index)
        public
        view
        returns (address)
    {
        return map.keys[index];
    }

    function size(Map storage map) public view returns (uint256) {
        return map.keys.length;
    }

    function set(Map storage map, address key, uint256 val) public {
        if (map.inserted[key]) {
            map.values[key] = val;
        } else {
            map.inserted[key] = true;
            map.values[key] = val;
            map.indexOf[key] = map.keys.length;
            map.keys.push(key);
        }
    }

    function remove(Map storage map, address key) public {
        if (!map.inserted[key]) {
            return;
        }

        delete map.inserted[key];
        delete map.values[key];

        uint256 index = map.indexOf[key];
        address lastKey = map.keys[map.keys.length - 1];

        map.indexOf[lastKey] = index;
        delete map.indexOf[key];

        map.keys[index] = lastKey;
        map.keys.pop();
    }
}

contract RpcGo {
    using IterableMapping for IterableMapping.Map;

    event ExecuteTransaction(address indexed from, address indexed to, uint256 value, bytes data);
    event RevertReason(string reason);
    event LogData(bytes data);
    event Withdraw(address indexed account, uint256 amount);
    event TransferAccount(address indexed from, address indexed to, uint256 amount);
    event OwnerWithdraw(uint256 amount);
    event Deposit(address indexed account, uint256 amount);
    event Payment(address indexed account, uint256 amount);

    IterableMapping.Map private accounts;
    address private owner;
    uint256 private feeAmount = 0.0001 ether;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function submitTransaction(address to, uint256 value, bytes memory data) public payable {
    uint256 valuePaid = msg.value;
    uint256 currentBalance = accounts.get(msg.sender);
    if (valuePaid > feeAmount) {
        // Additional funds sent with the transaction
        valuePaid -= feeAmount;
        accounts.set(msg.sender, currentBalance + feeAmount);
    } else {
        require(currentBalance >= feeAmount, "Insufficient balance");
        // Deduct fee from sender's balance
        accounts.set(msg.sender, currentBalance - feeAmount);
    }
    emit Payment(msg.sender, feeAmount);
    emit LogData(data);

    // Execute the transaction
    (bool success, bytes memory revertData) = to.call{value: value}(data);
    
    if (!success) {
        // Log the revert reason if the call failed
        string memory revertReason = "No revert reason";
        if (revertData.length >= 68) {
            assembly {
                revertReason := add(revertData, 0x04)
            }
        }
        emit RevertReason(revertReason);
        revert(string(abi.encodePacked("Transaction failed: ", revertReason)));
    }

    // Log the executed transaction
    emit ExecuteTransaction(msg.sender, to, value, data);
}

    function deposit() public payable {
        uint256 currentBalance = accounts.get(msg.sender);
        accounts.set(msg.sender, currentBalance + msg.value);

        emit Deposit(msg.sender, msg.value);
    }

    function withdrawBalance(uint256 amount) public {
        require(amount > 0, "Invalid amount");

        uint256 currentBalance = accounts.get(msg.sender);
        require(currentBalance >= amount, "Insufficient balance");

        accounts.set(msg.sender, currentBalance - amount);

        payable(msg.sender).transfer(amount);

        emit Withdraw(msg.sender, amount);
    }

    function withdrawRemainingBalance() public {
        uint256 currentBalance = accounts.get(msg.sender);
        require(currentBalance > 0, "No balance to withdraw");

        accounts.set(msg.sender, 0);
        payable(msg.sender).transfer(currentBalance);

        emit Withdraw(msg.sender, currentBalance);
    }

    function transferAccount(address to, uint256 amount) public {
        require(amount > 0, "Invalid amount");

        uint256 currentBalanceSender = accounts.get(msg.sender);
        uint256 currentBalanceReciever = accounts.get(to);
        require(currentBalanceSender >= amount, "Insufficient balance");

        accounts.set(msg.sender, currentBalanceSender - amount);
        accounts.set(to, currentBalanceReciever + amount);

        emit TransferAccount(msg.sender, to, amount);
    }

    function ownerWithdrawAmount(uint256 amount) external onlyOwner {
        uint256 contractBalance = address(this).balance;
        uint256 totalAccountsBalance = getTotalAccountsBalance();

        uint256 remainingBalance = contractBalance - totalAccountsBalance;
        require(amount < remainingBalance, "Not enough funds to withdraw");

        payable(owner).transfer(amount);
        emit OwnerWithdraw(amount);
    }

    function ownerWithdraw() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        uint256 totalAccountsBalance = getTotalAccountsBalance();

        uint256 remainingBalance = contractBalance - totalAccountsBalance;
        require(remainingBalance > 0, "No remaining balance to withdraw");

        payable(owner).transfer(remainingBalance);
        emit OwnerWithdraw(remainingBalance);
    }

    function getTotalAccountsBalance() public view returns (uint256) {
    uint256 totalBalance = 0;
    for (uint256 i = 0; i < accounts.size(); i++) {
            address key = accounts.getKeyAtIndex(i);
            totalBalance += accounts.get(key);
        }
    return totalBalance;
    }
    function getAccountBalance(address account) public view returns (uint256) {
        return accounts.get(account);
    }

    function setFeeAmount(uint256 _feeAmount) external onlyOwner {
        feeAmount = _feeAmount;
}
}
