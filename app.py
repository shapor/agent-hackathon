# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable Cross-Origin Resource Sharing for frontend-backend communication

# # Define a route to handle form submission
# @app.route('/api/submit', methods=['POST'])
# def submit_form():
#     data = request.json
#     company_name = data.get('company_name')
#     company_url = data.get('company_url')
#     inquiry_text = data.get('inquiry_text')

#     # Printing
#     print(f"Company Name: {company_name}")
#     print(f"Company URL: {company_url}")
#     print(f"Inquiry Text: {inquiry_text}")

#     # Return a success response
#     return jsonify({'message': 'Form submitted successfully!'}), 200

# if __name__ == '__main__':
#     app.run(debug=True)
# import os
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from dotenv import load_dotenv
# import anthropic

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)

# # Load environment variables from .env file
# load_dotenv()

# # Get the API key from environment variables
# api_key = os.getenv("ANTHROPIC_API_KEY")

# # Initialize the Anthropics client
# client = anthropic.Anthropic(api_key=api_key)

# # Define a route to handle form submission
# @app.route('/api/submit', methods=['POST'])
# def submit_form():
#     data = request.json
#     company_name = data.get('company_name')
#     company_url = data.get('company_url')
#     inquiry_text = data.get('inquiry_text')

#     # Static response message (could be dynamically generated)
#     response_message = f"""
#     {company_name} is a well-established and highly regarded plumbing company serving the San Francisco area.
#     Here's an overall profile and sentiment of the company:
    
#     **Company Overview**: {company_name} is a family-owned and operated business that has been serving San Francisco for over 20 years. They offer both residential and commercial plumbing services, with a team of certified professionals and around 40 employees.
    
#     **Services**:
#     - General plumbing repairs
#     - Water heater installation and repair
#     - Heating and air conditioning services
#     - Sewer and drain services
#     - Emergency plumbing services
    
#     **Reputation and Customer Satisfaction**:
#     - 4.4 out of 5 stars on Yelp, based on 123 reviews
#     - 5 out of 5 stars on Angi
#     Customers frequently praise the company for their professionalism, punctuality, and quality of work.
    
#     **Overall Sentiment**:
#     The overall sentiment towards {company_name} is overwhelmingly positive. Customers appreciate their honesty, reliability, and the quality of their work.
#     """

#     # Send the response_message to Anthropics to convert it to Markdown
#     anthropic_response = client.completions.create(
#         model="claude-3-5-sonnet-20240620",  # You can use an appropriate model here
#         max_tokens=1000,
#         temperature=0,
#         prompt=f"You are a report generator. Convert the following text to an HTML Markdown formal report: {response_message}. Also, provide some metrics and ratings based on the data with proper markup format.",
#     )

#     # Get the markdown formatted content from Anthropics' response
#     markdown_response = anthropic_response['completion']
#     print(markdown_response)

#     # Return the markdown response
#     return jsonify({'message': markdown_response}), 200


# if __name__ == '__main__':
#     app.run(debug=True)
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import anthropic

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
api_key = os.getenv("ANTHROPIC_API_KEY")

# Initialize the Anthropic client
client = anthropic.Anthropic(api_key=api_key)

# Define a route to handle form submission
@app.route('/api/submit', methods=['POST'])
def submit_form():
    data = request.json
    company_name = data.get('company_name')
    company_url = data.get('company_url')
    inquiry_text = data.get('inquiry_text')

    # Static response message (could be dynamically generated)
    response_message = f"""
    {company_name} is a well-established and highly regarded plumbing company serving the San Francisco area.
    Here's an overall profile and sentiment of the company:
    
    **Company Overview**: {company_name} is a family-owned and operated business that has been serving San Francisco for over 20 years. They offer both residential and commercial plumbing services, with a team of certified professionals and around 40 employees.
    
    **Services**:
    - General plumbing repairs
    - Water heater installation and repair
    - Heating and air conditioning services
    - Sewer and drain services
    - Emergency plumbing services
    
    **Reputation and Customer Satisfaction**:
    - 4.4 out of 5 stars on Yelp, based on 123 reviews
    - 5 out of 5 stars on Angi
    Customers frequently praise the company for their professionalism, punctuality, and quality of work.
    
    **Overall Sentiment**:
    The overall sentiment towards {company_name} is overwhelmingly positive. Customers appreciate their honesty, reliability, and the quality of their work.
    """

    # Send the response_message to Anthropic to convert it to HTML
    anthropic_response = client.messages.create(
        model="claude-3-sonnet-20240229",
        max_tokens=1000,
        temperature=0,
        messages=[
         {
            "role": "user",
            "content": f"""
            Generate an HTML document for the following company profile. Use modern, professional CSS styling with padding, spacing, and a clean font. 
            Use subtle background colors, make headings bold and large, and ensure lists are properly indented and spaced. 
            The document should look polished and user-friendly. Here's the content:\n\n{response_message}
            """
        }
        ]
    )

    # Get the HTML formatted content from Anthropic's response
    html_response = anthropic_response.content[0].text

    # Return the HTML response
    return jsonify({'message': html_response}), 200

if __name__ == '__main__':
    app.run(debug=True) 

