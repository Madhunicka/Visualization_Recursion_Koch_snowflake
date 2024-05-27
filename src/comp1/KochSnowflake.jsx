import React, { useEffect, useRef, useState } from 'react';
import './KochSnowflake.css'; // Import CSS file for styling

const KochSnowflake = () => {
  const canvasRef = useRef(null);
  const [depth, setDepth] = useState(3); // Initial depth value
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [flakeSize, setFlakeSize] = useState(400); // Initial flake size
  const [strokeColor, setStrokeColor] = useState('black'); // Initial stroke color

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawKochCurve = (x0, y0, x1, y1, depth) => {
      if (depth === 0) {
        ctx.lineTo(x1, y1);
        return;
      }

      const deltaX = x1 - x0;
      const deltaY = y1 - y0;
      const x2 = x0 + deltaX / 3;
      const y2 = y0 + deltaY / 3;
      const x3 = 0.5 * (x0 + x1) + Math.sqrt(3) / 6 * (y0 - y1);
      const y3 = 0.5 * (y0 + y1) + Math.sqrt(3) / 6 * (x1 - x0);
      const x4 = x0 + 2 * deltaX / 3;
      const y4 = y0 + 2 * deltaY / 3;

      drawKochCurve(x0, y0, x2, y2, depth - 1);
      drawKochCurve(x2, y2, x3, y3, depth - 1);
      drawKochCurve(x3, y3, x4, y4, depth - 1);
      drawKochCurve(x4, y4, x1, y1, depth - 1);
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    const height = (Math.sqrt(3) / 2) * flakeSize;
    const startX = (canvas.width - flakeSize) / 2;
    const startY = (canvas.height + height / 2 +80) / 2; // Center vertically
    ctx.strokeStyle = strokeColor; // Set stroke color
    ctx.moveTo(startX, startY);
    drawKochCurve(startX, startY, startX + flakeSize, startY, depth);
    drawKochCurve(startX + flakeSize, startY, startX + flakeSize / 2, startY - height, depth);
    drawKochCurve(startX + flakeSize / 2, startY - height, startX, startY, depth);
    ctx.closePath();
    ctx.stroke();
  }, [depth, canvasSize, flakeSize, strokeColor]);

  const handleResize = () => {
    const parent = canvasRef.current.parentNode;
    setCanvasSize({
      width: parent.offsetWidth,
      height: parent.offsetHeight,
    });
    setFlakeSize(Math.min(parent.offsetWidth, parent.offsetHeight) * 0.8); // Adjust the multiplier as needed
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleColorChange = (e) => {
    setStrokeColor(e.target.value);
  };

  return (
    <div className="snowflake-container">
      
      <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} className="snowflake-canvas" />
      <input
        type="range"
        min={1}
        max={10}
        value={depth}
        onChange={(e) => setDepth(parseInt(e.target.value))}
        className="depth-slider"
      />
      <span className="depth-label">{depth}</span>
      <input
        type="color"
        value={strokeColor}
        onChange={handleColorChange}
        className="color-picker"
      />
    </div>
  );
};

export default KochSnowflake;
