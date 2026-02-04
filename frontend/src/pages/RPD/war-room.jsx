import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { Trophy, Brain, Code, Rocket, Plus, Calendar, X } from 'lucide-react';

import PageLayout from '../../components/PageLayout';
import { Card, Input, Button } from '@cidqueiroz/cdkteck-ui';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';

const WarRoom = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState({
    logs: [],
    totals: {
      agentesMeta: 133,
      cursosMeta: 21,
      ondasMeta: 4
    },
    ondas: [
      { id: 1, nome: "Fundação", inicio: "2026-01-08", fim: "2026-02-08", agentes: 33, metaCursos: 8 },
      { id: 2, nome: "Expansão", inicio: "2026-02-09", fim: "2026-03-09", agentes: 33, metaCursos: 5 },
      { id: 3, nome: "Consolidação", inicio: "2026-03-10", fim: "2026-04-10", agentes: 33, metaCursos: 5 },
      { id: 4, nome: "Domínio", inicio: "2026-04-11", fim: "2026-05-11", agentes: 34, metaCursos: 3 }
    ]
  });
  const [courses, setCourses] = useState([]);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

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
  const [dailyCourseActivities, setDailyCourseActivities] = useState([]); // New state for daily course activities

  const fetchWarRoomLogs = useCallback(async () => {
    try {
      const response = await api.get('/war-room-logs/');
      setData(prevData => ({ ...prevData, logs: response.data.results || [] }));
    } catch (error) {
      console.error("Erro ao buscar logs da War Room:", error);
      if (error.response && error.response.status === 401) {
        logout();
      } else {
        setMessage('Erro ao buscar logs da War Room.');
        setMessageType('error');
      }
    }
  }, [logout]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await api.get('/courses/?page_size=1000'); // Fetch all courses
      setCourses(response.data.results || []);
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      setMessage('Erro ao buscar cursos.');
      setMessageType('error');
    }
  }, []);

  const fetchDailyCourseActivities = useCallback(async () => {
    try {
        const response = await api.get('/daily-course-activities/');
        // Aggregate daily study hours by date for charting
        const aggregatedData = response.data.results.reduce((acc, activity) => {
            const date = activity.date; // Date is already in 'YYYY-MM-DD' format
            const existingEntry = acc.find(item => item.date === date);

            if (existingEntry) {
                existingEntry.horasEstudoTotal += activity.horas_estudo_dia;
            } else {
                acc.push({
                    date: date,
                    horasEstudoTotal: activity.horas_estudo_dia,
                });
            }
            return acc;
        }, []);
        // Sort by date to ensure correct chart display
        aggregatedData.sort((a, b) => new Date(a.date) - new Date(b.date));
        setDailyCourseActivities(aggregatedData);
    } catch (error) {
        console.error("Erro ao buscar atividades diárias de cursos:", error);
        // Optionally set message for user
    }
  }, []);

  useEffect(() => {
    fetchWarRoomLogs();
    fetchCourses();
    fetchDailyCourseActivities(); // Fetch daily course activities
  }, [fetchWarRoomLogs, fetchCourses, fetchDailyCourseActivities]);

  const openAddModal = async () => {
    // No longer pre-populate cursos from completed courses, as this is tracked elsewhere.
    // The 'cursos' field in newLog will remain what the user manually enters, or 0.
    setShowAddModal(true);
  };
  
  const addLog = async () => {
    try {
      // Ensure newLog.cursos is sent as 0 or what the user entered, not based on completed courses.
      const logToSave = { ...newLog, cursos: newLog.cursos || 0 };
      await api.post('/war-room-logs/', logToSave);
      fetchWarRoomLogs();
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
      setMessage('Registro do dia salvo com sucesso!');
      setMessageType('success');
    } catch (error) {
      console.error("Erro ao adicionar log:", error);
      setMessage('Erro ao salvar o registro do dia.');
      setMessageType('error');
    }
  };



  const currentStats = data.logs.length > 0 ? data.logs[0] : newLog;
  const totalAgentes = data.logs.reduce((sum, log) => sum + (log.agentes || 0), 0);
  
  // Corrected course calculation
  const totalCursosConcluidos = courses.filter(c => c.status === 'Concluído').length;
  const totalHoras = courses.reduce((sum, course) => sum + (course.quantidade_horas || 0), 0);

  const hoje = new Date();
  const ondaAtual = data.ondas.find(onda => {
    const inicio = new Date(onda.inicio);
    const fim = new Date(onda.fim);
    return hoje >= inicio && hoje <= fim;
  }) || data.ondas[0];

  const dataInicio = new Date('2026-01-08');
  const diasPassados = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));
  const diasTotais = 124;

  // Corrected overall progress calculation
  const totalMinutesStudied = courses.reduce((sum, course) => sum + (course.progresso || 0), 0);
  const totalPossibleMinutes = courses.reduce((sum, course) => sum + ((course.quantidade_horas || 0) * 60), 0);
  const progressoGeral = totalPossibleMinutes > 0 ? Math.round((totalMinutesStudied / totalPossibleMinutes) * 100) : 0;

  const agentesEsperados = (data.totals.agentesMeta / diasTotais) * diasPassados;
  const cursosEsperados = (data.totals.cursosMeta / diasTotais) * diasPassados;
  
  const statusAgentes = totalAgentes >= agentesEsperados ? 'adiantado' : totalAgentes >= agentesEsperados * 0.8 ? 'no-prazo' : 'atrasado';
  const statusCursos = totalCursosConcluidos >= cursosEsperados ? 'adiantado' : totalCursosConcluidos >= cursosEsperados * 0.8 ? 'no-prazo' : 'atrasado';

  const getStatusText = (status) => {
    if (status === 'adiantado') return 'Adiantado';
    if (status === 'no-prazo') return 'No Prazo';
    return 'Atrasado';
  };

  const diferencaAgentes = totalAgentes - Math.round(agentesEsperados);
  const diferencaAgentesTexto = diferencaAgentes >= 0 
    ? `+${diferencaAgentes} acima do esperado` 
    : `${Math.abs(diferencaAgentes)} abaixo do esperado`;

  const diferencaCursos = totalCursosConcluidos - Math.round(cursosEsperados);
  const diferencaCursosTexto = diferencaCursos >= 0 
    ? `+${diferencaCursos} acima do esperado` 
    : `${Math.abs(diferencaCursos)} abaixo do esperado`;

  const dynamicOndas = data.ondas.map(onda => {
    const inicioOnda = new Date(onda.inicio);
    const fimOnda = new Date(onda.fim);
    const cursosNaOnda = courses.filter(course => {
      const dataInicioCurso = course.data_inicio ? new Date(course.data_inicio) : null;
      return dataInicioCurso && dataInicioCurso >= inicioOnda && dataInicioCurso <= fimOnda;
    }).length;
    return { ...onda, cursos: cursosNaOnda };
  });

  const mergedProductionData = useMemo(() => {
    const combined = {};

    data.logs.forEach(log => {
        combined[log.date] = {
            date: log.date,
            agentes: log.agentes,
            horasEstudoTotal: 0 // Initialize to 0, will be filled by dailyCourseActivities
        };
    });

    dailyCourseActivities.forEach(activity => {
        if (combined[activity.date]) {
            combined[activity.date].horasEstudoTotal = activity.horasEstudoTotal;
        } else {
            combined[activity.date] = {
                date: activity.date,
                agentes: 0, // Initialize to 0, if no WarRoomLog for this date
                horasEstudoTotal: activity.horasEstudoTotal
            };
        }
    });

    // Convert object back to array and sort by date
    return Object.values(combined).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data.logs, dailyCourseActivities]);

  return (
    
    <PageLayout backTo="/rpd/war-room">

      <div className="war-room-container">

        {/* Header */}
        <header className="war-room-header">

          <div className="header-info">
            <h1 className="war-room-title">WAR ROOM: SOBERANIA 2026</h1>
            <p className="header-subtitle">Comandante {user?.fullName || 'Cidirclay'} | Macaé, RJ | Dia {diasPassados + 1} de 365</p>
          </div>

          <div className="header-actions">
            
            <Link to="/rpd/cursos">
              <Button variant="secondary" size="medium">
                <Trophy size={20} /> Plano de Estudos
              </Button>
            </Link>

            <Button variant="primary" size="medium" onClick={openAddModal}>
              <Plus size={20} /> REGISTRAR DIA
            </Button>
            
          </div>
          
        </header>
        {message && <p className={`message-${messageType}`}>{message}</p>}

        {/* Modal de Adicionar Log */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>

            <Card className="modal-content" onClick={(e) => e.stopPropagation()}>

              <div className="modal-header">

                <h3 className="modal-title">
                  <Calendar size={20} />
                  Registrar Progresso do Dia
                </h3>

                <Button variant="ghost" size="small" onClick={() => setShowAddModal(false)}>
                  <X size={24} />
                </Button>

              </div>
              
              <div className="modal-body">
                <div className="form-grid form-grid-4">
                  <div className="form-group">
                    <label>Data</label>
                    <Input
                      type="date"
                      value={newLog.date}
                      onChange={(e) => setNewLog({...newLog, date: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>N-Back Level</label>
                    <Input
                      type="number"
                      value={newLog.nback}
                      onChange={(e) => setNewLog({...newLog, nback: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Go/No-Go Score</label>
                    <Input
                      type="number"
                      value={newLog.gono}
                      onChange={(e) => setNewLog({...newLog, gono: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Love Hue Score</label>
                    <Input
                      type="number"
                      value={newLog.lovehue}
                      onChange={(e) => setNewLog({...newLog, lovehue: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="form-grid form-grid-3">
                  <div className="form-group">
                    <label>Agentes Criados</label>
                    <Input
                      type="number"
                      value={newLog.agentes}
                      onChange={(e) => setNewLog({...newLog, agentes: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Cursos Concluídos no dia</label>
                    <Input
                      type="number"
                      value={newLog.cursos}
                      onChange={(e) => setNewLog({...newLog, cursos: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Horas de Estudo</label>
                    <Input
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
                    className="cdkteck-textarea"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <Button variant="success" size="large" onClick={addLog} className="w-full">
                  ✓ CONFIRMAR REGISTRO
                </Button>
              </div>

            </Card>

          </div>
        )}

        {/* Cards de Status */}
        <div className="dashboard-grid stats-grid">

          <Card className="stat-card">

            <div className="status-card-header">

              <Brain className="status-icon icon-purple" />

              <span className="status-label">Performance Mental</span>

            </div>

            <div className="status-value">N-{currentStats.nback}</div>

            <div className="status-subtitle">
              Go/No-Go: {currentStats.gono}% | Love Hue: {currentStats.lovehue}s
            </div>

          </Card>

          <Card className={`stat-card status-card-${statusAgentes}`}>

            <div className="status-card-header">

              <Code className="status-icon icon-blue" />
              <span className="status-label">Agentes de IA</span>

            </div>

            <div className="status-value">{totalAgentes}/{data.totals.agentesMeta}</div>

            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${(totalAgentes / data.totals.agentesMeta) * 100}%`}}></div>
            </div>

            <div className="status-subtitle">{getStatusText(statusAgentes)}</div>

          </Card>

          <Card className={`stat-card status-card-${statusCursos}`}>

            <div className="status-card-header">

              <Trophy className="status-icon icon-yellow" />
              <span className="status-label">Cursos Concluídos</span>

            </div>

            <div className="status-value">{totalCursosConcluidos}/{data.totals.cursosMeta}</div>

            <div className="progress-bar">

              <div className="progress-fill" style={{width: `${(totalCursosConcluidos / data.totals.cursosMeta) * 100}%`}}></div>
            
            </div>

            <div className="status-subtitle">{getStatusText(statusCursos)}</div>

          </Card>

          <Card className="stat-card">

            <div className="status-card-header">

              <Rocket className="status-icon icon-green" />
              <span className="status-label">Onda Atual</span>

            </div>

            <div className="status-value">{ondaAtual.id}/4</div>

            <div className="progress-bar">

              <div className="progress-fill" style={{width: `${progressoGeral}%`}}></div>

            </div>

            <div className="status-subtitle">{ondaAtual.nome}</div>

          </Card>

        </div>

        {/* Painéis de Ritmo */}
        <div className="dashboard-grid stats-grid">

          <Card className={`ritmo-card ritmo-card-${statusAgentes}`}>

            <div className="ritmo-header">

              <div className="ritmo-title">

                <Code size={24} />
                <h3>Ritmo de Agentes</h3>

              </div>
              
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
          </Card>

          <Card className={`ritmo-card ritmo-card-${statusCursos}`}>

            <div className="ritmo-header">

              <div className="ritmo-title">

                <Trophy size={24} />
                <h3>Ritmo de Cursos</h3>

              </div>
              
            </div>
            
            <div className="ritmo-stats">

              <div className="ritmo-stat">

                <div className="ritmo-stat-label">Atual</div>
                <div className="ritmo-stat-value">{totalCursosConcluidos}</div>

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

              <div className="progress-fill" style={{width: `${Math.min(100, (totalCursosConcluidos / data.totals.cursosMeta) * 100)}%`}}></div>
            
            </div>

            <div className={`ritmo-difference ritmo-difference-${diferencaCursos >= 0 ? 'positive' : 'negative'}`}>
              
              {diferencaCursosTexto}
              
            </div>

          </Card>

        </div>

        {/* Ondas de Execução */}
        <div className="section-card">

          <h2 className="section-title">

            <Rocket size={24} />
            Roadmap: 4 Ondas de Execução

          </h2>

          <div className="dashboard-grid stats-grid">

            {dynamicOndas.map(onda => {

              const isAtual = onda.id === ondaAtual.id;

              return (
                <Card key={onda.id} className={`onda-card ${isAtual ? 'onda-card-active' : ''}`}>

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
                      <strong>{onda.cursos}/{onda.metaCursos}</strong>

                    </div>

                  </div>

                </Card>
              );
            })}

          </div>

        </div>

        {/* Gráficos */}
        <div className="dashboard-grid stats-grid">

          <Card className="chart-card">

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

          </Card>

          <Card className="chart-card">

            <h2 className="chart-title">

              <Code size={20} />
              Produção Técnica

            </h2>

            {mergedProductionData.length > 0 ? (

              <div className="chart-container">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart data={mergedProductionData}>

                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                    
                    <YAxis stroke="#64748b" fontSize={12} />

                    <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b'}} />

                    <Legend />

                    <Bar dataKey="agentes" name="Agentes" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="horasEstudoTotal" name="Horas de Estudo" fill="#f59e0b" radius={[4, 4, 0, 0]} />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            ) : (
              <div className="chart-empty">Adicione registros para ver os gráficos</div>
            )}

          </Card>

        </div>

        {/* Histórico */}
        {data.logs.length > 0 && (

          <div className="section-card">

            <h2 className="section-title">Histórico de Registros</h2>

            <div className="historico-list">

              {data.logs.slice(0, 5).map((log, idx) => (

                <Card key={idx} className="historico-item">
                  
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

                </Card>

              ))}

            </div>

          </div>

        )}

        {/* Estatísticas Gerais */}
        <div className="dashboard-grid stats-grid">

          <Card className="stat-card">

            <div className="summary-label">Total de Horas</div>

            <div className="summary-value summary-value-cyan">{totalHoras}h</div>

            <div className="summary-subtitle">Dedicadas ao projeto</div>
            
          </Card>

          <Card className="stat-card">
            
            <div className="summary-label">Dias Registrados</div>

            <div className="summary-value summary-value-purple">{data.logs.length}</div>

            <div className="summary-subtitle">De 124 dias totais</div>

          </Card>
          
          <Card className="stat-card">

            <div className="summary-label">Progresso Geral</div>

            <div className="summary-value summary-value-green">{progressoGeral}%</div>

            <div className="summary-subtitle">Do tempo planejado</div>

          </Card>

        </div>
        
      </div>

    </PageLayout>

  );

};

export default WarRoom;