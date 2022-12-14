# Fruit detector
Detect fruits on img and render on canvas based on Yolo and Three.js.
![alt text](img/img02.png)

# Architecture
![Group 5](https://user-images.githubusercontent.com/10486621/200825922-b2b961da-ac22-4854-8615-0ccf3ad450b2.png)


# frontend
```cmd
yarn install
yarn dev
```

# backend

## setup custom model
if you want to load your prediction model you have to replace this file or modify loader in main file
`models/best.pt`

## start server
```cmd
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

# credits
## fruit detection [model](https://github.com/00011010z/fruit-detection-MGABO) by:
- [张灿](https://github.com/00011010z)
- 长风
- 我爱学习
## 3d models
Creative commons models from sketchfab

# Demo
https://user-images.githubusercontent.com/10486621/198247478-6cd4f959-eae8-4af5-b21b-286ee5b73231.mp4


