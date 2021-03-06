from testing_threads import *
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import random
from objects.text_sentiment import TextSentiment
import nltk
import threading
# imports for NLTK
nltk.download('vader_lexicon')
#imports for flair sentiment anal
# from flair.models import TextClassifier
# from flair.data import Sentence
# classifier = TextClassifier.load('en-sentiment')
SCORE_ARRAY = []
TEXT_PER_THREAD = 10
THREADS = 10


def initialize_db():

    cred = credentials.Certificate(
        "./auth/sentiment-data-baae2-firebase-adminsdk-i1ray-956180ff92.json")

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


def insert_doc(db, collection, uid, data):
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
    text_arrays = []
    if docs.exists:
        text_arrays = docs.to_dict()['queries']
    
    return text_arrays


def get_text_sentiment(text):
    sid = SentimentIntensityAnalyzer()
    return sid.polarity_scores(text)['compound']

# def flair_sentiment(text):
#     sentence = Sentence(text)
#     classifier.predict(sentence)
#     return sentence.labels


def get_text_sentiment_thread(text, analyzed_texts):
    sid = SentimentIntensityAnalyzer()

    for t in text:
        analyzed_texts.append(sid.polarity_scores(t)['compound'])


def get_text_sentiment_interpretation(score):
    if score > 0.6:
        return 'Positive'
    elif score >= 0.33 and score <= 0.6:
        return 'Somewhat Positive'
    elif score < -0.33:
        return 'Negative'
    elif score <= -0.33 and score >= -0.6:
        return 'Somewhat Negative'
    elif score >= -0.33 and score < 0.33:
        return 'Neutral'
    else:
        return 'Error'


def analyze_text(db, collection, uid, text):
    return update_doc(db, collection, uid, text)


def analyze_text_twitter(db, collection, uid, text, topic):
    return update_doc_twitter(db, collection, uid, text, topic)


def analyze_multiple_texts(texts: list):
    analyzed_texts = []
    thread_pool = []

    global TEXT_PER_THREAD

    TEXT_PER_THREAD = int(len(texts)/THREADS)

    for i in range(THREADS):
        thread_pool.append(threading.Thread(
            target=get_text_sentiment_thread, args=(texts[i*TEXT_PER_THREAD:(i+1)*TEXT_PER_THREAD], analyzed_texts)))

    for thread in thread_pool:
        thread.start()

    for thread in thread_pool:
        thread.join()

    return analyzed_texts


def update_text_twitter(db, collection, uid, data):
    db.collection(collection).document(uid).update({
        'queries': firestore.ArrayUnion([data])
    })


def update_doc_twitter(db, collection, uid, text_array, topic):

    uid_ref = db.collection(collection).document(uid)

    #if PRODUCTION
    # text_array = get_all_texts()
    scores = analyze_multiple_texts(text_array)
    #endif PRODUCTION
    
    data = {
        'texts': [],
        'topic': topic,
    }

    for text, score in zip(text_array, scores):
        interpretation = get_text_sentiment_interpretation(score)
        data['texts'].append({
            'tweet': text,
            'score': score,
            'interpretation': interpretation
        })
        
        
    if uid_ref.get().exists:
        update_text_twitter(db, collection, uid, data)
    else:
        # insert_doc(db, collection, uid, {"texts": data})
        insert_doc(db, collection, uid, {"queries": [data]})
    return data


def update_doc(db, collection, uid, text):
    uid_ref = db.collection(collection).document(uid)

    #if PRODUCTION
    # text_array = get_all_texts()
    # at =analyze_multiple_texts(text_array)
    #endif PRODUCTION

    score = get_text_sentiment(text)
    interpretation = get_text_sentiment_interpretation(score)
    if uid_ref.get().exists:
        data = {
            'text': text,
            'score': score,
            'interpretation': interpretation
        }
        update_text(db, collection, uid, data)
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
        insert_doc(db, collection, uid, data)
    return data
