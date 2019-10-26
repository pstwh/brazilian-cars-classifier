from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from fastai.vision import *

app = Flask(__name__)
clf = load_learner('.', 'model.pkl')

@app.route('/', methods=['POST'])
def predict():
    try:
        images_request_names = request.files.getlist("images")
        predictions = []


        for image_request_name in images_request_names:

            image_request = image_request_name.read()

            image_bytes  = BytesIO(image_request)
            image = open_image(image_bytes)

            result, _, _ = clf.predict(image)

            brand, car = str(result).split('__')
            car = car.replace('_', " ")

            predictions.append({
                'file': image_request_name.filename,
                'brand:': brand,
                'car': car
            })

        return jsonify({
            'status': True,
            'predictions': predictions,
        })
    except:
        return jsonify({
            'status': False
        })


if __name__ == '__main__':
    app.run(debug=True, port=3333)
    print('Running on port 3333')

