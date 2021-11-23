from flask import Flask, jsonify, escape, g,request
from flask_cors import CORS
import db_conn
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_HEADER"] = "Content-Type"

@app.before_request
def initialize_firebase():
    print("Initializing Firebase")
    g.db = db_conn.initialize_db()



@app.route('/all_queries', methods=['GET', 'POST'])
def uui_request():
    body = request.get_json()
    
    if 'uid' in body.keys():
        uid = body['uid']
        data = db_conn.get_all_searched_text(g.db, 'users', uid)
        return jsonify({
            "data": data,
            "status": 1
            })
    

@app.route('/sentiment_data/<uid>', methods=['GET'])
def get_sentiment_data(uid):
    if hasattr(g, 'db'):

        user_sentiment_data_list = db_conn.get_data_by_uid(g.db, 'sentiment_data', uid)

        if user_sentiment_data_list:
            return jsonify({"data": user_sentiment_data_list})

        return jsonify({"No Data": []})

    return jsonify({"error": "No database connection"})


# @app.route('/test', methods=['GET','POST'])
# def test():
#     data = db_conn.get_all_searched_text(g.db, 'users', 'y3XjAUUGTvXBE5m9JKxV')
    
#     return jsonify({"data": data})


@app.route('/sentiment_analysis', methods=['POST'])
def analyze_data():
    body = request.get_json()
    text = body['text']
    uid = body['uid']
    data = db_conn.analyze_text(g.db,u'users', uid, text)
    
    return jsonify({
        "data": data,
        "success": 1})

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5001, debug=True)
