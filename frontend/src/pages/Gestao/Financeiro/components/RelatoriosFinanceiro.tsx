import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Download,
} from 'lucide-react';

interface Transaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  transaction_type: 'receita' | 'despesa';
  date: string;
}

interface HistoricoMes {
  mes: string;
  entradas: number;
  saidas: number;
}

interface RelatoriosFinanceiroProps {
  transactions: Transaction[];
}

export const RelatoriosFinanceiro: React.FC<RelatoriosFinanceiroProps> = ({ transactions }) => {
  const [monthlyHistory, setMonthlyHistory] = useState<HistoricoMes[]>([]);

  useEffect(() => {
    const history: { [key: string]: { entradas: number; saidas: number } } = {};
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    
    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = monthNames[date.getMonth()];
      if (!history[monthKey]) {
        history[monthKey] = { entradas: 0, saidas: 0 };
      }
      if (t.transaction_type === 'receita') {
        history[monthKey].entradas += Number(t.amount);
      } else {
        history[monthKey].saidas += Number(t.amount);
      }
    });
    
    const historyArray = Object.keys(history).map(key => ({
        mes: key,
        ...history[key]
    }));

    setMonthlyHistory(historyArray);
  }, [transactions]);

  const totalEntradas = transactions.filter(t => t.transaction_type === 'receita').reduce((acc, t) => acc + Number(t.amount), 0);
  const totalSaidas = transactions.filter(t => t.transaction_type === 'despesa').reduce((acc, t) => acc + Number(t.amount), 0);
  const economiaTotal = totalEntradas - totalSaidas;
  const percentualGuardado = totalEntradas > 0 ? (economiaTotal / totalEntradas) * 100 : 0;
  const maxValor = Math.max(...monthlyHistory.flatMap(m => [m.entradas, m.saidas]), 1);

  return (
    <div className="finance-relatorios-container contexto-gestao">
      <div className="finance-section-header">
        <div className="finance-section-header-info">
          <h2 className="finance-section-title">Relatórios</h2>
          <p className="finance-section-subtitle">Visualize seu histórico financeiro</p>
        </div>
        <div className="finance-section-actions">
          <button className="card-action-btn finance-btn-with-icon"><Calendar size={16} />Este Mês</button>
          <button className="card-action-btn finance-btn-with-icon"><Download size={16} />Exportar</button>
        </div>
      </div>

      <div className="finance-stats-grid">
        <div className="finance-stat-card">
          <div className="finance-stat-header">
            <div className="finance-stat-icon finance-stat-icon--success"><TrendingUp size={20} /></div>
            <span className="finance-stat-label">Total de Entradas</span>
          </div>
          <p className="finance-stat-value finance-stat-value--success">R$ {totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="finance-stat-card">
          <div className="finance-stat-header">
            <div className="finance-stat-icon finance-stat-icon--danger"><TrendingDown size={20} /></div>
            <span className="finance-stat-label">Total de Saídas</span>
          </div>
          <p className="finance-stat-value finance-stat-value--danger">R$ {totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="finance-stat-card">
          <div className="finance-stat-header">
            <div className="finance-stat-icon finance-stat-icon--info"><BarChart3 size={20} /></div>
            <span className="finance-stat-label">Economia Total</span>
          </div>
          <p className="finance-stat-value finance-stat-value--info">R$ {economiaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          <p className="finance-stat-period">{percentualGuardado.toFixed(1)}% guardado</p>
        </div>
      </div>

      <div className="finance-chart-card">
        <h3 className="finance-card-title">Histórico Mensal</h3>
        <div className="finance-chart">
          {monthlyHistory.length > 0 ? monthlyHistory.map((mes, index) => (
            <div key={index} className="finance-chart-column">
              <div className="finance-chart-bars">
                <div className="finance-chart-bar finance-chart-bar--success" style={{ height: `${(mes.entradas / maxValor) * 100}%` }}>
                  <span className="finance-chart-bar-value">{(mes.entradas / 1000).toFixed(1)}k</span>
                </div>
                <div className="finance-chart-bar finance-chart-bar--danger" style={{ height: `${(mes.saidas / maxValor) * 100}%` }}>
                  <span className="finance-chart-bar-value">{(mes.saidas / 1000).toFixed(1)}k</span>
                </div>
              </div>
              <span className="finance-chart-label">{mes.mes}</span>
            </div>
          )) : <p>Sem dados de histórico mensal.</p>}
        </div>
        <div className="finance-chart-legend">
          <div className="finance-chart-legend-item"><div className="finance-chart-legend-color finance-chart-legend-color--success" /><span>Entradas</span></div>
          <div className="finance-chart-legend-item"><div className="finance-chart-legend-color finance-chart-legend-color--danger" /><span>Saídas</span></div>
        </div>
      </div>

      <div className="finance-transactions-card">
        <h3 className="finance-card-title">Transações Recentes</h3>
        <div className="finance-transactions-list">
          {transactions.length > 0 ? transactions.slice(0, 5).map((transacao) => (
            <div key={transacao.id} className="finance-transaction-item">
              <div className="finance-transaction-info">
                <div className={`finance-transaction-icon ${transacao.transaction_type === 'receita' ? 'finance-transaction-icon--success' : 'finance-transaction-icon--danger'}`}>
                  {transacao.transaction_type === 'receita' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div className="finance-transaction-details">
                  <p className="finance-transaction-name">{transacao.description}</p>
                  <p className="finance-transaction-category">{transacao.category}</p>
                </div>
              </div>
              <div className="finance-transaction-amount">
                <p className={`finance-transaction-value ${transacao.transaction_type === 'receita' ? 'finance-transaction-value--success' : 'finance-transaction-value--danger'}`}>
                  {transacao.transaction_type === 'receita' ? '+' : '-'}R$ {Math.abs(Number(transacao.amount)).toFixed(2).replace('.', ',')}
                </p>
                <p className="finance-transaction-date">{new Date(transacao.date).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          )) : <p>Nenhuma transação recente.</p>}
        </div>
      </div>
    </div>
  );
};
