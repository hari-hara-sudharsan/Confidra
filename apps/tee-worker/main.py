from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import traceback

from crypto_utils import decrypt_payload, encrypt_result, generate_attestation
from core.state import AgentState
from core.orchestrator import DAGOrchestrator
from agents.pipeline_agents import supervisor_agent, workflow_understanding_agent, policy_agent
from agents.extraction_agents import document_agent, ocr_agent, evidence_agent
from agents.analysis_agents import risk_agent, fraud_agent, compliance_agent
from agents.decision_agents import scoring_agent, decision_agent, explainability_agent
from agents.qa_agents import summary_agent, qa_agent

app = FastAPI(title="Confidra TEE AI Engine")

class ExecuteRequest(BaseModel):
    encryptedData: str
    iv: str
    authTag: str

@app.post("/api/v1/tee/execute")
async def execute_confidential_workflow(req: ExecuteRequest):
    try:
        # 1. Decrypt securely inside TEE
        decrypted_json = decrypt_payload(req.encryptedData, req.iv, req.authTag)
        payload = json.loads(decrypted_json)
        
        job_id = payload.get("jobId", "unknown")
        workflow_id = payload.get("workflowId", "unknown")
        
        # 2. Initialize State and Orchestrator
        initial_state = AgentState(
            job_id=job_id,
            workflow_id=workflow_id,
            raw_payload=payload
        )
        
        orchestrator = DAGOrchestrator()
        
        # Pipeline mapping (Sequential for this implementation)
        orchestrator.add_agent(supervisor_agent)
        orchestrator.add_agent(workflow_understanding_agent)
        orchestrator.add_agent(policy_agent)
        orchestrator.add_agent(document_agent)
        orchestrator.add_agent(ocr_agent)
        orchestrator.add_agent(evidence_agent)
        orchestrator.add_agent(risk_agent)
        orchestrator.add_agent(fraud_agent)
        orchestrator.add_agent(compliance_agent)
        orchestrator.add_agent(scoring_agent)
        orchestrator.add_agent(summary_agent)
        orchestrator.add_agent(decision_agent)
        orchestrator.add_agent(explainability_agent)
        orchestrator.add_agent(qa_agent)
        
        # 3. Execute Multi-Agent DAG
        final_state = await orchestrator.execute(initial_state)
        
        if final_state.errors:
            print("DAG finished with errors:", final_state.errors)
            
        # 4. Formulate Result
        # Convert state to dict, allowing execution timeline and metrics to pass back
        result_payload = final_state.model_dump()
        
        # 5. Encrypt Output
        encrypted_result = encrypt_result(result_payload)
        
        # 6. Generate TEE Attestation (ECDSA Signature over Execution Hash)
        # Using a deterministic hash of the decision output string
        result_str = json.dumps(result_payload, sort_keys=True)
        attestation = generate_attestation(result_str)
        
        return {
            "encryptedData": encrypted_result["encryptedData"],
            "iv": encrypted_result["iv"],
            "authTag": encrypted_result["authTag"],
            "attestation": attestation
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
