#!/usr/local/bin/python3

from cgitb import enable 
enable()
from cgi import FieldStorage, escape
import pymysql as db

            
print('Content-Type: text/plain')
print()

result=""
try:
    connection = db.connect("<local host>", "<userid>", "<password>", "<database name>")
    cursor = connection.cursor(db.cursors.DictCursor)
    result = """<table>
                <tr><th colspan = "2" class = "center_head">Battle</th></tr>
                <tr><th>Name</th><th>Score</th></tr>"""
    
    cursor.execute("""SELECT scorer, time_score FROM high_scores
                    WHERE game = "Battle" ORDER BY time_score LIMIT 5;""")
    for row in cursor.fetchall():
        result += '<tr><td>%s</td><td>%s Seconds</td></tr>' % (row['scorer'], row['time_score'])
    result += """<tr><th colspan = "2" class = "center_head">Fishing</th></tr>
                <tr><th>Name</th><th>Score</th></tr>"""
    cursor.execute("""SELECT scorer, point_score FROM high_scores
                    WHERE game = "Fishing" ORDER BY point_score DESC LIMIT 5;""")
    for row in cursor.fetchall():
        result += '<tr><td>%s</td><td>%s Points</td></tr>' % (row['scorer'], row['point_score'])
    result += """<tr><th colspan = "2" class = "center_head">Balloon Shoot</th></tr>
                <tr><th>Name</th><th>Score</th></tr>"""
    cursor.execute("""SELECT scorer, point_score FROM high_scores
                    WHERE game = "Balloon Shoot" ORDER BY point_score DESC LIMIT 5;""")
    for row in cursor.fetchall():
        result += '<tr><td>%s</td><td>%s Points</td></tr>' % (row['scorer'], row['point_score'])
    result+='</table>'
    cursor.close()  
    connection.close()
except db.Error:
    result = '<p>Sorry! We are experiencing problems at the moment. Please call back later.</p>'

print(result)
