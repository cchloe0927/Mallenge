from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
app = Flask(__name__)

from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://Mallenge:Mallenge@cluster0.jm38if6.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.Mallenge

@app.route('/')
def home():
   return render_template('main.html')

@app.route("/posting", methods=["POST"])
def posting():
   contents = request.form["contents_give"]
   challenge_img = request.files["challenge_img_give"]
   start_data = request.form["start_data_give"]
   end_data = request.form["end_data_give"]
   date = request.form["date_give"]

   filename = secure_filename(challenge_img.filename)
   extension = filename.split('.')[-1]
   today = datetime.now()
   mytime = today.strftime('%Y%m%d%H%M%S')
   imgname = f'challenge_img-{mytime}'
   save_to = f'static/challenge_img/{imgname}.{extension}'
   challenge_img.save(save_to)

   doc = {
      "challenge_img": f'{imgname}.{extension}',
      "start_data": start_data,
      "end_data": end_data,
      "contents": contents,
      "date": date,
   }

   db.challenge.insert_one(doc)
   return jsonify({'msg': '포스팅 성공!'})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)