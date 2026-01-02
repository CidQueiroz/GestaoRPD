import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Header, Footer } from '@cidqueiroz/cdkteck-ui';

// Lazy load pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const EstoquePage = lazy(() => import('./pages/EstoquePage'));
const RegistrarVendaPage = lazy(() => import('./pages/RegistrarVendaPage'));
const AtividadesPage = lazy(() => import('./pages/AtividadesPage'));
const DiarioBordoPage = lazy(() => import('./pages/DiarioBordoPage'));
const RPDPage = lazy(() => import('./pages/RPDPage'));
const CursoTracker = lazy(() => import('./pages/curso_tracker'));
const LogPODDiarioPage = lazy(() => import('./pages/LogPODDiarioPage'));
const Privacidade = lazy(() => import('./pages/Privacidade'));
const Termos = lazy(() => import('./pages/Termos'));

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  return user ? children : <Navigate to="/login" />;
};

function App() {
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
        <Suspense fallback={<div>Carregando página...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/" element={<PrivateRoute><Navigate to="/gestao" /></PrivateRoute>} />
            <Route path="/gestao" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/gestao/estoque" element={<PrivateRoute><EstoquePage /></PrivateRoute>} />
            <Route path="/gestao/vendas/registrar" element={<PrivateRoute><RegistrarVendaPage /></PrivateRoute>} />
            <Route path="/rpd" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/rpd/cursos" element={<CursoTracker />} />
            <Route path="/rpd/atividades" element={<PrivateRoute><AtividadesPage /></PrivateRoute>} />
            <Route path="/rpd/diario_bordo" element={<PrivateRoute><DiarioBordoPage /></PrivateRoute>} />
            <Route path="/rpd/rpd" element={<PrivateRoute><RPDPage /></PrivateRoute>} />
            <Route path="/rpd/log_pod_diario" element={<PrivateRoute><LogPODDiarioPage /></PrivateRoute>} />
          </Routes>
        </Suspense>
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
