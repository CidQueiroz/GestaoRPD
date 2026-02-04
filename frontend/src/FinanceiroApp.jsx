import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// The FinanceiroLayout now contains the full structure, including sidebars.
// We directly render it and pass the routes as children.
import { FinanceiroLayout } from './pages/Gestao/Financeiro/components/layout/FinanceiroLayout';

const FinanceiroIndex = lazy(() => import('./pages/Gestao/Financeiro/pages/Index'));
const FinanceiroMetas = lazy(() => import('./pages/Gestao/Financeiro/pages/Metas'));
const FinanceiroRelatorios = lazy(() => import('./pages/Gestao/Financeiro/pages/Relatorios'));
const FinanceiroConfiguracoes = lazy(() => import('./pages/Gestao/Financeiro/pages/Configuracoes'));
const FinanceiroNotFound = lazy(() => import('./pages/Gestao/Financeiro/pages/NotFound'));

function FinanceiroApp() {
  return (
    <FinanceiroLayout>
      <Suspense fallback={<div>Carregando página...</div>}>
        <Routes>
          <Route index element={<FinanceiroIndex />} />
          <Route path="metas" element={<FinanceiroMetas />} />
          <Route path="relatorios" element={<FinanceiroRelatorios />} />
          <Route path="configuracoes" element={<FinanceiroConfiguracoes />} />
          <Route path="*" element={<FinanceiroNotFound />} />
        </Routes>
      </Suspense>
    </FinanceiroLayout>
  );
}

export default FinanceiroApp;