from flask import Flask, jsonify, escape, g,request
from flask_cors import CORS
import db_conn
from multiprocessing import Process
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_HEADER"] = "Content-Type"

@app.before_first_request
def initialize_firebase():
    print("Initializing Firebase")
    g.db = db_conn.initialize_db()
    # db_conn.insert(g.db, "users", {"name": "John Doe", "age": "30"})
    # db_conn.insert(g.db, "sentiment_data", {"uid": "abc", "body": "30", "senti_score": 0.4})

@app.route('/<name>', methods=['GET', 'POST'])
def home(name):
    if hasattr(g, 'db'):
        return jsonify({"data" : db_conn.get_all(g.db, name)})
    return jsonify({"error": "No database connection"})

@app.route('/sentiment_data/<uid>', methods=['GET'])
def get_sentiment_data(uid):
    if hasattr(g, 'db'):

        user_sentiment_data_list = db_conn.get_data_by_uid(g.db, 'sentiment_data', uid)

        if user_sentiment_data_list:
            return jsonify({"data": user_sentiment_data_list})

        return jsonify({"No Data": []})

    return jsonify({"error": "No database connection"})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)