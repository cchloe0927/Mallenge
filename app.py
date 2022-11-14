from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://Mallenge:Mallenge@cluster0.jm38if6.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.Mallenge

# 테스트 코드
# doc = {
#     'name': 'bob',
# }
#
# db.users.insert_one(doc)