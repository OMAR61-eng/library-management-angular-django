
# Clinic Appointment System (Django + DRF + Vanilla JS)

Simple full-stack example with a Django REST API and a minimal frontend (HTML/CSS/JS) to manage clinic appointments.

## Features
- CRUD for Appointments
- Filter by doctor/patient/status
- Auto-create Profile for new users (default role: patient)
- Minimal frontend that consumes the API

## Quickstart
```bash
python -m venv venv
venv\Scripts\activate  # on Windows
pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# Visit http://127.0.0.1:8000/
# Create doctor/patient users in /admin and use their IDs on the page form.
```

## Tech
- Django, Django REST framework
- SQLite (default)
- Vanilla HTML/CSS/JS frontend
