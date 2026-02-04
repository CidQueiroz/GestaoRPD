import React from 'react';
import { Target, Sparkles } from 'lucide-react';

interface Meta {
  id: number;
  nome: string;
  valorAtual: number;
  valorMeta: number;
  diasRestantes: number;
  cor: string;
  progresso: number;
  alcancada?: boolean;
}

const metasData: Meta[] = [
  {
    id: 1,
    nome: 'Reserva de Emergência',
    valorAtual: 6500.0,
    valorMeta: 10000.0,
    diasRestantes: 243,
    cor: '#10b981',
    progresso: 65,
  },
  {
    id: 2,
    nome: 'Viagem de Férias',
    valorAtual: 2200.0,
    valorMeta: 5000.0,
    diasRestantes: 180,
    cor: '#3b82f6',
    progresso: 44,
  },
  {
    id: 3,
    nome: 'Novo Notebook',
    valorAtual: 4000.0,
    valorMeta: 4000.0,
    diasRestantes: 0,
    cor: '#8b5cf6',
    progresso: 100,
    alcancada: true,
  },
];

export const MetasFinanceiro = () => {
  const progressoGeral = 67;
  const totalGuardado = 12700;
  const totalMeta = 19000;

  return (
    <div className="finance-metas-container contexto-gestao">
      {/* Header */}
      <div className="finance-section-header">
        <div className="finance-section-header-info">
          <h2 className="finance-section-title">Suas Metas</h2>
          <p className="finance-section-subtitle">
            Acompanhe e alcance seus objetivos financeiros
          </p>
        </div>
        <button className="card-action-btn">+ Nova Meta</button>
      </div>

      {/* Progresso Geral */}
      <div className="finance-progress-card">
        <div className="finance-progress-header">
          <div className="finance-progress-title-group">
            <Target size={24} className="finance-icon-primary" />
            <h3 className="finance-card-title">Progresso Geral</h3>
          </div>
          <span className="finance-progress-percentage">{progressoGeral}%</span>
        </div>
        <p className="finance-progress-description">
          R$ {totalGuardado.toLocaleString('pt-BR')} de R${' '}
          {totalMeta.toLocaleString('pt-BR')} guardados
        </p>
        <div className="finance-progress-bar">
          <div
            className="finance-progress-bar-fill"
            style={{ width: `${progressoGeral}%` }}
          />
        </div>
      </div>

      {/* Grid de Metas */}
      <div className="dashboard-grid">
        {metasData.map((meta) => (
          <div key={meta.id} className="dashboard-card finance-meta-card">
            <div className="finance-meta-header">
              <div className="finance-meta-info">
                <h3 className="finance-meta-name">{meta.nome}</h3>
                <span
                  className={`finance-meta-badge ${meta.alcancada ? 'finance-meta-badge--success' : 'finance-meta-badge--pending'}`}
                >
                  {meta.alcancada
                    ? '✓ Alcançada! 🎉'
                    : `${meta.diasRestantes} dias`}
                </span>
              </div>
              <p className="finance-meta-remaining">
                Faltam R${' '}
                {(meta.valorMeta - meta.valorAtual)
                  .toFixed(2)
                  .replace('.', ',')}
              </p>
            </div>

            <div className="finance-meta-progress">
              <div className="finance-meta-progress-header">
                <span className="finance-meta-progress-label">Progresso</span>
                <span
                  className="finance-meta-progress-value"
                  style={{ color: meta.cor }}
                >
                  {meta.progresso}%
                </span>
              </div>
              <div className="finance-progress-bar">
                <div
                  className="finance-progress-bar-fill"
                  style={{ width: `${meta.progresso}%`, background: meta.cor }}
                />
              </div>
            </div>

            <div className="finance-meta-values">
              <span>R$ {meta.valorAtual.toFixed(2).replace('.', ',')}</span>
              <span>R$ {meta.valorMeta.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dica do Dia */}
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
