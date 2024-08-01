# app.py
from flask_cors import CORS
from flask import Flask, request
import openai

TOKEN = "MEllob19892s,dbjer$%TREGW$%$@Q#WD"
openai.api_key = "";

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    message = request.json['message']
    tk = request.json['token']
    if (tk == TOKEN):
    #print(request)
        response = openai.ChatCompletion.create(
          model="gpt-3.5-turbo",
          temperature=0.2, # set the temperature lower to make responses less random
            max_tokens=200,
           # frequency_penalty=-2,
          #presence_penalty=2,
          messages=[
                {"role": "system", "content": "I am a Lisa, a AI teacher from Avidia. Avidia is AI powered LMS platform. It has AI tutors like me and cloud labs with which they can use desktop apps like VSCode, blender, android studio directly from the browser without installing it. The AI teachers are available on the left side of the screen and the cloud lab on the right. This is doubt mode so give short and to the point answers to the questions asked, if the doubt is something which needs lots of explanation(tokens) then ask the user to ask about one specific thing or to scrutinize their doubt. Also because this is doubt mode you can only answer in text and not give examples of code or syntax, only theory explanation can be given. If the user asks for code/syntax examples, tell them to switch to learn mode."},
                {"role": "user", "content": message}
            ]
        )
        return {'message': response['choices'][0]['message']['content']}
    
    else:
        return {'error': 'Invalid token received'}

if __name__ == '__main__':
    app.run(port=5000)
