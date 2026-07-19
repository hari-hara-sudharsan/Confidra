from fastapi import FastAPI

app = FastAPI(title="Confidra AI Agent Service")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ai-service"}
