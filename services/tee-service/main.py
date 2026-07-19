from fastapi import FastAPI

app = FastAPI(title="Confidra TEE Service")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "tee-service"}
