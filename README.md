# Fitness-Website

# Dependencies to install first

## For Frontend (React)
npm install

npm install react-countup framer-motion

## For Backend (Django)

If no .env folder, create a virtual environment through:
python -m venv env

For starting the virtual environment:
.\env\Scripts\activate

Now install the required dependencies in the environment:
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers
pip install mysqlclient

For running the server run:
python manage.py runserver