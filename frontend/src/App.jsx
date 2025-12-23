import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EstoquePage from './pages/EstoquePage';
import RegistrarVendaPage from './pages/RegistrarVendaPage';
import AtividadesPage from './pages/AtividadesPage';
import DiarioBordoPage from './pages/DiarioBordoPage';
import RPDPage from './pages/RPDPage';
import CursoTracker from './pages/curso_tracker';
import LogPODDiarioPage from './pages/LogPODDiarioPage';
import { Header, Footer } from '@cidqueiroz/cdkteck-ui';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user, isLoading } = useAuth();
  const location = useLocation(); 
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('logged-in');
    return () => {
        document.body.classList.remove('logged-in');
    };
  }, []);

  const ReactRouterLink = (props) => (
    <Link {...props} />
  );

  return (
    <div className="app-container">
      <Header 
        LinkComponent={ReactRouterLink}
        usePathname={() => location.pathname}
      />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><Navigate to="/gestao" /></PrivateRoute>} />
          <Route path="/gestao" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/gestao/estoque" element={<PrivateRoute><EstoquePage /></PrivateRoute>} />
          <Route path="/gestao/vendas/registrar" element={<PrivateRoute><RegistrarVendaPage /></PrivateRoute>} />
          <Route path="/rpd" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/cursos" element={<CursoTracker />} />
          <Route path="/rpd/atividades" element={<PrivateRoute><AtividadesPage /></PrivateRoute>} />
          <Route path="/rpd/diario_bordo" element={<PrivateRoute><DiarioBordoPage /></PrivateRoute>} />
          <Route path="/rpd/rpd" element={<PrivateRoute><RPDPage /></PrivateRoute>} />
          <Route path="/rpd/log_pod_diario" element={<PrivateRoute><LogPODDiarioPage /></PrivateRoute>} />
        </Routes>
      </main>
      
      <Footer 
        openContactModal={() => setContactModalOpen(true)}
        LinkComponent={ReactRouterLink}
      />
      {/* Add ContactModal here if needed */}
    </div>
  );
}

export default App;

