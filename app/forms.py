from flask_wtf import FlaskForm
from flask_wtf.file import FileField,FileRequired,FileAllowed
from wtforms import TextAreaField
from wtforms.validators import DataRequired


from flask_wtf import FlaskForm
from wtforms import StringField,PasswordField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField,FileRequired,FileAllowed

class UploadForm(FlaskForm):
    uname = StringField('Username')
    # validators=[DataRequired(), Length (max=20)])
    
    password = PasswordField('password')
    # validators=[DataRequired()])
    
    
    fname = StringField('Firstname')
    # validators=[DataRequired(), Length (max=20)])
    
    lname = StringField('Lastname')
    # validators=[DataRequired(), Length (max=20)])
    
    email = StringField('Email')
    # validators=[DataRequired()])
    
    location= StringField('Location')
    # validators=[DataRequired()])
    
    biography = StringField('Biography')
    # validators=[DataRequired()])
    
    upload = FileField('Profile Picture', validators=[
        FileRequired(),
        FileAllowed(['jpg', 'png', 'JPG'], 'Images only!')])
    
    # Submit = SubmitField('Send')