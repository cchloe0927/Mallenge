from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
app = Flask(__name__)

from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://Mallenge:Mallenge@cluster0.jm38if6.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.Mallenge

all_users = list(db.users.find({},{'_id':False}))
all_challenge = list(db.challenge.find({},{'_id':False}))


@app.route('/')
def home():
   return render_template('mypage.html')


@app.route('/test', methods=['GET'])
def test_get():
   title_receive = request.args.get('title_give')
   print(title_receive)
   return jsonify({'result':'success', 'msg': '이 요청은 GET!'})


if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)