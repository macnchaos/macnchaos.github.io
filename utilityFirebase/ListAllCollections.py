import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
#https://saveyourtime.medium.com/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
# Use a service account
cred = credentials.Certificate('/Users/mayankchaturvedi/Desktop/macnchaosblog-firebase-adminsdk-hvpkn-57c45981dc.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

cols = db.collections()
list_col = []
for col in cols:
    list_col.append(col.id)

print(list_col)
print(len(list_col))