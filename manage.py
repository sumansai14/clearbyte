import os
import sys

from clearbyte.utils.imports import get_default_django_settings_module

if __name__ == "__main__":
    os.environ.setdefault(
        "DJANGO_SETTINGS_MODULE", get_default_django_settings_module())
    # NOTE: instead of changing the DJANGO_CONFIGURATION class for each
    # environment we change the DJANGO_SETTINGS_MODULE
    # and keep the same class (i.e. Settings) for all environments.
    os.environ.setdefault("DJANGO_CONFIGURATION", "Settings")

    from configurations.management import execute_from_command_line

    execute_from_command_line(sys.argv)
