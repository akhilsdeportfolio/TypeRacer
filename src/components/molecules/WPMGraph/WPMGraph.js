import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './WPMGraph.css';

/**
 * WPMGraph - Real-time WPM visualization component
 * Displays typing speed over time with smooth animations
 */
const WPMGraph = ({ wpmHistory, currentWPM, targetWPM = 60 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set styles
    const isDark = document.body.classList.contains('dark-mode');
    const bgColor = isDark ? '#1a1a2e' : '#ffffff';
    const gridColor = isDark ? '#2d3748' : '#e5e7eb';
    const textColor = isDark ? '#9ca3af' : '#6b7280';
    const lineColor = isDark ? '#818cf8' : '#667eea';
    const targetColor = isDark ? '#34d399' : '#10b981';

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Get max WPM for scaling
    const maxWPM = Math.max(...wpmHistory, targetWPM, 100);
    const scale = graphHeight / maxWPM;

    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i <= 5; i++) {
      const y = padding + (graphHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Y-axis labels
      const wpm = Math.round(maxWPM - (maxWPM / 5) * i);
      ctx.fillStyle = textColor;
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${wpm}`, padding - 10, y + 4);
    }

    ctx.setLineDash([]);

    // Draw target line
    if (targetWPM > 0) {
      const targetY = padding + graphHeight - (targetWPM * scale);
      ctx.strokeStyle = targetColor;
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(padding, targetY);
      ctx.lineTo(width - padding, targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Target label
      ctx.fillStyle = targetColor;
      ctx.font = 'bold 12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Target: ${targetWPM} WPM`, padding + 10, targetY - 5);
    }

    // Draw WPM line
    if (wpmHistory.length > 1) {
      const pointSpacing = graphWidth / Math.max(wpmHistory.length - 1, 1);

      // Draw gradient fill
      const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
      gradient.addColorStop(0, lineColor + '40');
      gradient.addColorStop(1, lineColor + '00');

      ctx.beginPath();
      ctx.moveTo(padding, height - padding);

      wpmHistory.forEach((wpm, index) => {
        const x = padding + index * pointSpacing;
        const y = padding + graphHeight - (wpm * scale);
        if (index === 0) {
          ctx.lineTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.lineTo(padding + (wpmHistory.length - 1) * pointSpacing, height - padding);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw line
      ctx.beginPath();
      wpmHistory.forEach((wpm, index) => {
        const x = padding + index * pointSpacing;
        const y = padding + graphHeight - (wpm * scale);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw points
      wpmHistory.forEach((wpm, index) => {
        const x = padding + index * pointSpacing;
        const y = padding + graphHeight - (wpm * scale);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = bgColor;
        ctx.fill();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    // Draw axes
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // X-axis label
    ctx.fillStyle = textColor;
    ctx.font = '14px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Time', width / 2, height - 10);

    // Y-axis label
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('WPM', 0, 0);
    ctx.restore();

  }, [wpmHistory, currentWPM, targetWPM]);

  return (
    <div className="wpm-graph">
      <div className="wpm-graph__header">
        <h3 className="wpm-graph__title">Typing Speed</h3>
        <div className="wpm-graph__current">
          <span className="wpm-graph__current-value">{currentWPM}</span>
          <span className="wpm-graph__current-label">WPM</span>
        </div>
      </div>
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={300}
        className="wpm-graph__canvas"
      />
    </div>
  );
};

WPMGraph.propTypes = {
  wpmHistory: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentWPM: PropTypes.number.isRequired,
  targetWPM: PropTypes.number
};

export default WPMGraph;

