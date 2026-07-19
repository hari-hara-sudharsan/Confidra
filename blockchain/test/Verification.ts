import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("On-Chain Trust Layer - Verification & Execution", function () {
  async function deployFixtures() {
    const [owner, teeEnclave, otherAccount] = await ethers.getSigners();

    // Deploy SystemConfig with teeEnclave as the trusted address
    const SystemConfig = await ethers.getContractFactory("SystemConfig");
    const systemConfig = await SystemConfig.deploy(owner.address, teeEnclave.address);
    const systemConfigAddress = await systemConfig.getAddress();

    // Deploy VerificationRegistry
    const VerificationRegistry = await ethers.getContractFactory("VerificationRegistry");
    const verificationRegistry = await VerificationRegistry.deploy(systemConfigAddress);
    const verificationRegistryAddress = await verificationRegistry.getAddress();

    // Deploy ConfidentialExecutionRegistry
    const ConfidentialExecutionRegistry = await ethers.getContractFactory("ConfidentialExecutionRegistry");
    const executionRegistry = await ConfidentialExecutionRegistry.deploy(verificationRegistryAddress);

    return { systemConfig, verificationRegistry, executionRegistry, owner, teeEnclave, otherAccount };
  }

  it("Should successfully verify a valid TEE attestation and record execution", async function () {
    const { executionRegistry, teeEnclave } = await loadFixture(deployFixtures);

    // Mock Execution Data
    const executionId = ethers.id("exec-1");
    const workflowId = ethers.id("wf-1");
    const executionHash = ethers.id("some-random-execution-result-hash");

    // The TEE securely signs the hash using ECDSA (matches Python enclave logic)
    // Note: hashMessage hashes the data as an Ethereum Signed Message, 
    // but our VerificationRegistry simply uses ECDSA.recover without eth-prepends.
    // So we manually sign the digest.
    const signingKey = new ethers.SigningKey(teeEnclave.privateKey);
    const signatureInfo = signingKey.sign(executionHash);
    const signature = ethers.Signature.from(signatureInfo).serialized;

    // Submit Attestation to Blockchain
    await expect(executionRegistry.recordExecution(executionId, workflowId, executionHash, signature))
      .to.emit(executionRegistry, "ExecutionVerified")
      .withArgs(executionId, workflowId, executionHash);

    // Verify state
    const exec = await executionRegistry.executions(executionId);
    expect(exec.isVerified).to.be.true;
  });

  it("Should revert if the signature comes from an untrusted source", async function () {
    const { executionRegistry, otherAccount } = await loadFixture(deployFixtures);

    const executionId = ethers.id("exec-2");
    const workflowId = ethers.id("wf-2");
    const executionHash = ethers.id("some-random-execution-result-hash");

    // Malicious actor signs the hash
    const signingKey = new ethers.SigningKey(otherAccount.privateKey);
    const signatureInfo = signingKey.sign(executionHash);
    const signature = ethers.Signature.from(signatureInfo).serialized;

    await expect(
      executionRegistry.recordExecution(executionId, workflowId, executionHash, signature)
    ).to.be.revertedWithCustomError(executionRegistry, "AttestationFailed");
  });
});
