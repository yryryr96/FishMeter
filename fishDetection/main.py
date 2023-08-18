import cv2
from fastapi import FastAPI, UploadFile
from fastapi.encoders import jsonable_encoder

from ultralytics import YOLO

from PIL import Image
from io import BytesIO

app = FastAPI()

@app.on_event("startup")
async def load_ai_model():
    global model
    model = YOLO('C:/fastapi/best.pt')
    print("AI Model Loaded")

@app.post("/predict")
async def process_home_form(file: UploadFile):

    predicts = model(Image.open(BytesIO(await file.read())), conf=0.6)

    result_boxes = []

    for box in predicts[0].boxes:
        result_boxes.append(box.data[0].cpu().numpy().tolist())

    return jsonable_encoder(result_boxes)

@app.get("/test")
async def test():
    return {"result": "success"}


if __name__ == '__main__':
    import uvicorn

    app_str = 'main:app'
    uvicorn.run(app_str, host='0.0.0.0', port=8000, reload=True, workers=4)