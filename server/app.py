from flask import Flask, redirect, session, url_for, g
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
import os
from db import get_db, init_db

# Load environment variables from .env file
load_dotenv()


app = Flask(__name__)
from flask_cors import CORS

CORS(app, supports_credentials=True, origins=["http://localhost:5000"])

app.secret_key = os.environ.get("APP_SECRET_KEY")
init_db()

oauth = OAuth(app)

auth0 = oauth.register(
    "auth0",
    client_id=os.environ["AUTH0_CLIENT_ID"],
    client_secret=os.environ["AUTH0_CLIENT_SECRET"],
    client_kwargs={"scope": "openid profile email"},
    server_metadata_url=f'https://{os.environ["AUTH0_DOMAIN"]}/.well-known/openid-configuration'
)

@app.route("/")
def home():
    user = session.get("user")
    return f"Hello {user['name']}" if user else "Not logged in"

@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )


@app.route("/callback")
def callback():
    token = auth0.authorize_access_token()
    userinfo = token["userinfo"]
    session["user"] = userinfo
    # Add user to accounts db if not present
    db = get_db()
    db.execute(
        "INSERT OR IGNORE INTO accounts (auth0_id, name, email) VALUES (?, ?, ?)",
        (userinfo["sub"], userinfo.get("name", ""), userinfo.get("email", ""))
    )
    db.commit()
    return redirect("http://localhost:5000/")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("http://localhost:5000/")


from flask import jsonify

@app.route("/user")
def get_user():
    user = session.get("user")
    if user:
        return jsonify({
            "name": user.get("name"),
            "email": user.get("email"),
            "picture": user.get("picture"),
            "username": user.get("nickname") or user.get("name")
        })
    else:
        return jsonify({"error": "Not logged in"}), 401

    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.environ.get("PORT", 5001))
