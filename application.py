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


@app.route("/channel/<string:channel_name>")
def channel(channel_name):
    """Channel page."""
    # TODO: Check if channel exists and handle page appropriately
    if channel_name not in channel_list:
        pass

    return render_template("channel.html", channel_name=channel_name)


if __name__ == "__main__":
    socketio.run(app)
