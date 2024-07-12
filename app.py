from flask import Flask, request, jsonify, render_template
import openai
import os

app = Flask(__name__)
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/generate', methods=['POST'])
def generate():
    try:
        data = request.json
        prompt = data.get('prompt')
        
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=300
        )
        
        text_response = response.choices[0].text.strip()
        
        # Example: Adding a link and an image (customize as needed)
        link = "https://example.com"
        image_url = "https://example.com/image.jpg"
        
        response_data = {
            "text": text_response,
            "link": link,
            "image_url": image_url
        }
        
        return jsonify(response_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
