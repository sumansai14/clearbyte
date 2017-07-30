from __future__ import absolute_import

import imp
import six
import pkgutil


def get_default_django_settings_module():
    try:
        file_ = imp.find_module('local', ['clearbyte/settings'])[0]
    except:
        default_django_settings_module = 'clearbyte.settings.dev'
    else:
        default_django_settings_module = 'clearbyte.settings.local'
        file_.close()
    return default_django_settings_module


def import_submodules(context, root_module, path):
    """
    Import all submodules and register them in the ``context`` namespace.

    >>> import_submodules(locals(), __name__, __path__)
    """
    for loader, module_name, is_pkg in pkgutil.walk_packages(path, root_module + '.'):
        # this causes a Runtime error with model conflicts
        # module = loader.find_module(module_name).load_module(module_name)
        module = __import__(module_name, globals(), locals(), ['__name__'])
        for k, v in six.iteritems(vars(module)):
            if not k.startswith('_'):
                context[k] = v
        context[module_name] = module
