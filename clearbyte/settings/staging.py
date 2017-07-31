from .common import Settings as CommonSettings
import os.path


class Settings(CommonSettings):
    DEBUG = True
    STATIC_ROOT = os.path.join(CommonSettings.DJANGO_ROOT, 'static')
    STATIC_URL = '/static/'
    # STATICFILES_DIRS = (
    #     os.path.join(CommonSettings.DJANGO_ROOT, 'static'),
    # )
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'd6sr8sa4e51f4t',
            'USER': 'kkeifrcmkzeazw',
            'PASSWORD': '75cb56abdbcdb1d72a0d0d65d4b52c3f8e810dcdfb83303c9aad2faa28413818',
            'HOST': 'ec2-23-23-225-12.compute-1.amazonaws.com',
            'PORT': '',
        }
    }
    MIDDLEWARE_CLASSES = CommonSettings.MIDDLEWARE_CLASSES + ('whitenoise.middleware.WhiteNoiseMiddleware',)

    STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

    ENV = 'staging'
