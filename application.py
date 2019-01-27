import os

from flask import Flask, jsonify, render_template, request
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
    channel_name = request.form.get("channel-name")

    if channel_name in channel_list:
        return jsonify({"success": False})

    channel_list.append(channel_name)
    return jsonify({"success": True})


if __name__ == "__main__":
    socketio.run(app)
