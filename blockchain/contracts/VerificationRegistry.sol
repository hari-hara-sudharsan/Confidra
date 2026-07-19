// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./SystemConfig.sol";

contract VerificationRegistry {
    using ECDSA for bytes32;

    SystemConfig public systemConfig;

    event VerificationSucceeded(bytes32 indexed executionHash, address recoveredSigner);
    event VerificationFailed(bytes32 indexed executionHash, address recoveredSigner, string reason);

    constructor(address _systemConfigAddress) {
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
