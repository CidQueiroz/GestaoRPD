import React, { useState, useEffect, useCallback } from 'react';
import { ChatFinanceiro } from './components/ChatFinanceiro';
import { MetasFinanceiro } from './components/MetasFinanceiro';
import { RelatoriosFinanceiro } from './components/RelatoriosFinanceiro';
import { FinanceiroRightSidebar } from './components/FinanceiroRightSidebar';
import { MessageCircle, Target, BarChart3, Wallet } from 'lucide-react';
import api from '../../../api';

interface Transaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  transaction_type: 'receita' | 'despesa';
  date: string;
}

interface Goal {
  id: number;
  name: string;
  current_amount: number;
  target_amount: number;
  target_date: string;
}

type TabType = 'chat' | 'metas' | 'relatorios';

export const FinanceiroApp = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [transactionsRes, goalsRes] = await Promise.all([
        api.get('transactions/'),
        api.get('goals/'),
      ]);
      setTransactions(transactionsRes.data.results || []);
      setGoals(goalsRes.data.results || []);
      setError(null);
    } catch (err) {
      setError('Não foi possível carregar os dados financeiros.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const menuItems = [
    { id: 'chat' as TabType, label: 'Chat', icon: MessageCircle },
    { id: 'metas' as TabType, label: 'Metas', icon: Target },
    { id: 'relatorios' as TabType, label: 'Relatórios', icon: BarChart3 },
  ];

  const renderContent = () => {
    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="message-error">{error}</div>;

    switch (activeTab) {
      case 'chat':
        return <ChatFinanceiro onNewTransaction={fetchData} />;
      case 'metas':
        return <MetasFinanceiro goals={goals} />;
      case 'relatorios':
        return <RelatoriosFinanceiro transactions={transactions} />;
      default:
        return <ChatFinanceiro onNewTransaction={fetchData} />;
    }
  };

  return (
    <div className="finance-app">
      {/* Sidebar */}
      <aside className="finance-sidebar">
        {/* Logo */}
        <div className="finance-logo">
          <div className="finance-logo-icon">
            <Wallet size={24} />
          </div>
          <h1 className="finance-logo-text">FinançaIA</h1>
        </div>

        {/* Menu */}
        <nav className="finance-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`finance-nav-item ${activeTab === item.id ? 'finance-nav-item--active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="finance-user-profile">
          <div className="finance-user-avatar">U</div>
          <div className="finance-user-info">
            <p className="finance-user-name">Usuário</p>
            <p className="finance-user-plan">Conta Gratuita</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="finance-main">
        <div className="finance-content">{renderContent()}</div>
        {activeTab === 'chat' && (
          <FinanceiroRightSidebar transactions={transactions} loading={loading} />
        )}
      </main>
    </div>
  );
};

export default FinanceiroApp;
