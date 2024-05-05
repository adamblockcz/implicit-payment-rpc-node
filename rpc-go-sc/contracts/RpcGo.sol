// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract RpcGo {
    event ExecuteTransaction(address indexed from, address indexed to, uint256 _value, bytes _data);
    event RevertReason(string reason);
    event LogData(bytes data);

    function submitTransaction(address _to, uint256 _value, bytes memory _data) public payable {
        emit LogData(_data);

        (bool success, bytes memory data) = _to.call{value: _value}(_data);
        if (!success) {
            // Log the revert reason if the call failed
            string memory revertReason;
            if (data.length >= 68) {
                assembly {
                    revertReason := add(data, 0x04)
                }
            }
            revertReason = data.length == 0 ? "No revert reason" : revertReason;
            // Log the revert reason
            emit RevertReason(revertReason);
            // Revert the transaction with a meaningful message
            revert(string(abi.encodePacked("Transaction failed: ", revertReason)));
        }

        emit ExecuteTransaction(msg.sender, _to, _value, _data);
    }
}
