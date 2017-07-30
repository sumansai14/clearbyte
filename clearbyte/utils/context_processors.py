from __future__ import absolute_import
from django.conf import settings


def meta(request):
    return {
        'ENV': getattr(settings, 'ENV', '')
    }
