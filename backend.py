from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import ollama

app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_NAME = "phi3:3.8b"

@app.post("/chat")
async def chat(request: dict):
    user_message = request["message"]
    
    response = ollama.chat(model=MODEL_NAME, messages=[{"role": "user", "content": user_message}])
    return {"response": response["message"]["content"]}
