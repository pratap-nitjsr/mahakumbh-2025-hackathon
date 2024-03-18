import os
import pickle
import numpy as np
import pygame
import cv2
import face_recognition
import cvzone
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import storage
import numpy as np
from datetime import datetime

# Initialize pygame mixer
pygame.mixer.init()

# Load the alarm sound
alarm_sound = pygame.mixer.Sound("alarm.mp3")

cred = credentials.Certificate("facerecognition-a185f-firebase-adminsdk-88h36-3345fd9d69.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facerecognition-a185f-default-rtdb.firebaseio.com/",
    'storageBucket': "facerecognition-a185f.appspot.com"
})

bucket = storage.bucket()
ref = db.reference('FaceRegonition')

cap = cv2.VideoCapture(0)

# Load the encoding file
print("Loading Encode File ...")
file = open('EncodeFile.p', 'rb')
encodeListKnownWithIds = pickle.load(file)
file.close()
encodeListKnown, studentIds = encodeListKnownWithIds
# print(studentIds)
print("Encode File Loaded")

data = {
    "ControlRoom1":
        {
            "Location": [25.4358,81.8463],
            "AlertStatus": "Normal"
        }
    }
for key, value in data.items():
    ref.child(key).set(value)

imgtudent = []
count = 0
while True:
    success, img = cap.read()
    img = cv2.cvtColor(img, cv2.COLOR_BGRA2RGB)
    faceCurFrame = face_recognition.face_locations(img)
    print(faceCurFrame)
    encodeCurFrame = face_recognition.face_encodings(img, faceCurFrame)

    if faceCurFrame:
        for encodeFace, faceLoc in zip(encodeCurFrame, faceCurFrame):
            matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
            faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
            # print("matches", matches)
            # print("faceDis", faceDis)

            matchIndex = np.argmin(faceDis)
            # print("Match Index", matchIndex)

            if matches[matchIndex]:
                # print("Known Face Detected")
                # print(studentIds[matchIndex])
                y1, x2, y2, x1 = faceLoc
                y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
                bbox = 55 + x1, 162 + y1, x2 - x1, y2 - y1
                img = cvzone.cornerRect(img, bbox, l=30, t=5, rt=1, colorR=(255, 0, 255), colorC=(0, 255, 0))
                print(matches)
                print(faceDis)
                if (faceDis[matchIndex] < .50):
                    data = {
                        "ControlRoom1":
                            {
                                "Location": [25.4358,81.8463],
                                "AlertStatus": "Normal"
                            }
                    }
                    for key, value in data.items():
                        ref.child(key).set(value)
                    count = 0
                    alarm_sound.stop()
                    id = studentIds[matchIndex]
                    print(id)
                    img = cv2.putText(img, id, (100, 100), 2, 2, (255, 255, 0), 2)
                else:
                    count += 1
                    if count > 5:
                        # Play alarm sound
                        data = {
                            "ControlRoom1":
                                {
                                    "Location":[25.4358,81.8463],
                                    "AlertStatus":"Warn"
                                }
                        }
                        cv2.putText(img, "Alert", (100,100),2,2,(255,0,255),2)
                        for key, value in data.items():
                            ref.child(key).set(value)
                        print(count)
                        alarm_sound.play()


    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    cv2.imshow("Face Detection", img)
    cv2.waitKey(1)
