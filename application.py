"""The very best Slack clone written in Flask."""
import json
import os
from collections import deque
from datetime import datetime

from flask import Flask, jsonify, redirect, render_template, request, url_for
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
socketio = SocketIO(app)


class Message(object):
    """A chat message."""

    def __init__(self, display_name, message_text):
        self.display_name = display_name
        self.message_text = message_text
        self.date = datetime.now()


class Channel(object):
    """A messaging channel.

    A channel stores a maximum of 100 messages, and if new messages are
    added the oldest ones will be deleted.
    """

    def __init__(self, channel_name):
        self.name = channel_name
        self.messages = deque(maxlen=100)

    def add_message(self, message):
        """Add a message to channel."""
        self.messages.append(message)


class ChannelList(object):
    """List of channels singleton."""

    def __init__(self):
        self.list = []

    def append(self, channel):
        """Append a channel to the list."""
        self.list.append(channel)

    def get(self, channel_name):
        """Return a channel given the channel name."""
        for channel in self.list:
            if channel.name == channel_name:
                return channel

        return None

    def names(self):
        """Return list of channel names."""
        return [channel.name for channel in self.list]


channel_list = ChannelList()

################################################################################
#################################### ROUTES ####################################
################################################################################


@app.route('/')
def index():
    """Index page, prompts for a display name in first visit."""
    return render_template('index.html', channel_names=channel_list.names())


@app.route('/create_channel', methods=['POST'])
def create_channel():
    """Create channel function."""
    channel_name = request.form.get('channel-name')

    if channel_name in channel_list.names():
        return jsonify({'success': False})

    channel = Channel(channel_name)
    channel_list.append(channel)
    return jsonify({'success': True})


@app.route('/channel/<string:channel_name>')
def channel(channel_name):
    """Channel page."""
    if channel_name not in channel_list.names():
        return redirect(url_for('index'))

    return render_template(
        'channel.html',
        channel_names=channel_list.names(),
        channel_name=channel_name
    )


@app.route('/messages/<string:channel_name>')
def messages(channel_name):
    """Return messages from `channel_name`."""
    channel = channel_list.get(channel_name)

    return jsonify([{'displayName': m.display_name,
                     'messageText': m.message_text,
                     'date': m.date} for m in channel.messages])


@socketio.on('message')
def handle_message(data):
    channel_name = data['channelName']
    display_name = data['displayName']
    message_text = data['messageText']

    message = Message(display_name, message_text)
    channel = channel_list.get(channel_name)
    channel.add_message(message)

    # Broadcast that message on channel `channel_name` has been received
    emit('message received', {'channelName': channel_name}, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
