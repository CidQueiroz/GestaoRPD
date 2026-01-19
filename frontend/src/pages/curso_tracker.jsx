import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Check, X, AlertCircle, Download, Calendar, FileText, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import api from '../api'; // Import your API client

import PageLayout from '../components/PageLayout';
import { Card, Input, Button } from '@cidqueiroz/cdkteck-ui'; // Import CDKTECK-UI components

const CourseTracker = () => {
  const { logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [collapsedCourses, setCollapsedCourses] = useState({});
  const [showExportMenu, setShowExportMenu] = useState(false);

  // State for new course form
  const [newCourseForm, setNewCourseForm] = useState({
    nome: '',
    priority: 'Média', // This priority was not in backend, now it will be
    link: '',
    descricao: '',
    data_inicio: '',
    data_conclusao_prevista: '',
    status: 'Pendente',
    quantidade_horas: 0, // New field for total hours
  });
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);

  // State for current lesson being added
  const [newLessonForm, setNewLessonForm] = useState({
    courseId: null,
    data_aula: new Date().toISOString().slice(0, 16), // ISO format for datetime-local input
    topicos_abordados: '',
    observacoes: '',
    concluida: false,
  });
  const [showAddLessonModal, setShowAddLessonModal] = useState(null);

  // State for messages
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // State for calculated statistics
  const [totalCoursesCount, setTotalCoursesCount] = useState(0);
  const [coursesInProgressCount, setCoursesInProgressCount] = useState(0);
  const [coursesCompletedCount, setCoursesCompletedCount] = useState(0);
  const [priorityCoursesCount, setPriorityCoursesCount] = useState(0);
  const [overallProgressPercent, setOverallProgressPercent] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0);

  // --- API CALLS ---
  const fetchCourses = useCallback(async () => {
    try {
      const response = await api.get(`/courses/`);
      setCourses(response.data || []); // Directly use response.data, ensure it's an array
      setMessage('');
      setMessageType('');
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      if (error.response && error.response.status === 401) {
        logout();
      } else {
        setMessage('Erro ao buscar cursos. Verifique o console.');
        setMessageType('error');
      }
    }
  }, [logout]);

  const fetchLessonsForCourse = useCallback(async (courseId) => {
    try {
      const response = await api.get(`/lessons/?course=${courseId}&page_size=1000`); // Fetch all lessons for a course for now
      // Update the specific course's lessons in the courses state
      setCourses(prevCourses => prevCourses.map(course =>
        course.id === courseId ? { ...course, lessons: response.data.results } : course
      ));
    } catch (error) {
      console.error(`Erro ao buscar aulas para o curso ${courseId}:`, error);
      // Handle error
    }
  }, []);

  useEffect(() => {
    fetchCourses(); // Call without pagination parameters
    // Initial collapse state from local storage or default to collapsed
    const savedCollapsed = localStorage.getItem('collapsedCourses');
    if (savedCollapsed) {
      setCollapsedCourses(JSON.parse(savedCollapsed));
    }
  }, [fetchCourses]);

  // Persist collapsed state to local storage
  useEffect(() => {
    localStorage.setItem('collapsedCourses', JSON.stringify(collapsedCourses));
  }, [collapsedCourses]);

  const PRIORITY_VALUE_MAP = {
    "Estratégica": 0, // Adding Estratégica as highest priority
    "Máxima": 1,
    "Alta": 2,
    "Média": 3,
    "Baixa": 4,
  };

  useEffect(() => {
    if (courses && courses.length > 0) {
      // Calculate counts
      const total = courses.length;
      const inProgress = courses.filter(c => c.status === 'Em Andamento').length;
      const completed = courses.filter(c => c.status === 'Concluído').length;
      const priority = courses.filter(c => c.priority === 'Máxima' || c.priority === 'Alta' || c.priority === 'Estratégica').length;

      // Calculate overall progress based on minutes
      const totalMinutesStudied = courses.reduce((sum, course) => sum + (course.progresso || 0), 0);
      const totalPossibleMinutes = courses.reduce((sum, course) => sum + ((course.quantidade_horas || 0) * 60), 0);
      const overallAvgProgress = totalPossibleMinutes > 0 ? Math.round((totalMinutesStudied / totalPossibleMinutes) * 100) : 0;

      const remainingMinutes = totalPossibleMinutes - totalMinutesStudied;
      const remainingHoursCalc = totalPossibleMinutes > 0 ? (remainingMinutes / 60).toFixed(1) : 0;

      setTotalCoursesCount(total);
      setCoursesInProgressCount(inProgress);
      setCoursesCompletedCount(completed);
      setPriorityCoursesCount(priority);
      setOverallProgressPercent(overallAvgProgress);
      setRemainingHours(remainingHoursCalc);
    } else {
      setTotalCoursesCount(0);
      setCoursesInProgressCount(0);
      setCoursesCompletedCount(0);
      setPriorityCoursesCount(0);
      setOverallProgressPercent(0);
      setRemainingHours(0);
    }
  }, [courses]); // Dependency array: re-run when courses change

  // --- UI & Helper Functions ---
  const toggleCollapse = (courseId) => {
    setCollapsedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const getProgress = (progressInMinutes, totalHours) => {
    if (!totalHours || totalHours <= 0) return 0;
    const totalMinutes = totalHours * 60;
    if (totalMinutes === 0) return 0;
    const percentage = (progressInMinutes / totalMinutes) * 100;
    return Math.round(Math.min(percentage, 100)); // Cap at 100% to handle overflow
  };

  const updateCourseTimeoutRef = useRef(null); // Add this useRef declaration here

  // --- CRUD Operations ---
  const handleAddCourse = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    try {
      // Adjust form data to match backend model fields
      const courseData = {
        nome: newCourseForm.nome,
        descricao: newCourseForm.descricao,
        progresso: parseFloat(newCourseForm.progresso || 0), // Default to 0 if not set
        status: newCourseForm.status,
        data_inicio: newCourseForm.data_inicio || null,
        data_conclusao_prevista: newCourseForm.data_conclusao_prevista || null,
        link: newCourseForm.link,
        quantidade_horas: newCourseForm.quantidade_horas, // Add this line
      };
      
      await api.post('/courses/', courseData);
      setNewCourseForm({
        nome: '', hours: '', priority: 'Média', link: '', descricao: '',
        data_inicio: '', data_conclusao_prevista: '', status: 'Pendente', quantidade_horas: 0, // Add this line
      });
      setShowAddCourseForm(false);
      setMessage('Curso adicionado com sucesso!');
      setMessageType('success');
      fetchCourses(); // Re-fetch courses
    } catch (error) {
      console.error("Erro ao adicionar curso:", error);
      setMessage('Erro ao adicionar curso. Verifique o console.');
      setMessageType('error');
    }
  };

  const handleUpdateCourse = useCallback((courseId, field, value) => {
    setMessage('');
    setMessageType('');

    // Update local state immediately for a responsive UI
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, [field]: value } : course
      )
    );

    if (updateCourseTimeoutRef.current) {
      clearTimeout(updateCourseTimeoutRef.current);
    }

    updateCourseTimeoutRef.current = setTimeout(async () => {
      try {
        await api.patch(`/courses/${courseId}/`, { [field]: value });
        setMessage('Curso atualizado com sucesso!');
        setMessageType('success');
        // No need to fetch all courses, as local state is already updated
        // fetchCourses(); // We can remove this for better performance and rely on local state
      } catch (error) {
        console.error("Erro ao atualizar curso:", error);
        setMessage('Erro ao atualizar curso. Verifique o console.');
        setMessageType('error');
        // Potentially revert local state or show specific error for this course
      }
    }, 500); // Debounce for 500ms
  }, [logout, setCourses]); // Add setCourses to useCallback dependencies


  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Tem certeza que deseja deletar este curso e todas as suas aulas?")) {
      try {
        await api.delete(`/courses/${courseId}/`);
        setMessage('Curso deletado com sucesso!');
        setMessageType('success');
        fetchCourses(); // Re-fetch courses
      } catch (error) {
        console.error("Erro ao deletar curso:", error);
        setMessage('Erro ao deletar curso. Verifique o console.');
        setMessageType('error');
      }
    }
  };

  const handleAddLesson = async (courseId) => {
    setMessage('');
    setMessageType('');
    try {
      const lessonData = {
        course: courseId, // Link to the parent course
        data_aula: newLessonForm.data_aula,
        topicos_abordados: newLessonForm.topicos_abordados,
        observacoes: newLessonForm.observacoes,
        concluida: newLessonForm.concluida,
      };
      await api.post('/lessons/', lessonData);
      setMessage('Aula adicionada com sucesso!');
      setMessageType('success');
      setNewLessonForm(prev => ({ ...prev, courseId: null, data_aula: new Date().toISOString().slice(0, 16), topicos_abordados: '', observacoes: '', concluida: false })); // Reset form
      fetchLessonsForCourse(courseId); // Re-fetch lessons for the specific course
    } catch (error) {
      console.error("Erro ao adicionar aula:", error);
      setMessage('Erro ao adicionar aula. Verifique o console.');
      setMessageType('error');
    }
  };

  const handleUpdateLesson = async (lessonId, field, value) => {
    setMessage('');
    setMessageType('');
    try {
      await api.patch(`/lessons/${lessonId}/`, { [field]: value });
      setMessage('Aula atualizada com sucesso!');
      setMessageType('success');
      // No need to fetch all courses, just update the specific course's lessons
      const courseId = courses.find(course => course.lessons?.some(lesson => lesson.id === lessonId))?.id;
      if (courseId) fetchLessonsForCourse(courseId);
    } catch (error) {
      console.error("Erro ao atualizar aula:", error);
      setMessage('Erro ao atualizar aula. Verifique o console.');
      setMessageType('error');
    }
  };

  const handleDeleteLesson = async (lessonId, courseId) => {
    if (window.confirm("Tem certeza que deseja deletar esta aula?")) {
      try {
        await api.delete(`/lessons/${lessonId}/`);
        setMessage('Aula deletada com sucesso!');
        setMessageType('success');
        fetchLessonsForCourse(courseId); // Re-fetch lessons for the specific course
      } catch (error) {
        console.error("Erro ao deletar aula:", error);
        setMessage('Erro ao deletar aula. Verifique o console.');
        setMessageType('error');
      }
    }
  };


  // --- Export Functions ---
  const exportToCSV = () => {
    let csv = "ID,Curso,Prioridade,Total (h),Concluído (h),Progresso (%),Data Início,Data Fim,Notas,Link,Status\n";
    
    courses.forEach(course => {
      const progress = getProgress(course.progresso, course.total_horas || course.hours); // Use model fields
      const notes = (course.descricao || "").replace(/"/g, '""').replace(/\n/g, ' ');
      csv += `${course.id},"${course.nome}",${course.priority || ''},${course.total_horas || course.hours || ''},${course.progresso || 0},${progress},"${course.data_inicio || ''}","${course.data_conclusao_real || ''}","${notes}","${course.link || ''}","${course.status || ''}"\n`;
      
      if (course.lessons && course.lessons.length > 0) {
        csv += "\n,Aulas:\n";
        csv += ",ID Aula,Data Aula,Tópicos,Observações,Concluída\n";
        course.lessons.forEach(lesson => {
          const lessonNotes = (lesson.observacoes || "").replace(/"/g, '""').replace(/\n/g, ' ');
          csv += `,,${lesson.id},"${lesson.data_aula || ''}","${lesson.topicos_abordados || ''}","${lessonNotes}",${lesson.concluida ? 'Sim' : 'Não'}\n`;
        });
        csv += "\n";
      }
    });

    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `cursos_ai_cidirclay_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportToJSON = () => {
    const data = JSON.stringify(courses, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `cursos_ai_cidirclay_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // --- Render ---
  return (
    <PageLayout title="Plano de Estudos - Engenharia de IA" backTo="/rpd">
      <div className="course-tracker__container">
        {message && <p className={`message-${messageType}`}>{message}</p>}

        {/* Header Section */}
        <header className="war-room-header"> {/* Reusing war-room header class for consistent look */}
          <div className="header-info">
            <h1 className="war-room-title">Plano de Estudos - Engenharia de IA</h1>
            <p className="header-subtitle">CDK TECK</p>
          </div>
          <div className="header-actions">
            <Button onClick={() => setShowAddCourseForm(!showAddCourseForm)} variant="primary">
              <Plus size={18} />
              {showAddCourseForm ? 'Ocultar' : 'Adicionar Curso'}
            </Button>
            <div className="course-tracker__export-container">
              <Button onClick={() => setShowExportMenu(!showExportMenu)} variant="secondary">
                <Download size={18} />
                Exportar
              </Button>
              {showExportMenu && (
                <div className="course-tracker__export-menu">
                  <button onClick={() => { exportToCSV(); setShowExportMenu(false); }} className="course-tracker__export-item">
                    📊 Exportar CSV
                  </button>
                  <button onClick={() => { exportToJSON(); setShowExportMenu(false); }} className="course-tracker__export-item">
                    📦 Exportar JSON
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Add New Course Form */}
        {showAddCourseForm && (
          <Card className="dashboard-card course-tracker__add-course-form-card">
            
            <h2>Adicionar Novo Curso</h2>
            
            <form onSubmit={handleAddCourse} className="course-tracker__form">
              
              <div className="form-group">
                <label>Status</label>
                <select
                  value={course.status}
                  onChange={(e) => handleUpdateCourse(course.id, 'status', e.target.value)}
                  className="cdkteck-input"
                  // Removido o estilo inline para melhor compatibilidade com temas
                  >
                  <option value="Pendente">Pendente</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Concluído">Concluído</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              <div className="form-group">
                
                <label>Prioridade</label>
                
                <select
                  value={course.priority}
                  onChange={(e) => handleUpdateCourse(course.id, 'priority', e.target.value)}
                  className="cdkteck-input"
                  // Removido o estilo inline para melhor compatibilidade com temas
                  >
                  <option value="Estratégica">Estratégica</option>
                  <option value="Máxima">Máxima</option>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>

              </div>

              <div className="course-tracker__form-group">
                
                <label htmlFor="newCourseStartDate">Data de Início:</label>
                
                <Input
                  id="newCourseStartDate"
                  type="date"
                  name="data_inicio"
                  value={newCourseForm.data_inicio}
                  onChange={(e) => setNewCourseForm({...newCourseForm, data_inicio: e.target.value})}
                />

              </div>

              <div className="course-tracker__form-group">

                <label htmlFor="newCourseEndDate">Data de Conclusão Prevista:</label>

                <Input
                  id="newCourseEndDate"
                  type="date"
                  name="data_conclusao_prevista"
                  value={newCourseForm.data_conclusao_prevista}
                  onChange={(e) => setNewCourseForm({...newCourseForm, data_conclusao_prevista: e.target.value})}
                />

              </div>

              <div className="course-tracker__form-group">

                <label htmlFor="newCourseLink">Link do Curso:</label>
                
                <Input
                  id="newCourseLink"
                  type="url"
                  name="link"
                  value={newCourseForm.link}
                  onChange={(e) => setNewCourseForm({...newCourseForm, link: e.target.value})}
                />

              </div>

              <Button type="submit" variant="primary">Adicionar Curso</Button>

            </form>

          </Card>

        )}

        {/* Overall Stats Cards */}
        <div className="dashboard-grid stats-grid">
          {/* Overall Progress */}
          <Card className="stat-card">
            <div className="status-card-header">
              <span className="status-label">Progresso Geral</span>
            </div>
            <div className="status-value">{overallProgressPercent}%</div> 
            <div className="status-subtitle">Média de Progresso</div>
          </Card>
          {/* Courses in Progress */}
          <Card className="stat-card">
            <div className="status-card-header">
              <span className="status-label">Cursos em Andamento</span>
            </div>
            <div className="status-value">{coursesInProgressCount}</div>
            <div className="status-subtitle">Atualmente estudando</div>
          </Card>
           {/* Priority Courses */}
          <Card className="stat-card">
            <div className="status-card-header">
              <span className="status-label">Cursos Prioritários</span>
            </div>
            <div className="status-value">{priorityCoursesCount}</div>
            <div className="status-subtitle">Foco principal</div>
          </Card>
          {/* Total Courses */}
          <Card className="stat-card">
            <div className="status-card-header">
              <span className="status-label">Total de Cursos</span>
            </div>
            <div className="status-value">{totalCoursesCount}</div>
            <div className="status-subtitle">Na sua lista</div>
          </Card>
        </div>


        {/* Course List */}
        <div className="section-card"> {/* Reusing section-card class */}
          <h2 className="section-title">Meus Cursos</h2>
          {courses.length === 0 ? (
            <p>Nenhum curso cadastrado.</p>
          ) : (
            
            <div className="course-list-grid"> {/* Grid for course cards */}
              {/* Sort courses by explicit priority before mapping */}
              {courses.slice().sort((a, b) => {
                const priorityA = PRIORITY_VALUE_MAP[a.priority] || 99; // Use PRIORITY_VALUE_MAP for sorting
                const priorityB = PRIORITY_VALUE_MAP[b.priority] || 99;
                return priorityA - priorityB;
              }).map((course) => {
                const progress = getProgress(course.progresso, course.quantidade_horas); // Updated progress calculation
                const isCollapsed = collapsedCourses[course.id] !== false; // Default to collapsed

                return (
                  <Card key={course.id} className="course-card-item"> {/* Use Card for individual course */}
                    <div className="course-card-header" onClick={() => toggleCollapse(course.id)}>
                      <button className="course-card-toggle-btn">
                        {isCollapsed ? (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        ) : (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        )}
                      </button>
                      <h3 className="course-card-name">
                        <span className="course-id-display">ID: {course.id} - </span>
                        {course.nome}
                      </h3>
                      {/* Display explicit priority badge */}
                      <span className={`course-card-status-badge priority-${course.priority.toLowerCase().replace(' ', '-')}`}>
                        {course.priority}
                      </span>
                      {/* Display status badge */}
                      <span className={`course-card-status-badge status-${course.status.toLowerCase().replace(' ', '-')}`}>
                        ({course.status})
                      </span>
                      <div className="course-card-progress">
                        <div className="course-card-progress-bar-bg">
                          <div className={`course-card-progress-bar-fg progress-${course.status.toLowerCase().replace(' ', '-')}`} style={{ width: `${progress}%` }} />
                        </div>
                        <span className="course-card-progress-percent">{progress}%</span>
                      </div>
                    </div>

                    {!isCollapsed && (
                      <div className="course-card-details">
                        <div className="course-card-actions">
                          <a href={course.link} target="_blank" rel="noopener noreferrer" className="course-card-link">
                            Acessar curso →
                          </a>
                          <Button onClick={() => handleDeleteCourse(course.id)} variant="danger" size="small">
                            <Trash2 size={16} /> Deletar Curso
                          </Button>
                        </div>
                        <div className="form-grid form-grid-2"> {/* Using a generic grid */}
                          <div className="form-group">
                            <label>Progresso (minutos)</label>
                            <Input
                              type="number"
                              value={course.progresso || 0}
                              onChange={(e) => handleUpdateCourse(course.id, 'progresso', parseInt(e.target.value, 10) || 0)}
                              min="0"
                            />
                          </div>
                          <div className="form-group">
                            <label>Total de Horas</label>
                            <Input
                              type="number"
                              value={course.quantidade_horas || 0}
                              onChange={(e) => handleUpdateCourse(course.id, 'quantidade_horas', parseInt(e.target.value, 10) || 0)}
                              min="0"
                            />
                          </div>
                          <div className="form-group">
                            <label>Status</label>
                            <select
                              value={course.status}
                              onChange={(e) => handleUpdateCourse(course.id, 'status', e.target.value)}
                              className="cdkteck-input"
                              style={{ backgroundColor: '#2d3748', color: 'white' }}
                            >
                              <option value="Pendente">Pendente</option>
                              <option value="Em Andamento">Em Andamento</option>
                              <option value="Concluído">Concluído</option>
                              <option value="Cancelado">Cancelado</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Prioridade</label>
                            <select
                              value={course.priority}
                              onChange={(e) => handleUpdateCourse(course.id, 'priority', e.target.value)}
                              className="cdkteck-input"
                              style={{ backgroundColor: '#2d3748', color: 'white' }}
                            >
                              <option value="Máxima">Máxima</option>
                              <option value="Alta">Alta</option>
                              <option value="Média">Média</option>
                              <option value="Baixa">Baixa</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Data de Início</label>
                            <Input
                              type="date"
                              value={course.data_inicio || ''}
                              onChange={(e) => handleUpdateCourse(course.id, 'data_inicio', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label>Data de Conclusão Prevista</label>
                            <Input
                              type="date"
                              value={course.data_conclusao_prevista || ''}
                              onChange={(e) => handleUpdateCourse(course.id, 'data_conclusao_prevista', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label>Data de Conclusão Real</label>
                            <Input
                              type="date"
                              value={course.data_conclusao_real || ''}
                              onChange={(e) => handleUpdateCourse(course.id, 'data_conclusao_real', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Descrição</label>
                          <textarea
                            value={course.descricao || ''}
                            onChange={(e) => handleUpdateCourse(course.id, 'descricao', e.target.value)}
                            placeholder="Descrição do curso..."
                            className="cdkteck-textarea"
                          />
                        </div>

                        {/* Lessons Section */}
                        <div className="lessons-section">
                          <div className="lessons-header">
                            <h4>Aulas ({course.lessons?.length || 0})</h4>
                            <Button onClick={() => setShowAddLessonModal(course.id)} variant="primary" size="small">
                              <Plus size={16} /> Adicionar Aula
                            </Button>
                          </div>
                          {/* Add Lesson Modal */}
                          {showAddLessonModal === course.id && (
                            <Card className="dashboard-card add-lesson-form-card">
                              <h3>Adicionar Nova Aula</h3>
                              <form onSubmit={(e) => { e.preventDefault(); handleAddLesson(course.id); }}>
                                <div className="form-group">
                                  <label>Data da Aula:</label>
                                  <Input type="datetime-local" value={newLessonForm.data_aula} onChange={(e) => setNewLessonForm({...newLessonForm, data_aula: e.target.value})} required />
                                </div>
                                <div className="form-group">
                                  <label>Tópicos Abordados:</label>
                                  <textarea value={newLessonForm.topicos_abordados} onChange={(e) => setNewLessonForm({...newLessonForm, topicos_abordados: e.target.value})} placeholder="Tópicos..." className="cdkteck-textarea" required />
                                </div>
                                <div className="form-group">
                                  <label>Observações:</label>
                                  <textarea value={newLessonForm.observacoes} onChange={(e) => setNewLessonForm({...newLessonForm, observacoes: e.target.value})} placeholder="Observações..." className="cdkteck-textarea" />
                                </div>
                                <div className="form-group">
                                  <label>
                                    <input type="checkbox" checked={newLessonForm.concluida} onChange={(e) => setNewLessonForm({...newLessonForm, concluida: e.target.checked})} />
                                    Concluída
                                  </label>
                                </div>
                                <div className="form-actions">
                                  <Button type="submit" variant="primary">Salvar Aula</Button>
                                  <Button type="button" variant="secondary" onClick={() => setShowAddLessonModal(null)}>Cancelar</Button>
                                </div>
                              </form>
                            </Card>
                          )}
                          {/* Lessons List */}
                          {course.lessons?.length > 0 ? (
                            <div className="lessons-list-table">
                              <table>
                                <thead>
                                  <tr>
                                    <th>Data</th>
                                    <th>Tópicos</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {course.lessons.map((lesson) => (
                                    <tr key={lesson.id}>
                                      <td>{new Date(lesson.data_aula).toLocaleString()}</td>
                                      <td>{lesson.topicos_abordados}</td>
                                      <td>
                                        <input type="checkbox" checked={lesson.concluida} onChange={(e) => handleUpdateLesson(lesson.id, 'concluida', e.target.checked)} />
                                        {lesson.concluida ? ' Concluída' : ' Pendente'}
                                      </td>
                                      <td>
                                        <Button onClick={() => handleDeleteLesson(lesson.id, course.id)} variant="danger" size="small">
                                          <Trash2 size={16} />
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p>Nenhuma aula registrada para este curso.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
          {/* Pagination Controls for Courses - REMOVED */}
        </div>

        {/* Overall Stats Cards */}
        <div className="dashboard-grid stats-grid">
          <Card className="stat-card">
            <h3>Total de Cursos</h3>
            <p>{courses.length}</p>
          </Card>
          <Card className="stat-card">
            <h3>Cursos Concluídos</h3>
            <p>{courses.filter(c => c.status === 'Concluído').length}</p>
          </Card>
          <Card className="stat-card">
            <h3>Horas Restantes</h3>
            <p>{remainingHours}h</p> 
          </Card>
        </div>

        {/* Footer Notes */}
        <div className="course-tracker__footer-note">
          <p><strong>💡 Recursos:</strong> Seus dados são salvos no banco de dados.</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default CourseTracker;