from core.state import AgentState
from core.model_manager import ModelManager

model_manager = ModelManager()

async def risk_agent(state: AgentState) -> AgentState:
    sys_prompt = "Evaluate the risk of this application. Output a float between 0.0 and 1.0."
    user_prompt = f"Text: {state.extracted_text}\nPolicies: {state.policy_rules}"
    
    result, metrics = model_manager.generate("RiskAgent", sys_prompt, user_prompt)
    try:
        state.risk_score = float(result.strip())
    except ValueError:
        state.risk_score = 0.5
    state.metrics.append(metrics)
    return state

async def fraud_agent(state: AgentState) -> AgentState:
    sys_prompt = "Evaluate the probability of fraud or manipulation. Output a float between 0.0 and 1.0."
    user_prompt = f"Text: {state.extracted_text}"
    
    result, metrics = model_manager.generate("FraudAgent", sys_prompt, user_prompt)
    try:
        state.fraud_score = float(result.strip())
    except ValueError:
        state.fraud_score = 0.1
    state.metrics.append(metrics)
    return state

async def compliance_agent(state: AgentState) -> AgentState:
    sys_prompt = "Evaluate compliance with the stated policies. Output a float between 0.0 and 1.0."
    user_prompt = f"Text: {state.extracted_text}\nPolicies: {state.policy_rules}"
    
    result, metrics = model_manager.generate("ComplianceAgent", sys_prompt, user_prompt)
    try:
        state.compliance_score = float(result.strip())
    except ValueError:
        state.compliance_score = 0.9
    state.metrics.append(metrics)
    return state
