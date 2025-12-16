import React from 'react';
import { View } from 'react-native';
import { Circle, Line, Polygon, Polyline, Svg } from 'react-native-svg';
import { Text } from './ui/text';

// --- Line Chart Component ---
interface LineChartProps {
  data: number[];
  color?: string;
  height?: number;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  color = '#4f46e5', // indigo-600
  height = 100,
  className = ''
}) => {
  if (!data || data.length < 2) {
    return (
      <View className={`flex items-center justify-center bg-slate-50 rounded-lg ${className}`} style={{ height: '100%' }}>
        <Text className="text-slate-400 text-sm">Not enough data to display trend</Text>
      </View>
    );
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const viewWidth = 100;
  const viewHeight = 50; 
  
  const paddingY = viewHeight * 0.2;
  const availableHeight = viewHeight - (paddingY * 2);

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * viewWidth;
    const normalizedVal = (val - min) / range;
    const y = (viewHeight - paddingY) - (normalizedVal * availableHeight);
    return `${x},${y}`;
  }).join(' ');

  const areaPath = `
    0,${viewHeight} 
    ${points} 
    ${viewWidth},${viewHeight}
  `;

  return (
    <Svg 
      viewBox={`0 0 ${viewWidth} ${viewHeight}`} 
      className={`w-full h-full overflow-visible ${className}`} 
      preserveAspectRatio="none"
    >
      {/* Grid Lines */}
      <Line x1="0" y1={viewHeight * 0.25} x2={viewWidth} y2={viewHeight * 0.25} stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      <Line x1="0" y1={viewHeight * 0.50} x2={viewWidth} y2={viewHeight * 0.50} stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      <Line x1="0" y1={viewHeight * 0.75} x2={viewWidth} y2={viewHeight * 0.75} stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      
      {/* Area Fill - Solid with Opacity */}
      <Polygon 
        points={areaPath} 
        fill={color}
        fillOpacity="0.1"
      />
      
      {/* The Line */}
      <Polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

// --- Bar Chart Component ---
interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 150,
  className = ''
}) => {
  const max = Math.max(...data.map(d => d.value)) || 1;

  return (
    <View className={`flex-row items-end justify-between gap-4 ${className}`} style={{ height }}>
      {data.map((item, idx) => (
        <View key={idx} className="flex-1 flex flex-col items-center group h-full justify-end">
          <View 
            className={`w-full rounded-t-lg transition-all duration-500 relative max-h-[${height-100}px] ${item.color?.replace('bg-', 'bg-') || 'bg-slate-300'}`}
            style={{ height: `${(item.value / max) * 85}%` }}
          >
            {/* Tooltip on Hover */}
            <View className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground  py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-lg">
              <Text className='text-xs font-semibold whitespace-nowrap text-background'>{item.value} hrs</Text>
            </View>
          </View>
          <Text className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-3 truncate w-full text-center">{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

// --- Donut Chart Component ---
interface DonutChartProps {
  data: { value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  subLabel?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 180,
  strokeWidth = 20,
  centerLabel,
  subLabel
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const total = data.reduce((acc, cur) => acc + cur.value, 0) || 100;
  
  let cumulativePercent = 0;

  return (
    <View className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {data.map((item, index) => {
           const percent = item.value / total;
           const strokeDasharray = `${circumference * percent} ${circumference}`;
           const strokeDashoffset = -circumference * cumulativePercent;
           cumulativePercent += percent;

           return (
             <Circle
               key={index}
               cx={size / 2}
               cy={size / 2}
               r={radius}
               stroke={item.color}
               strokeWidth={strokeWidth}
               fill="transparent"
               strokeDasharray={strokeDasharray}
               strokeDashoffset={strokeDashoffset}
               strokeLinecap="butt" 
             />
           );
        })}
      </Svg>
      {/* Center Text */}
       <View className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {centerLabel && <Text className="text-4xl font-bold ">{centerLabel}</Text>}
        {subLabel && <Text className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">{subLabel}</Text>}
      </View>
    </View>
  );
}