import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Card = ({ title, children, className = "" }) => (
    <div className={`bg-white border border-[#1a1a1a]/10 rounded-xl p-8 shadow-sm ${className}`}>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1a]/40 mb-6">{title}</h3>
        {children}
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1a1a1a] text-[#Fdfbf7] p-3 rounded-lg shadow-xl text-xs">
                <p className="font-mono mb-1 text-white/60">{label}</p>
                <p className="font-bold">Output: {payload[0].value}%</p>
            </div>
        );
    }
    return null;
};

const EnergyChart = () => {
    const data = [
        { name: 'Mon', value: 65 },
        { name: 'Tue', value: 78 },
        { name: 'Wed', value: 72 },
        { name: 'Thu', value: 85 },
        { name: 'Fri', value: 92 },
        { name: 'Sat', value: 88 },
        { name: 'Sun', value: 95 },
    ];

    return (
        <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1a1a1a" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#1a1a1a" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#1a1a1a', opacity: 0.4 }}
                        dy={10}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1a1a1a', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.2 }} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#1a1a1a"
                        strokeWidth={1.5}
                        fill="url(#colorEnergy)"
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

const Analytics = () => {
    const { tasks, getMetrics } = useTasks();
    const metrics = getMetrics();

    // Derived Distribution
    const total = metrics.total || 1; // avoid divide by zero
    const critical = Math.round((tasks.filter(t => t.impact === 'Critical').length / total) * 100);
    const high = Math.round((tasks.filter(t => t.impact === 'High').length / total) * 100);
    const normal = Math.round((tasks.filter(t => ['Medium', 'Low'].includes(t.impact)).length / total) * 100);

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-light tracking-tight text-[#1a1a1a]">System Performance</h1>
                    <p className="text-sm text-[#1a1a1a]/40 font-mono mt-2">LAST 7 DAYS</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <div className="text-xs text-[#1a1a1a]/40 uppercase tracking-wide">Focus Score</div>
                        <div className="text-2xl font-bold flex items-center justify-end gap-1 text-[#1a1a1a]">
                            {metrics.score} <ArrowUpRight size={16} className="text-[#1a1a1a]/40" />
                        </div>
                    </div>
                    <div className="h-10 w-[1px] bg-[#1a1a1a]/10"></div>
                    <div className="text-right">
                        <div className="text-xs text-[#1a1a1a]/40 uppercase tracking-wide">Total Tasks</div>
                        <div className="text-2xl font-bold flex items-center justify-end gap-1 text-[#1a1a1a]">
                            {metrics.total}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chart */}
            <Card title="Output Velocity">
                <EnergyChart />
            </Card>

            {/* Grid Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Focus Distribution */}
                <Card title="Impact Distribution">
                    <div className="space-y-6">
                        {[
                            { label: 'Critical Impact', val: critical, color: 'bg-[#1a1a1a]' },
                            { label: 'High Priority', val: high, color: 'bg-[#1a1a1a]/40' },
                            { label: 'Standard', val: normal, color: 'bg-[#1a1a1a]/10' },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="font-medium text-[#1a1a1a]">{item.label}</span>
                                    <span className="font-mono text-[#1a1a1a]/60">{item.val}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#1a1a1a]/5 rounded-full overflow-hidden">
                                    <div style={{ width: `${item.val}%` }} className={`h-full ${item.color}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Activity Heatmap */}
                <Card title="Consistency Map">
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 49 }).map((_, i) => (
                            <div
                                key={i}
                                className={`aspect-square rounded-sm ${Math.random() > 0.5 ? 'bg-[#1a1a1a]' : 'bg-[#1a1a1a]/5'}`}
                                style={{ opacity: Math.random() * 0.8 + 0.2 }}
                            ></div>
                        ))}
                    </div>
                    <div className="mt-4 text-[10px] text-[#1a1a1a]/40 text-center font-mono">
                        ACTIVE SESSION
                    </div>
                </Card>

            </div>

        </div>
    );
};

export default Analytics;
