// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract SystemConfig is Ownable, Pausable {
    
    // TEE Public Key used for verification on this network
    address public trustedTeeAddress;

    event TeeAddressUpdated(address indexed oldAddress, address indexed newAddress);

    constructor(address initialOwner, address _trustedTeeAddress) Ownable(initialOwner) {
        trustedTeeAddress = _trustedTeeAddress;
    }

    function setTrustedTeeAddress(address _newAddress) external onlyOwner {
        emit TeeAddressUpdated(trustedTeeAddress, _newAddress);
        trustedTeeAddress = _newAddress;
    }

    function pauseSystem() external onlyOwner {
        _pause();
    }

    function unpauseSystem() external onlyOwner {
        _unpause();
    }
}
