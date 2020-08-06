import json
import eventlet
import redis
eventlet.monkey_patch()

from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

# need to look more into cors_allowed_origins...
# only need cors_allowed_origins on the server client...?
redis_conn = redis.Redis(host='localhost', port=6379, db=0)
# server socket...
socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins="*")

@socketio.on('connect')
def connect():
    print('connected')


@socketio.on('send_msg')
def send_msg(data):
    channel_name = data['channel']
    msg = data['msg']
    print(f'received {msg} for {channel_name}')

    redis_conn.publish(channel_name, msg)


@socketio.on('join_room')
def join_room(data):
    channel_name = data['channel_name']




if __name__ == "__main__":
    # socketio.run function encapsulates the start up of the web server and replaces
    # the app.run() standard Flask development server start up...
    socketio.run(app, debug=True, port=4001)
