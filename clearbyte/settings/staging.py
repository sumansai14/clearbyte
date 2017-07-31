from .common import Settings as CommonSettings
import os.path


class Settings(CommonSettings):
    DEBUG = True
    STATIC_ROOT = os.path.join(CommonSettings.DJANGO_ROOT, 'static')
    STATIC_URL = '/static/'
    # STATICFILES_DIRS = (
    #     os.path.join(CommonSettings.DJANGO_ROOT, 'static'),
    # )

    MIDDLEWARE_CLASSES = CommonSettings.MIDDLEWARE_CLASSES + ('whitenoise.middleware.WhiteNoiseMiddleware',)

    STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

    ENV = 'staging'
