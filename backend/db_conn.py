import firebase_admin
from firebase_admin import credentials
# from firebase_admin import db
from firebase_admin import firestore



def initialize_db():
    
    cred = credentials.Certificate("./auth/sentiment-data-baae2-firebase-adminsdk-i1ray-956180ff92.json")
    
    try: 
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        return db
    except:
        return None
# doc_ref = db.collection(u'users').document(u'alovelace')
# doc_ref.set({
#     u'first': u'Ada',
#     u'last': u'Lovelace',
#     u'born': 1815
# })

def insert(db, collection, data):
    db.collection(collection).add(data)