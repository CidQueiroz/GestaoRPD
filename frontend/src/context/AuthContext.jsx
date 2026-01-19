// GestaoRPD/frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Não precisamos mais do axios aqui para obter tokens do Django
// import axios from 'axios';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(() => 
    localStorage.getItem('firebaseIdToken') ? JSON.parse(localStorage.getItem('firebaseIdToken')) : null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper para obter o Firebase ID Token e armazená-lo
  const getFirebaseIdTokenAndSetAuthTokens = async (firebaseUser) => {
    if (firebaseUser) {
      const idToken = await firebaseUser.getIdToken();
      setAuthTokens(idToken);
      localStorage.setItem('firebaseIdToken', JSON.stringify(idToken)); // Armazenar como string JSON
    } else {
      setAuthTokens(null);
      localStorage.removeItem('firebaseIdToken');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      await getFirebaseIdTokenAndSetAuthTokens(firebaseUser); // Atualiza os tokens Firebase
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      // Autentica com Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await getFirebaseIdTokenAndSetAuthTokens(userCredential.user); // Pega e armazena o ID Token do Firebase
      
      // Não precisamos mais desta parte, já que o backend usa Firebase ID Token diretamente
      // const response = await axios.post('http://127.0.0.1:8000/api/token/', {
      //   email: email,
      //   password: password
      // });
      // const data = response.data;
      // setAuthTokens(data);
      // localStorage.setItem('authTokens', JSON.stringify(data));

    } catch (err) {
      console.error("Erro no login:", err);
      setAuthTokens(null);
      localStorage.removeItem('firebaseIdToken'); // Limpar token em caso de falha
      setError(err.message || 'Falha ao fazer login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await getFirebaseIdTokenAndSetAuthTokens(userCredential.user); // Pega e armazena o ID Token do Firebase
      // O backend agora tem JIT provisioning, então não precisamos de um endpoint de registro separado aqui,
      // pois o primeiro acesso à API criará o usuário no Django.
      // Poderíamos opcionalmente chamar uma API para configurar o tipo de usuário, etc.
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signOut(auth);
      setAuthTokens(null);
      localStorage.removeItem('firebaseIdToken'); // Limpar o token no logout
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await getFirebaseIdTokenAndSetAuthTokens(userCredential.user); // Pega e armazena o ID Token do Firebase
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithFace = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await getFirebaseIdTokenAndSetAuthTokens(userCredential.user); // Pega e armazena o ID Token do Firebase
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGitHub = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await getFirebaseIdTokenAndSetAuthTokens(userCredential.user); // Pega e armazena o ID Token do Firebase
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    authTokens,
    isLoading,
    error,
    login,
    register,
    logout,
    loginWithGoogle,
    loginWithFace,
    loginWithGitHub
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};