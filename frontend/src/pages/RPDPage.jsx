import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Card, Input } from '@cidqueiroz/cdkteck-ui';

const RPDPage = () => {
  const { authTokens, logout } = useAuth();
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

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authTokens?.access}`,
    },
  });

  useEffect(() => {
    fetchRpdEntries();
  }, []);

  const fetchRpdEntries = async () => {
    try {
      const response = await api.get('/rpd/');
      setRpdEntries(response.data);
    } catch (error) {
      console.error("Erro ao buscar entradas de RPD:", error);
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  };

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
      fetchRpdEntries();
      setMessage('Entrada de RPD adicionada com sucesso!');
      setMessageType('success');
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

  return (
    <div className="dashboard-container contexto-rpd">
      <h1 className="dashboard-title">Registro de Pensamentos Disfuncionais (RPD)</h1>
      
      <div className="dashboard-grid">
        <Card className="dashboard-card">
          <div className="card-header">
            <h3>War Room</h3>
          </div>
          <div className="form-actions" style={{ marginTop: '1rem' }}>
            <Link to="/rpd/war-room" className="card-action-btn">Acessar War Room</Link>
          </div>
        </Card>

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
              <textarea id="situacao" name="situacao" value={formData.situacao} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="pensamento_automatico">Pensamento Automático:</label>
              <textarea id="pensamento_automatico" name="pensamento_automatico" value={formData.pensamento_automatico} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="emocao">Emoção:</label>
              <Input type="text" id="emocao" name="emocao" value={formData.emocao} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="resposta_adaptativa">Resposta Adaptativa:</label>
              <textarea id="resposta_adaptativa" name="resposta_adaptativa" value={formData.resposta_adaptativa} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="resultado">Resultado:</label>
              <textarea id="resultado" name="resultado" value={formData.resultado} onChange={handleChange} required />
            </div>
            <div className="form-actions" style={{ marginTop: '1rem' }}>
              <button type="submit" className="card-action-btn">Salvar Entrada</button>
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
            <div className="table-responsive">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Situação</th>
                    <th>Pensamento Automático</th>
                    <th>Emoção</th>
                  </tr>
                </thead>
                <tbody>
                  {rpdEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td>{new Date(entry.data).toLocaleDateString()}</td>
                      <td>{entry.situacao}</td>
                      <td>{entry.pensamento_automatico}</td>
                      <td>{entry.emocao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RPDPage;