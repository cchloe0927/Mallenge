from flask import Flask, render_template, request, jsonify, Blueprint, url_for, redirect

challengedetail= Blueprint("challengedetail", __name__, url_prefix="/challengedetail")
from db import db
import jwt

SECRET_KEY = 'SPARTA'
# from bson.json_util import dumps


@challengedetail.route('/')
def home():
    return render_template('challengedetail.html')


# //선택된 챌린지 상세 보여주기
@challengedetail.route("/challenge", methods=["GET"])
def challenge_get():
    challenge_card_id = request.args.get('challenge')
    print(challenge_card_id)
    one_challenge = db.challenge.find_one({'chall_id': int(challenge_card_id)},{'_id' : False})


    return jsonify({'one_challenge': one_challenge})


# //참가하기 버튼 눌렀을 때
@challengedetail.route("/my_challenge", methods=["POST"])
def partici_post():
    # mychall_id_receive = request.form['mychall_id_give']
    chall_id_receive = request.form['chall_id_give']
    # user_id_receive = request.form['user_id_give']

    token_receive = request.cookies.get('mytoken')
    try:
        #로그인 되었을 때 실행할것들
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        # user_info = db.user.find_one({"user_id": payload['id']})
        mychall_id_list = list(db.my_challenge.find({}, {'_id': False}))
        mychall_id_made = len(mychall_id_list) + 1

        doc = {
            'mychall_id': int(mychall_id_made),
            'chall_id': int(chall_id_receive),
            'user_id': payload['id'], #user_info['user_id']
        }
        db.my_challenge.insert_one(doc)

        return jsonify({'result':'success', 'msg': '참가 완료!'})
    except jwt.ExpiredSignatureError:
        return jsonify({'result':'fail', 'msg': '참가 완료!'})
    except jwt.exceptions.DecodeError:
        return jsonify({'result':'fail', 'msg': '참가 완료!'})


# //인증 댓글 저장
@challengedetail.route("/certification", methods=["POST"])
def certi_post():
    cer_id_list = list(db.certification.find({}, {'_id': False}))
    cer_id_made = len(cer_id_list) + 1


    token_receive = request.cookies.get('mytoken')
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    user_info = db.user.find_one({"user_id": payload['id']})
    # print(user_info)
    user_id_receive = payload['id']
    user_nickname = user_info['nick']


    # cer_id_receive = request.form['cer_id_give']
    comment_receive = request.form['comment_give']
    # user_id_receive = request.form['user_id_give']
    chall_id_receive = request.form['chall_id_give']
    date_receive = request.form['date_give']
    count = 0
    certi_count = db.my_challenge.find({
        'user_id' : {
            "$eq" : user_id_receive
        },
        'chall_id' : {
        "$eq" : int(chall_id_receive)
        }
    })
    if certi_count:
        certi_user_list = list(db.certification.find({'user_id':user_id_receive, 'chall_id':int(chall_id_receive) }, {'_id': False}))
        count = len(certi_user_list) + 1

    doc = {
        'cer_id': int(cer_id_made),
        'comment':comment_receive,
        'user_id': user_id_receive,
        'chall_id' : int(chall_id_receive),
        'nick' : user_nickname,
        'date' : date_receive,
        'count' : int(count)
    }

    print(doc)
    db.certification.insert_one(doc)
    return jsonify({'msg':'인증 완료!'})


# 인증댓글 보여주기
@challengedetail.route("/certification", methods=["GET"])
def certi_get():
    challenge_card_id = request.args.get('challenge')
    print(challenge_card_id)

    # token_receive = request.cookies.get('mytoken')
    #
    # payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    # print(type(payload['id']))
    # user_info = db.user.find_one({"id": payload['id']})
    # print(user_info)

    # try:
        # 로그인 되었을 때 실행할것들
        # payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        # user_info = db.user.find_one({"user_id": payload['id']})
        # print(user_info)

        # user_id: payload['id']  # user_info['user_id']


        # except jwt.ExpiredSignatureError:
        # return jsonify({'result': 'fail', 'msg': '참가 완료!'})
        #
        # except jwt.exceptions.DecodeError:
        # return jsonify({'result': 'fail', 'msg': '참가 완료!'})

    certi_list = list(db.certification.find({'chall_id': int(challenge_card_id)}, {'_id': False}))
    # user_nickname = user_info['nick']
    # print(user_nickname)

    return jsonify({'certilist': certi_list})



