from flask import Flask, render_template, request, jsonify, Blueprint
from werkzeug.utils import secure_filename
from datetime import datetime
from db import db
import jwt
SECRET_KEY = 'SPARTA'
mypage = Blueprint("mypage", __name__, url_prefix="/mypage")

# @mypage.route('/')
# def home():
#    return render_template('mypage.html')


# 내가 만든 챌린지 불러오기
# @mypage.route('/madechall', methods=["GET"])
# def listing():
#    challenge_list = list(db.challenge.find({}, {'_id': False}))
#    certification_list = list(db.certification.find({}, {'_id': False}))
#    return jsonify({'challenge_list': challenge_list, 'certification_list': certification_list})

@mypage.route('/madechall', methods=["GET"])
def listing():
   token_receive = request.cookies.get('mytoken')
   try:
      # 로그인 되었을 때 실행할것들
      payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
      user_info = db.user.find_one({"user_id": payload['id']})

      # login 토큰 통해서 use_id 넣어주기
      user_id = payload['id']

      challenge_list = list(db.challenge.find({}, {'_id': False}))
      #챌린지값 보내기
      certification_list = list(db.certification.find({}, {'_id': False}))
      #코멘트값 보내기
      my_challenge_list = list(db.my_challenge.find({}, {'_id': False}))
      # 참여한 챌린지 보내기

      return jsonify({'challenge_list': challenge_list, 'certification_list': certification_list, 'my_challenge_list' : my_challenge_list, 'user_id': user_id})
   except jwt.ExpiredSignatureError:
      return jsonify({'result': 'fail', 'msg': '로그인이 만료되었습니다.'})
   except jwt.exceptions.DecodeError:
      return jsonify({'result': 'fail', 'msg': '로그인이 실패했습니다.'})