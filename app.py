from flask import Flask
from main import main
from mypage import mypage
app = Flask(__name__)

app.register_blueprint(main)
app.register_blueprint(mypage)

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)