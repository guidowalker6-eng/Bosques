import { useMemo } from 'react';
import type { Project, KpiSummary } from '../types';
import { TrendingUp, CheckCircle, Clock, XCircle, Zap, Target, ArrowRight } from 'lucide-react';

interface KpiDashboardProps {
    projects: Project[];
}

export function KpiDashboard({ projects }: KpiDashboardProps) {
    const summary = useMemo<KpiSummary>(() => {
        return projects.reduce((acc, p) => {
            // General Status
            if (p.estatus === 'Finalizado') acc.finalizados++;
            else if (p.estatus === 'Cancelado') acc.cancelados++;
            else if (p.estatus === 'En Curso') acc.enCurso++;
            else if (p.estatus === 'Planificación') acc.planificacion++;

            // Impact Matrix (Example logic)
            if (p.impacto === 'Alto' && p.esfuerzo === 'Bajo') acc.quickWins++;
            else if (p.impacto === 'Alto' && p.esfuerzo === 'Alto') acc.proyectosPrincipales++;
            else if (p.impacto === 'Bajo' && p.esfuerzo === 'Bajo') acc.tareasMenores++;

            // Nuevos (ingresados este mes, lógica simplificada para el ejemplo)
            const isThisMonth = new Date(p.fechaIngreso).getMonth() === new Date().getMonth();
            if (isThisMonth) acc.nuevos++;

            return acc;
        }, {
            pendientesAnterior: 0, // Placeholder
            nuevos: 0,
            finalizados: 0,
            cancelados: 0,
            enCurso: 0,
            planificacion: 0,
            quickWins: 0,
            proyectosPrincipales: 0,
            tareasMenores: 0
        });
    }, [projects]);

    const totalActivos = summary.enCurso + summary.planificacion;
    const cursoPercent = totalActivos > 0 ? Math.round((summary.enCurso / totalActivos) * 100) : 0;
    const planPercent = totalActivos > 0 ? Math.round((summary.planificacion / totalActivos) * 100) : 0;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-white" />
                Módulo de Mejora KPI
            </h2>

            {/* Resumen del Mes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KpiCard title="Nuevos" value={summary.nuevos} icon={<ArrowRight className="w-5 h-5 text-blue-400" />} />
                <KpiCard title="Finalizados" value={summary.finalizados} icon={<CheckCircle className="w-5 h-5 text-emerald-400" />} />
                <KpiCard title="Cancelados" value={summary.cancelados} icon={<XCircle className="w-5 h-5 text-red-400" />} />
                <KpiCard title="Anteriores" value={summary.pendientesAnterior} icon={<Clock className="w-5 h-5 text-amber-400" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de Estatus (Proporción) */}
                <div className="glass-panel p-5">
                    <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                        <Target className="w-4 h-4" /> Proporción de Proyectos Activos
                    </h3>
                    <div className="flex items-center gap-6">
                        <div className="relative w-32 h-32 flex-shrink-0">
                            {/* Simplified Donut Chart using CSS */}
                            <div className="absolute inset-0 rounded-full border-8 border-white/10" />
                            <div
                                className="absolute inset-0 rounded-full border-8 border-emerald-400"
                                style={{ clipPath: `polygon(0 0, 100% 0, 100% ${cursoPercent}%, 0 ${cursoPercent}%)`, transform: 'rotate(-90deg)' }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-2xl font-bold">{totalActivos}</span>
                                <span className="text-xs text-slate-400">Total</span>
                            </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-400" />En Curso</span>
                                    <span className="font-bold">{cursoPercent}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-400" style={{ width: `${cursoPercent}%` }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-white/20" />Planificación</span>
                                    <span className="font-bold">{planPercent}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-white/40" style={{ width: `${planPercent}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Matriz de Impacto */}
                <div className="glass-panel p-5">
                    <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-300" /> Matriz de Impacto vs Esfuerzo
                    </h3>
                    <div className="space-y-4">
                        <MatrixRow
                            title="Quick Wins (Alto Impacto / Bajo Esfuerzo)"
                            count={summary.quickWins}
                            color="bg-emerald-400"
                        />
                        <MatrixRow
                            title="Proyectos Principales (Alto/Alto)"
                            count={summary.proyectosPrincipales}
                            color="bg-amber-400"
                        />
                        <MatrixRow
                            title="Tareas Menores (Bajo/Bajo)"
                            count={summary.tareasMenores}
                            color="bg-slate-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function KpiCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
    return (
        <div className="glass-panel p-4 flex flex-col justify-between hover:bg-white/20 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm text-slate-400 font-medium">{title}</h3>
                {icon}
            </div>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );
}

function MatrixRow({ title, count, color }: { title: string; count: number; color: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
            <span className="text-sm font-medium text-slate-200">{title}</span>
            <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{count}</span>
                <div className={`w-2 h-2 rounded-full ${color}`} />
            </div>
        </div>
    );
}
