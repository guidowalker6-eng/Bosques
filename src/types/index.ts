export type Department = 'TRÁMITE' | 'IT' | 'PROCESOS' | 'COBROS';
export type ProjectStatus = 'En Curso' | 'Finalizado' | 'Pausado' | 'Cancelado' | 'Planificación';
export type Priority = 'Alta' | 'Media' | 'Baja';
export type Effort = 'Alto' | 'Medio' | 'Bajo';
export type Impact = 'Alto' | 'Medio' | 'Bajo';

export interface Project {
    id: string;
    // Datos de Proyecto
    fechaIngreso: string;
    nombre: string;
    clasificacion: string;
    faseActual: string;
    departamento: Department;
    estatus: ProjectStatus;

    // Estrategia
    descripcion: string;
    enfoqueEstrategico: string;
    cadenaValor: string;
    prioridad: Priority;
    esfuerzo: Effort;
    impacto: Impact;

    // Fechas y Seguimiento
    fechaInicio: string;
    fechaFin: string;
    seguimiento: string;
    logros: string;
}

export interface KpiSummary {
    pendientesAnterior: number;
    nuevos: number;
    finalizados: number;
    cancelados: number;
    enCurso: number;
    planificacion: number;
    quickWins: number;
    proyectosPrincipales: number;
    tareasMenores: number;
}
