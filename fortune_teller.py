#!/usr/local/bin/python3

from cgitb import enable 
enable()
from cgi import FieldStorage
import pymysql as db
import random
            
print('Content-Type: text/plain')
print()

try:
    max_fortune=0
    curr_fortune="I cant think of anything right now."
    connection = db.connect("<local host>", "<userid>", "<password>", "<database name>")
    cursor = connection.cursor(db.cursors.DictCursor)
    cursor.execute("""SELECT MAX(fortune_num) FROM fortunes""")
    max_fortune=cursor.fetchone()
    if max_fortune is not None:
        max_fortune=(max_fortune['MAX(fortune_num)'])
        curr_id=random.randint(1, max_fortune)
    cursor.execute("""SELECT fortune_body FROM fortunes
                    WHERE fortune_num = %s""", (curr_id))
    curr_fortune=cursor.fetchone()
    if curr_fortune is not None:
        curr_fortune=(curr_fortune['fortune_body'])
    print(curr_fortune)
    cursor.close()  
    connection.close()
except db.Error:
    print('Im on break. Come back later.')
