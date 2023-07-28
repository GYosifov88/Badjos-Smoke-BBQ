# Badjos-Smoke-BBQ
Simple WEB application for BBQ and smoking meats hobby. Adding recipies, pictures, events and articles.

# Requirements to run the application:
* asgiref==3.7.2
* certifi==2023.5.7
* cloudinary==1.33.0
* decouple==0.0.7
* Django==4.2.2
* django-environ==0.10.0
* gunicorn==21.2.0
* Pillow==9.5.0
* psycopg2==2.9.6
* python-decouple==3.8
* python-dotenv==1.0.0
* six==1.16.0
* sqlparse==0.4.4
* typing_extensions==4.6.3
* tzdata==2023.3
* urllib3==1.26.16
* whitenoise==6.5.0

# Used DataBase:
* PostgreSQL

# Used Technologies:
* Django
* Python
* JavaScript
* Bootstrap
* HTML
* CSS


# Initial setup:
* Clone the repository
* Setup the PostgreSQL DataBase
* Make migrations and migrate to create the DataBase
* Install the requirements
* Create .env file in the main directory with below ones equal to your own:
    * DB_NAME=
    * DB_USER =
    * DB_PASSWORD=
    * DB_ENGINE=
    * DB_HOST=
    * DB_PORT=
    * SECRET_KEY=
    * DEBUG=
    * ALLOWED_HOSTS=
* Create Superuser
* For storing mediafiles Cloudinary.com is used
* Register in Cloudinary.com and get your API credentials
* Add the credentials in the .env file as follows : CLOUDINARY_NAME= ; CLOUDINARY_API_KEY= ; CLOUDINARY_API_SECRET= 
* Adding pictures, events, recipies, news/articles and setting up roles is done through the admin site 


# License:
This project is licensed under the MIT License - see the [LICENSE.md]
