import sqlite3
from flask import g

DATABASE = 'accounts.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def init_db():
    with sqlite3.connect(DATABASE) as db:
        db.execute('''
            CREATE TABLE IF NOT EXISTS accounts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                auth0_id TEXT UNIQUE,
                name TEXT,
                email TEXT
            )
        ''')

# Optional: close db connection after request
from flask import Flask
app = Flask(__name__)
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
