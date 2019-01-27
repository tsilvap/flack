import os

from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


@app.route("/")
def index():
    """Index page, prompts for a display name in first visit."""
    return "Hello, world!"


if __name__ == "__main__":
    socketio.run(app)
