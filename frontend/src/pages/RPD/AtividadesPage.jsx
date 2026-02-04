import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { Card, Input, Button } from '@cidqueiroz/cdkteck-ui'; // Importe os componentes da CDKTECK-UI
import api from '../../api';

const AtividadesPage = () => {
  const { logout } = useAuth();
  const [atividades, setAtividades] = useState([]);
  const [nomeAtividade, setNomeAtividade] = useState('');
  const [periodo, setPeriodo] = useState('manha');
  const [ativa, setAtiva] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Estados para Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Deve corresponder ao backend
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchAtividades = useCallback(async (page = currentPage, pageSize = itemsPerPage) => {
    try {
      // Adiciona parâmetros de paginação na requisição
      const response = await api.get(`/atividades/?page=${page}&page_size=${pageSize}`);
      setAtividades(response.data.results);
      setTotalItems(response.data.count);
      setTotalPages(Math.ceil(response.data.count / pageSize));
      setMessage('');
      setMessageType('');
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      if (error.response && error.response.status === 401) {
        logout(); // Token expirado ou inválido
      } else {
        setMessage('Erro ao buscar atividades. Verifique o console.');
        setMessageType('error');
      }
    }
  }, [currentPage, itemsPerPage, logout]); // Dependências para useCallback

  useEffect(() => {
    fetchAtividades(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, fetchAtividades]); // Redraw on page/itemsPerPage change

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    try {
      await api.post('/atividades/', {
        nome_atividade: nomeAtividade,
        periodo,
        ativa,
      });
      setNomeAtividade('');
      setPeriodo('manha');
      setAtiva(true);
      setMessage('Atividade adicionada com sucesso!');
      setMessageType('success');
      fetchAtividades(currentPage, itemsPerPage); // Recarrega a lista de atividades atual
    } catch (error) {
      console.error("Erro ao adicionar atividade:", error);
      if (error.response && error.response.status === 401) {
        logout();
      } else {
        setMessage('Erro ao adicionar atividade. Verifique o console.');
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
    <PageLayout title="Gerenciador de Atividades" backTo="/rpd"> {/* backTo agora aponta para /rpd */}
      <div className="dashboard-grid">
        <Card className="dashboard-card">
          <div className="card-header">
            <h3>Adicionar Nova Atividade</h3>
            {message && <p className={`message-${messageType}`}>{message}</p>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nomeAtividade">Nome da Atividade:</label>
              <Input
                type="text"
                id="nomeAtividade"
                value={nomeAtividade}
                onChange={(e) => setNomeAtividade(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="periodo">Período:</label>
              <select id="periodo" value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="cdkteck-input">
                <option value="manha">Manhã</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={ativa}
                  onChange={(e) => setAtiva(e.target.checked)}
                  className="cdkteck-checkbox"
                />
                Ativa
              </label>
            </div>
            <div className="form-actions" style={{ marginTop: '1rem' }}>
              <Button type="submit" variant="primary">Salvar Atividade</Button> {/* Usando Button da CDKTECK-UI */}
            </div>
          </form>
        </Card>

        <Card className="dashboard-card">
          <div className="card-header">
            <h3>Minhas Atividades</h3>
          </div>
          {atividades.length === 0 ? (
            <p>Nenhuma atividade cadastrada.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Período</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atividades.map((atividade) => (
                      <tr key={atividade.id}>
                        <td>{atividade.nome_atividade}</td>
                        <td>{atividade.periodo}</td>
                        <td>{atividade.ativa ? 'Ativa' : 'Inativa'}</td>
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

export default AtividadesPage;