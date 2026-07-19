import logging
from typing import Callable, Awaitable, List
from .state import AgentState

logger = logging.getLogger(__name__)

class DAGOrchestrator:
    def __init__(self):
        self.agents: List[Callable[[AgentState], Awaitable[AgentState]]] = []
        
    def add_agent(self, agent_func: Callable[[AgentState], Awaitable[AgentState]]):
        self.agents.append(agent_func)
        
    async def execute(self, initial_state: AgentState) -> AgentState:
        current_state = initial_state
        
        for agent in self.agents:
            agent_name = agent.__name__
            logger.info(f"Executing Agent: {agent_name}")
            try:
                current_state = await agent(current_state)
            except Exception as e:
                logger.error(f"Agent {agent_name} failed: {str(e)}")
                current_state.errors.append(f"{agent_name}: {str(e)}")
                # Depending on the agent, we might halt or continue. 
                # For this implementation, we halt on critical failure.
                break
                
        return current_state
