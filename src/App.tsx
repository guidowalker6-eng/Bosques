import { useState } from 'react';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { ProjectForm } from './components/ProjectForm';
import { KpiDashboard } from './components/KpiDashboard';
import type { Department, Project } from './types';

// Initial Mock Data
const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    fechaIngreso: '2023-10-01',
    nombre: 'Migración CRM',
    clasificacion: 'Sistema',
    faseActual: 'Desarrollo',
    departamento: 'IT',
    estatus: 'En Curso',
    descripcion: 'Migración del sistema CRM legacy a Salesforce.',
    enfoqueEstrategico: 'Modernización',
    cadenaValor: 'Ventas',
    prioridad: 'Alta',
    esfuerzo: 'Alto',
    impacto: 'Alto',
    fechaInicio: '2023-11-01',
    fechaFin: '2024-05-01',
    seguimiento: 'Fase 2 completada',
    logros: 'Migración de bd inicial'
  },
  {
    id: '2',
    fechaIngreso: '2023-10-15',
    nombre: 'Optimización de Colas',
    clasificacion: 'Mejora',
    faseActual: 'Análisis',
    departamento: 'TRÁMITE',
    estatus: 'Planificación',
    descripcion: 'Reducir el tiempo de espera en sucursales en un 20%.',
    enfoqueEstrategico: 'Experiencia del Cliente',
    cadenaValor: 'Operaciones',
    prioridad: 'Alta',
    esfuerzo: 'Medio',
    impacto: 'Alto',
    fechaInicio: '2023-12-01',
    fechaFin: '2024-02-28',
    seguimiento: 'Levantamiento de procesos',
    logros: ''
  }
];

function App() {
  const [selectedDept, setSelectedDept] = useState<Department>('TRÁMITE');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  const handleSaveProject = (newProjectData: Omit<Project, 'id'>) => {
    const project: Project = {
      ...newProjectData,
      id: Math.random().toString(36).substr(2, 9) // simple unique id
    };
    setProjects(prev => [...prev, project]);
  };

  const filteredProjects = projects.filter(p => p.departamento === selectedDept);

  return (
    <Layout>
      <Sidebar selectedDept={selectedDept} onSelectDept={setSelectedDept} />

      <main className="flex-1 min-h-screen overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-12">

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Panel de Control: {selectedDept}</h1>
            <p className="text-slate-400">Gestiona y monitorea los proyectos de tu departamento.</p>
          </header>

          <KpiDashboard projects={filteredProjects} />

          <ProjectForm
            selectedDept={selectedDept}
            onSave={handleSaveProject}
          />

        </div>
      </main>
    </Layout>
  );
}

export default App;
