"""The very best Slack clone written in Flask."""
import os

from flask import Flask, jsonify, redirect, render_template, request, url_for
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
socketio = SocketIO(app)


class Channel(object):
    """A channel object."""

    def __init__(self, channel_name):
        self.name = channel_name
        self.messages = []


class ChannelList(object):
    """List of channels singleton."""

    def __init__(self):
        self.list = []

    def append(self, channel):
        """Append a channel to the list."""
        self.list.append(channel)

    def names(self):
        """Return list of channel names."""
        return [channel.name for channel in self.list]


channel_list = ChannelList()


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
    # TODO: Check if channel exists and handle page appropriately
    if channel_name not in channel_list.names():
        return redirect(url_for('index'))

    return render_template(
        'channel.html',
        channel_names=channel_list.names(),
        channel_name=channel_name
    )


if __name__ == '__main__':
    socketio.run(app)
