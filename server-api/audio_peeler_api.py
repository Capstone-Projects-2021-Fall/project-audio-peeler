from flask import Flask, request

app = Flask(__name__)
    
def send_file_to_demucs(file):
    print(file + ' is being sent to demucs')


@app.route("/", methods=["POST"])
def hello():
    if request.method == 'POST':
        received_song = request.get_data()
        components = send_file_to_demucs(received_song)
        # song will be handled by demucs and the compoent files will be returned
        return 'received data: ' + components + '.'
    return 'error'

if __name__ == '__main__':
    app.run(debug=True)
