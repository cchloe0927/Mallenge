from flask import Flask, render_template, request, jsonify, Blueprint, url_for, redirect

challengedetail= Blueprint("challengedetail", __name__, url_prefix="/challengedetail")
from db import db
import jwt

SECRET_KEY = 'SPARTA'
# from bson.json_util import dumps


@challengedetail.route('/')
def home():
    return render_template('challengedetail.html')


@challengedetail.route("/challenge", methods=["GET"])
def challenge_get():
    challenge_card_id = request.args.get('challenge')
    print(challenge_card_id)
    one_challenge = db.challenge.find_one({'chall_id': int(challenge_card_id)},{'_id' : False})

    # print(one_challenge)

    return jsonify({'one_challenge': one_challenge})


@challengedetail.route("/my_challenge", methods=["POST"])
def partici_post():
    # mychall_id_receive = request.form['mychall_id_give']
    chall_id_receive = request.form['chall_id_give']
    user_id_receive = request.form['user_id_give']

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

@challengedetail.route("/certification", methods=["POST"])
def certi_post():
    cer_id_list = list(db.certification.find({}, {'_id': False}))
    cer_id_made = len(cer_id_list) + 1

    # cer_id_receive = request.form['cer_id_give']
    comment_receive = request.form['comment_give']
    user_id_receive = request.form['user_id_give']
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
        'user_id' : user_id_receive,
        'chall_id' : int(chall_id_receive),
        'date' : date_receive,
        'count' : int(count)
    }

    print(doc)
    db.certification.insert_one(doc)
    return jsonify({'msg':'인증 완료!'})

@challengedetail.route("/certification", methods=["GET"])
def certi_get():
    certi_list = list(db.certification.find({}, {'_id' : False}))
    print(certi_list)
    return jsonify({'certilist': certi_list})


