import onnx
import torchvision.transforms as transforms
from PIL import Image

model = onnx.load("./best.onnx")
onnx.checker.check_model(model)
print(onnx.helper.printable_graph(model.graph))

# img = Image.open("./cache/apple_test.jpeg")
# resize = transforms.Resize([224, 224])
# img = resize(img)
# img_ycbcr = img.convert('YCbCr')
# img_y, img_cb, img_cr = img_ycbcr.split()
# to_tensor = transforms.ToTensor()
# img_y = to_tensor(img_y)
# img_y.unsqueeze_(0)

