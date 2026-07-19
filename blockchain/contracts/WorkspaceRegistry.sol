// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract WorkspaceRegistry {
    struct Workspace {
        bytes32 id;
        bytes32 orgId;
        string name;
        bool isActive;
    }

    mapping(bytes32 => Workspace) public workspaces;

    event WorkspaceRegistered(bytes32 indexed orgId, bytes32 indexed workspaceId, string name);

    function registerWorkspace(bytes32 _id, bytes32 _orgId, string calldata _name) external {
        require(workspaces[_id].id == bytes32(0), "Workspace exists");

        workspaces[_id] = Workspace({
            id: _id,
            orgId: _orgId,
            name: _name,
            isActive: true
        });

        emit WorkspaceRegistered(_orgId, _id, _name);
    }
}
