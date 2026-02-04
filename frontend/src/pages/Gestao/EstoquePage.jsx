import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { Card, Input, Button } from '@cidqueiroz/cdkteck-ui'; // Importe os componentes da CDKTECK-UI
import api from '../../api';

const EstoquePage = () => {
  const { logout } = useAuth();
  const [estoque, setEstoque] = useState([]);
  const [item, setItem] = useState('');
  const [variacao, setVariacao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Estados para Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Deve corresponder ao backend
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchEstoque = useCallback(async (page = currentPage, pageSize = itemsPerPage) => {
    try {
      // Adiciona parâmetros de paginação na requisição
      const response = await api.get(`/estoque/?page=${page}&page_size=${pageSize}`);
      setEstoque(response.data.results);
      setTotalItems(response.data.count);
      setTotalPages(Math.ceil(response.data.count / pageSize));
      setMessage('');
      setMessageType('');
    } catch (error) {
      console.error("Erro ao buscar estoque:", error);
      if (error.response && error.response.status === 401) {
        logout(); // Token expirado ou inválido
      } else {
        setMessage('Erro ao buscar estoque. Verifique o console.');
        setMessageType('error');
      }
    }
  }, [currentPage, itemsPerPage, logout]); // Dependências para useCallback

  useEffect(() => {
    fetchEstoque(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, fetchEstoque]); // Redraw on page/itemsPerPage change

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    try {
      await api.post('/estoque/', {
        item,
        variacao,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
      });
      setItem('');
      setVariacao('');
      setQuantidade('');
      setPreco('');
      setMessage('Item adicionado com sucesso!');
      setMessageType('success');
      fetchEstoque(currentPage, itemsPerPage); // Recarrega a lista de estoque atual
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      if (error.response && error.response.status === 401) {
        logout();
      } else {
        setMessage('Erro ao adicionar item. Verifique o console.');
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
    <PageLayout title="Controle de Estoque" backTo="/gestao">
      <div className="dashboard-grid">
        <Card className="dashboard-card">
          <div className="card-header">
            <h3>Adicionar/Atualizar Item</h3>
            {message && <p className={`message-${messageType}`}>{message}</p>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="item">Item:</label>
              <Input type="text" id="item" value={item} onChange={(e) => setItem(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="variacao">Variação:</label>
              <Input type="text" id="variacao" value={variacao} onChange={(e) => setVariacao(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="quantidade">Quantidade:</label>
              <Input type="number" id="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="preco">Preço:</label>
              <Input type="number" step="0.01" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} required />
            </div>
            <div className="form-actions" style={{ marginTop: '1rem' }}>
              <Button type="submit" variant="primary">Salvar Item</Button> {/* Usando Button da CDKTECK-UI */}
            </div>
          </form>
        </Card>

        <Card className="dashboard-card">
          <div className="card-header">
            <h3>Estoque Atual</h3>
          </div>
          {estoque.length === 0 ? (
            <p>Nenhum item em estoque.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Variação</th>
                      <th>Quantidade</th>
                      <th>Preço</th>
                      <th>Última Atualização</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estoque.map((estoqueItem) => (
                      <tr key={estoqueItem.id}>
                        <td>{estoqueItem.item}</td>
                        <td>{estoqueItem.variacao}</td>
                        <td>{estoqueItem.quantidade}</td>
                        <td>R$ {parseFloat(estoqueItem.preco).toFixed(2)}</td>
                        <td>{new Date(estoqueItem.ultima_atualizacao).toLocaleString()}</td>
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

export default EstoquePage;
