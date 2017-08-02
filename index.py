#!/usr/local/bin/python3

from cgitb import enable 
enable()

from cgi import FieldStorage, escape
from hashlib import sha256
from time import time
from shelve import open
from http.cookies import SimpleCookie
import pymysql as db

form_data = FieldStorage()
username = ''
result = ''
if len(form_data) != 0:
    username = escape(form_data.getfirst('username', '').strip())
    password = escape(form_data.getfirst('password', '').strip())
    if not username or not password:
        result = '<p>Error: user name and password are required</p>'
    else:
        sha256_password = sha256(password.encode()).hexdigest()
        try:
            connection = db.connect("<local host>", "<userid>", "<password>", "<database name>")
            cursor = connection.cursor(db.cursors.DictCursor)
            cursor.execute("""SELECT * FROM users 
                              WHERE username = %s
                              AND password = %s""", (username, sha256_password))
            if cursor.rowcount == 0:
                result = '<p>Error: incorrect user name or password</p>'
            else:
                cookie = SimpleCookie()
                sid = sha256(repr(time()).encode()).hexdigest()
                cookie['sid'] = sid
                session_store = open('sessions/sess_' + sid, writeback=True)
                session_store['authenticated'] = True
                session_store['username'] = username
                session_store.close()
                result = """
                   <p>Succesfully logged in!</p>
                   <p>Welcome back.</p>
                   <ul>
                       <li><a href="mainpage_protected.py">Play</a></li> 
                       <li><a href="logout.py">Logout</a></li>
                   </ul>"""
                print(cookie)
            cursor.close()  
            connection.close()
        except (db.Error, IOError):
            result = '<p>Sorry! We are experiencing problems at the moment. Please call back later.</p>'
        
print('Content-Type: text/html')
print()
print("""
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <title>RPG</title>
            <link rel="stylesheet" href="rpg.css">
            <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
        </head>
        <body>
            <header>
                <h1>River Village</h1>
            </header>
            <img src="images/tree.png" alt="Tree">
            <form action="index.py" method="post">
                <label for="username">User name: </label>
                <input type="text" name="username" id="username" value="%s" /><br><br>
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" /><br><br>
                <input type="submit" value="Login" />
            </form>
            <br>
            <p>New user? Register <a href="register.py">Here</a></p>
            <br><br>
            %s
        </body>
        <footer>
            <small>Images supplied by <a href = "https://opengameart.org/">www.opengameart.org</a></small>
        </footer>
    </html>""" % (username, result))
