import eventlet
eventlet.monkey_patch()

import redis
import socketio
from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

sio = socketio.Client()

class RedisConsumer:
    def __init__(self):
        self.redis_conn = redis.Redis(host='localhost', port=6379, db=0)
        self.redis_pubsub = self.redis_conn.pubsub()
        # channel that get subscriptions from redis
        self.redis_pubsub.subscribe('join_room')
        self.api_gateway_socket = socketio.Client().connect('http://localhost:4001')

    def listen_to_redis(self):
        # message for subscriptions...
        for message in self.redis_pubsub.listen():
            message_type = message['type']

            if message_type == 'message':
                print(message)
            elif message_type == 'join_room':
                # subscribe using redis_pubsub.subscribe(channel_name)
                print(message)


# client web socket...

if __name__ == '__main__':

    redis_consumer = RedisConsumer()

    redis_consumer.listen_to_redis()
