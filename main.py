from flask import Flask, render_template
app = Flask(__name__)

from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://Mallenge:Mallenge@cluster0.jm38if6.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.Mallenge

@app.route('/')
def home():
   return render_template('main.html')

if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)