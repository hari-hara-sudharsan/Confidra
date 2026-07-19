// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract WorkflowRegistry {
    struct Workflow {
        bytes32 id;
        bytes32 workspaceId;
        bytes32 aiPromptHash;
        uint256 createdAt;
        bool isPublished;
    }

    mapping(bytes32 => Workflow) public workflows;

    event WorkflowCreated(bytes32 indexed workspaceId, bytes32 indexed workflowId, bytes32 aiPromptHash);

    function registerWorkflow(bytes32 _id, bytes32 _workspaceId, bytes32 _aiPromptHash) external {
        require(workflows[_id].id == bytes32(0), "Workflow exists");

        workflows[_id] = Workflow({
            id: _id,
            workspaceId: _workspaceId,
            aiPromptHash: _aiPromptHash,
            createdAt: block.timestamp,
            isPublished: true
        });

        emit WorkflowCreated(_workspaceId, _id, _aiPromptHash);
    }
}
