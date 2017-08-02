#!/usr/local/bin/python3

from cgitb import enable 
enable()

from os import environ
from shelve import open
from http.cookies import SimpleCookie

print('Content-Type: text/html')
print()

result = """
   <p>You do not have permission to access this page.</p>
   <ul>
       <li><a href="register.py">Register</a></li>
       <li><a href="index.py">Login</a></li>
   </ul>"""
   
try:
    cookie = SimpleCookie()
    http_cookie_header = environ.get('HTTP_COOKIE')
    if http_cookie_header:
        cookie.load(http_cookie_header)
        if 'sid' in cookie:
            sid = cookie['sid'].value
            session_store = open('sessions/sess_' + sid, writeback=False)
            if session_store.get('authenticated'):
                result = """
                    <nav>
                        <p>
                            Player: %s
                        </p>
                        <a href = "logout.py">Logout</a>
                    </nav>
                    <p>Move using the arrow keys and press the spacebar to interact when you see the indicator above your head.<br>
                    Hint: Try the river, the houses, the balloon stall, the signpost, and the soldier.</p>
                    <canvas id="canvas1" width="640" height="480">
                    </canvas>
                    <p id='output'>...</p>
                    <section id='battle_score_display'></section>
                    """ % session_store.get('username')
            session_store.close()
except IOError:
    result = '<p>Sorry! We are experiencing problems at the moment. Please call back later.</p>'

print("""
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <title>RPG</title>
            <link rel="stylesheet" href="rpg.css">
            <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
            <script src="rpg.js"></script>
        </head>
        <body>
            <header>
                <h1>River Village</h1>
            </header>
            %s
        </body>
    </html>""" % (result))
