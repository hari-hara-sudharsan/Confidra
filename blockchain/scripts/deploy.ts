import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 1. SystemConfig
  // Using deployer's address as the "Trusted TEE" just for the sake of the demo,
  // since we will sign test attestations with the deployer key.
  const SystemConfig = await ethers.getContractFactory("SystemConfig");
  const systemConfig = await SystemConfig.deploy(deployer.address, deployer.address);
  await systemConfig.waitForDeployment();
  const systemConfigAddr = await systemConfig.getAddress();
  console.log("SystemConfig deployed to:", systemConfigAddr);

  // 2. RoleManager
  const RoleManager = await ethers.getContractFactory("RoleManager");
  const roleManager = await RoleManager.deploy(deployer.address);
  await roleManager.waitForDeployment();
  console.log("RoleManager deployed to:", await roleManager.getAddress());

  // 3. OrganizationRegistry
  const OrganizationRegistry = await ethers.getContractFactory("OrganizationRegistry");
  const orgRegistry = await OrganizationRegistry.deploy();
  await orgRegistry.waitForDeployment();
  console.log("OrganizationRegistry deployed to:", await orgRegistry.getAddress());

  // 4. WorkspaceRegistry
  const WorkspaceRegistry = await ethers.getContractFactory("WorkspaceRegistry");
  const workspaceRegistry = await WorkspaceRegistry.deploy();
  await workspaceRegistry.waitForDeployment();
  console.log("WorkspaceRegistry deployed to:", await workspaceRegistry.getAddress());

  // 5. WorkflowRegistry
  const WorkflowRegistry = await ethers.getContractFactory("WorkflowRegistry");
  const workflowRegistry = await WorkflowRegistry.deploy();
  await workflowRegistry.waitForDeployment();
  console.log("WorkflowRegistry deployed to:", await workflowRegistry.getAddress());

  // 6. PolicyRegistry
  const PolicyRegistry = await ethers.getContractFactory("PolicyRegistry");
  const policyRegistry = await PolicyRegistry.deploy();
  await policyRegistry.waitForDeployment();
  console.log("PolicyRegistry deployed to:", await policyRegistry.getAddress());

  // 7. DecisionRegistry
  const DecisionRegistry = await ethers.getContractFactory("DecisionRegistry");
  const decisionRegistry = await DecisionRegistry.deploy();
  await decisionRegistry.waitForDeployment();
  console.log("DecisionRegistry deployed to:", await decisionRegistry.getAddress());

  // 8. AuditRegistry
  const AuditRegistry = await ethers.getContractFactory("AuditRegistry");
  const auditRegistry = await AuditRegistry.deploy();
  await auditRegistry.waitForDeployment();
  console.log("AuditRegistry deployed to:", await auditRegistry.getAddress());

  // 9. VerificationRegistry
  const VerificationRegistry = await ethers.getContractFactory("VerificationRegistry");
  const verificationRegistry = await VerificationRegistry.deploy(systemConfigAddr);
  await verificationRegistry.waitForDeployment();
  const verificationRegistryAddr = await verificationRegistry.getAddress();
  console.log("VerificationRegistry deployed to:", verificationRegistryAddr);

  // 10. ConfidentialExecutionRegistry
  const ConfidentialExecutionRegistry = await ethers.getContractFactory("ConfidentialExecutionRegistry");
  const executionRegistry = await ConfidentialExecutionRegistry.deploy(verificationRegistryAddr);
  await executionRegistry.waitForDeployment();
  console.log("ConfidentialExecutionRegistry deployed to:", await executionRegistry.getAddress());

  console.log("\n=================================");
  console.log("Deployment Complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
