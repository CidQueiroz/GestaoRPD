import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { Card, Input, Button } from '@cidqueiroz/cdkteck-ui'; // Importe os componentes da CDKTECK-UI
import api from '../../api';

const LogPODDiarioPage = () => {
  const { logout } = useAuth();
  const [logEntries, setLogEntries] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [selectedAtividade, setSelectedAtividade] = useState('');
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Estados para Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Deve corresponder ao backend
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchLogEntries = useCallback(async (page = currentPage, pageSize = itemsPerPage) => {
    try {
      // Adiciona parâmetros de paginação na requisição
      const response = await api.get(`/log_pod_diario/?page=${page}&page_size=${pageSize}`);
      setLogEntries(response.data.results);
      setTotalItems(response.data.count);
      setTotalPages(Math.ceil(response.data.count / pageSize));
      setMessage('');
      setMessageType('');
    } catch (error) {
      console.error("Erro ao buscar logs:", error);
      if (error.response && error.response.status === 401) {
        logout(); // Token expirado ou inválido
      } else {
        setMessage('Erro ao buscar logs. Verifique o console.');
        setMessageType('error');
      }
    }
  }, [currentPage, itemsPerPage, logout]); // Dependências para useCallback

  const fetchAtividades = useCallback(async () => {
    try {
      // Para o dropdown, geralmente queremos todas as atividades, ou uma lista paginada e searchable
      // Por simplicidade, vamos buscar todas por enquanto, ajustando o page_size para um valor alto
      const response = await api.get('/atividades/?page_size=1000'); // Busca um número grande de atividades
      setAtividades(response.data.results); // Use response.data.results para a lista de atividades
      if (response.data.results.length > 0) {
        setSelectedAtividade(response.data.results[0].id);
      }
    } catch (error) {
      console.error("Erro ao buscar atividades para o dropdown:", error);
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  }, [logout]);


  useEffect(() => {
    fetchLogEntries(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, fetchLogEntries]); // Redraw on page/itemsPerPage change

  useEffect(() => {
    fetchAtividades(); // Busca atividades apenas uma vez ou quando necessário
  }, [fetchAtividades]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    try {
      await api.post('/log_pod_diario/', {
        atividade: selectedAtividade,
        data: `${data}T00:00:00Z`,
        status,
      });
      setSelectedAtividade(atividades.length > 0 ? atividades[0].id : '');
      setData(new Date().toISOString().slice(0, 10));
      setStatus(false);
      setMessage('Entrada de log adicionada com sucesso!');
      setMessageType('success');
      fetchLogEntries(currentPage, itemsPerPage); // Recarrega a lista
    } catch (error) {
      console.error("Erro ao adicionar entrada de log:", error);
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
    <PageLayout title="Log POD Diário" backTo="/rpd">
      <div className="dashboard-grid">
        <Card className="dashboard-card">
          <div className="card-header">
            <h3>Adicionar Nova Entrada</h3>
            {message && <p className={`message-${messageType}`}>{message}</p>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="atividade">Atividade:</label>
              <select
                id="atividade"
                value={selectedAtividade}
                onChange={(e) => setSelectedAtividade(e.target.value)}
                required
                className="cdkteck-input" // Adicione classe para estilização
              >
                {atividades.map((atividade) => (
                  <option key={atividade.id} value={atividade.id}>
                    {atividade.nome_atividade}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="data">Data:</label>
              <Input
                type="date"
                id="data"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  className="cdkteck-checkbox"
                />
                Concluído
              </label>
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
          {logEntries.length === 0 ? (
            <p>Nenhuma entrada de log.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Atividade</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logEntries.map((entry) => (
                      <tr key={entry.id}>
                        <td>{new Date(entry.data).toLocaleDateString()}</td>
                        <td>{atividades.find(a => a.id === entry.atividade)?.nome_atividade || 'Atividade não encontrada'}</td>
                        <td>{entry.status ? 'Concluído' : 'Pendente'}</td>
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

export default LogPODDiarioPage;