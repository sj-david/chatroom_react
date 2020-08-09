import json
import eventlet
import redis
eventlet.monkey_patch()

from flask import Flask
from flask_socketio import SocketIO, emit
from collections import defaultdict

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

# redis connection...
redis_conn = redis.Redis(host='localhost', port=6379, db=0)

# server socket
# Cross-origin resource sharing (CORS) - only needs to be set for server socket.
socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins="*")


@socketio.on('connect', namespace='/channel_1')
def connect():
    print('connected')


@socketio.on('new_msg')
def send_msg(data):
    """

    """
    channel_name = data['channel']
    msg = data['msg']

    print(f'received {msg} for {channel_name}')

    redis_conn.publish(channel_name, msg)


@socketio.on('get_new_msg')
def get_new_msg(data):
    json_data = json.loads(data)

    socketio.emit('get_new_msg', json_data['msg'])


if __name__ == '__main__':
    # socketio.run function encapsulates the start up of the web server and replaces
    # the app.run() standard Flask development server start up...
    socketio.run(app, debug=True, port=4001)
