from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class AgentMetrics(BaseModel):
    agent_name: str
    execution_time_ms: int
    tokens_used: int
    cost_usd: float

class EvidenceItem(BaseModel):
    description: str
    source: str
    confidence: float

class AgentState(BaseModel):
    # Inputs
    job_id: str
    workflow_id: str
    raw_payload: Dict[str, Any]
    
    # Intermediary Extractions
    workflow_type: Optional[str] = None
    extracted_text: Optional[str] = None
    entities: Dict[str, Any] = Field(default_factory=dict)
    
    # Policies
    policy_rules: List[Dict[str, Any]] = Field(default_factory=list)
    
    # Analysis Results
    risk_score: Optional[float] = None
    fraud_score: Optional[float] = None
    compliance_score: Optional[float] = None
    
    # Evidence & Summaries
    evidence: List[EvidenceItem] = Field(default_factory=list)
    strengths: List[str] = Field(default_factory=list)
    weaknesses: List[str] = Field(default_factory=list)
    recommendations: List[str] = Field(default_factory=list)
    
    # Final Outputs
    final_score: Optional[float] = None
    decision: Optional[str] = None # "APPROVED" | "REJECTED" | "MANUAL_REVIEW"
    decision_explanation: Optional[str] = None
    confidence_score: Optional[float] = None
    
    # Observability
    metrics: List[AgentMetrics] = Field(default_factory=list)
    errors: List[str] = Field(default_factory=list)
