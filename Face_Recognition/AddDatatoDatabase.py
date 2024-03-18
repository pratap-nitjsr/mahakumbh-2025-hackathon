import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("facerecognition-a185f-firebase-adminsdk-88h36-3345fd9d69.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facerecognition-a185f-default-rtdb.firebaseio.com/"
})


ref = db.reference('Students')

data = {
    "2022UGCS042":
        {
            "name":"Mayank",
            "Age":19
        },
    "2022UGCS097":
        {
            "name":"Harshit",
            "Age":19
        },
    "2022UGCS112":
        {
            "name":"Abhijeet",
            "Age":200
        },
    "2022UGCS093":
        {
            "name":"Hitanshu",
            "Age":20
        }
}

for key, value in data.items():
    ref.child(key).set(value)