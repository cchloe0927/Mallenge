from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://Mallenge:Mallenge@cluster0.jm38if6.mongodb.net/?retryWrites=true&w=majority')
db = client.Mallenge

# from bson.json_util import dumps


@app.route('/challengedetail')
def home():
    return render_template('challengedetail.html')


@app.route("/challenge", methods=["GET"])
def challenge_get():
    one_challenge = db.challenge.find_one({'chall_id': 2},{'_id' : False})

    # print(one_challenge)

    return jsonify({'one_challenge': one_challenge})


@app.route("/my_challenge", methods=["POST"])
def partici_post():
    # mychall_id_receive = request.form['mychall_id_give']
    chall_id_receive = request.form['chall_id_give']
    user_id_receive = request.form['user_id_give']

    mychall_id_list = list(db.my_challenge.find({},{'_id': False}))
    mychall_id_made = len(mychall_id_list) + 1

    doc = {
        'mychall_id': int(mychall_id_made),
        'chall_id':int(chall_id_receive),
        'user_id':user_id_receive,
    }
    db.my_challenge.insert_one(doc)


    return jsonify({'msg':'참가 완료!'})
#
#
#
@app.route("/certification", methods=["POST"])
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


@app.route("/certification", methods=["GET"])
def certi_get():
    certi_list = list(db.certification.find({}, {'_id' : False}))
    print(certi_list)

    return jsonify({'certilist': certi_list})



if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)