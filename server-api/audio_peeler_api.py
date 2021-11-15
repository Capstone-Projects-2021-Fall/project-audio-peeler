from flask import Flask, request

app = Flask(__name__)
    
def send_file_to_demucs(file):
    print(file + ' is being sent to demucs')


@app.route("/", methods=["POST"])
def hello():
    if request.method == 'POST':
    	print(request.form['youtubeUrl'])
    return 'error'

if __name__ == '__main__':
    app.run(debug=True)
