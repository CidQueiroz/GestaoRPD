import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api';
import PageLayout from '../../components/PageLayout';
import { Card, Input, Button } from '@cidqueiroz/cdkteck-ui'; // Importe os componentes da CDKTECK-UI
import { useAuth } from '../../context/AuthContext';

const RPDPage = () => {
  const { logout } = useAuth();
  const [rpdEntries, setRpdEntries] = useState([]);
  const [formData, setFormData] = useState({
    data: new Date().toISOString().slice(0, 10),
    situacao: '',
    pensamento_automatico: '',
    emocao: '',
    resposta_adaptativa: '',
    resultado: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Estados para Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Deve corresponder ao backend
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRpdEntries = useCallback(async (page = currentPage, pageSize = itemsPerPage) => {
    try {
      // Adiciona parâmetros de paginação na requisição
      const response = await api.get(`/rpd/?page=${page}&page_size=${pageSize}`);
      setRpdEntries(response.data.results);
      setTotalItems(response.data.count);
      setTotalPages(Math.ceil(response.data.count / pageSize));
      setMessage('');
      setMessageType('');
    } catch (error) {
      console.error("Erro ao buscar entradas de RPD:", error);
      if (error.response && error.response.status === 401) {
        logout(); // Token expirado ou inválido
      } else {
        setMessage('Erro ao buscar entradas de RPD. Verifique o console.');
        setMessageType('error');
      }
    }
  }, [currentPage, itemsPerPage, logout]); // Dependências para useCallback

  useEffect(() => {
    fetchRpdEntries(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, fetchRpdEntries]); // Redraw on page/itemsPerPage change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    try {
      await api.post('/rpd/', {
        ...formData,
        data: `${formData.data}T00:00:00Z`,
      });
      setFormData({
        data: new Date().toISOString().slice(0, 10),
        situacao: '',
        pensamento_automatico: '',
        emocao: '',
        resposta_adaptativa: '',
        resultado: '',
      });
      setMessage('Entrada de RPD adicionada com sucesso!');
      setMessageType('success');
      fetchRpdEntries(currentPage, itemsPerPage); // Recarrega a lista
    } catch (error) {
      console.error("Erro ao adicionar entrada de RPD:", error);
      if (error.response && error.response.status === 401) {
        logout();
      } else {
        setMessage('Erro ao adicionar entrada. Verifique o console.');
        setMessageType('error');
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <PageLayout title="Registro de Pensamentos Disfuncionais (RPD)" backTo="/rpd">
      <div className="dashboard-grid">
        <Card className="dashboard-card">
          <div className="card-header">
            <h3>Adicionar Nova Entrada</h3>
            {message && <p className={`message-${messageType}`}>{message}</p>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="data">Data:</label>
              <Input type="date" id="data" name="data" value={formData.data} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="situacao">Situação:</label>
              <textarea id="situacao" name="situacao" value={formData.situacao} onChange={handleChange} required className="cdkteck-textarea" /> {/* Adicionei classe para estilização */}
            </div>
            <div className="form-group">
              <label htmlFor="pensamento_automatico">Pensamento Automático:</label>
              <textarea id="pensamento_automatico" name="pensamento_automatico" value={formData.pensamento_automatico} onChange={handleChange} required className="cdkteck-textarea" />
            </div>
            <div className="form-group">
              <label htmlFor="emocao">Emoção:</label>
              <Input type="text" id="emocao" name="emocao" value={formData.emocao} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="resposta_adaptativa">Resposta Adaptativa:</label>
              <textarea id="resposta_adaptativa" name="resposta_adaptativa" value={formData.resposta_adaptativa} onChange={handleChange} required className="cdkteck-textarea" />
            </div>
            <div className="form-group">
              <label htmlFor="resultado">Resultado:</label>
              <textarea id="resultado" name="resultado" value={formData.resultado} onChange={handleChange} required className="cdkteck-textarea" />
            </div>
            <div className="form-actions" style={{ marginTop: '1rem' }}>
              <Button type="submit" variant="primary">Salvar Entrada</Button> {/* Usando Button da CDKTECK-UI */}
            </div>
          </form>
        </Card>

        <Card className="dashboard-card">
          <div className="card-header">
            <h3>Minhas Entradas</h3>
          </div>
          {rpdEntries.length === 0 ? (
            <p>Nenhuma entrada de RPD.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Situação</th>
                      <th>Pensamento Automático</th>
                      <th>Emoção</th>
                      <th>Resposta Adaptativa</th>
                      <th>Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rpdEntries.map((entry) => (
                      <tr key={entry.id}>
                        <td>{new Date(entry.data).toLocaleDateString()}</td>
                        <td>{entry.situacao}</td>
                        <td>{entry.pensamento_automatico}</td>
                        <td>{entry.emocao}</td>
                        <td>{entry.resposta_adaptativa}</td>
                        <td>{entry.resultado}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Controles de Paginação */}
              <div className="pagination-controls" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} variant="secondary">Anterior</Button>
                <span>Página {currentPage} de {totalPages}</span>
                <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} variant="secondary">Próxima</Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </PageLayout>
  );
};

export default RPDPage;