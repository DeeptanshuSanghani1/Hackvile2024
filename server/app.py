from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os
import json
from pydub import AudioSegment
from google.cloud import speech
from google.oauth2 import service_account
from dotenv import load_dotenv
from moviepy.editor import VideoFileClip
import io

load_dotenv()

load_dotenv()

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key=os.getenv('API_KEY'))
client_file = json.loads(os.getenv('TEXT_TO_SPEECH_KEY'))
credentials = service_account.Credentials.from_service_account_info(client_file)


@app.route("/")
def index():
    return "Server is running"


@app.route("/get-questions", methods=["POST"])
def get_questions():
    job_description = request.json.get("job_description")
    questions = get_interview_questions(job_description)

    return jsonify(questions)

@app.route("/get-feedback", methods=["POST"])
def get_feedback():
    response = {}
    input_file1 = request.json.get("recording1")
    input_file2 = request.json.get("recording2")
    input_file3 = request.json.get("recording3")

    question1 = request.json.get("question1")
    question2 = request.json.get("question2")
    question3 = request.json.get("question3")


    response["user_response1"] = convert_speech_to_text(upload_video(input_file1))
    response["user_response2"] = convert_speech_to_text(upload_video(input_file2))
    response["user_response3"] = convert_speech_to_text(upload_video(input_file3))

    response["feedback1"] = generate_feedback(response["user_response1"], question1)
    response["feedback2"] = generate_feedback(response["user_response2"], question2)
    response["feedback3"] = generate_feedback(response["user_response3"], question3)

    return jsonify(response)

def upload_video():
    try:
        # Receive the blob data from the frontend
        blob_data = request.data

        # Process the MP4 file using moviepy in memory
        video = VideoFileClip(io.BytesIO(blob_data))

        # You can now work with 'video' (e.g., edit, analyze, etc.)
        # For example, you can save it as a new MP4 file or return it as a response

        # Example: Saving as a new MP4 file in memory
        output_buffer = io.BytesIO()
        video.write_videofile(output_buffer, format="mp4")
        output_buffer.seek(0)

        # Return the video as a response
        return Response(output_buffer, content_type="video/mp4")

    except Exception as e:
        return str(e)

def generate_feedback(response_text, question_text):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a hiring manager and a speech analyst. I will give you the question that the applicant was asked and their response.",
            },
            {
                "role": "user",
                "content": f"""
                Analyze the this response and provide feedback for the applicant to help them improve their 
                response as well as mistakes they might have made. Pay attention to their grammar and filler words. 
                The question was "{question_text}" and the response was "{response_text}"
                """,
            },
        ],
    )

    if response.choices and len(response.choices) > 0:
        message = response.choices[0].message
        json_response = json.loads(response.choices[0].message.content)
        if message.content:
            try:
                questions_json = json.loads(message.content)
                return questions_json
            except json.JSONDecodeError:
                return {"response": message.content.strip()}
    return {"error": "No response text was provided."}


def get_interview_questions(job_description):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that provides interview questions based on job titles or job descriptions.",
            },
            {
                "role": "user",
                "content": f"""
            Generate 3 interview questions for the following job description: {job_description}
            Please return the questions as a JSON object, with the keys being question1, question2 and question3.
            """,
            },
        ],
    )

    if response.choices and len(response.choices) > 0:
        message = response.choices[0].message
        json_response = json.loads(response.choices[0].message.content)
        if message.content:
            try:
                questions_json = json.loads(message.content)
                return questions_json
            except json.JSONDecodeError:
                return {"response": message.content.strip()}
    return {"error": "No questions were generated."}

def convert_speech_to_text(input_file, output_file):
    input_file = convert_mp4_to_mp3(input_file)

    client = speech.SpeechClient(credentials=credentials)

    with open(output_file, "rb") as audio_file:
        content = audio_file.read()
    
    audio = speech.RecognitionAudio(content=content)

    filler_words = [
    "um", "uh", "ah", "like", "you know", "so", "actually", "basically",
    "seriously", "literally", "I mean", "okay", "right", "you see", "well",
    "er", "you know what I mean", "I guess", "I suppose", "sort of", "kind of",
    "hmm", "hey", "listen", "look"
    ]

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=16000,
        language_code="en-US",
        speech_contexts=[{"phrases": filler_words}]
    )

    output = ""
    try:
        response = client.recognize(config=config, audio=audio)
        # print(f"Response: {response}")

        if not response.results:
            print("No results returned from the Speech-to-Text API.")
            return

        for result in response.results:
            # print("Transcript: {}".format(result.alternatives[0].transcript))
            if result.alternatives[0].transcript != None:
                output += result.alternatives[0].transcript


    except Exception as e:
        print(f"An error occurred: {e}")

    return output

def convert_mp4_to_mp3(input_file):
    audio = AudioSegment.from_file(input_file, format="mp4")
    output_file = "output.mp3"
    audio.export(output_file, format="mp3")
    return output_file


if __name__ == "__main__":
    app.run(debug=True)
