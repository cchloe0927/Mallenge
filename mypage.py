from flask import Flask, render_template, request, jsonify, Blueprint
from werkzeug.utils import secure_filename
from datetime import datetime
from db import db
mypage = Blueprint("mypage", __name__, url_prefix="/mypage")

# @mypage.route('/')
# def home():
#    return render_template('mypage.html')


# 내가 만든 챌린지 불러오기
@mypage.route('/madechall', methods=["GET"])
def listing():
   challenge_list = list(db.challenge.find({}, {'_id': False}))
   certification_list = list(db.certification.find({}, {'_id': False}))
   return jsonify({'challenge_list': challenge_list, 'certification_list': certification_list})
