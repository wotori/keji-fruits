import onnx
import torchvision.transforms as transforms
from PIL import Image

model = onnx.load("./best.onnx")
onnx.checker.check_model(model)
print(onnx.helper.printable_graph(model.graph))
