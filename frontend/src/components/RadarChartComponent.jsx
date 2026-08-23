import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const RadarChartComponent = ({ data }) => {
  const chartData = data && data.length > 0 ? data : [
    { subject: 'Academics', score: 85 },
    { subject: 'Coding', score: 80 },
    { subject: 'Communication', score: 75 },
    { subject: 'Aptitude', score: 78 },
    { subject: 'Projects', score: 80 },
    { subject: 'Certifications', score: 60 }
  ];

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#64748b" strokeDasharray="3 3" opacity={0.4} />
          <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" opacity={0.3} />
          <Radar
            name="Skill Strength"
            dataKey="score"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.4}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;
