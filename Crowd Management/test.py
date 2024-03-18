import cv2
from ultralytics import YOLO

model = YOLO('best (1).pt')

cap = cv2.VideoCapture(1)

while True:
    _, frame = cap.read()
    model.predict(source=frame, show=True, save=False)
    cv2.waitKey(1)