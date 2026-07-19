from core.state import AgentState
from core.model_manager import ModelManager

model_manager = ModelManager()

async def supervisor_agent(state: AgentState) -> AgentState:
    """Validates the input and oversees routing (in a dynamic DAG, this would pick next steps)."""
    if not state.raw_payload:
        state.errors.append("Supervisor: Empty payload received.")
    return state

async def workflow_understanding_agent(state: AgentState) -> AgentState:
    sys_prompt = "You determine the workflow type. Reply with exactly one word: Hiring, Grant, Scholarship, Insurance, Loan, Vendor, Investment, Governance, or Custom."
    user_prompt = f"Analyze this payload to determine workflow type: {str(state.raw_payload)}"
    
    result, metrics = model_manager.generate("WorkflowUnderstandingAgent", sys_prompt, user_prompt)
    state.workflow_type = result.strip()
    state.metrics.append(metrics)
    return state

async def policy_agent(state: AgentState) -> AgentState:
    sys_prompt = "Extract and formulate the evaluation policy rules for this workflow."
    user_prompt = f"Workflow type: {state.workflow_type}. Payload: {state.raw_payload}"
    
    result, metrics = model_manager.generate("PolicyAgent", sys_prompt, user_prompt)
    state.policy_rules = [{"rule": result}] # Simplified representation
    state.metrics.append(metrics)
    return state
