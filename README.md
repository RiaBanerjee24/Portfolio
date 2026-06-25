# Ria Banerjee — Portfolio

Personal portfolio site: dark-themed React frontend, Flask backend, deployed on EC2 via Docker Compose.

**Live:** [riabanerjee.dev](https://riabanerjee.dev)

## Stack

- **frontend/** — React + TypeScript + Vite + Tailwind, served by nginx
- **backend/** — Flask, serves portfolio data + a resume-aware chatbot (LangChain + OpenAI)
- **docker-compose.yml** — runs both; backend has no published port, reachable only from frontend over an internal network

## Run locally

```bash
cp backend/.env.example .env   # add OPENAI_API_KEY to enable the chatbot
docker compose up -d --build
```

Visit `https://localhost` (self-signed cert — click through the browser warning).

## CI/CD

Push to `main` → GitHub Actions builds and smoke-tests both images, pushes to ECR, and deploys to EC2.
