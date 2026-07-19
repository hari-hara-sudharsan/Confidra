# Confidra Developer Guide

This guide explains how to spin up the entire Confidra monorepo locally.

## Prerequisites
- Node.js (v18+)
- Python 3.10+
- PostgreSQL

## 1. Setup Database
Ensure PostgreSQL is running on `localhost:5432`.
```bash
cd database
npx prisma generate
npx prisma db push
```

## 2. Start the Backend API
```bash
cd apps/backend
npm install
npm run start:dev
# Runs on http://localhost:3001
```

## 3. Start the TEE Worker
```bash
cd apps/tee-worker
python -m venv venv
source venv/bin/activate  # Or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --port 8000 --reload
```

## 4. Deploy Smart Contracts (Optional)
```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat test
```

## 5. Start the Frontend
```bash
cd apps/frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

## Testing
To run end-to-end integration tests on the backend:
```bash
cd apps/backend
npm run test:e2e
```
