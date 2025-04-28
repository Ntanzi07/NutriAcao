import { motion } from 'framer-motion';

const segments = [
  { label: 'Carbs', value: 20, color: '#3b82f6' },
  { label: 'Proteins', value: 20, color: '#10b981' },
  { label: 'Fats', value: 25, color: '#f59e0b' },
  { label: 'Fibers', value: 35, color: '#ef4444' },
];

const CircularDashboard = () => {
  const radius = 60;
  const stroke = 16;
  const center = 75;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className='flex px-3 py-2 rounded-2xl border-[2px] border-solid border-secondary-color'>
      <svg width="150" height="150" viewBox="0 0 150 150" className="">
        {/* Outer border */}
        <circle
          r={radius + stroke/2}
          cx={center}
          cy={center}
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth={5}
        />
        
        {segments.map((seg, i) => {
          const dashLength = (seg.value / 100) * circumference;
          const dashOffset = circumference - dashLength;
          const rotation = (accumulatedPercent / 100) * 360;
          const delay = i * 0.4;

          const circle = (
            <motion.circle
              key={i}
              r={radius}
              cx={center}
              cy={center}
              fill="transparent"
              stroke={seg.color}
              strokeWidth={8}
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="butt"
              transform={`rotate(${rotation} ${center} ${center})`}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1, delay }}
            />
          );

          accumulatedPercent += seg.value;
          return circle;
        })}

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#111"
        >
          TDEE %
        </text>
      </svg>
      <div>
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center mb-2">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-sm">
              {seg.label}: {seg.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularDashboard;