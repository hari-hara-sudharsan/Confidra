import random
import time

def evaluate_fraud_risk(data: dict) -> dict:
    """Simulate a fraud detection ML model running securely inside the TEE"""
    # E.g. Check for IP anomalies, unusual velocity
    time.sleep(0.5) # Simulate inference latency
    score = random.randint(5, 25)
    return {
        "fraudScore": score,
        "isFraud": score > 80,
        "signals": ["Clean IP", "Normal Velocity"]
    }

def evaluate_decision(payload: dict, fraud_data: dict) -> dict:
    """Simulate an LLM or rules agent making a final confident decision"""
    time.sleep(0.5)
    
    # Simple heuristic for demonstration
    risk_score = fraud_data['fraudScore']
    
    if risk_score > 80:
        return {
            "decision": "REJECTED",
            "confidence": 99.9,
            "reasoning": "High probability of fraud detected based on heuristic execution."
        }
    else:
        return {
            "decision": "APPROVED",
            "confidence": 94.5,
            "reasoning": "Applicant passes all confidential checks securely. No anomalies found."
        }

def run_ai_pipeline(payload: dict) -> dict:
    """Orchestrates the AI agents inside the enclave"""
    fraud_data = evaluate_fraud_risk(payload)
    decision_data = evaluate_decision(payload, fraud_data)
    
    return {
        "status": "SUCCESS",
        "fraudAnalysis": fraud_data,
        "finalDecision": decision_data,
        "evaluatedAt": time.time()
    }
