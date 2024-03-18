from ultralytics import YOLO
model = YOLO('yolov8l.pt')
model.predict(source=r"C:\Users\PRATAP\Downloads\30 Minutes of Cars Driving By in 2009 (online-video-cutter.com).mp4", stream=False, show=True)
print(model.names)