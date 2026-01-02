// GestaoRPD/frontend/src/pages/LoginPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginPage as CdkLoginPage } from '@cidqueiroz/cdkteck-ui';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, register, loginWithGoogle, loginWithLinked, loginWithFace, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Error is handled in AuthContext
    }
  };

  const handleRegister = async ({ email, password }) => {
    try {
      await register(email, password);
      navigate('/'); // Redirect after successful registration
    } catch (err) {
      // Error is handled in AuthContext
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/'); // Redirect after successful Google login
    } catch (err) {
      // Error is handled in AuthContext
    }
  };
  
  const handleFaceLogin = async () => {
    try {
      await loginWithFace();
      navigate('/'); // Redirect after successful Google login
    } catch (err) {
      // Error is handled in AuthContext
    }
  };

  const handleLinkedLogin = async () => {
    try {
      await loginWithLinked();
      navigate('/'); // Redirect after successful LinkedIn login
    } catch (err) {
      // Error is handled in AuthContext
    }
  };

  return (
    <CdkLoginPage
      onLogin={handleLogin}
      onRegister={handleRegister}
      onGoogleLogin={handleGoogleLogin}
      onFacebookLogin={handleFaceLogin}
      onLinkedInLogin={handleLinkedLogin}
      isLoading={isLoading}
      error={error}
      appName="Gestão RPD"
    />
  );
};

export default LoginPage;
