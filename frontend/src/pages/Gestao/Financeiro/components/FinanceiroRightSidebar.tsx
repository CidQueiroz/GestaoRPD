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

interface Transaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  transaction_type: 'receita' | 'despesa';
  date: string;
}

interface Categoria {
  nome: string;
  valor: number;
  cor: string;
  icon: React.ElementType;
}

const categoryDetails: { [key: string]: { icon: React.ElementType, color: string } } = {
  'Mercado': { icon: ShoppingCart, color: '#10b981' },
  'Transporte': { icon: Car, color: '#3b82f6' },
  'Alimentação': { icon: UtensilsCrossed, color: '#f59e0b' },
  'Moradia': { icon: Home, color: '#8b5cf6' },
  'Default': { icon: Sparkles, color: '#64748b' }
};

interface FinanceiroRightSidebarProps {
  transactions: Transaction[];
  loading: boolean;
}

export const FinanceiroRightSidebar: React.FC<FinanceiroRightSidebarProps> = ({ transactions, loading }) => {

  if (loading) {
    return <div className="finance-right-sidebar">Carregando...</div>;
  }

  const entradas = transactions.filter(t => t.transaction_type === 'receita').reduce((acc, t) => acc + Number(t.amount), 0);
  const saidas = transactions.filter(t => t.transaction_type === 'despesa').reduce((acc, t) => acc + Number(t.amount), 0);
  const saldo = entradas - saidas;

  const categoriasData = transactions
    .filter(t => t.transaction_type === 'despesa' && t.category)
    .reduce((acc, t) => {
      const existingCategory = acc.find(c => c.nome === t.category);
      const details = categoryDetails[t.category] || categoryDetails.Default;
      if (existingCategory) {
        existingCategory.valor += Number(t.amount);
      } else {
        acc.push({
          nome: t.category,
          valor: Number(t.amount),
          cor: details.color,
          icon: details.icon,
        });
      }
      return acc;
    }, [] as Categoria[]).sort((a, b) => b.valor - a.valor);

  const maxCategoria = Math.max(...categoriasData.map((c) => c.valor), 1);

  return (
    <div className="finance-right-sidebar">
      <div className="finance-balance-card">
        <div className="finance-balance-header">
          <span className="finance-balance-label">Saldo do mês</span>
          <Wallet size={18} className="finance-icon-primary" />
        </div>
        <p className="finance-balance-value">R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
      </div>

      <div className="finance-summary-grid">
        <div className="finance-summary-card finance-summary-card--success">
          <div className="finance-summary-header"><TrendingUp size={16} /><span className="finance-summary-label">Entradas</span></div>
          <p className="finance-summary-value">R$ {entradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="finance-summary-card finance-summary-card--danger">
          <div className="finance-summary-header"><TrendingDown size={16} /><span className="finance-summary-label">Saídas</span></div>
          <p className="finance-summary-value">R$ {saidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="finance-categories">
        <div className="finance-categories-header">
          <h3 className="finance-categories-title">Gastos por Categoria</h3>
          <Sparkles size={16} className="finance-icon-primary" />
        </div>
        {categoriasData.length > 0 ? categoriasData.map((cat, index) => {
          const Icon = cat.icon;
          const porcentagem = (cat.valor / maxCategoria) * 100;
          return (
            <div key={index} className="finance-category-item">
              <div className="finance-category-header">
                <div className="finance-category-info">
                  <div className="finance-category-icon" style={{ background: `${cat.cor}20` }}><Icon size={16} color={cat.cor} /></div>
                  <span className="finance-category-name">{cat.nome}</span>
                </div>
                <span className="finance-category-value" style={{ color: cat.cor }}>
                  R$ {cat.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="finance-category-progress">
                <div className="finance-category-progress-fill" style={{ width: `${porcentagem}%`, background: cat.cor }} />
              </div>
            </div>
          );
        }) : <p className="text-sm text-gray-500 mt-2">Sem dados de categorias para exibir.</p>}
      </div>
    </div>
  );
};
