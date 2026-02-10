import React from 'react';
import { Target, Sparkles } from 'lucide-react';

interface Meta {
  id: number;
  name: string;
  current_amount: number;
  target_amount: number;
  target_date: string;
}

interface MetasFinanceiroProps {
  goals: Meta[];
}

export const MetasFinanceiro: React.FC<MetasFinanceiroProps> = ({ goals }) => {
  const totalGuardado = goals.reduce((acc, goal) => acc + Number(goal.current_amount), 0);
  const totalMeta = goals.reduce((acc, goal) => acc + Number(goal.target_amount), 0);
  const progressoGeral = totalMeta > 0 ? Math.round((totalGuardado / totalMeta) * 100) : 0;

  const getDaysRemaining = (targetDate: string) => {
    if (!targetDate) return 0;
    const diff = new Date(targetDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="finance-metas-container contexto-gestao">
      <div className="finance-section-header">
        <div className="finance-section-header-info">
          <h2 className="finance-section-title">Suas Metas</h2>
          <p className="finance-section-subtitle">
            Acompanhe e alcance seus objetivos financeiros
          </p>
        </div>
        <button className="card-action-btn">+ Nova Meta</button>
      </div>

      <div className="finance-progress-card">
        <div className="finance-progress-header">
          <div className="finance-progress-title-group">
            <Target size={24} className="finance-icon-primary" />
            <h3 className="finance-card-title">Progresso Geral</h3>
          </div>
          <span className="finance-progress-percentage">{progressoGeral}%</span>
        </div>
        <p className="finance-progress-description">
          R$ {totalGuardado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} de R${' '}
          {totalMeta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} guardados
        </p>
        <div className="finance-progress-bar">
          <div
            className="finance-progress-bar-fill"
            style={{ width: `${progressoGeral}%` }}
          />
        </div>
      </div>

      <div className="dashboard-grid">
        {goals.length > 0 ? goals.map((meta) => {
          const progresso = meta.target_amount > 0 ? Math.round((Number(meta.current_amount) / Number(meta.target_amount)) * 100) : 100;
          const isAlcancada = progresso >= 100;
          const diasRestantes = getDaysRemaining(meta.target_date);
          const cor = isAlcancada ? '#10b981' : '#3b82f6';

          return (
            <div key={meta.id} className="dashboard-card finance-meta-card">
              <div className="finance-meta-header">
                <div className="finance-meta-info">
                  <h3 className="finance-meta-name">{meta.name}</h3>
                  <span
                    className={`finance-meta-badge ${isAlcancada ? 'finance-meta-badge--success' : 'finance-meta-badge--pending'}`}
                  >
                    {isAlcancada
                      ? '✓ Alcançada! 🎉'
                      : `${diasRestantes} dias`}
                  </span>
                </div>
                <p className="finance-meta-remaining">
                  Faltam R${' '}
                  {(Number(meta.target_amount) - Number(meta.current_amount))
                    .toFixed(2)
                    .replace('.', ',')}
                </p>
              </div>

              <div className="finance-meta-progress">
                <div className="finance-meta-progress-header">
                  <span className="finance-meta-progress-label">Progresso</span>
                  <span
                    className="finance-meta-progress-value"
                    style={{ color: cor }}
                  >
                    {progresso}%
                  </span>
                </div>
                <div className="finance-progress-bar">
                  <div
                    className="finance-progress-bar-fill"
                    style={{ width: `${progresso}%`, background: cor }}
                  />
                </div>
              </div>

              <div className="finance-meta-values">
                <span>R$ {Number(meta.current_amount).toFixed(2).replace('.', ',')}</span>
                <span>R$ {Number(meta.target_amount).toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          )
        }) : <p>Nenhuma meta cadastrada ainda.</p>}
      </div>

      <div className="finance-tip-card">
        <div className="finance-tip-header">
          <Sparkles size={20} className="finance-icon-primary" />
          <h4 className="finance-tip-title">Dica do Dia</h4>
        </div>
        <p className="finance-tip-content">
          Você está indo muito bem! Para alcançar sua meta de viagem mais
          rápido, considere automatizar uma transferência de R$ 200 todo mês.
          Assim você garante consistência e chega lá antes do prazo! 🚀
        </p>
      </div>
    </div>
  );
};
