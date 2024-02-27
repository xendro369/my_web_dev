from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from models import db, User_Credentials, Course_DB, Contact_DB
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_migrate import Migrate
from random import randint
from flask import jsonify
from flask import request, jsonify
import traceback
import download_records as dwnld_rcds
from flask_cors import CORS  # Import the CORS extension
from testseriesdata import testseriesData

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS for all routes
app.config.from_object('config')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'  # Replace with your database URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'

db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()
    print("All database created !!!")

app.secret_key = 'your_secret_key'

login_manager = LoginManager()
login_manager.init_app(app)

@app.route('/check_login_status')
def check_login_status():
    # Check if the user is authenticated
    if current_user.is_authenticated:
        print('Called checked authentication ! ')
        return jsonify({'authenticated': True, 'username': current_user.username})
    else:
        print('UN Called checked authentication ! ')
        return jsonify({'authenticated': False})

# Define the 'before_request' hook
'''@app.before_request
def before_request():
    print("Executing 'before_request' hook")
    print(f"Request URL: {request.url}  Request Method: {request.method} Current_User : {current_user}")
    print("iiiiiiiiiiiiiiiiiiiiiiiiiiiiii")

# Define the 'after_request' hook
@app.after_request
def after_request(response):
    print("Executing 'after_request' hook")
    print(f"Response Status Code: {response.status_code}")
    print("ggggggggggggggggggggggggggggggg")
    return response
'''

@login_manager.user_loader
def load_user(user_id):
    # Implement logic to load a user from your database or user storage
    # For example, if using a database, you can query the user by ID
    user = User_Credentials.query.get(int(user_id))
    return user

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    session.clear()
    print('in logged_in in logged_in in logged_in in logged_in')
    if request.method == 'POST':
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        email = data.get('email')
        mobile_number = data.get('mobileNumber')

        # Check if the username is already in use (you may use your database for this check)
        existing_user = User_Credentials.query.filter_by(username=username).first()
        print("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        if existing_user:
            # add more checking for mobile number, email 
            return jsonify({'status': False, 'message': 'Username is already registered', 'redirect': '/'})

        # Create a new user
        new_user = User_Credentials(username=username, password=password, first_name=first_name, last_name=last_name, email=email, mobile_number=mobile_number)

        # Add and commit the new user to your database
        db.session.add(new_user)
        db.session.commit()

        # Log in the new user after sign-up (optional)
        login_user(new_user)
        # return redirect(url_for('home_content'))
        return jsonify({'status' : True, 'message': 'User registered successfully', 'redirect': '/'})

    return render_template('signup2.html')

@app.route('/login', methods=['POST'])
def login():
    # Check user credentials and log in the user
    logout_user()
    print('logout the user before login')
    
    if request.method == 'POST':
        data = request.get_json()
        username_or_email = data.get('username') # username_or_email
        password = data.get('password')

        # Check if the username_or_email is an email
        is_email = '@' in username_or_email

        if is_email:
            user = User_Credentials.query.filter(User_Credentials.email == username_or_email).first()
        else:
            user = User_Credentials.query.filter(User_Credentials.username == username_or_email).first()

        if user and password == user.password:  # Assuming you have a method like check_password in your User_Credentials model
            login_user(user)
            session['username'] = current_user.username
            print("sssssssssssssssssssssssss logged in ", session)
            return jsonify({'status': True, 'redirect': '/', 'message':'Logged In Successfully !', 'user': current_user.username})
        else:
            return jsonify({'status': False, 'message': 'Invalid credentials', 'redirect':'/login'})

    return render_template('login_temp.html')


# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     # Check user credentials and log in the user
#     logout_user()
#     print('logout the user before login')
#     if request.method == 'POST':
#         data = request.get_json()
#         username = data.get('username')
#         password = data.get('password')

#         user = User_Credentials.query.filter(User_Credentials.username == username).first()
#         # print("ttttttttttttttttttttttt")
#         if user and username == user.username and password == user.password:
#             login_user(user)
#             session['username'] = current_user.username
#             print("sssssssssssssssssssssssss logged in ")
#             return jsonify({'status': True, 'redirect': '/', 'message':'Logged In Successfully !', 'user':current_user.username})
#         else:
#             if user and username == user.username:
#                 print('ssssssssssssssssssssssssssssss kkkkkk', password)
#                 return jsonify({'status': False, 'message': 'Incorrect Password !', 'redirect':'/'})
#             return jsonify({'status': False, 'message': 'Invalid credentials', 'redirect':'/login'})
#     print("llllllllllllllllllllllllllllll")
#     return render_template('login_temp.html')

@app.route('/logout', methods=['GET'])
def logout():
    # Check if the logout is due to inactivity
    if 'inactivity' in request.args:
        # Perform any additional inactivity-related cleanup if needed
        # For example: logout_user(), clear_session(), etc.
        logout_user()
        session.clear()
        # Redirect to the home page after inactivity logout
        return jsonify({'status': True, 'redirect': '/', 'message':'Logged out Successfully !'})
        # return redirect(url_for('home_content'))

    # Normal logout procedure
    logout_user()
    session.clear()
    print('In logout ')
    return jsonify({'status': True, 'redirect': '/', 'message':'Logged out Successfully !'})

    # return redirect(url_for('layout'))


@app.route('/forgot_password')
def forgot_password():
    return render_template('forgot_password2.html')

@app.route('/update_user_record/<int:id>', methods=['GET', 'POST'])
@login_required
def update_user_record(id):
    record = User_Credentials.query.get(id)
    print(" in edit user records ",record)
    return render_template('edit_user_record.html', record=record)

@app.route('/update_password_1/<string:username>', methods=['GET', 'POST'])
def update_password_1(username):
    print("update_password_2 update_password_2 update_password_2 update_password_2")
    record = User_Credentials.query.filter_by(username=username).first()
    print(record, type(record))
    if record:
        print(" in edit user records update 2 ", record)
        user_record = {
                    'first_name': record.first_name,
                    'last_name': record.last_name,
                    'password': record.password,
                    'email': record.email,
                    'mobile_number': record.mobile_number,
                    'username' : record.username
                }
        return jsonify({'status': True, 'message': 'the fetched result', 'password':record.password, 'username' : record.username, 'redirect':'/change_passwordform'})
    else:
        print('invalide credential')
        return jsonify({'status': False, 'message': 'Invalid credentials'})


@app.route('/password_updated/<string:username>', methods=['POST', 'GET'])
def password_updated(username):
    try:
        if request.method == 'POST':
            print("In password updator user edited ::::: ", request.data)

            data = request.get_json()  # Use request.json to parse JSON data
            print("In password updator user edited :", data)

            new_password = data.get('new_password')
            print("new passwaord : ", new_password)

            confirmNewPassword = data.get('confirm_new_password')
            print("confirmNewPassword : ", confirmNewPassword)

            record = User_Credentials.query.filter_by(username=username).first()
            if record and record.password!=new_password and confirmNewPassword == new_password:
                record.password = new_password
                db.session.commit()

                user_password = {
                    'password': record.password
                }

                print("Password Updation Done !!!")
                return jsonify({'status':True, 'message': 'Password updated successfully', 'user_password': user_password, 'redirect':'/'})
            elif record.password==new_password:
                print("rrrrrrrrrrrrrrrrrrr")
                return jsonify({'status': False, 'message': 'Same Password as previous', 'redirect':'/'})
            elif confirmNewPassword != new_password:
                print("qqqqqqqqqqqqqqqq")
                return jsonify({'status': False, 'message': 'Confirm Password should be same as new password', 'redirect':'/'})
            else:
                print("sssssssssssssssss")
                return jsonify({'status': False , 'message':'Record not found'}), 404
    except Exception as e:
        print(f"Error: {str(e)}")
        traceback.print_exc()
        return jsonify({'status': False ,'error': 'Internal Server Error'}), 500

@app.route('/')
def layout():
    username = session.get('username', None)
    print(username)
    return render_template('layout.html', username=username)

@app.route('/user_records')
@login_required
def user_records():
    records = User_Credentials.query.all()
    # print(records, "line no 42")
    return render_template('User_Credentials.html', records=records)

@app.route('/record_user_edited/<int:id>', methods=['POST'])
@login_required
def record_user_edited(id):
    try:
        if request.method == 'POST':
            data = request.get_json(force=True)  # Use request.json to parse JSON data
            print("In record user edited :", data)

            first_name = data.get('first_name')
            last_name = data.get('last_name')
            email = data.get('email')
            password = data.get('password')
            mobile_number = data.get('mobile_number')

            record = User_Credentials.query.get(id)
            if record:
                record.first_name = first_name
                record.last_name = last_name
                record.email = email
                record.password = password
                record.mobile_number = mobile_number

                db.session.commit()

                user_record = {
                    'first_name': record.first_name,
                    'last_name': record.last_name,
                    'password': record.password,
                    'email': record.email,
                    'mobile_number': record.mobile_number
                }

                print("Updation Done !!!")
                return jsonify({'message': 'Record updated successfully', 'user_record': user_record})
            else:
                return jsonify({'error': 'Record not found'}), 404
    except Exception as e:
        print(f"Error: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/delete_user_record/<int:id>', methods=['DELETE'])
@login_required
def delete_user_record(id):
    record = User_Credentials.query.get(id)
    
    if record:
        model_dict = {}
        # print("In jhgvjbvgjlbhkljbnjkbnlkj !")
        for column in record.__table__.columns:
            attribute_name = column.key
            attribute_value = getattr(record, attribute_name)
            model_dict[attribute_name] = attribute_value

        db.session.delete(record)
        # print("In delete user record !")
        db.session.commit()

        # Optionally, return a JSON response to indicate success
        return jsonify({'message': 'Record deleted successfully', 'deleted_record': model_dict})
    else:
        # Return a JSON response for error
        return jsonify({'error': 'Record not found'}), 404
        # delete_user_order

@app.route('/courses')
def courses():
    return render_template('courses.html')

@app.route('/show_enrolled_course', methods=['GET'])
@login_required
def show_enrolled_course():
    records = Course_DB.query.all()
    # print(records, "line no 186")
    return render_template('Course_Enrolled.html', records=records)

@app.route('/enroll_Course', methods=['POST'])
@login_required
def enroll_Course():
    # username = current_user.username
    # existing_user = User_Credentials.query.filter_by(username=current_user.username).first()
    # username = Course_DB.query.filter_by(username=current_user.user_id).first()
    if request.method == 'POST':
        data = request.get_json()
       
        course = data.get('course_name')
        course_id = data.get('course_id')
        
        existing_enroll = Course_DB.query.filter_by(course=course, user_id=current_user.username).first()
        
        if existing_enroll:
            return jsonify({'status' : False, 'message': 'Already Enrolled', 'redirect': '/target_page'})
        
        formatted_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        enroll_datetime = datetime.strptime(formatted_date, "%Y-%m-%d %H:%M:%S")

        new_enroll = Course_DB(course_id=course_id, course=course, user_id=current_user.username, enroll_date=enroll_datetime)

        # Add and commit the new user to your database
        db.session.add(new_enroll)
        db.session.commit()
        return jsonify({'status' : True, 'message': 'User enrolled successfully', 'redirect': '/target_page'})
        
    return render_template('courses.html')

@app.route('/submit_edit_order/<int:id>', methods=['POST'])
@login_required
def submit_edit_order(id):
    try:
        print("zzzzzzzzzzzzzzzzzzzzzzzz")
        if request.method == 'POST':
            data = request.get_json(force=True)  # Use request.json to parse JSON data
            print("In order edit :", data)

            course = data.get('course')
            course_id = data.get('course_id')

            record = Course_DB.query.get(id)
            if record:
                record.course_id = course_id
                record.course = course 

                db.session.commit()

                user_order = {
                    'course_id': record.course_id,
                    'course': record.course,
                }

                print("Order Updation Done !!!", user_order)
                return jsonify({'message': 'Record updated successfully', 'user_order': user_order})
            else:
                return jsonify({'error': 'Record not found'}), 404
    except Exception as e:
        print(f"Error: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/user_profile', methods=['GET'])
@login_required
def user_profile():
    existing_user = User_Credentials.query.filter_by(username=current_user.username).first()
    # user_orders = Course_DB.query.filter_by(user_id=current_user.username).first()
    user_orders = Course_DB.query.filter_by(user_id=current_user.username).all()
    # enrolled_cources = Course_DB.query.filter_by(user_id=current_user.username)
    return render_template('user_profiles.html', existing_user=existing_user, user_orders=user_orders)

@app.route('/process_form', methods=['POST'])
@login_required
def process_form():
    table_name = request.json.get('tableName')
    # Now you can use the 'table_name' variable in your logic
    dwnld_rcds.download_records(table_name)       
    return redirect(url_for('user_records'))

@app.route('/edit_user_order/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_user_order(id):
    record = Course_DB.query.get(id)
    print(" in edit user records ",record)
    return render_template('edit_user_order.html', record=record)

@app.route('/delete_user_order/<int:id>', methods=['DELETE'])
@login_required
def delete_user_order(id):
    record = Course_DB.query.get(id)

    if record:
        model_dict = {}
        for column in record.__table__.columns:
            attribute_name = column.key
            attribute_value = getattr(record, attribute_name)
            model_dict[attribute_name] = attribute_value

        db.session.delete(record)
        db.session.commit()

        # Optionally, return a JSON response to indicate success
        return jsonify({'message': 'Order deleted successfully', 'deleted_record': model_dict})
    else:
        # Return a JSON response for error
        return jsonify({'error': 'Record not found'}), 404

@app.route('/home_content')
def home_content():
    return render_template("home_content.html")

@app.route('/service')
def service():
    return render_template('service.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/contact_records')
def contact_records():
    records = Contact_DB.query.all()
    # print(records, "line no 42")
    return render_template('contact_info.html', records=records)
    
@app.route('/contact_submission', methods=['POST'])
def contact_submission():
    try:
        # Assuming the JSON data is sent in the request body
        data = request.get_json()

        # Process the data as needed
        name = data.get('name')
        phone = data.get('phone')
        email = data.get('email')
        message = data.get('message')

        formatted_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        contact_date = datetime.strptime(formatted_date, "%Y-%m-%d %H:%M:%S")
        
        contact_entry = Contact_DB(
            visitor_name=name,
            mobile_number=phone,
            email=email,
            contact_date=contact_date,
            message=message
        )
        # print("66666666666666666")

        db.session.add(contact_entry)
        db.session.commit()
        
        # Return a response (this is just an example)
        return jsonify({"success": True, "message": "Form submitted successfully"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@app.route('/update_contact', methods=['POST'])
def update_contact():
    data = request.get_json()
    if data:
        contactId = data.get('contactId')
        record = Contact_DB.query.get(contactId) 
        print('uuuuuuuuuuuuuuuuu',record.message)
        if record:
            return render_template('contact_update.html', record=record)
        return None
    return None
 
@app.route('/execute_update_contact', methods=['POST'])
def execute_update_contact():
    try:
        data = request.get_json()
        if data:
            name = data.get('name')
            phone = data.get('phone')
            email = data.get('email')
            message = data.get('message')

            id = data.get('contactId')

            record = Contact_DB.query.get(id)

            if record:
                record.visitor_name = name
                record.email = email
                record.mobile_number = phone
                record.message = message

                db.session.commit()
                print('Updation of contact done ')
                my_dict = {
                    "name" : record.visitor_name,
                    "email" : record.email,
                    "phone" : record.mobile_number,
                    "message" : record.message
                    
                }

                return jsonify({"status": True, "message": my_dict})
            return jsonify({"status": False, "message": " Record Not Found "})
        return jsonify({'error': 'Invalid Request'}), 404
    except Exception as e:
        print(f"Error: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/delete_contact', methods=['POST'])
def delete_contact():
    data = request.get_json()
    if data:
        contactId = data.get('contactId')
        record = Contact_DB.query.get(contactId)
        print("bbbbbbbbbbb")
        if record:

            model_dict = {}
            # print("In jhgvjbvgjlbhkljbnjkbnlkj !")
            for column in record.__table__.columns:
                attribute_name = column.key
                attribute_value = getattr(record, attribute_name)
                model_dict[attribute_name] = attribute_value

            db.session.delete(record)
            # print("In delete user record !")
            db.session.commit()

            # Optionally, return a JSON response to indicate success
            return jsonify({'message': 'Contact deleted successfully', 'deleted_contact': model_dict})
        else:
            # Return a JSON response for error
            return jsonify({'error': 'Record not found'}), 404
    else:
        return jsonify({'error': 'Invalid Request'}), 404

otp_db = {}
def generate_otp():
    return str(randint(1000, 9999))

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_otp_email(sender_email, sender_password, recipient_email, subject, body):           
    try:
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = recipient_email
        message["Subject"] = subject
        message.attach(MIMEText(body, "plain"))
        
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        try:
            # Establish a connection to the SMTP server
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                # Start TLS encryption
                server.starttls()
            
                # Log in to the email account
                server.login(sender_email, sender_password)
            
                # Send the email
                server.send_message(message)
        except:
            pass
            
        return f"OTP send to Email - {recipient_email} sent successfully!", True
    except Exception as e: 
        print(f"Error: {str(e)}")
        traceback.print_exc()
        return "Can't Reach to email or email is invalid", False
    
# Update the send_otp function for email verification
@app.route('/send_otp', methods=['POST'])
def send_otp():
    try:
        if request.method == 'POST':
            data = request.get_json()
            email = data.get('email')
            print('in send otp')
            if email:
                # Generate OTP
                otp = generate_otp()
                print('ttttttgggggggggggttttttttttttgggggggggg ',otp)
                otp = 1234
                sender_email = "akshaykumar18755@gmail.com"
                sender_password = "htvs zbws oqyz kxmd"
                recipient_email = email
                subject = "Welcome to SSVM "
                body = f"Your Email Verification OTP is {otp}"

                # msg, status = send_otp_email(sender_email, sender_password, recipient_email, subject, body)
                msg, status = f"OTP send to Email - {recipient_email} sent successfully!", True
                if status:
                    print('sent otp')
                    # Store OTP in the session for validation
                    session['otp'] = otp
                    print('session object ', session)
                    # Simulate storing OTP in the database (In a real application, use a database)
                    otp_db[email] = otp
                    print('in in sent otp', session , session['otp'], type(session['otp']))
                    return jsonify({'status' : True, 'message': msg})
                return jsonify({'status' : False, 'error': msg})
    except Exception as e:
        print(f"Error: {str(e)}")
        traceback.print_exc()
        return jsonify({'status' : False, 'error': 'mail server error', 'redirect': '/target_page'}), 500

@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    if request.method == 'POST':
        data = request.get_json()
        entered_otp = data.get('otp')
        print(entered_otp, session,  )
        if 'otp' in session and str(entered_otp) == str(session['otp']):
            # Valid OTP
            session.pop('otp', None)
            return jsonify({'status' : True, 'message': 'OTP verification successful', 'redirect': '/target_page'})
        else:
            # Invalid OTP
            return jsonify({'status' : False, 'error': "Wrong OTP ", 'redirect': '/target_page'})
    
    return redirect(url_for('index'))


@app.route('/get_test_card_data')
def get_test_card_data():
    print('called')
    return jsonify(testseriesData.test_title_link_data)

@app.route('/common_table_instruction/<string:lastSegment>')
def common_table_instruction(lastSegment):
    print('called', lastSegment)
    return jsonify(table_info=testseriesData.table_info, test_series_table=testseriesData.generate_test_table(test_name_prefix=str(lastSegment), num_ids=16))

@app.route('/load_question_paper/<string:lastSegment>')
def load_question_paper(lastSegment):
    print('Called question paper !', lastSegment)
    return jsonify(testseriesData.questions_data)

@app.route('/save_response_endpoint/<lastSegment>', methods=['POST'])
def save_data_endpoint(lastSegment):
    try:
        data = request.get_json()
        print(lastSegment)
        print('Received Data:', data)
        return jsonify({'status': ' Response Saved !'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/analytics_endpoint')
def analytics_endpoint():

    return jsonify(question_data=testseriesData.answered_MCQs, analytics_data=testseriesData.statistics)