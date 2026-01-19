/**
 * WPMChart - Simple SVG line chart for WPM over time
 */

import React, { memo, useMemo } from 'react';
import './WPMChart.css';

const WPMChart = memo(({
  data = [],
  width = 400,
  height = 200,
  showGrid = true,
  showLabels = true,
  lineColor = '#667eea',
  gridColor = 'rgba(255, 255, 255, 0.1)',
  title = 'WPM Progress',
}) => {
  const chartData = useMemo(() => {
    if (data.length === 0) return null;

    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxWPM = Math.max(...data.map(d => d.wpm), 60);
    const minWPM = Math.min(...data.map(d => d.wpm), 0);
    const wpmRange = maxWPM - minWPM || 1;

    const points = data.map((d, i) => ({
      x: padding.left + (i / (data.length - 1 || 1)) * chartWidth,
      y: padding.top + chartHeight - ((d.wpm - minWPM) / wpmRange) * chartHeight,
      wpm: d.wpm,
      label: d.label || `Game ${i + 1}`,
    }));

    const pathD = points.length > 0
      ? `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`
      : '';

    // Area path for gradient fill
    const areaD = points.length > 0
      ? `M ${points[0].x},${padding.top + chartHeight} L ${points.map(p => `${p.x},${p.y}`).join(' L ')} L ${points[points.length - 1].x},${padding.top + chartHeight} Z`
      : '';

    return { points, pathD, areaD, padding, chartWidth, chartHeight, maxWPM, minWPM };
  }, [data, width, height]);

  if (!chartData || data.length === 0) {
    return (
      <div className="wpm-chart wpm-chart--empty">
        <p>No data yet. Play some games to see your progress!</p>
      </div>
    );
  }

  const { points, pathD, areaD, padding, chartHeight, maxWPM, minWPM } = chartData;

  return (
    <div className="wpm-chart">
      {title && <h4 className="wpm-chart__title">{title}</h4>}
      
      <svg width={width} height={height} className="wpm-chart__svg">
        <defs>
          <linearGradient id="wpm-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {showGrid && (
          <g className="wpm-chart__grid">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = padding.top + chartHeight * ratio;
              const wpmValue = Math.round(maxWPM - (maxWPM - minWPM) * ratio);
              return (
                <g key={i}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke={gridColor}
                    strokeDasharray="4,4"
                  />
                  {showLabels && (
                    <text x={padding.left - 5} y={y + 4} className="wpm-chart__label">
                      {wpmValue}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* Area fill */}
        <path d={areaD} fill="url(#wpm-gradient)" />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((point, i) => (
          <g key={i} className="wpm-chart__point-group">
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill={lineColor}
              className="wpm-chart__point"
            />
            <title>{`${point.label}: ${point.wpm} WPM`}</title>
          </g>
        ))}
      </svg>

      {showLabels && (
        <div className="wpm-chart__stats">
          <span>Best: {maxWPM} WPM</span>
          <span>Last: {data[data.length - 1]?.wpm} WPM</span>
        </div>
      )}
    </div>
  );
});

WPMChart.displayName = 'WPMChart';

export default WPMChart;

