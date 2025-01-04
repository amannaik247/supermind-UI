from flask import Flask, render_template, jsonify, request
from ask_bot import *

app = Flask(__name__)

@app.route('/ask-bot')
def index():
    return render_template('index.html')

@app.route('/call_function', methods = ['POST'])
def call_function():
    data = request.get_json()
    result = ask_chat_bot(data)
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)
    