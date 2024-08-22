from get_text import read_text
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/get_text": {"origins": "*"}})

app_path = '/home/yoni/ocr-bypass/'

@app.route('/get_text', methods=['POST'])
def get_text():
    image = request.files['image']
    image.save('image.png')

    text = read_text(app_path+'image.png')

    return jsonify({'text': text})


if __name__ == '__main__':
    app.run(debug=True)