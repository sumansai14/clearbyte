# Clearbyte
A Companies search app written in Django and React with Clearbit APIs.

## Installation instructions
- Requirements - install `postgresql` or use `sqlite` if you prefer and also install python requirements with `pip install -r requirements.txt`
- Copy the `local.py.template` to `local.py` in `clearbyte/clearbyte/settings/` and change the db credetials. Also add your clearbit key in local.py
- run `python manage.py migrate`
- to start the server run `python manage.py runserver`


