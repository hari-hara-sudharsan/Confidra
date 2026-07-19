// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SystemConfig.sol";

contract VerificationRegistry is Ownable {
    using ECDSA for bytes32;

    SystemConfig public systemConfig;

    event VerificationSucceeded(bytes32 indexed executionHash, address indexed recoveredSigner);
    event VerificationFailed(bytes32 indexed executionHash, address indexed recoveredSigner, string reason);
    
    error InvalidSystemConfig();

    constructor(address _systemConfigAddress) Ownable(msg.sender) {
        if (_systemConfigAddress == address(0)) revert InvalidSystemConfig();
        systemConfig = SystemConfig(_systemConfigAddress);
    }

    function setSystemConfig(address _systemConfigAddress) external onlyOwner {
        if (_systemConfigAddress == address(0)) revert InvalidSystemConfig();
        systemConfig = SystemConfig(_systemConfigAddress);
    }

    /**
     * @dev Verifies that the given signature was produced by the Trusted TEE enclave 
     * signing the executionHash.
     */
    function verifyTeeAttestation(bytes32 executionHash, bytes memory signature) public returns (bool) {
        // Recover the signer address from the hash and signature
        address recoveredSigner = executionHash.recover(signature);
        address expectedSigner = systemConfig.trustedTeeAddress();

        if (recoveredSigner == expectedSigner) {
            emit VerificationSucceeded(executionHash, recoveredSigner);
            return true;
        } else {
            emit VerificationFailed(executionHash, recoveredSigner, "Signer mismatch");
            return false;
        }
    }
}
