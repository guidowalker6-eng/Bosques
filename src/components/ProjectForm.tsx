import { useState } from 'react';
import type { Project, Department } from '../types';
import { Save, AlertCircle } from 'lucide-react';

interface ProjectFormProps {
    selectedDept: Department;
    onSave: (project: Omit<Project, 'id'>) => void;
}

const INITIAL_PROJECT_STATE: Omit<Project, 'id' | 'departamento'> = {
    fechaIngreso: '',
    nombre: '',
    clasificacion: '',
    faseActual: '',
    estatus: 'Planificación',
    descripcion: '',
    enfoqueEstrategico: '',
    cadenaValor: '',
    prioridad: 'Media',
    esfuerzo: 'Medio',
    impacto: 'Medio',
    fechaInicio: '',
    fechaFin: '',
    seguimiento: '',
    logros: ''
};

export function ProjectForm({ selectedDept, onSave }: ProjectFormProps) {
    const [formData, setFormData] = useState(INITIAL_PROJECT_STATE);
    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear errors when user types
        if (errors.length > 0) setErrors([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: string[] = [];

        // Validaciones críticas
        if (!formData.nombre.trim()) newErrors.push('El nombre del proyecto es requerido.');
        if (!formData.fechaInicio) newErrors.push('La fecha de inicio es requerida.');

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        onSave({
            ...formData,
            departamento: selectedDept
        });

        // Reset form after successful save
        setFormData(INITIAL_PROJECT_STATE);
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel p-6 space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-200">
                    Nuevo Proyecto - {selectedDept}
                </h2>
                <button type="submit" className="glass-button flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/30">
                    <Save className="w-4 h-4" />
                    Actualizar Bosque
                </button>
            </div>

            {errors.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 text-red-400 font-medium mb-2">
                        <AlertCircle className="w-5 h-5" />
                        Por favor corrige los siguientes errores:
                    </div>
                    <ul className="list-disc list-inside text-sm text-red-300 space-y-1 ml-2">
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Datos de Proyecto */}
                <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">1. Datos de Proyecto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        <FormInput label="Fecha Ingreso" name="fechaIngreso" type="date" value={formData.fechaIngreso} onChange={handleChange} />
                        <FormInput label="Nombre del Proyecto" name="nombre" value={formData.nombre} onChange={handleChange} className="lg:col-span-2" />
                        <FormInput label="Clasificación" name="clasificacion" value={formData.clasificacion} onChange={handleChange} />
                        <FormInput label="Fase Actual" name="faseActual" value={formData.faseActual} onChange={handleChange} />
                        <FormSelect
                            label="Estatus"
                            name="estatus"
                            value={formData.estatus}
                            onChange={handleChange}
                            options={['Planificación', 'En Curso', 'Pausado', 'Finalizado', 'Cancelado']}
                        />
                    </div>
                </div>

                {/* 2. Estrategia */}
                <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">2. Estrategia</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        <FormTextarea label="Descripción" name="descripcion" value={formData.descripcion} onChange={handleChange} className="lg:col-span-2 xl:col-span-3" />
                        <div className="col-span-1 lg:col-span-1 xl:col-span-2 grid grid-cols-2 gap-4">
                            <FormInput label="Enfoque" name="enfoqueEstrategico" value={formData.enfoqueEstrategico} onChange={handleChange} className="col-span-2" />
                            <FormInput label="Cadena de Valor" name="cadenaValor" value={formData.cadenaValor} onChange={handleChange} className="col-span-2" />
                            <FormSelect label="Prioridad" name="prioridad" value={formData.prioridad} onChange={handleChange} options={['Alta', 'Media', 'Baja']} className="col-span-2 sm:col-span-1" />
                            <FormSelect label="Esfuerzo" name="esfuerzo" value={formData.esfuerzo} onChange={handleChange} options={['Alto', 'Medio', 'Bajo']} className="col-span-2 sm:col-span-1" />
                            <FormSelect label="Impacto" name="impacto" value={formData.impacto} onChange={handleChange} options={['Alto', 'Medio', 'Bajo']} className="col-span-2" />
                        </div>
                    </div>
                </div>

                {/* 3. Fechas y Seguimiento */}
                <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">3. Fechas y Seguimiento</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FormInput label="Fecha Inicio" name="fechaInicio" type="date" value={formData.fechaInicio} onChange={handleChange} />
                        <FormInput label="Fecha Fin" name="fechaFin" type="date" value={formData.fechaFin} onChange={handleChange} />
                        <FormTextarea label="Seguimiento de Planes" name="seguimiento" value={formData.seguimiento} onChange={handleChange} className="col-span-1 lg:col-span-2" />
                        <FormTextarea label="Logros Obtenidos" name="logros" value={formData.logros} onChange={handleChange} className="col-span-1 lg:col-span-2 sm:col-span-2 md:col-span-2 lg:col-start-3" />
                    </div>
                </div>

            </div>
        </form>
    );
}

// Sub-components for Form Elements to keep it DRY

function FormInput({ label, name, type = 'text', value, onChange, className = '' }: any) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label htmlFor={name} className="text-xs font-medium text-slate-300 ml-1">{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className="glass-input"
                placeholder={`Ej. ${label}`}
            />
        </div>
    );
}

function FormSelect({ label, name, value, onChange, options, className = '' }: any) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label htmlFor={name} className="text-xs font-medium text-slate-300 ml-1">{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="glass-input appearance-none bg-slate-800/50" // slight specific background for select readability
            >
                {options.map((opt: string) => (
                    <option key={opt} value={opt} className="bg-slate-800 text-white">{opt}</option>
                ))}
            </select>
        </div>
    );
}

function FormTextarea({ label, name, value, onChange, className = '' }: any) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label htmlFor={name} className="text-xs font-medium text-slate-300 ml-1">{label}</label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                rows={3}
                className="glass-input resize-none"
                placeholder={`Añadir ${label.toLowerCase()}...`}
            />
        </div>
    );
}
