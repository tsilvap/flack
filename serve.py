import os
from eventlet import listen, wsgi
from flack.application import app

wsgi.server(listen(('', int(os.getenv('PORT')))), app)
