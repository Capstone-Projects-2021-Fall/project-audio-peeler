from flask import Flask, request

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def hello():
    if request.method == 'GET':
        return 'here is your data!'
    if request.method == 'POST':
        received_song = request.get_data()
        
        return 'received data'
    return ''

if __name__ == '__main__':
    app.run(debug=True)