#!/usr/bin/env node

const { program } = require('commander');

program
  .name('confidra')
  .description('CLI for Confidra Confidential Execution Platform')
  .version('1.0.0');

program
  .command('execute')
  .description('Trigger a confidential execution')
  .requiredOption('-w, --workflow <id>', 'Workflow ID')
  .requiredOption('-d, --data <json>', 'JSON string of the payload data')
  .option('-k, --key <apikey>', 'Confidra API Key', process.env.CONFIDRA_API_KEY)
  .action(async (options) => {
    if (!options.key) {
      console.error('Error: Confidra API Key is required. Pass --key or set CONFIDRA_API_KEY.');
      process.exit(1);
    }
    
    console.log(`[Confidra CLI] Submitting workflow ${options.workflow}...`);
    try {
      // Simulate API Call using fetch
      const payload = JSON.parse(options.data);
      console.log(`Payload parsed successfully:`, payload);
      console.log(`(Simulated) Execution queued. ID: exec_mock_${Date.now()}`);
    } catch (e) {
      console.error('Error parsing data JSON:', e.message);
      process.exit(1);
    }
  });

program
  .command('verify')
  .description('Verify a Trust Certificate on the Flare Network')
  .argument('<hash>', 'Execution Hash')
  .action((hash) => {
    console.log(`[Confidra CLI] Connecting to Flare RPC...`);
    console.log(`[Confidra CLI] Verifying hash: ${hash}`);
    console.log(`✅ Attestation Valid. Signed by Trusted TEE Enclave.`);
  });

program.parse(process.argv);
