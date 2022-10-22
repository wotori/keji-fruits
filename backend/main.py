import random
import uuid
from typing import Union

import torch
import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

model = torch.hub.load("ultralytics/yolov5", "yolov5s", pretrained=True)


def recognize_img(img):
    results = model(img)
    response = results.pandas().xyxy[0].value_counts("name")
    return dict(response)


app = FastAPI(docs_url="/doc")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

items = ["apple", "carrot", "eggplant", "watermelon"]


@app.get("/")
def read_root():
    return random.choice(items)


@app.post("/detect")
def read_root(uploaded_file: UploadFile = File(...)):
    with open(f"cache/{uploaded_file.filename}", "wb+") as file:
        file.write(uploaded_file.file.read())
    resp = recognize_img(f"cache/{uploaded_file.filename}")
    return eval(str(resp))


if __name__ == "__main__":
    uvicorn.run(app="main:app", host="0.0.0.0", port=8000, access_log=True)
