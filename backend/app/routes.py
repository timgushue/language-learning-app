""" Proxy API for openAI calls"""
from dotenv import load_dotenv
from openai import OpenAI
from flask import Flask, request, jsonify, Response
import os
from datetime import datetime


load_dotenv()

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    
    if test_config is not None:
        app.config.update(test_config)

    # a simple page that says hello
    @app.route('/')
    def hello():
        return jsonify({"message": "Welcome"})

    @app.route('/chat', methods=['POST'])
    def chat():
        user_messages = request.json.get("messages")
        
        if not user_messages:
            return jsonify({"error": "No messages provided"}), 400

        response = call_openai_chat(user_messages)
        return jsonify({"response": response})

    def call_openai_chat(user_messages):
        try:
            client = OpenAI()
            response = client.chat.completions.create(
                model="gpt-3.5-turbo-1106",
                response_format={ "type": "json_object" },
                messages=user_messages
            )
            return response.choices[0].message.content
        except Exception as e:
            # Handle exceptions (e.g., API errors, network issues)
            return str(e)
        
    @app.route('/tts', methods=['POST'])
    def tts():
        data = request.json
        text = data['text']

        client = OpenAI()

        try:
            # Create a filename with a timestamp
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            speech_file_path = os.path.join(os.path.dirname(__file__), f"speech_{timestamp}.mp3")

            response = client.audio.speech.create(
                model="tts-1",
                voice="fable",
                input=text
            )
            response.stream_to_file(speech_file_path)

            def generate():
                with open(speech_file_path, "rb") as f:
                    while chunk := f.read(4096):
                        yield chunk

            return Response(generate(), mimetype="audio/mpeg")
        
        except Exception as e:
            # Handle exceptions here
            return jsonify({"error": "An error occurred: " + str(e)}), 500


    return app
