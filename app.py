from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# MYSQL database connection configuration
db_config = mysql.connector.connect(
    host="localhost",
    user="root",
    password="khcy6ycy",
    database="recommendation_engine",
    port=3306
)
print("Database Connected")

@app.route('/api/scores', methods=['GET', 'POST'])
def scores():
    if request.method == 'GET':
        # Fetch high scores from the database (MySQL)
        cursor = db_config.cursor(dictionary=True)
        cursor.execute("SELECT * FROM recommendation_engine.high_scores ORDER BY score DESC LIMIT 10")
        scores_data = cursor.fetchall()
        cursor.close()
        return jsonify(scores_data)

    elif request.method == 'POST':
        # Add a new high score to the database (MySQL)
        new_score = request.json
        print("Received New Score:", new_score)

        cursor = db_config.cursor()
        cursor.execute("INSERT INTO recommendation_engine.high_scores (playerName, score) VALUES (%s, %s)", (new_score['playerName'], new_score['score']))
        db_config.commit()
        cursor.close()

        return jsonify(new_score), 201

if __name__ == '__main__':
    app.run(debug=True)

