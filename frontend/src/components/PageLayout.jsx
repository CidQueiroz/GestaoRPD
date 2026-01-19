// GestaoRPD/frontend/src/components/PageLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@cidqueiroz/cdkteck-ui';

const PageLayout = ({ title, backTo, children }) => {
  return (
    <div className="dashboard-container">
      <div className="page-header-controls">
        <Link to={backTo}>
          <Button className="btn-back">
            &larr; Voltar ao Dashboard
          </Button>
        </Link>
        <h1 className="dashboard-title" style={{ textAlign: 'center', flexGrow: 1 }}>
          {title}
        </h1>
      </div>
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
