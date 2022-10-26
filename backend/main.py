import random
from typing import Union

import cv2
import numpy as np
import torch
import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from models.experimental import attempt_load
from utils.datasets import letterbox
from utils.general import check_img_size, non_max_suppression, scale_coords

# model = torch.hub.load("ultralytics/yolov5", "yolov5s", pretrained=True)
model = attempt_load("models/best.pt")


def recognize_img(img):
    results = model(img)
    response = results.pandas().xyxy[0].value_counts("name")
    return dict(response)


def recognize_img_v2(img):

    img = cv2.imread(img)
    showimg = img
    conf_thres = 0.25
    iou_thres = 0.45
    imgsz = 640
    name_list = []
    names = model.module.names if hasattr(model, "module") else model.names

    with torch.no_grad():
        stride = int(model.stride.max())
        imgsz = check_img_size(imgsz, s=stride)
        img = letterbox(img, new_shape=imgsz)[0]
        # Convert
        # BGR to RGB, to 3x416x416
        img = img[:, :, ::-1].transpose(2, 0, 1)
        img = np.ascontiguousarray(img)
        img = torch.from_numpy(img).to("cpu")
        img = img.float()  # uint8 to fp16/32
        img /= 255.0  # 0 - 255 to 0.0 - 1.0
        if img.ndimension() == 3:
            img = img.unsqueeze(0)
        # Inference
        pred = model(img)[0]
        # Apply NMS
        pred = non_max_suppression(pred, conf_thres, iou_thres)
        # Process detections
        for i, det in enumerate(pred):
            if det is not None and len(det):
                for *xyxy, conf, cls in reversed(det):
                    label = "%s %.2f" % (names[int(cls)], conf)
                    print(label.split()[0])  # 打印各目标名称
                    name_list.append(names[int(cls)])
        return set(name_list)


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
    resp = recognize_img_v2(f"cache/{uploaded_file.filename}")
    return resp


if __name__ == "__main__":
    uvicorn.run(app="main:app", host="0.0.0.0", port=8000, access_log=True, reload=True)
