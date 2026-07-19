from core.state import AgentState
from core.model_manager import ModelManager

model_manager = ModelManager()

async def summary_agent(state: AgentState) -> AgentState:
    sys_prompt = "Summarize the strengths and weaknesses. Format: STRENGTHS: ... WEAKNESSES: ..."
    user_prompt = f"Text: {state.extracted_text}"
    
    result, metrics = model_manager.generate("SummaryAgent", sys_prompt, user_prompt, model="gpt-3.5-turbo")
    
    if "STRENGTHS:" in result and "WEAKNESSES:" in result:
        parts = result.split("WEAKNESSES:")
        state.strengths.append(parts[0].replace("STRENGTHS:", "").strip())
        state.weaknesses.append(parts[1].strip())
    else:
        state.strengths.append("Applicant meets general criteria.")
        state.weaknesses.append("Missing detailed documentation.")
        
    state.metrics.append(metrics)
    return state

async def qa_agent(state: AgentState) -> AgentState:
    sys_prompt = "Validate the entire decision pipeline. Output VALID if confidence is high, else INVALID."
    user_prompt = f"Decision: {state.decision}. Explanation: {state.decision_explanation}"
    
    result, metrics = model_manager.generate("QaAgent", sys_prompt, user_prompt)
    
    if "INVALID" in result.upper():
        state.errors.append("QA Agent flagged the output as invalid or low confidence.")
        state.confidence_score = 0.4
    else:
        state.confidence_score = 0.95
        
    state.metrics.append(metrics)
    return state
