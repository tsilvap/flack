from eventlet import listen, wsgi
from flack.application import app

wsgi.server(listen(('', 8090)), app)
