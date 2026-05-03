"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os
import sys

# Oracle Compatibility Shim
try:
    import oracledb
    oracledb.version = "8.3.0"
    sys.modules["cx_Oracle"] = oracledb
except ImportError:
    pass

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

application = get_asgi_application()
