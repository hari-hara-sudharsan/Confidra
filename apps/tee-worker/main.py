from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import crypto_utils
import ai_agent

app = FastAPI(title="Flare TEE Simulation Worker")

class ExecutionRequest(BaseModel):
    encryptedData: str
    iv: str
    authTag: str

@app.get("/health")
def health_check():
    return {"status": "ok", "enclave": "flare-tee-sim-v1"}

@app.post("/api/v1/tee/execute")
def execute_confidential_job(request: ExecutionRequest):
    try:
        # 1. Decrypt incoming payload securely inside the enclave
        payload = crypto_utils.decrypt_payload(
            request.encryptedData, 
            request.iv, 
            request.authTag
        )
        
        # 2. Run the confidential AI agents
        ai_result = ai_agent.run_ai_pipeline(payload)
        
        # 3. Cryptographically attest the result
        exec_hash, signature = crypto_utils.sign_execution(ai_result)
        
        # 4. Encrypt the result to send back
        out_enc, out_iv, out_tag = crypto_utils.encrypt_payload(ai_result)
        
        return {
            "encryptedData": out_enc,
            "iv": out_iv,
            "authTag": out_tag,
            "attestation": {
                "executionHash": exec_hash,
                "signature": signature,
                "publicKeyPem": crypto_utils.PUBLIC_KEY_PEM
            }
        }
        
    except Exception as e:
        print(f"Enclave Execution Error: {e}")
        raise HTTPException(status_code=500, detail="Confidential execution failed")

# To run: uvicorn main:app --host 0.0.0.0 --port 8000
