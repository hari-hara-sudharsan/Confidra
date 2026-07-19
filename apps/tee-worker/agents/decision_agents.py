from core.state import AgentState
from core.model_manager import ModelManager

model_manager = ModelManager()

async def scoring_agent(state: AgentState) -> AgentState:
    sys_prompt = "Calculate the final normalized score. Output a float between 0.0 and 1.0."
    user_prompt = f"Risk: {state.risk_score}, Fraud: {state.fraud_score}, Compliance: {state.compliance_score}"
    
    result, metrics = model_manager.generate("ScoringAgent", sys_prompt, user_prompt)
    try:
        state.final_score = float(result.strip())
    except ValueError:
        state.final_score = 0.8
    state.metrics.append(metrics)
    return state

async def decision_agent(state: AgentState) -> AgentState:
    sys_prompt = "Based on the score and policies, output exactly: APPROVED, REJECTED, or MANUAL_REVIEW."
    user_prompt = f"Score: {state.final_score}. Risk: {state.risk_score}. Fraud: {state.fraud_score}"
    
    result, metrics = model_manager.generate("DecisionAgent", sys_prompt, user_prompt)
    
    decision = result.strip().upper()
    if decision not in ["APPROVED", "REJECTED", "MANUAL_REVIEW"]:
        decision = "MANUAL_REVIEW"
        
    state.decision = decision
    state.metrics.append(metrics)
    return state

async def explainability_agent(state: AgentState) -> AgentState:
    sys_prompt = "Provide a detailed explanation justifying the decision."
    user_prompt = f"Decision: {state.decision}. Score: {state.final_score}. Evidence: {state.evidence}"
    
    result, metrics = model_manager.generate("ExplainabilityAgent", sys_prompt, user_prompt)
    state.decision_explanation = result
    state.metrics.append(metrics)
    return state
