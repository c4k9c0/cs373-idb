from flask import Flask, send_file

app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return send_file('index.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
