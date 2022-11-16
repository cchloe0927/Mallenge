from flask import Flask, render_template, request, jsonify, Blueprint
from werkzeug.utils import secure_filename
from datetime import datetime
from db import db
main = Blueprint("main", __name__, url_prefix="/")

# main.html 불러오기
@main.route('/')
def home():
   return render_template('main.html')

# challenge 카드 포스트
@main.route("/posting", methods=["POST"])
def posting():
   # challenge 카드에 고유 id 넣어주기
   challenge_list = list(db.challenge.find({}, {'_id': False}))
   chall_id = len(challenge_list) + 1

   title = request.form["title_give"]
   start_date = request.form["start_date_give"]
   end_date = request.form["end_date_give"]
   content = request.form["content_give"]
   challenge_img = request.files["challenge_img_give"]
   print(title, start_date, end_date, content, challenge_img)

   filename = secure_filename(challenge_img.filename)
   extension = filename.split('.')[-1]
   today = datetime.now()
   timesave = today.strftime('%Y%m%d%H%M%S')
   imgname = f'challenge_img-{timesave}'
   save_to = f'static/challenge_img/{imgname}.{extension}'
   challenge_img.save(save_to)
   print(filename)

   doc = {
      "title": title,
      "challenge_img": f'{imgname}.{extension}',
      "start_date": start_date,
      "end_date": end_date,
      "content": content,
      "chall_id": int(chall_id),
      "participants": 0,
   }


   db.challenge.insert_one(doc)
   return jsonify({'msg': '포스팅 성공!'})

# challenge 카드 전체 리스트 불러오기
@main.route('/listing', methods=["GET"])
def listing():
   challenge_list = list(db.challenge.find({}, {'_id': False}))
   my_challenge_list = list(db.my_challenge.find({}, {'_id': False}))
   return jsonify({'challenge_list': challenge_list, 'my_challenge_list': my_challenge_list})
