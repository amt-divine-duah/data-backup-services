from app import db
    
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