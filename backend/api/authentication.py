import firebase_admin
from firebase_admin import credentials, auth
from rest_framework import authentication, exceptions
from django.contrib.auth import get_user_model
import os

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')

        if not auth_header:
            return None

        # Expects: Authorization: Bearer <Firebase_ID_Token>
        id_token = auth_header.split(' ').pop()
        if not id_token:
            return None

        try:
            # Verify the ID token using Firebase Admin SDK
            decoded_token = auth.verify_id_token(id_token)
        except Exception as e:
            # Log the error for debugging
            print(f"Firebase token verification failed: {e}")
            raise exceptions.AuthenticationFailed('Token Firebase inválido ou expirado.')

        # Extract user info from the decoded token
        email = decoded_token.get('email')
        uid = decoded_token.get('uid')
        # name = decoded_token.get('name', '') # User's display name from Firebase

        if not email:
            raise exceptions.AuthenticationFailed('Token Firebase não contém um email válido.')

        User = get_user_model()

        try:
            # JIT User Provisioning: Get or Create the user in Django
            # Use email as the primary lookup.
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'is_active': True,
                    # If your custom user model has other required fields,
                    # you would need to set sensible defaults here.
                    # e.g., 'first_name': name.split(' ')[0] if name else '',
                }
            )
            
            # If the user was just created, ensure they can't log in with a password directly
            if created:
                user.set_unusable_password() 
                user.save()

        except Exception as e:
            print(f"Erro durante o provisionamento do usuário no Django: {e}")
            raise exceptions.AuthenticationFailed(f'Erro ao provisionar usuário Django: {e}')

        return (user, None) # Return user and token (token is not used directly by DRF's flow here)
