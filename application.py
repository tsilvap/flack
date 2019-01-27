import os

from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channel_list = []


@app.route("/")
def index():
    """Index page, prompts for a display name in first visit."""
    return render_template("index.html")


@app.route("/create_channel", methods=["POST"])
def create_channel():
    """Create channel function."""


if __name__ == "__main__":
    socketio.run(app)
