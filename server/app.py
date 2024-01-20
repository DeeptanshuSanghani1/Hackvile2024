from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

print(os.getenv("API_KEY"))
client = OpenAI(api_key=os.getenv("API_KEY"))


@app.route("/")
def index():
    return "Server is running"


@app.route("/get-questions", methods=["POST"])
def get_questions():
    # job_description = request.form["job_description"]
    job_description = request.json.get("job_description")
    questions = get_interview_questions(job_description)

    return jsonify(questions)


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


if __name__ == "__main__":
    app.run(debug=True)
