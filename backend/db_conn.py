import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def initialize_db():
    
    cred = credentials.Certificate("./auth/sentiment-data-baae2-firebase-adminsdk-i1ray-956180ff92.json")
    
    try: 
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        return db
    except:
        return None

def insert(db, collection, data):
    db.collection(collection).add(data)
    
def delete(db, collection, id):
    db.collection(collection).document(id).delete()
    
def get_all(db, collection):
    docs = db.collection(collection).stream()
    data = []
    
    for doc in docs:
        data.append(doc.to_dict())
    return data

def get_by_id(db, collection, id):
    result = db.collection(collection).document(id).get()
    
    if result.exists:
        return result.to_dict()
    else:
        return None

def get_data_by_uid(db, collection, uid):
    docs = db.collection(collection).where(u'uid', u'==', uid).get()
    data = []

    for doc in docs:
        data.append(doc.to_dict())

    return data

