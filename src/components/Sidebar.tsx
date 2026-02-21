import type { Department } from '../types';
import { LayoutDashboard, Server, Settings, FileText, Trees } from 'lucide-react';

interface SidebarProps {
    selectedDept: Department;
    onSelectDept: (dept: Department) => void;
}

const DEPARTMENTS: { id: Department; name: string; icon: React.ReactNode }[] = [
    { id: 'TRÁMITE', name: 'Trámite', icon: <FileText className="w-5 h-5" /> },
    { id: 'IT', name: 'IT', icon: <Server className="w-5 h-5" /> },
    { id: 'PROCESOS', name: 'Procesos', icon: <Settings className="w-5 h-5" /> },
    { id: 'COBROS', name: 'Cobros', icon: <LayoutDashboard className="w-5 h-5" /> },
];

export function Sidebar({ selectedDept, onSelectDept }: SidebarProps) {
    return (
        <div className="w-64 h-full bg-emerald-900/40 backdrop-blur-xl border-r border-white/20 shadow-[4px_0_24px_rgba(0,0,0,0.3)] flex flex-col pt-8 pb-4 px-4 z-20">
            <div className="flex items-center gap-3 px-2 mb-10">
                <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                    <Trees className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                        Bosque
                    </h1>
                    <p className="text-xs text-slate-400">Gestión de Proyectos</p>
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Departamentos
                </p>
                {DEPARTMENTS.map((dept) => {
                    const isSelected = selectedDept === dept.id;
                    return (
                        <button
                            key={dept.id}
                            onClick={() => onSelectDept(dept.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isSelected
                                    ? 'bg-white/20 border border-white/30 shadow-[0_4px_12px_rgba(255,255,255,0.1)]'
                                    : 'hover:bg-white/10 border border-transparent hover:border-white/10'}
              `}
                        >
                            <div className={`transition-transform duration-300 group-hover:scale-110 ${isSelected ? 'text-emerald-300' : 'text-slate-300'}`}>
                                {dept.icon}
                            </div>
                            <span className={`font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                {dept.name}
                            </span>

                            {isSelected && (
                                <div className="ml-auto w-1.5 h-6 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="mt-auto px-2">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm">
                    <p className="text-slate-300">Bienvenido al nuevo entorno dinámico.</p>
                </div>
            </div>
        </div>
    );
}
