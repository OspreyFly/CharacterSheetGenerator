from flask import Flask, render_template, redirect, flash, url_for, request, jsonify
from models import db, connect_db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///dndchar"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "secretKEY"

connect_db(app)


@app.route("/")
def empty():
    return redirect("/home")


@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/new-character")
def newCharacter():
    return render_template("new_character.html")


@app.route("/content", methods=["POST"])
def content():
    return render_template("")
