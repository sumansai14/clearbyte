release: python manage.py migrate --settings=clearbyte.settings.staging && python manage.py collectstatic --no-input --settings=clearbyte.settings.staging
web: gunicorn clearbyte.wsgi --env DJANGO_SETTINGS_MODULE=clearbyte.settings.staging --log-file -
