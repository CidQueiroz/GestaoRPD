import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle, Download, Calendar, FileText, Plus, Trash2 } from 'lucide-react';

const CourseTracker = () => {
  const [courses, setCourses] = useState([
    // === ONDA 1: Ignição, Fundamentos & Velocidade (JAN - MAR) ===
    // Foco: Mira estratégica, base científica e build acelerado.

    {
      id: 1,
      name: "Goal Mastery: 21 Days to Transform Your Life",
      hours: 2,
      completed: 0,
      priority: "Crítica",
      link: "https://www.udemy.com/course/the-complete-guide-for-goal-achievement-in-21-days-challenge/learn/lecture/24219142",
      startDate: "2026-01-01",
      endDate: "",
      notes: "O Protocolo de Ignição. Definir o GPSAI para os 133 agentes.",
      lessons: []
    },
    {
      id: 2,
      name: "Machine Learning Foundations: Build Expert-Level AI Models",
      hours: 20,
      completed: 0,
      priority: "Crítica",
      link: "https://www.udemy.com/course/machine-learning-foundations-build-expert-level-ai-models/learn/lecture/48712641",
      startDate: "2026-01-05",
      endDate: "",
      notes: "A base de tudo. Sem entender o motor, não há soberania no asfalto.",
      lessons: []
    },
    {
      id: 3,
      name: "From Prompt Engineering to Agent Engineering",
      hours: 31.5,
      completed: 0,
      priority: "Máxima",
      link: "https://www.udemy.com/course/from-prompt-engineering-to-agent-engineering/learn/lecture/49618381",
      startDate: "2026-01-10",
      endDate: "",
      notes: "O Manual do Piloto. Transição de prompts simples para agentes autônomos complexos.",
      lessons: []
    },
    {
      id: 4,
      name: "Google Antigravity for Beginners: AI Coding Crash Course",
      hours: 12.5,
      completed: 0,
      priority: "Máxima",
      link: "https://www.udemy.com/course/google-antigravity-for-beginners-ai-coding-crash-course/",
      startDate: "2026-01-20",
      endDate: "",
      notes: "Velocidade máxima no ecossistema Google. Cursor/Windsurf dominance.",
      lessons: []
    },
    {
      id: 5,
      name: "AI-Powered Microservices with Vibe Coding",
      hours: 2,
      completed: 0,
      priority: "Máxima",
      link: "https://www.udemy.com/course/ai_powered_microservices_with_vibe_coding/",
      startDate: "2026-02-01",
      endDate: "",
      notes: "Arquitetura técnica para sustentar o exército de agentes.",
      lessons: []
    },
    {
      id: 6,
      name: "Build 8 Python Apps Games and Web Application Python Master",
      hours: 7,
      completed: 0,
      priority: "Alta",
      link: "https://www.udemy.com/course/build-8-python-apps-games-and-web-application-python-master/",
      startDate: "2026-02-10",
      endDate: "",
      notes: "Aquecimento de portfólio e domínio da linguagem base.",
      lessons: []
    },
    {
      id: 7,
      name: "Complete AI Agent Practical Course C| AIPC",
      hours: 8,
      completed: 0,
      priority: "Máxima",
      link: "https://www.udemy.com/course/complete-ai-agent-practical-course-c-aipc/",
      startDate: "2026-02-20",
      endDate: "",
      notes: "Foco prático em automação mobile e n8n para demandas Minsait.",
      lessons: []
    },
    {
      id: 8,
      name: "DeepSeek R1 AI: 25 Real World Projects",
      hours: 6,
      completed: 0,
      priority: "Máxima",
      link: "https://www.udemy.com/course/deepseek-r1-real-world-projects/",
      startDate: "2026-03-01",
      endDate: "",
      notes: "Volume de projetos de raciocínio (Reasoning) para o portfólio.",
      lessons: []
    },
    {
      id: 9,
      name: "100 AI Agents in 100 Days 2026",
      hours: 8,
      completed: 0,
      priority: "Alta",
      link: "https://www.udemy.com/course/100-ai-agents/",
      startDate: "2026-03-10",
      endDate: "",
      notes: "O desafio de consistência para fechar os primeiros 100 do exército.",
      lessons: []
    },
    // === ONDA 2: Inteligência e Dados (ABR - JUN) ===
    // Foco: RAG, Otimização e Conhecimento Estruturado.
    {
      id: 10,
      name: "Complete RAG Bootcamp: Build & Deploy AI Apps",
      hours: 28,
      completed: 0,
      priority: "Alta",
      link: "https://www.udemy.com/course/complete-rag-bootcamp-build-optimize-and-deploy-ai-apps/",
      startDate: "2026-04-01",
      endDate: "",
      notes: "Vital para lidar com a densidade de documentos da Petrobras.",
      lessons: []
    },
    {
      id: 11,
      name: "Quantization for GenAI Models",
      hours: 2,
      completed: 0,
      priority: "Alta",
      link: "https://www.udemy.com/course/quantization",
      startDate: "2026-05-01",
      endDate: "",
      notes: "Otimização extrema para o hardware Dell 8GB.",
      lessons: []
    },
    {
      id: 12,
      name: "Mastering Agentic Design Patterns",
      hours: 3,
      completed: 0,
      priority: "Alta",
      link: "https://www.udemy.com/course/mastering-agentic-design-patterns",
      startDate: "2026-05-15",
      endDate: "",
      notes: "Padronização de arquitetura de agentes autônomos.",
      lessons: []
    },
    {
      id: 13,
      name: "Certified Generative AI Architect with Knowledge Graphs",
      hours: 8,
      completed: 0,
      priority: "Alta",
      link: "https://www.udemy.com/course/certified_generative_ai_architect_with_knowledge_graphs",
      startDate: "2026-06-01",
      endDate: "",
      notes: "Nível Sênior: conectando dados de forma relacional inteligente.",
      lessons: []
    },
    // === ONDA 3: Automação Enterprise e Workflows (JUL - SET) ===
    // Foco: Governança, Integração e MLOps.
    {
      id: 14,
      name: "AI Agents: From Foundations to Enterprise Systems",
      hours: 13,
      completed: 0,
      priority: "Média",
      link: "https://www.udemy.com/course/ai-agents-from-foundations-to-enterprise-systems/",
      startDate: "2026-07-01",
      endDate: "",
      notes: "Escalando de agentes locais para sistemas industriais.",
      lessons: []
    },
    {
      id: 15,
      name: "Base44 Mastery: Build Enterprise AI Workflow Automations",
      hours: 7,
      completed: 0,
      priority: "Média",
      link: "https://www.udemy.com/course/base44-mastery-build-enterprise-ai-workflow-automations/",
      startDate: "2026-08-01",
      endDate: "",
      notes: "Integração total: Slack, Notion e Workspace.",
      lessons: []
    },
    {
      id: 16,
      name: "Ultimate DevOps to MLOps Bootcamp",
      hours: 9,
      completed: 0,
      priority: "Média",
      link: "https://www.udemy.com/course/devops-to-mlops-bootcamp/",
      startDate: "2026-08-15",
      endDate: "",
      notes: "Pipeline de produção para o portfólio.",
      lessons: []
    },
    {
      id: 17,
      name: "Build On-Device AI",
      hours: 4,
      completed: 0,
      priority: "Média",
      link: "https://www.udemy.com/course/build-on-device-ai/",
      startDate: "2026-09-01",
      endDate: "",
      notes: "Privacidade e execução local para segurança máxima.",
      lessons: []
    },
    // === ONDA 4: Liderança, Governança e Soberania (OUT - DEZ) ===
    // Foco: Estratégia, Compliance e Finalização.
    {
      id: 18,
      name: "Certified Chief AI Officer Program",
      hours: 12,
      completed: 0,
      priority: "Baixa",
      link: "https://www.udemy.com/course/chief-ai-officer-program-lead-ai-strategy-governance",
      startDate: "2026-10-01",
      endDate: "",
      notes: "Visão executiva. Preparação para cargos C-Level em IA.",
      lessons: []
    },
    {
      id: 19,
      name: "CAIXA - Inteligência Artificial na Prática (DIO)",
      hours: 16,
      completed: 0,
      priority: "Baixa",
      link: "https://web.dio.me/track/31b3e5fd-262e-4d2f-8b7c-f614da085c46",
      startDate: "2026-10-15",
      endDate: "",
      notes: "Selo de qualidade para o mercado nacional.",
      lessons: []
    },
    {
      id: 20,
      name: "AI for Risk Management & Compliance Excellence",
      hours: 5,
      completed: 0,
      priority: "Baixa",
      link: "https://www.udemy.com/course/ai-for-risk-management-compliance-excellence/",
      startDate: "2026-11-01",
      endDate: "",
      notes: "Garantindo que seu império de agentes seja seguro e ético.",
      lessons: []
    },
    {
      id: 21,
      name: "Generative AI for Personal Productivity: Get More Done",
      hours: 23,
      completed: 0,
      priority: "Baixa",
      link: "https://www.udemy.com/course/generative-ai-for-personal-productivity",
      startDate: "2026-12-01",
      endDate: "",
      notes: "O fechamento: Automatizar tudo para colher os frutos da Soberania.",
      lessons: []
    },
    {
      id: 0,
      name: "Awesome Claude Skills",
      hours: 0,
      completed: 0,
      priority: "Alta",
      link: "https://github.com/ComposioHQ/awesome-claude-skills",
      startDate: "Contínuo",
      endDate: "",
      notes: "Referência técnica contínua para skills avançadas com Claude.",
      lessons: []
    }
  ]);

  const [expandedCourse, setExpandedCourse] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [collapsedCourses, setCollapsedCourses] = useState({});

  // State for new course form
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseHours, setNewCourseHours] = useState('');
  const [newCoursePriority, setNewCoursePriority] = useState('Média'); // Default priority
  const [newCourseLink, setNewCourseLink] = useState('');
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);

  // State for new course form                                                                                                             │

  useEffect(() => {
    const saved = localStorage.getItem('courseTrackerData');
    if (saved) {
      setCourses(JSON.parse(saved));
    }
    const savedCollapsed = localStorage.getItem('collapsedCourses');
    if (savedCollapsed) {
      setCollapsedCourses(JSON.parse(savedCollapsed));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('courseTrackerData', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('collapsedCourses', JSON.stringify(collapsedCourses));
  }, [collapsedCourses]);


  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Máxima": return "priority-maxima";
      case "Alta": return "priority-alta";
      case "Média": return "priority-media";
      case "Baixa": return "priority-baixa";
      default: return "priority-baixa";
    }
  };
  
  // ... (all other functions remain the same)
  const toggleCollapse = (courseId) => {
    setCollapsedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const updateCompleted = (id, value) => {
    const numValue = Math.max(0, parseFloat(value) || 0);
    setCourses(courses.map(course => {
      if (course.id === id) {
        const newValue = Math.min(course.hours, numValue);
        return { ...course, completed: newValue };
      }
      return course;
    }));
  };

  const addLesson = (courseId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: [...course.lessons, { id: Date.now(), title: "", duration: 0, completed: false, notes: "" }]
        };
      }
      return course;
    }));
  };

  const updateLesson = (courseId, lessonId, field, value) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.map(lesson =>
            lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
          )
        };
      }
      return course;
    }));
  };

  const deleteLesson = (courseId, lessonId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.filter(lesson => lesson.id !== lessonId)
        };
      }
      return course;
    }));
  };

  const getProgress = (completed, total) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };
  
  const exportToCSV = () => {
    let csv = "ID,Curso,Prioridade,Total (h),Concluído (h),Progresso (%),Data Início,Data Fim,Notas,Link\n";
    
    courses.forEach(course => {
      const progress = getProgress(course.completed, course.hours);
      const notes = (course.notes || "").replace(/"/g, '""').replace(/\n/g, ' ');
      csv += `${course.id},"${course.name}",${course.priority},${course.hours},${course.completed},${progress},"${course.startDate || ''}","${course.endDate || ''}","${notes}","${course.link}"\n`;
      
      if (course.lessons.length > 0) {
        csv += "\n,Aulas:\n";
        csv += ",ID Aula,Título,Duração (min),Concluída,Notas Aula\n";
        course.lessons.forEach(lesson => {
          const lessonNotes = (lesson.notes || "").replace(/"/g, '""').replace(/\n/g, ' ');
          csv += `,${lesson.id},"${lesson.title}",${lesson.duration},${lesson.completed ? 'Sim' : 'Não'},"${lessonNotes}"\n`;
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

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourseName || !newCourseHours) return; // Basic validation

    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const newCourse = {
      id: newId,
      name: newCourseName,
      hours: parseFloat(newCourseHours),
      completed: 0,
      priority: newCoursePriority,
      link: newCourseLink,
      startDate: "",
      endDate: "",
      notes: "",
      lessons: []
    };
    setCourses([...courses, newCourse]);
    setNewCourseName('');
    setNewCourseHours('');
    setNewCoursePriority('Média');
    setNewCourseLink('');
    setShowAddCourseForm(false); // Hide form after adding
  };

  const totalHours = courses.reduce((sum, course) => sum + course.hours, 0);
  const completedHours = courses.reduce((sum, course) => sum + course.completed, 0);
  const overallProgress = getProgress(completedHours, totalHours);

  const priorityCourses = courses
    .filter(c => c.priority === "Máxima" || c.priority === "Alta")
    .sort((a, b) => {
      const priorityOrder = { "Máxima": 0, "Alta": 1 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  return (
    <div className="dashboard-container" style={{paddingTop: '2rem'}}>
      <div className="course-tracker__container">
        <div className="course-tracker__main-header">
          <div className="course-tracker__header-top">
            <div>
              <h1 className="course-tracker__title">Plano de Estudos - Engenharia de IA</h1>
              <p className="course-tracker__subtitle">CDK TECK</p>
            </div>
            <div className="course-tracker__export-container">
              <button onClick={() => setShowExportMenu(!showExportMenu)} className="course-tracker__export-btn">
                <Download size={18} />
                Exportar
              </button>
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
          <div className="course-tracker__overall-progress">
            <div className="course-tracker__progress-header">
              <span className="course-tracker__progress-label">Progresso Geral</span>
              <span className="course-tracker__progress-percent">{overallProgress}%</span>
            </div>
            <div className="course-tracker__progress-bar-bg">
              <div className="course-tracker__progress-bar-fg" style={{ width: `${overallProgress}%` }} />
            </div>
            <p className="course-tracker__progress-caption">{completedHours.toFixed(1)}h de {totalHours}h concluídas</p>
          </div>
        </div>

        <div className="course-tracker__priority-alert">
          <AlertCircle className="course-tracker__priority-alert-icon" size={20} />
          <div>
            <h3>Cursos Prioritários (60 dias)</h3>
            <p>Foque primeiro nos {priorityCourses.length} cursos de prioridade Máxima e Alta para maximizar suas chances de recolocação.</p>
          </div>
        </div>

        {/* Add New Course Form */}
        <button onClick={() => setShowAddCourseForm(!showAddCourseForm)} className="course-tracker__add-course-toggle-btn">
          {showAddCourseForm ? 'Ocultar Formulário' : 'Adicionar Novo Curso'}
        </button>

        {showAddCourseForm && (
          <Card className="dashboard-card course-tracker__add-course-form-card">
            <h2>Adicionar Novo Curso</h2>
            <form onSubmit={handleAddCourse} className="course-tracker__form">
              <div className="course-tracker__form-group">
                <label htmlFor="newCourseName">Nome do Curso:</label>
                <Input
                  id="newCourseName"
                  type="text"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  required
                />
              </div>
              <div className="course-tracker__form-group">
                <label htmlFor="newCourseHours">Total de Horas:</label>
                <Input
                  id="newCourseHours"
                  type="number"
                  value={newCourseHours}
                  onChange={(e) => setNewCourseHours(e.target.value)}
                  required
                />
              </div>
              <div className="course-tracker__form-group">
                <label htmlFor="newCoursePriority">Prioridade:</label>
                <select
                  id="newCoursePriority"
                  value={newCoursePriority}
                  onChange={(e) => setNewCoursePriority(e.target.value)}
                  className="course-tracker__select"
                >
                  <option value="Máxima">Máxima</option>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>
              <div className="course-tracker__form-group">
                <label htmlFor="newCourseLink">Link do Curso:</label>
                <Input
                  id="newCourseLink"
                  type="url"
                  value={newCourseLink}
                  onChange={(e) => setNewCourseLink(e.target.value)}
                />
              </div>
              <Button type="submit" variant="primary">Adicionar Curso</Button>
            </form>
          </Card>
        )}

        <div className="course-tracker__list">
          {courses.map((course) => {
            const progress = getProgress(course.completed, course.hours);
            const isExpanded = expandedCourse === course.id;
            const isCollapsed = collapsedCourses[course.id] || false;
            return (
              <div key={course.id} className="course-tracker__course-card">
                <div className="course-tracker__course-header" onClick={() => toggleCollapse(course.id)}>
                  <div className="course-tracker__course-header-content">
                    <div className="course-tracker__course-header-main">
                      <button>
                        {isCollapsed ? (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        ) : (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        )}
                      </button>
                      <span className="course-tracker__course-id">#{course.id}</span>
                      <h3 className="course-tracker__course-name">{course.name}</h3>
                      <span className={`course-tracker__priority-badge ${getPriorityClass(course.priority)}`}>{course.priority}</span>
                      <div className="course-tracker__course-progress">
                        <div className="course-tracker__course-progress-bar-bg">
                          <div className={`course-tracker__course-progress-bar-fg ${progress === 100 ? 'course-tracker__course-progress-bar-fg--complete' : 'course-tracker__course-progress-bar-fg--incomplete'}`} style={{ width: `${progress}%` }} />
                        </div>
                        <span className={`course-tracker__course-progress-percent ${progress === 100 ? 'course-tracker__course-progress-percent--complete' : 'course-tracker__course-progress-percent--incomplete'}`}>{progress}%</span>
                        {progress === 100 && <Check color="#22c55e" size={20} />}
                      </div>
                    </div>
                  </div>
                </div>

                {!isCollapsed && (
                  <div className="course-tracker__course-details">
                    <div className="course-tracker__course-details-header">
                        <a href={course.link} target="_blank" rel="noopener noreferrer" className="course-tracker__course-link">
                            Acessar curso →
                        </a>
                    </div>

                    <div className="course-tracker__grid course-tracker__grid--3-cols">
                      <div>
                        <label className="course-tracker__form-group-label">Total de Horas</label>
                        <div className="text-2xl font-bold text-gray-900">{course.hours}h</div>
                      </div>
                      <div className="course-tracker__form-group">
                        <label htmlFor={`completed-${course.id}`} className="course-tracker__form-group-label">Horas Concluídas</label>
                        <input id={`completed-${course.id}`} type="number" min="0" max={course.hours} step="0.5" value={course.completed} onChange={(e) => updateCompleted(course.id, e.target.value)} className="course-tracker__input" />
                      </div>
                      <div>
                        <label className="course-tracker__form-group-label">Progresso</label>
                        <div className={`course-tracker__course-progress-percent ${progress === 100 ? 'course-tracker__course-progress-percent--complete' : 'course-tracker__course-progress-percent--incomplete'}`}>{progress}%</div>
                      </div>
                    </div>

                    <div className="course-tracker__grid course-tracker__grid--2-cols">
                      <div className="course-tracker__form-group">
                        <label htmlFor={`start-date-${course.id}`}><Calendar size={14} /> Data de Início</label>
                        <input id={`start-date-${course.id}`} type="date" value={course.startDate} onChange={(e) => updateCourse(course.id, 'startDate', e.target.value)} className="course-tracker__input" />
                      </div>
                      <div className="course-tracker__form-group">
                        <label htmlFor={`end-date-${course.id}`}><Calendar size={14} /> Data de Conclusão</label>
                        <input id={`end-date-${course.id}`} type="date" value={course.endDate} onChange={(e) => updateCourse(course.id, 'endDate', e.target.value)} className="course-tracker__input" />
                      </div>
                    </div>

                    <div className="course-tracker__form-group">
                      <label htmlFor={`notes-${course.id}`}><FileText size={14} /> Notas Gerais do Curso</label>
                      <textarea id={`notes-${course.id}`} value={course.notes} onChange={(e) => updateCourse(course.id, 'notes', e.target.value)} placeholder="Adicione suas anotações..." className="course-tracker__textarea" />
                    </div>

                    <div className="course-tracker__lessons-section">
                      <div className="course-tracker__lessons-header">
                        <h4>Aulas ({course.lessons.length})</h4>
                        <button onClick={() => setExpandedCourse(isExpanded ? null : course.id)} className="course-tracker__lessons-toggle">
                          {isExpanded ? 'Ocultar aulas' : 'Mostrar aulas'}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="course-tracker__lessons-list">
                          {course.lessons.map((lesson) => (
                            <div key={lesson.id} className="course-tracker__lesson-card">
                              <div className="course-tracker__lesson-grid">
                                <div className="md-col-span-5"><input type="text" value={lesson.title} onChange={(e) => updateLesson(course.id, lesson.id, 'title', e.target.value)} placeholder="Título da aula" className="course-tracker__lesson-input" /></div>
                                <div className="md-col-span-2"><input type="number" value={lesson.duration} onChange={(e) => updateLesson(course.id, lesson.id, 'duration', parseFloat(e.target.value) || 0)} placeholder="Min" className="course-tracker__lesson-input" /></div>
                                <div className="md-col-span-2">
                                  <label className="course-tracker__lesson-checkbox-group">
                                    <input type="checkbox" checked={lesson.completed} onChange={(e) => updateLesson(course.id, lesson.id, 'completed', e.target.checked)} className="course-tracker__lesson-checkbox" />
                                    <span>Concluída</span>
                                  </label>
                                </div>
                                <div className="md-col-span-3 flex items-center justify-end">
                                  <button onClick={() => deleteLesson(course.id, lesson.id)} className="course-tracker__lesson-delete-btn"><Trash2 size={18} /></button>
                                </div>
                              </div>
                              <textarea value={lesson.notes} onChange={(e) => updateLesson(course.id, lesson.id, 'notes', e.target.value)} placeholder="Anotações da aula..." className="course-tracker__textarea" />
                            </div>
                          ))}
                          <button onClick={() => addLesson(course.id)} className="course-tracker__add-lesson-btn"><Plus size={18} /> Adicionar Aula</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="dashboard-grid">
          <div className="course-tracker__stat-card">
            <div className="course-tracker__stat-card-content">
              <div>
                <p className="course-tracker__stat-card-label">Total de Cursos</p>
                <p className="course-tracker__stat-card-value">{courses.length}</p>
              </div>
              <div className="course-tracker__stat-card-icon-wrapper course-tracker__stat-card-icon-wrapper--indigo">
                <AlertCircle className="course-tracker__stat-card-icon--indigo" size={24} />
              </div>
            </div>
          </div>
          <div className="course-tracker__stat-card">
            <div className="course-tracker__stat-card-content">
              <div>
                <p className="course-tracker__stat-card-label">Cursos Concluídos</p>
                <p className="course-tracker__stat-card-value course-tracker__stat-card-value--green">{courses.filter(c => getProgress(c.completed, c.hours) === 100).length}</p>
              </div>
              <div className="course-tracker__stat-card-icon-wrapper course-tracker__stat-card-icon-wrapper--green">
                <Check className="course-tracker__stat-card-icon--green" size={24} />
              </div>
            </div>
          </div>
          <div className="course-tracker__stat-card">
            <div className="course-tracker__stat-card-content">
              <div>
                <p className="course-tracker__stat-card-label">Horas Restantes</p>
                <p className="course-tracker__stat-card-value course-tracker__stat-card-value--orange">{(totalHours - completedHours).toFixed(1)}h</p>
              </div>
              <div className="course-tracker__stat-card-icon-wrapper course-tracker__stat-card-icon-wrapper--orange">
                <X className="course-tracker__stat-card-icon--orange" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="course-tracker__footer-note">
          <p><strong>💡 Recursos:</strong></p>
          <ul>
            <li>• Seus dados são salvos automaticamente no navegador</li>
            <li>• Adicione aulas individuais com notas para cada curso</li>
            <li>• Exporte para CSV/Excel ou JSON para backup</li>
            <li>• Defina datas de início e fim para planejamento</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseTracker;