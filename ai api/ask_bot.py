# Note: Replace **<YOUR_APPLICATION_TOKEN>** with your actual Application token

import requests
from typing import Optional
import os
import json
from dotenv import load_dotenv

load_dotenv(override=True)


BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = "5b623b45-eef7-4b18-9d8f-4a05b7ed6132"
FLOW_ID = "f0cf8997-e47e-499c-96d1-00ebf5491c46"
APPLICATION_TOKEN = os.getenv("APPLICATION_TOKEN")

def ask_chat_bot(question):
    TWEAKS = {"TextInput-AmSyK": {"input_value": question}}
    
    return run_flow_ask_chat_bot(
        "", tweaks=TWEAKS, application_token=APPLICATION_TOKEN
    )

def run_flow_ask_chat_bot(message: str,
  output_type: str = "chat",
  input_type: str = "chat",
  tweaks: Optional[dict] = None,
  application_token: Optional[str] = None) -> dict:
    
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/ask-bot"

    payload = {
        "input_value": message,
        "output_type": output_type,
        "input_type": input_type,
    }
    headers = None
    if tweaks:
        payload["tweaks"] = tweaks
    if application_token:
        headers = {"Authorization": "Bearer " + application_token, "Content-Type": "application/json"}
    response = requests.post(api_url, json=payload, headers=headers)
    return response.json()["outputs"][0]["outputs"][0]["results"]["message"]["text"]

result = ask_chat_bot("Tell me something about reels")
print(result)