import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { Trophy, Brain, Code, Rocket, Save, Plus, Calendar, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Target, X } from 'lucide-react';
import '../styles/war-room.css';

const WarRoom = () => {
  const [data, setData] = useState({
    logs: [],
    totals: {
      agentesMeta: 133,
      cursosMeta: 21,
      ondasMeta: 4
    },
    ondas: [
      { id: 1, nome: "Fundação", inicio: "2026-01-08", fim: "2026-02-08", agentes: 33, cursos: 8 },
      { id: 2, nome: "Expansão", inicio: "2026-02-09", fim: "2026-03-09", agentes: 33, cursos: 5 },
      { id: 3, nome: "Consolidação", inicio: "2026-03-10", fim: "2026-04-10", agentes: 33, cursos: 5 },
      { id: 4, nome: "Domínio", inicio: "2026-04-11", fim: "2026-05-11", agentes: 34, cursos: 3 }
    ]
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split('T')[0],
    nback: 3,
    gono: 85,
    lovehue: 20,
    agentes: 0,
    cursos: 0,
    horasEstudo: 0,
    notasDia: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('soberania_progress');
    if (saved) {
      setData(JSON.parse(saved));
    } else {
      const initialData = {
        ...data,
        logs: [
          { date: '2026-01-07', nback: 3, gono: 85, lovehue: 20, agentes: 0, cursos: 0, horasEstudo: 0, notasDia: 'Início do projeto' }
        ]
      };
      setData(initialData);
      localStorage.setItem('soberania_progress', JSON.stringify(initialData));
    }
  }, []);

  const saveToStorage = () => {
    localStorage.setItem('soberania_progress', JSON.stringify(data));
    alert("✅ Dados salvos localmente!");
  };

  const addLog = () => {
    const updatedData = {
      ...data,
      logs: [...data.logs, newLog]
    };
    setData(updatedData);
    localStorage.setItem('soberania_progress', JSON.stringify(updatedData));
    setShowAddModal(false);
    setNewLog({
      date: new Date().toISOString().split('T')[0],
      nback: 3,
      gono: 85,
      lovehue: 20,
      agentes: 0,
      cursos: 0,
      horasEstudo: 0,
      notasDia: ''
    });
  };

  const currentStats = data.logs.length > 0 ? data.logs[data.logs.length - 1] : newLog;
  const totalAgentes = data.logs.reduce((sum, log) => sum + (log.agentes || 0), 0);
  const totalCursos = data.logs.reduce((sum, log) => sum + (log.cursos || 0), 0);
  const totalHoras = data.logs.reduce((sum, log) => sum + (log.horasEstudo || 0), 0);

  const hoje = new Date();
  const ondaAtual = data.ondas.find(onda => {
    const inicio = new Date(onda.inicio);
    const fim = new Date(onda.fim);
    return hoje >= inicio && hoje <= fim;
  }) || data.ondas[0];

  const dataInicio = new Date('2026-01-08');
  const diasPassados = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));
  const diasTotais = 124;
  const progressoTempo = Math.min(100, (diasPassados / diasTotais) * 100);

  const agentesEsperados = (data.totals.agentesMeta / diasTotais) * diasPassados;
  const cursosEsperados = (data.totals.cursosMeta / diasTotais) * diasPassados;
  
  const statusAgentes = totalAgentes >= agentesEsperados ? 'adiantado' : totalAgentes >= agentesEsperados * 0.8 ? 'no-prazo' : 'atrasado';
  const statusCursos = totalCursos >= cursosEsperados ? 'adiantado' : totalCursos >= cursosEsperados * 0.8 ? 'no-prazo' : 'atrasado';

  const getStatusText = (status) => {
    if (status === 'adiantado') return 'Adiantado';
    if (status === 'no-prazo') return 'No Prazo';
    return 'Atrasado';
  };

  const diferencaAgentes = totalAgentes - Math.round(agentesEsperados);
  const diferencaAgentesTexto = diferencaAgentes >= 0 
    ? `+${diferencaAgentes} acima do esperado` 
    : `${Math.abs(diferencaAgentes)} abaixo do esperado`;

  const diferencaCursos = totalCursos - Math.round(cursosEsperados);
  const diferencaCursosTexto = diferencaCursos >= 0 
    ? `+${diferencaCursos} acima do esperado` 
    : `${Math.abs(diferencaCursos)} abaixo do esperado`;

  return (
    <div className="war-room-container">
      {/* Header */}
      <header className="war-room-header">
        <div className="header-info">
          <h1 className="war-room-title">WAR ROOM: SOBERANIA 2026</h1>
          <p className="header-subtitle">Comandante Cidirclay | Macaé, RJ | Dia {diasPassados + 1} de 124</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={20} /> REGISTRAR DIA
          </button>
          <button className="btn btn-success" onClick={saveToStorage}>
            <Save size={20} /> SALVAR
          </button>
        </div>
      </header>

      {/* Modal de Adicionar Log */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                <Calendar size={20} />
                Registrar Progresso do Dia
              </h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-grid form-grid-4">
                <div className="form-group">
                  <label>Data</label>
                  <input
                    type="date"
                    value={newLog.date}
                    onChange={(e) => setNewLog({...newLog, date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>N-Back Level</label>
                  <input
                    type="number"
                    value={newLog.nback}
                    onChange={(e) => setNewLog({...newLog, nback: parseInt(e.target.value)})}
                  />
                </div>
                <div className="form-group">
                  <label>Go/No-Go Score</label>
                  <input
                    type="number"
                    value={newLog.gono}
                    onChange={(e) => setNewLog({...newLog, gono: parseInt(e.target.value)})}
                  />
                </div>
                <div className="form-group">
                  <label>Love Hue Score</label>
                  <input
                    type="number"
                    value={newLog.lovehue}
                    onChange={(e) => setNewLog({...newLog, lovehue: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="form-grid form-grid-3">
                <div className="form-group">
                  <label>Agentes Criados</label>
                  <input
                    type="number"
                    value={newLog.agentes}
                    onChange={(e) => setNewLog({...newLog, agentes: parseInt(e.target.value)})}
                  />
                </div>
                <div className="form-group">
                  <label>Cursos Concluídos</label>
                  <input
                    type="number"
                    value={newLog.cursos}
                    onChange={(e) => setNewLog({...newLog, cursos: parseInt(e.target.value)})}
                  />
                </div>
                <div className="form-group">
                  <label>Horas de Estudo</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newLog.horasEstudo}
                    onChange={(e) => setNewLog({...newLog, horasEstudo: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Notas do Dia</label>
                <textarea
                  value={newLog.notasDia}
                  onChange={(e) => setNewLog({...newLog, notasDia: e.target.value})}
                  placeholder="O que você aprendeu hoje? Desafios enfrentados? Conquistas?"
                  rows="4"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-success btn-block" onClick={addLog}>
                ✓ CONFIRMAR REGISTRO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards de Status */}
      <div className="cards-grid cards-grid-4">
        <div className="status-card">
          <div className="status-card-header">
            <Brain className="status-icon icon-purple" />
            <span className="status-label">Performance Mental</span>
          </div>
          <div className="status-value">N-{currentStats.nback}</div>
          <div className="status-subtitle">
            Go/No-Go: {currentStats.gono}% | Love Hue: {currentStats.lovehue}s
          </div>
        </div>

        <div className={`status-card status-card-${statusAgentes}`}>
          <div className="status-card-header">
            <Code className="status-icon icon-blue" />
            <span className="status-label">Agentes de IA</span>
          </div>
          <div className="status-value">{totalAgentes}/{data.totals.agentesMeta}</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${(totalAgentes / data.totals.agentesMeta) * 100}%`}}></div>
          </div>
          <div className="status-subtitle">{getStatusText(statusAgentes)}</div>
        </div>

        <div className={`status-card status-card-${statusCursos}`}>
          <div className="status-card-header">
            <Trophy className="status-icon icon-yellow" />
            <span className="status-label">Cursos Concluídos</span>
          </div>
          <div className="status-value">{totalCursos}/{data.totals.cursosMeta}</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${(totalCursos / data.totals.cursosMeta) * 100}%`}}></div>
          </div>
          <div className="status-subtitle">{getStatusText(statusCursos)}</div>
        </div>

        <div className="status-card">
          <div className="status-card-header">
            <Rocket className="status-icon icon-green" />
            <span className="status-label">Onda Atual</span>
          </div>
          <div className="status-value">{ondaAtual.id}/4</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${progressoTempo}%`}}></div>
          </div>
          <div className="status-subtitle">{ondaAtual.nome}</div>
        </div>
      </div>

      {/* Painéis de Ritmo */}
      <div className="cards-grid cards-grid-2">
        <div className={`ritmo-card ritmo-card-${statusAgentes}`}>
          <div className="ritmo-header">
            <div className="ritmo-title">
              <Code size={24} />
              <h3>Ritmo de Agentes</h3>
            </div>
            {statusAgentes === 'adiantado' && <CheckCircle className="ritmo-status-icon icon-success" size={24} />}
            {statusAgentes === 'atrasado' && <AlertCircle className="ritmo-status-icon icon-danger" size={24} />}
            {statusAgentes === 'no-prazo' && <Target className="ritmo-status-icon icon-warning" size={24} />}
          </div>
          
          <div className="ritmo-stats">
            <div className="ritmo-stat">
              <div className="ritmo-stat-label">Atual</div>
              <div className="ritmo-stat-value">{totalAgentes}</div>
            </div>
            <div className="ritmo-stat">
              <div className="ritmo-stat-label">Esperado</div>
              <div className="ritmo-stat-value ritmo-stat-expected">{Math.round(agentesEsperados)}</div>
            </div>
            <div className="ritmo-stat">
              <div className="ritmo-stat-label">Meta</div>
              <div className="ritmo-stat-value ritmo-stat-goal">{data.totals.agentesMeta}</div>
            </div>
          </div>

          <div className="progress-bar progress-bar-ritmo">
            <div className="progress-fill" style={{width: `${Math.min(100, (totalAgentes / data.totals.agentesMeta) * 100)}%`}}></div>
          </div>

          <div className={`ritmo-difference ritmo-difference-${diferencaAgentes >= 0 ? 'positive' : 'negative'}`}>
            {diferencaAgentesTexto}
          </div>
        </div>

        <div className={`ritmo-card ritmo-card-${statusCursos}`}>
          <div className="ritmo-header">
            <div className="ritmo-title">
              <Trophy size={24} />
              <h3>Ritmo de Cursos</h3>
            </div>
            {statusCursos === 'adiantado' && <CheckCircle className="ritmo-status-icon icon-success" size={24} />}
            {statusCursos === 'atrasado' && <AlertCircle className="ritmo-status-icon icon-danger" size={24} />}
            {statusCursos === 'no-prazo' && <Target className="ritmo-status-icon icon-warning" size={24} />}
          </div>
          
          <div className="ritmo-stats">
            <div className="ritmo-stat">
              <div className="ritmo-stat-label">Atual</div>
              <div className="ritmo-stat-value">{totalCursos}</div>
            </div>
            <div className="ritmo-stat">
              <div className="ritmo-stat-label">Esperado</div>
              <div className="ritmo-stat-value ritmo-stat-expected">{Math.round(cursosEsperados)}</div>
            </div>
            <div className="ritmo-stat">
              <div className="ritmo-stat-label">Meta</div>
              <div className="ritmo-stat-value ritmo-stat-goal">{data.totals.cursosMeta}</div>
            </div>
          </div>

          <div className="progress-bar progress-bar-ritmo">
            <div className="progress-fill" style={{width: `${Math.min(100, (totalCursos / data.totals.cursosMeta) * 100)}%`}}></div>
          </div>

          <div className={`ritmo-difference ritmo-difference-${diferencaCursos >= 0 ? 'positive' : 'negative'}`}>
            {diferencaCursosTexto}
          </div>
        </div>
      </div>

      {/* Ondas de Execução */}
      <div className="section-card">
        <h2 className="section-title">
          <Rocket size={24} />
          Roadmap: 4 Ondas de Execução
        </h2>
        <div className="cards-grid cards-grid-4">
          {data.ondas.map(onda => {
            const isAtual = onda.id === ondaAtual.id;
            return (
              <div key={onda.id} className={`onda-card ${isAtual ? 'onda-card-active' : ''}`}>
                <div className="onda-header">
                  <h3 className="onda-nome">{onda.nome}</h3>
                  {isAtual && <span className="onda-badge">ATUAL</span>}
                </div>
                <div className="onda-dates">{onda.inicio} → {onda.fim}</div>
                <div className="onda-metas">
                  <div className="onda-meta">
                    <span>Agentes:</span>
                    <strong>{onda.agentes}</strong>
                  </div>
                  <div className="onda-meta">
                    <span>Cursos:</span>
                    <strong>{onda.cursos}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gráficos */}
      <div className="cards-grid cards-grid-2">
        <div className="chart-card">
          <h2 className="chart-title">
            <Brain size={20} />
            Performance Mental
          </h2>
          {data.logs.length > 0 ? (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.logs}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b'}} />
                  <Legend />
                  <Line type="monotone" dataKey="nback" name="N-Back" stroke="#a855f7" strokeWidth={3} dot={{r: 6}} />
                  <Line type="monotone" dataKey="gono" name="Go/No-Go" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="lovehue" name="Love Hue" stroke="#ec4899" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="chart-empty">Adicione registros para ver os gráficos</div>
          )}
        </div>

        <div className="chart-card">
          <h2 className="chart-title">
            <Code size={20} />
            Produção Técnica
          </h2>
          {data.logs.length > 0 ? (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.logs}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b'}} />
                  <Legend />
                  <Bar dataKey="agentes" name="Agentes" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cursos" name="Cursos" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="chart-empty">Adicione registros para ver os gráficos</div>
          )}
        </div>
      </div>

      {/* Histórico */}
      {data.logs.length > 0 && (
        <div className="section-card">
          <h2 className="section-title">Histórico de Registros</h2>
          <div className="historico-list">
            {[...data.logs].reverse().slice(0, 5).map((log, idx) => (
              <div key={idx} className="historico-item">
                <div className="historico-header">
                  <div className="historico-date">{log.date}</div>
                  <div className="historico-stats">
                    <span>🧠 N-{log.nback}</span>
                    <span>🤖 {log.agentes} agentes</span>
                    <span>📚 {log.cursos} cursos</span>
                    <span>⏱️ {log.horasEstudo}h</span>
                  </div>
                </div>
                {log.notasDia && <p className="historico-notas">{log.notasDia}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estatísticas Gerais */}
      <div className="cards-grid cards-grid-3">
        <div className="summary-card">
          <div className="summary-label">Total de Horas</div>
          <div className="summary-value summary-value-cyan">{totalHoras}h</div>
          <div className="summary-subtitle">Dedicadas ao projeto</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Dias Registrados</div>
          <div className="summary-value summary-value-purple">{data.logs.length}</div>
          <div className="summary-subtitle">De 124 dias totais</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Progresso Geral</div>
          <div className="summary-value summary-value-green">{Math.round(progressoTempo)}%</div>
          <div className="summary-subtitle">Do tempo planejado</div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;