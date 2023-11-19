from flask import Flask
from flask_cors import CORS
from .routes import create_app

# Create the Flask app instance
app = create_app()

# Configure CORS for the app
CORS(app)

if __name__ == "__main__":
    app.run()
