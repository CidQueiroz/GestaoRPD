import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Download,
} from 'lucide-react';

interface HistoricoMes {
  mes: string;
  entradas: number;
  saidas: number;
}

interface Transacao {
  id: number;
  nome: string;
  categoria: string;
  valor: number;
  data: string;
}

const historicoMensal: HistoricoMes[] = [
  { mes: 'Set', entradas: 3100, saidas: 2800 },
  { mes: 'Out', entradas: 3400, saidas: 3100 },
  { mes: 'Nov', entradas: 3200, saidas: 3250 },
  { mes: 'Dez', entradas: 4100, saidas: 3800 },
  { mes: 'Jan', entradas: 3500, saidas: 3200 },
];

const transacoesRecentes: Transacao[] = [
  { id: 1, nome: 'Mercado Extra', categoria: 'Mercado', valor: -156.8, data: 'Hoje' },
  { id: 2, nome: 'Salário', categoria: 'Renda', valor: 3000.0, data: 'Ontem' },
  { id: 3, nome: 'Uber', categoria: 'Transporte', valor: -24.5, data: 'Ontem' },
  { id: 4, nome: 'iFood', categoria: 'Alimentação', valor: -45.9, data: '23 Jan' },
  { id: 5, nome: 'Netflix', categoria: 'Lazer', valor: -55.9, data: '22 Jan' },
];

export const RelatoriosFinanceiro = () => {
  const maxValor = Math.max(
    ...historicoMensal.flatMap((m) => [m.entradas, m.saidas])
  );

  return (
    <div className="finance-relatorios-container contexto-gestao">
      {/* Header */}
      <div className="finance-section-header">
        <div className="finance-section-header-info">
          <h2 className="finance-section-title">Relatórios</h2>
          <p className="finance-section-subtitle">
            Visualize seu histórico financeiro
          </p>
        </div>
        <div className="finance-section-actions">
          <button className="card-action-btn finance-btn-with-icon">
            <Calendar size={16} />
            Janeiro 2025
          </button>
          <button className="card-action-btn finance-btn-with-icon">
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="finance-stats-grid">
        <div className="finance-stat-card finance-stat-card--success">
          <div className="finance-stat-header">
            <div className="finance-stat-icon finance-stat-icon--success">
              <TrendingUp size={20} />
            </div>
            <span className="finance-stat-label">Total de Entradas</span>
          </div>
          <p className="finance-stat-value finance-stat-value--success">
            R$ 15.700,00
          </p>
          <p className="finance-stat-period">Últimos 5 meses</p>
        </div>

        <div className="finance-stat-card finance-stat-card--danger">
          <div className="finance-stat-header">
            <div className="finance-stat-icon finance-stat-icon--danger">
              <TrendingDown size={20} />
            </div>
            <span className="finance-stat-label">Total de Saídas</span>
          </div>
          <p className="finance-stat-value finance-stat-value--danger">
            R$ 12.650,00
          </p>
          <p className="finance-stat-period">Últimos 5 meses</p>
        </div>

        <div className="finance-stat-card finance-stat-card--info">
          <div className="finance-stat-header">
            <div className="finance-stat-icon finance-stat-icon--info">
              <BarChart3 size={20} />
            </div>
            <span className="finance-stat-label">Economia Total</span>
          </div>
          <p className="finance-stat-value finance-stat-value--info">
            R$ 3.050,00
          </p>
          <p className="finance-stat-period">19.4% guardado</p>
        </div>
      </div>

      {/* Gráfico de Histórico Mensal */}
      <div className="finance-chart-card">
        <h3 className="finance-card-title">Histórico Mensal</h3>

        <div className="finance-chart">
          {historicoMensal.map((mes, index) => (
            <div key={index} className="finance-chart-column">
              <div className="finance-chart-bars">
                <div
                  className="finance-chart-bar finance-chart-bar--success"
                  style={{ height: `${(mes.entradas / maxValor) * 100}%` }}
                >
                  <span className="finance-chart-bar-value">
                    {(mes.entradas / 1000).toFixed(1)}k
                  </span>
                </div>
                <div
                  className="finance-chart-bar finance-chart-bar--danger"
                  style={{ height: `${(mes.saidas / maxValor) * 100}%` }}
                >
                  <span className="finance-chart-bar-value">
                    {(mes.saidas / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>
              <span className="finance-chart-label">{mes.mes}</span>
            </div>
          ))}
        </div>

        <div className="finance-chart-legend">
          <div className="finance-chart-legend-item">
            <div className="finance-chart-legend-color finance-chart-legend-color--success" />
            <span>Entradas</span>
          </div>
          <div className="finance-chart-legend-item">
            <div className="finance-chart-legend-color finance-chart-legend-color--danger" />
            <span>Saídas</span>
          </div>
        </div>
      </div>

      {/* Transações Recentes */}
      <div className="finance-transactions-card">
        <h3 className="finance-card-title">Transações Recentes</h3>

        <div className="finance-transactions-list">
          {transacoesRecentes.map((transacao) => (
            <div key={transacao.id} className="finance-transaction-item">
              <div className="finance-transaction-info">
                <div
                  className={`finance-transaction-icon ${transacao.valor > 0 ? 'finance-transaction-icon--success' : 'finance-transaction-icon--danger'}`}
                >
                  {transacao.valor > 0 ? (
                    <TrendingUp size={20} />
                  ) : (
                    <TrendingDown size={20} />
                  )}
                </div>
                <div className="finance-transaction-details">
                  <p className="finance-transaction-name">{transacao.nome}</p>
                  <p className="finance-transaction-category">
                    {transacao.categoria}
                  </p>
                </div>
              </div>
              <div className="finance-transaction-amount">
                <p
                  className={`finance-transaction-value ${transacao.valor > 0 ? 'finance-transaction-value--success' : 'finance-transaction-value--danger'}`}
                >
                  {transacao.valor > 0 ? '+' : ''}R${' '}
                  {Math.abs(transacao.valor).toFixed(2).replace('.', ',')}
                </p>
                <p className="finance-transaction-date">{transacao.data}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
