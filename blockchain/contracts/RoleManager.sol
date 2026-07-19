// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract RoleManager is AccessControl {
    bytes32 public constant TEE_EXECUTOR_ROLE = keccak256("TEE_EXECUTOR_ROLE");
    bytes32 public constant ORG_ADMIN_ROLE = keccak256("ORG_ADMIN_ROLE");
    bytes32 public constant WORKFLOW_MANAGER_ROLE = keccak256("WORKFLOW_MANAGER_ROLE");

    constructor(address defaultAdmin) {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
    }

    // Optional: Methods to batch grant or revoke if needed
}
