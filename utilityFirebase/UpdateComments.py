import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
#https://saveyourtime.medium.com/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
# Use a service account
cred = credentials.Certificate('/Users/mayankchaturvedi/Desktop/macnchaosblog-firebase-adminsdk-hvpkn-57c45981dc.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

coll = db.collection(u"posts").stream()
for element in coll:
    id = element.id
    element_dict = element.to_dict()
    data = {
        "parent":id,
        "children":[],
        "author":element_dict["author"],
        "timeStamp":element_dict["timeStamp"],
        "text":"",
        "post_id":id,
        "depth":0
    }
    db.collection("comments").document(id).set(data)