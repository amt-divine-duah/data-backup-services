from flask import Flask, render_template

# create instance of the flask app
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")



