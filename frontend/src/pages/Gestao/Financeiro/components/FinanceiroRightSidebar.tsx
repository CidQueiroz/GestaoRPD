import React from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ShoppingCart,
  Car,
  UtensilsCrossed,
  Home,
} from 'lucide-react';

interface Categoria {
  nome: string;
  valor: number;
  cor: string;
  icon: any;
}

const categoriasData: Categoria[] = [
  { nome: 'Mercado', valor: 450.0, cor: '#10b981', icon: ShoppingCart },
  { nome: 'Transporte', valor: 280.0, cor: '#3b82f6', icon: Car },
  { nome: 'Alimentação', valor: 320.0, cor: '#f59e0b', icon: UtensilsCrossed },
  { nome: 'Moradia', valor: 1200.0, cor: '#8b5cf6', icon: Home },
];

export const FinanceiroRightSidebar = () => {
  const saldo = 750.0;
  const entradas = 2300.0;
  const saidas = 2250.0;

  const maxCategoria = Math.max(...categoriasData.map((c) => c.valor));

  return (
    <div className="finance-right-sidebar">
      {/* Saldo do Mês */}
      <div className="finance-balance-card">
        <div className="finance-balance-header">
          <span className="finance-balance-label">Saldo do mês</span>
          <Wallet size={18} className="finance-icon-primary" />
        </div>
        <p className="finance-balance-value">
          R$ {saldo.toFixed(2).replace('.', ',')}
        </p>
      </div>

      {/* Entradas e Saídas */}
      <div className="finance-summary-grid">
        <div className="finance-summary-card finance-summary-card--success">
          <div className="finance-summary-header">
            <TrendingUp size={16} />
            <span className="finance-summary-label">Entradas</span>
          </div>
          <p className="finance-summary-value">
            R$ {entradas.toFixed(2).replace('.', ',')}
          </p>
        </div>

        <div className="finance-summary-card finance-summary-card--danger">
          <div className="finance-summary-header">
            <TrendingDown size={16} />
            <span className="finance-summary-label">Saídas</span>
          </div>
          <p className="finance-summary-value">
            R$ {saidas.toFixed(2).replace('.', ',')}
          </p>
        </div>
      </div>

      {/* Gastos por Categoria */}
      <div className="finance-categories">
        <div className="finance-categories-header">
          <h3 className="finance-categories-title">Gastos por Categoria</h3>
          <Sparkles size={16} className="finance-icon-primary" />
        </div>

        {categoriasData.map((cat, index) => {
          const Icon = cat.icon;
          const porcentagem = (cat.valor / maxCategoria) * 100;

          return (
            <div key={index} className="finance-category-item">
              <div className="finance-category-header">
                <div className="finance-category-info">
                  <div
                    className="finance-category-icon"
                    style={{ background: `${cat.cor}20` }}
                  >
                    <Icon size={16} color={cat.cor} />
                  </div>
                  <span className="finance-category-name">{cat.nome}</span>
                </div>
                <span
                  className="finance-category-value"
                  style={{ color: cat.cor }}
                >
                  R$ {cat.valor.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="finance-category-progress">
                <div
                  className="finance-category-progress-fill"
                  style={{ width: `${porcentagem}%`, background: cat.cor }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
