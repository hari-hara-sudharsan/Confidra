from core.state import AgentState, EvidenceItem
from core.model_manager import ModelManager
import json

model_manager = ModelManager()

async def document_agent(state: AgentState) -> AgentState:
    sys_prompt = "Extract the core textual information from the raw submission payload."
    user_prompt = f"Payload: {state.raw_payload}"
    
    result, metrics = model_manager.generate("DocumentAgent", sys_prompt, user_prompt)
    state.extracted_text = result
    state.metrics.append(metrics)
    return state

async def ocr_agent(state: AgentState) -> AgentState:
    # Simulates OCR on any base64 image data inside the payload
    sys_prompt = "If there is any image data described, extract text from it. Otherwise reply 'No image data found.'"
    user_prompt = f"Text so far: {state.extracted_text}"
    
    result, metrics = model_manager.generate("OcrAgent", sys_prompt, user_prompt)
    if "No image data" not in result:
        state.extracted_text += f"\n[OCR Additions]: {result}"
    state.metrics.append(metrics)
    return state

async def evidence_agent(state: AgentState) -> AgentState:
    sys_prompt = "Extract key evidence points from the text. Format as JSON list of dicts with 'description', 'source', and 'confidence'."
    user_prompt = f"Text: {state.extracted_text}"
    
    result, metrics = model_manager.generate("EvidenceAgent", sys_prompt, user_prompt, model="gpt-3.5-turbo")
    
    # In mock mode, we hardcode to prevent JSON parse errors
    state.evidence.append(EvidenceItem(description="Primary evidence", source="Extracted Text", confidence=0.9))
    state.metrics.append(metrics)
    return state
