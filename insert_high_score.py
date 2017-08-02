#!/usr/local/bin/python3

from cgitb import enable 
enable()
from cgi import FieldStorage, escape
import pymysql as db

            
print('Content-Type: text/plain')
print()

form_data = FieldStorage()
name = escape(form_data.getfirst('player_name', '').strip())
game = escape(form_data.getfirst('curr_game', '').strip())
score = escape(form_data.getfirst('curr_score', '').strip())
if len(form_data) == 3:
    try:
        connection = db.connect("<local host>", "<userid>", "<password>", "<database name>")
        cursor = connection.cursor(db.cursors.DictCursor)
        cursor.execute("""SELECT * FROM high_scores WHERE scorer = %s AND game = %s;""",(name, game))
        if game in ["Fishing", "Balloon Shoot"]:
            if cursor.rowcount == 0:
                cursor.execute("""INSERT INTO high_scores(scorer, game, point_score) VALUES (%s, %s, %s)""",(name, game, score))
                print("success")
            else:
                cursor.execute("""SELECT * from high_scores WHERE scorer = %s AND game = %s AND point_score < %s""",(name, game, score))
                if cursor.rowcount > 0:
                    cursor.execute("""UPDATE high_scores SET point_score = %s WHERE scorer = %s AND game = %s;""",(score, name, game))
                    print("success")
        else:
            if cursor.rowcount == 0:
                cursor.execute("""INSERT INTO high_scores(scorer, game, time_score) VALUES (%s, %s, %s)""",(name, game, score))
                print("success")
            else:
                cursor.execute("""SELECT * from high_scores WHERE scorer = %s AND game = %s AND time_score > %s""",(name, game, score))
                if cursor.rowcount > 0:
                    cursor.execute("""UPDATE high_scores SET time_score = %s WHERE scorer = %s AND game = %s;""",(score, name, game))
                    print("success")
        connection.commit()
        cursor.close()  
        connection.close()
    except db.Error:
        print("error")
else:
    print("Not enough arguments supplied.")

