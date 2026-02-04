import React, { useState } from 'react';
import { ChatFinanceiro } from './components/ChatFinanceiro';
import { MetasFinanceiro } from './components/MetasFinanceiro';
import { RelatoriosFinanceiro } from './components/RelatoriosFinanceiro';
import { FinanceiroRightSidebar } from './components/FinanceiroRightSidebar';
import { MessageCircle, Target, BarChart3, Settings, Wallet } from 'lucide-react';

type TabType = 'chat' | 'metas' | 'relatorios';

export const FinanceiroApp = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chat');

  const menuItems = [
    { id: 'chat' as TabType, label: 'Chat', icon: MessageCircle },
    { id: 'metas' as TabType, label: 'Metas', icon: Target },
    { id: 'relatorios' as TabType, label: 'Relatórios', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatFinanceiro />;
      case 'metas':
        return <MetasFinanceiro />;
      case 'relatorios':
        return <RelatoriosFinanceiro />;
      default:
        return <ChatFinanceiro />;
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
        {activeTab === 'chat' && <FinanceiroRightSidebar />}
      </main>
    </div>
  );
};

export default FinanceiroApp;
