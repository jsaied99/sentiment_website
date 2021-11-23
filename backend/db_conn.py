import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import random
from objects.text_sentiment import TextSentiment
import nltk
nltk.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer

def initialize_db():
    
    cred = credentials.Certificate("./auth/sentiment-data-baae2-firebase-adminsdk-i1ray-956180ff92.json")
    
    try: 
        firebase_admin.get_app()
    except ValueError:
        firebase_admin.initialize_app(cred)
    
    return firestore.client()
def insert(db, collection, data):
    db.collection(collection).add(data)
    
def delete(db, collection, id):
    db.collection(collection).document(id).delete()
    
def update_text(db, collection, uid, data):
    db.collection(collection).document(uid).update({
        'texts': firestore.ArrayUnion([data])
    })

def insert_doc(db,collection,uid, data):
    db.collection(collection).document(uid).set(data)

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


def get_all_searched_text(db, collection, uid):
    docs = db.collection(collection).document(uid).get()
    data = []
    
    if docs.exists:
        text_arrays = docs.to_dict()['texts']

        for text in text_arrays:
            tmp_sentiment = TextSentiment(text['text'], text['score'])
            data.append(tmp_sentiment.objectify())
        
    return data


def get_text_sentiment(text):
    sid = SentimentIntensityAnalyzer()
    print(text)
    return sid.polarity_scores(text)['compound']

def get_text_sentiment_interpretation(score):
    if score > 0.5:
        return 'Positive'
    elif score < -0.5:
        return 'Negative'
    elif score > -0.5 and score < 0.5:
        return 'Neutral'
    else:
        return 'Error'

def analyze_text(db,collection,uid, text):
    return update_doc(db,collection,uid, text)



def update_doc(db,collection,uid, text):
    uid_ref = db.collection(collection).document(uid)
    score = get_text_sentiment(text)
    interpretation = get_text_sentiment_interpretation(score)
    if uid_ref.get().exists:
        data = {
            'text': text,
            'score': score,
            'interpretation': interpretation
        }
        update_text(db,collection,uid, data)
    else:
        data = {
            'uid': uid,
            'texts': [
                {
                    'text': text,
                    'score': score,
                    'interpretation': interpretation
                }
            ]
        }
        insert_doc(db, collection,uid, data)
    return data

        
    
