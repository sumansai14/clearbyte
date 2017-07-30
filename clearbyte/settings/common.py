from configurations import Configuration


from os.path import abspath, dirname, join, normpath


class Settings(Configuration):
    BASE_DIR = dirname(dirname(__file__))

    DJANGO_ROOT = dirname(dirname(abspath(__file__)))

    # Absolute filesystem path to the top-level project folder:
    SITE_ROOT = dirname(DJANGO_ROOT)

    ALLOWED_HOSTS = ['*', ]

    INTERNAL_IPS = (
        '127.0.0.1',
    )

    # Application definition

    INSTALLED_APPS = (
        'clearbyte',
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'django_extensions',
    )

    MIDDLEWARE_CLASSES = (
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    )

    ROOT_URLCONF = 'clearbyte.urls'

    WSGI_APPLICATION = 'clearbyte.wsgi.application'
    SECRET_KEY = 'b66v2plhlshth70sytn-_%1fwubza9%_l27!^l)a0y6x03iw=6'

    # Database
    # https://docs.djangoproject.com/en/1.7/ref/settings/#databases

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': join(BASE_DIR, 'db.sqlite3'),
        }
    }

    # Internationalization
    # https://docs.djangoproject.com/en/1.7/topics/i18n/

    LANGUAGE_CODE = 'en-us'

    TIME_ZONE = 'UTC'

    USE_I18N = True

    USE_L10N = True

    USE_TZ = True

    DEBUG = False
    TEMPLATES = [
        {
            # See: https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-TEMPLATES-BACKEND
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            # See: https://docs.djangoproject.com/en/dev/ref/settings/#template-dirs
            'DIRS': [],
            'OPTIONS': {
                # See: https://docs.djangoproject.com/en/dev/ref/settings/#template-debug
                'debug': DEBUG,
                # See: https://docs.djangoproject.com/en/dev/ref/settings/#template-loaders
                # https://docs.djangoproject.com/en/dev/ref/templates/api/#loader-types
                'loaders': [
                    'django.template.loaders.filesystem.Loader',
                    'django.template.loaders.app_directories.Loader',
                ],
                # See: https://docs.djangoproject.com/en/dev/ref/settings/#template-context-processors
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.template.context_processors.i18n',
                    'django.template.context_processors.media',
                    'django.template.context_processors.static',
                    'django.template.context_processors.tz',
                    'django.contrib.messages.context_processors.messages',
                    'clearbyte.utils.context_processors.meta',
                    # Your stuff: custom template context processors go here
                ],
            },
        },
    ]

    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/1.7/howto/static-files/

    MEDIA_ROOT_DIR = 'media'
    MEDIA_ROOT = normpath(join(DJANGO_ROOT, MEDIA_ROOT_DIR))
    MEDIA_URL = '/media/'

    # See: https://docs.djangoproject.com/en/dev/ref/settings/#static-root
    STATIC_ROOT_DIR = 'static'
    STATIC_ROOT = normpath(join(DJANGO_ROOT, STATIC_ROOT_DIR))
    STATIC_URL = '/static/'

    CLEARBIT_API_KEY = 'insert your clearbit api key here'
