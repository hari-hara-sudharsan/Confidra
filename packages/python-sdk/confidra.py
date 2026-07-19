import requests
from typing import Dict, Any, Optional

class Confidra:
    """
    Confidra Python SDK
    The official library for integrating Confidra Confidential Execution Engine.
    """

    def __init__(self, api_key: str, base_url: str = "https://api.confidra.dev/v1"):
        if not api_key:
            raise ValueError("Confidra API Key is required")
        self.api_key = api_key
        self.base_url = base_url
        
        self.session = requests.Session()
        self.session.headers.update({
            "Content-Type": "application/json",
            "x-api-key": self.api_key
        })
        
        # Sub-modules
        self.executions = Executions(self)

class Executions:
    def __init__(self, client: Confidra):
        self.client = client

    def create(self, workflow_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Submit a new confidential execution workflow.
        """
        payload = {
            "workflowId": workflow_id,
            "data": data
        }
        response = self.client.session.post(f"{self.client.base_url}/executions", json=payload)
        response.raise_for_status()
        return response.json()

    def retrieve(self, execution_id: str) -> Dict[str, Any]:
        """
        Retrieve the status and results of a confidential execution.
        """
        response = self.client.session.get(f"{self.client.base_url}/executions/{execution_id}")
        response.raise_for_status()
        return response.json()
