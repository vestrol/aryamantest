from texify.inference import batch_inference
from texify.model.model import load_model
from texify.model.processor import load_processor
from PIL import Image


def img_to_tex(filepath):
    model = load_model()
    processor = load_processor()
    img = Image.open(filepath) # Your image name here
    results = batch_inference([img], model, processor)

    return results
