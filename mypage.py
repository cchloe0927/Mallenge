from flask import Flask, render_template, request, jsonify, Blueprint
from werkzeug.utils import secure_filename
from datetime import datetime
from db import db


all_users = list(db.users.find({},{'_id':False}))
all_challenge = list(db.challenge.find({},{'_id':False}))

mypage = Blueprint("mypage", __name__, url_prefix="/mypage")

@mypage.route('/')
def home():
   return render_template('mypage.html')


@mypage.route('/test', methods=['GET'])
def test_get():
   title_receive = request.args.get('title_give')
   print(title_receive)
   return jsonify({'result':'success', 'msg': '이 요청은 GET!'})