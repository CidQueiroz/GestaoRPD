import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle, Download, Calendar, FileText, Plus, Trash2 } from 'lucide-react';

const CourseTracker = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "AI-Powered Microservices with Vibe Coding",
      hours: 2,
      completed: 0,
      priority: "Alta",
      link: "https://www.udemy.com/course/ai_powered_microservices_with_vibe_coding/",
      startDate: "",
      endDate: "",
      notes: "",
      lessons: []
    },
    {
      id: 2,
      name: "Complete RAG Bootcamp",
      hours: 28,
      completed: 0,
      priority: "Máxima",
      link: "https://www.udemy.com/course/complete-rag-bootcamp-build-optimize-and-deploy-ai-apps/",
      startDate: "",
      endDate: "",
      notes: "",
      lessons: []
    },
    {
      id: 3,
      name: "Certified Generative AI Architect with Knowledge Graphs",
      hours: 8,
      completed: 0,
      priority: "Média",
      link: "https://www.udemy.com/course/certified_generative_ai_architect_with_knowledge_graphs",
      startDate: "",
      endDate: "",
      notes: "",
      lessons: []
    },
    {
      id: 4,
      name: "Mastering Agentic Design Patterns",
      hours: 3,
      completed: 0,
      priority: "Alta",
      link: "https://www.udemy.com/course/mastering-agentic-design-patterns",
      startDate: "",
      endDate: "",
      notes: "",
      lessons: []
    },
    {
      id: 5,
      name: "Quantization for GenAI Models",
      hours: 2,
      completed: 0,
      priority: "Média",
      link: "https://www.udemy.com/course/quantization",
      startDate: "",
      endDate: "",
      notes: "",
      lessons: []
    },
    {
      id: 6,
      name: "Build On-Device AI",
      hours: 4,
      completed: 0,
      priority: "Média",
      link: "https://www.udemy.com/course/build-on-device-ai/",
      startDate: "",
      endDate: "",
      notes: "",
      lessons: []
    },
    {
      id: 7,
      name: "DeepSeek R1 AI: 25 Real World Projects",
      hours: 6,
      completed: 0,
      priority: "Baixa",
      link: "https://www.udemy.com/course/deepseek-r1-real-world-projects/",
      startDate: "",
      endDate: "",
      notes: "",
      lessons: []
    },
    {
      id: 8,
      name: "Ultimate DevOps to MLOps Bootcamp",
      hours: 9,
      completed: 0,
      priority: "Máxima",
      link: "https://www.udemy.com/course/devops-to-mlops-bootcamp/",
      startDate: "",
      endDate: "",
      notes: "",
      lessons: []
    },
    {
      id: 9,
      name: "Certified Chief AI Officer Program",
      hours: 12,
      completed: 0,
      priority: "Baixa",
      link: "https://www.udemy.com/course/chief-ai-officer-program-lead-ai-strategy-governance",
      startDate: "",
      endDate: "",
      notes: "",
      lessons: []
    },
    {
      id: 10,
      name: "CAIXA - Inteligência Artificial na Prática (DIO)",
      hours: 10,
      completed: 0,
      priority: "Baixa",
      link: "https://web.dio.me/track/31b3e5fd-262e-4d2f-8b7c-f614da085c46",
      startDate: "",
      endDate: "",
      notes: "",
      lessons: []
    }
  ]);

  const [expandedCourse, setExpandedCourse] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [collapsedCourses, setCollapsedCourses] = useState({});

  // Load data from localStorage
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

  // Save to localStorage whenever courses change
  useEffect(() => {
    localStorage.setItem('courseTrackerData', JSON.stringify(courses));
  }, [courses]);

  // Save collapsed state
  useEffect(() => {
    localStorage.setItem('collapsedCourses', JSON.stringify(collapsedCourses));
  }, [collapsedCourses]);

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
    return Math.round((completed / total) * 100);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "Máxima": return "bg-red-100 text-red-800 border-red-300";
      case "Alta": return "bg-orange-100 text-orange-800 border-orange-300";
      case "Média": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Baixa": return "bg-gray-100 text-gray-800 border-gray-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const exportToCSV = () => {
    let csv = "ID,Curso,Prioridade,Total (h),Concluído (h),Progresso (%),Data Início,Data Fim,Notas,Link\n";
    
    courses.forEach(course => {
      const progress = getProgress(course.completed, course.hours);
      const notes = course.notes.replace(/"/g, '""').replace(/\n/g, ' ');
      csv += `${course.id},"${course.name}",${course.priority},${course.hours},${course.completed},${progress},"${course.startDate}","${course.endDate}","${notes}","${course.link}"\n`;
      
      if (course.lessons.length > 0) {
        csv += "\nAulas:\n";
        csv += "ID Aula,Título,Duração (min),Concluída,Notas Aula\n";
        course.lessons.forEach(lesson => {
          const lessonNotes = lesson.notes.replace(/"/g, '""').replace(/\n/g, ' ');
          csv += `${lesson.id},"${lesson.title}",${lesson.duration},${lesson.completed ? 'Sim' : 'Não'},"${lessonNotes}"\n`;
        });
        csv += "\n";
      }
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
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

  const totalHours = courses.reduce((sum, course) => sum + course.hours, 0);
  const completedHours = courses.reduce((sum, course) => sum + course.completed, 0);
  const overallProgress = Math.round((completedHours / totalHours) * 100);

  const priorityCourses = courses
    .filter(c => c.priority === "Máxima" || c.priority === "Alta")
    .sort((a, b) => {
      const priorityOrder = { "Máxima": 0, "Alta": 1 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Plano de Estudos - Engenharia de IA
              </h1>
              <p className="text-gray-600">Cidirclay Santos de Lima Queiroz</p>
            </div>
            
            {/* Export Menu */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Download size={18} />
                Exportar
              </button>
              
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                  <button
                    onClick={() => { exportToCSV(); setShowExportMenu(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-t-lg transition-colors"
                  >
                    📊 Exportar CSV
                  </button>
                  <button
                    onClick={() => { exportToJSON(); setShowExportMenu(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-b-lg transition-colors"
                  >
                    📦 Exportar JSON
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Overall Progress */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-gray-700">Progresso Geral</span>
              <span className="text-2xl font-bold text-indigo-600">{overallProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {completedHours.toFixed(1)}h de {totalHours}h concluídas
            </p>
          </div>
        </div>

        {/* Priority Alert */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
          <div className="flex items-start">
            <AlertCircle className="text-amber-600 mr-3 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="text-amber-800 font-semibold mb-1">Cursos Prioritários (60 dias)</h3>
              <p className="text-amber-700 text-sm">
                Foque primeiro nos {priorityCourses.length} cursos de prioridade Máxima e Alta para maximizar suas chances de recolocação.
              </p>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {courses.map((course) => {
            const progress = getProgress(course.completed, course.hours);
            const isExpanded = expandedCourse === course.id;
            const isCollapsed = collapsedCourses[course.id] || false;
            
            return (
              <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Course Header - Always Visible */}
                <div 
                  className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 transition-colors"
                  onClick={() => toggleCollapse(course.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        {isCollapsed ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </button>
                      <span className="text-lg font-bold text-gray-900">#{course.id}</span>
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">{course.name}</h3>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(course.priority)}`}>
                        {course.priority}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              progress === 100 ? 'bg-green-500' : 'bg-indigo-500'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${progress === 100 ? 'text-green-600' : 'text-gray-700'} min-w-[45px]`}>
                          {progress}%
                        </span>
                        {progress === 100 && <Check className="text-green-500" size={20} />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Details - Collapsible */}
                {!isCollapsed && (
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-gray-900">#{course.id}</span>
                        <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(course.priority)}`}>
                          {course.priority}
                        </span>
                      </div>
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-800 underline"
                      >
                        Acessar curso →
                      </a>
                    </div>
                  </div>

                  {/* Progress and Hours */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Total de Horas</label>
                      <div className="text-2xl font-bold text-gray-900">{course.hours}h</div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Horas Concluídas</label>
                      <input
                        type="number"
                        min="0"
                        max={course.hours}
                        step="0.5"
                        value={course.completed}
                        onChange={(e) => updateCompleted(course.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-lg font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Progresso</label>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${
                              progress === 100 ? 'bg-green-500' : 'bg-indigo-500'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className={`text-xl font-bold ${progress === 100 ? 'text-green-600' : 'text-gray-700'}`}>
                          {progress}%
                        </span>
                        {progress === 100 && <Check className="text-green-500" size={24} />}
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                        <Calendar size={14} />
                        Data de Início
                      </label>
                      <input
                        type="date"
                        value={course.startDate}
                        onChange={(e) => updateCourse(course.id, 'startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                        <Calendar size={14} />
                        Data de Conclusão (Prevista/Real)
                      </label>
                      <input
                        type="date"
                        value={course.endDate}
                        onChange={(e) => updateCourse(course.id, 'endDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-4">
                    <label className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FileText size={14} />
                      Notas Gerais do Curso
                    </label>
                    <textarea
                      value={course.notes}
                      onChange={(e) => updateCourse(course.id, 'notes', e.target.value)}
                      placeholder="Adicione suas anotações sobre o curso, pontos importantes, projetos realizados, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[80px]"
                    />
                  </div>

                  {/* Lessons Section */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-900">Aulas ({course.lessons.length})</h4>
                      <button
                        onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {isExpanded ? 'Ocultar aulas' : 'Mostrar aulas'}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="space-y-3">
                        {course.lessons.map((lesson) => (
                          <div key={lesson.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-2">
                              <div className="md:col-span-5">
                                <input
                                  type="text"
                                  value={lesson.title}
                                  onChange={(e) => updateLesson(course.id, lesson.id, 'title', e.target.value)}
                                  placeholder="Título da aula"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <input
                                  type="number"
                                  value={lesson.duration}
                                  onChange={(e) => updateLesson(course.id, lesson.id, 'duration', parseFloat(e.target.value) || 0)}
                                  placeholder="Min"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="md:col-span-2 flex items-center">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={lesson.completed}
                                    onChange={(e) => updateLesson(course.id, lesson.id, 'completed', e.target.checked)}
                                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                                  />
                                  <span className="text-sm text-gray-700">Concluída</span>
                                </label>
                              </div>
                              <div className="md:col-span-3 flex items-center justify-end">
                                <button
                                  onClick={() => deleteLesson(course.id, lesson.id)}
                                  className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                            <textarea
                              value={lesson.notes}
                              onChange={(e) => updateLesson(course.id, lesson.id, 'notes', e.target.value)}
                              placeholder="Anotações da aula..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 min-h-[60px]"
                            />
                          </div>
                        ))}
                        
                        <button
                          onClick={() => addLesson(course.id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                        >
                          <Plus size={18} />
                          Adicionar Aula
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total de Cursos</p>
                <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <div className="bg-indigo-100 rounded-full p-3">
                <AlertCircle className="text-indigo-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Cursos Concluídos</p>
                <p className="text-3xl font-bold text-green-600">
                  {courses.filter(c => getProgress(c.completed, c.hours) === 100).length}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <Check className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Horas Restantes</p>
                <p className="text-3xl font-bold text-orange-600">
                  {(totalHours - completedHours).toFixed(1)}h
                </p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <X className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 mb-2">
            <strong>💡 Recursos:</strong>
          </p>
          <ul className="text-sm text-blue-700 space-y-1 ml-4">
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