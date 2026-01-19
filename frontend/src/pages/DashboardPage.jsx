import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Card } from '@cidqueiroz/cdkteck-ui';

const DashboardPage = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const isGestao = location.pathname.startsWith('/gestao');

  const gestaoLinks = (
    <>
      <Card className="dashboard-card">
        <div className="card-header">
          <h3>Controle de Estoque</h3>
          <p>Gerencie seus produtos e inventário.</p>
        </div>
        <Link to="/gestao/estoque" className="card-action-btn">Acessar Estoque</Link>
      </Card>

      <Card className="dashboard-card">
        <div className="card-header">
          <h3>Registrar Venda</h3>
          <p>Registre suas vendas de forma rápida e fácil.</p>
        </div>
        <Link to="/gestao/vendas/registrar" className="card-action-btn">Nova Venda</Link>
      </Card>
    </>
  );

  const rpdLinks = (
    <>
      <Card className="dashboard-card">
        <div className="card-header">
          <h3>Gerenciar Atividades</h3>
          <p>Organize suas tarefas e projetos.</p>
        </div>
        <Link to="/rpd/atividades" className="card-action-btn">Minhas Atividades</Link>
      </Card>

      <Card className="dashboard-card">
        <div className="card-header">
          <h3>Diário de Bordo</h3>
          <p>Registre seus pensamentos e experiências diárias.</p>
        </div>
        <Link to="/rpd/diario_bordo" className="card-action-btn">Abrir Diário</Link>
      </Card>

      <Card className="dashboard-card">
        <div className="card-header">
          <h3>Registro de Pensamentos Disfuncionais (RPD)</h3>
          <p>Identifique e reestruture pensamentos negativos.</p>
        </div>
        <Link to="/rpd/rpd" className="card-action-btn">Iniciar RPD</Link>
      </Card>

      <Card className="dashboard-card">
        <div className="card-header">
          <h3>Cursor Tracker</h3>
          <p>Acompanhe o andamento do curso.</p>
        </div>
        <Link to="/rpd/cursos" className="card-action-btn">Ver acompanhamento</Link>
      </Card>

      <Card className="dashboard-card">
        <div className="card-header">
          <h3>Log POD Diário</h3>
          <p>Acompanhe seu progresso diário.</p>
        </div>
        <Link to="/rpd/log_pod_diario" className="card-action-btn">Ver Log</Link>
      </Card>

      <Card className="dashboard-card">
        <div className="card-header">
          <h3>War Room</h3>
          <p>Visualize e analise os dados de forma integrada.</p>
        </div>
        <Link to="/war-room" className="card-action-btn">Entrar na Sala</Link>
      </Card>
    </>
  );

  return (
    <div className={`dashboard-container ${isGestao ? 'contexto-gestao' : 'contexto-rpd'}`}>
      <h1 className="dashboard-title">Dashboard</h1>
      
      <div className="dashboard-tabs">
        <Link to="/gestao" className={`tab-btn ${isGestao ? 'active' : ''}`}>Gestão</Link>
        <Link to="/rpd" className={`tab-btn ${!isGestao ? 'active' : ''}`}>RPD</Link>
      </div>

      <div className="dashboard-grid">
        {isGestao ? gestaoLinks : rpdLinks}
      </div>

      <Button onClick={logout} className="btn-logout-minimal">Sair</Button>
    </div>
  );
};

export default DashboardPage;
