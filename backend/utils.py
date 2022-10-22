import torch

model = torch.hub.load("ultralytics/yolov5", "yolov5s", pretrained=True)


def recognize_img(img):
    results = model(img)
    response = results.pandas().xyxy[0].value_counts("name")
    return dict(response)


if __name__ == "__main__":
    resp = recognize_img("./images/dragon.png")
    print(resp)
