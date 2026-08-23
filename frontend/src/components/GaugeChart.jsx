import React from 'react';

const GaugeChart = ({ percentage = 88, category = "High Chance", color = "#22C55E", size = 220 }) => {
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative my-2">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-slate-700 fill-none"
        />
        {/* Animated Progress Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="fill-none transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Inner text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {percentage}%
        </span>
        <span
          className="text-xs font-semibold px-2.5 py-0.5 mt-1 rounded-full text-white shadow-sm"
          style={{ backgroundColor: color }}
        >
          {category}
        </span>
      </div>
    </div>
  );
};

export default GaugeChart;
