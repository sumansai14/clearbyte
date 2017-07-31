"""
WSGI config for clearbyte project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/howto/deployment/wsgi/
"""
import os

from clearbyte.utils.imports import get_default_django_settings_module
from whitenoise.django import DjangoWhiteNoise

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", get_default_django_settings_module())
os.environ.setdefault("DJANGO_CONFIGURATION", 'Settings')

from configurations.wsgi import get_wsgi_application  # NOQA

application = get_wsgi_application()
application = DjangoWhiteNoise(application)
