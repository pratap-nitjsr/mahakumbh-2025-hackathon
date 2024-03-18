from ultralytics import YOLO
import supervision as sv
import cv2
import cvzone
import torch
from ultralytics.utils.plotting import Annotator
import time
# import imutils

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("facerecognition-a185f-firebase-adminsdk-88h36-3345fd9d69.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facerecognition-a185f-default-rtdb.firebaseio.com/"
})


ref = db.reference('CrowdManagement')

VIDEOPATH = r"C:\Users\PRATAP\Desktop\social\pk\yolov8-crowd-gathering\Biggest Human Gathering in the World (Kumbh Mela 2019).mp4"
CCTV_RTSP = ''
TIMER = 5 #Seconds
people_LIMIT = 5

crowd_detector = YOLO('best (6).pt')
# crowd_detector = YOLO("./best1.pt")
# crowd_detector.fuse()

######## VIDEO CAPTURE
video = cv2.VideoCapture(VIDEOPATH)

fpsReader = cvzone.FPS()

print(torch.cuda.is_available())

box_annotator = sv.BoxAnnotator(
        thickness=2,
        text_thickness=2,
        text_scale=1
    )

class_list = crowd_detector.model.names
classes = ['people']
prev = time.time()

# fourcc = cv2.VideoWriter_fourcc(*'mp4v')
# video_save = cv2.VideoWriter('output/output.mp4', fourcc, 30, (1680, 945))

while True:

    #Read a new frame
    ret, frame = video.read()

    # Check if frame is read successfully
    if not ret:
        continue

    ### Window Resize
    height, width = frame.shape[:2]
    cv2.namedWindow('Crowd Gathering', cv2.WINDOW_NORMAL)
    cv2.resizeWindow('Crowd Gathering', 1680, 945)

    ### FPS update
    fps, frame = fpsReader.update(frame, pos=(15,30), color = (0,255,0), scale = 2, thickness= 2)

    ### Detections
    annotator = Annotator(frame)
    crowd_detections = crowd_detector.predict(frame)
    peopleCount = {}
    timer = 0

    for result in crowd_detections:
        boxes = result.boxes.cpu().numpy()

        for box in boxes:
            (x, y, w ,h) = box.xyxy[0]

            ### Finding Centre Points
            cx = int((x + w )/ 2)
            cy = int((y + h) / 2)
            cy_bot = int(h)
            # cv2.circle(frame, (cx,cy), 3, (0,255,0), -1)

            ### Class Declaration
            b = box.xyxy[0].astype(int)
            c = int(box.cls[0])
            class_names = class_list[int(c)]
            # id = int(box.id[0]) if box.id is not None else 0

            if class_names == 'people':
                if not c in peopleCount.keys():
                    peopleCount[c] = 1
                else:
                    peopleCount[c] += 1

                annotator.box_label(b, color=(255,0,0))

        for key in peopleCount.keys():
            # print(class_list[key] + " : " + str(peopleCount[key]))
            cvzone.putTextRect(frame, 'people: ' + str(peopleCount[key]), (200,50), 3, thickness=2, colorT= (255,255,255), colorR= (0,0,0), font= cv2.FONT_HERSHEY_PLAIN  )
            # cv2.putText(frame, 'people Count: ' + str(peopleCount[key]), (150,30), cv2.FONT_HERSHEY_COMPLEX, 1, color = (255,255,255), thickness= 1)
            curr = time.time()
            data = {
                "Camera1":
                    {
                        "Count":peopleCount[key],
                        "Location":[25.4358,81.8463],
                    }
            }

            for key, value in data.items():
                ref.child(key).set(value)
            # if peopleCount[key] > people_LIMIT:
            #
            #     if curr-prev > TIMER:
            #         elapsed_time = curr-prev
            #         text_area = (1350, 80)
            #         cvzone.putTextRect(frame, 'Crowd Detected', text_area, 2, thickness=3, colorT=(255,255,255), colorR = (0,0,255), font=cv2.FONT_HERSHEY_DUPLEX)
            # else:
            #     prev = curr

    # video_save.write(frame)
    cv2.imshow('Crowd Gathering', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video.release()
# video.save_release()
cv2.destroyAllWindows()
