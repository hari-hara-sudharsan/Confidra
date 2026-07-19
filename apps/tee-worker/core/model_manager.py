import os
import time
from typing import Dict, Any, Optional
from openai import OpenAI
from .state import AgentMetrics

class ModelManager:
    def __init__(self):
        # We assume OPENAI_API_KEY is available in the TEE for this implementation
        self.api_key = os.getenv("OPENAI_API_KEY", "mock-key")
        self.client = OpenAI(api_key=self.api_key)
        
    def generate(self, agent_name: str, system_prompt: str, user_prompt: str, model: str = "gpt-4-turbo-preview") -> tuple[str, AgentMetrics]:
        start_time = time.time()
        
        # If no real API key is provided, we simulate the LLM response for demonstration purposes
        if self.api_key == "mock-key":
            time.sleep(0.5) # Simulate latency
            result_text = self._mock_response(agent_name, user_prompt)
            tokens = 150
            cost = 0.002
        else:
            try:
                response = self.client.chat.completions.create(
                    model=model,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    temperature=0.0
                )
                result_text = response.choices[0].message.content or ""
                tokens = response.usage.total_tokens if response.usage else 0
                cost = (tokens / 1000) * 0.01 # Rough estimate
            except Exception as e:
                raise RuntimeError(f"LLM generation failed in {agent_name}: {str(e)}")
        
        execution_time = int((time.time() - start_time) * 1000)
        
        metrics = AgentMetrics(
            agent_name=agent_name,
            execution_time_ms=execution_time,
            tokens_used=tokens,
            cost_usd=cost
        )
        
        return result_text, metrics
        
    def _mock_response(self, agent_name: str, prompt: str) -> str:
        """Fallback mock responses so the pipeline can execute fully without an API key."""
        mocks = {
            "WorkflowUnderstandingAgent": "Hiring",
            "PolicyAgent": "Require 90% confidence for approval. Max risk 30%.",
            "DocumentAgent": "Parsed applicant resume: 5 years experience, Python, React.",
            "OcrAgent": "No image data found.",
            "RiskAgent": "0.15", # 15% risk
            "FraudAgent": "0.02", # 2% fraud probability
            "ComplianceAgent": "0.98", # 98% compliant
            "ScoringAgent": "0.85", # 85% final score
            "EvidenceAgent": "Evidence found in employment history.",
            "DecisionAgent": "APPROVED",
            "ExplainabilityAgent": "The applicant meets all policy criteria with high compliance and low risk.",
            "SummaryAgent": "Strong candidate. Weakness: lacks managerial experience.",
            "QaAgent": "VALID"
        }
        return mocks.get(agent_name, "Processed.")
