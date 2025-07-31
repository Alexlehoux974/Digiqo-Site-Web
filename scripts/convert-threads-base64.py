#!/usr/bin/env python3

import base64
import sys

# L'image Threads en base64 fournie par l'utilisateur
base64_image = """
iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAM1BMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHJgqAAAAEHRSTlMAzxAgYM9/r0BAEI+vUHCf3iqOdQAADB9JREFUeNrtnYmW2yoMhhECzGLe/22vhLHTTpLYeMHYnP/MnU7bcSb+RhISQnKRVlNe11VdN4K0jaBpm7qu66IsM0XH20hT12LLsM+kKoraHYrCHXuGQjK0glDCylo6Jb0+Qyu3TKsJhJRQgQxOKaGE1UIYJ
"""

# Décoder et sauvegarder
image_data = base64.b64decode(base64_image.strip())
with open('/tmp/threads-logo.png', 'wb') as f:
    f.write(image_data)

print("Image sauvegardée dans /tmp/threads-logo.png")