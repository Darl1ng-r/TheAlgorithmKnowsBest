import React, { useEffect, useRef } from 'react';

export const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const glyphs = ['0', '1', '±', '≠', '≈', '√', 'Δ', '∇', '∑', 'λ', 'θ', 'μ', 'φ'];
    const particles: Array<{
      x: number;
      y: number;
      speed: number;
      glyph: string;
      size: number;
      opacity: number;
    }> = [];

    const numParticles = Math.min(45, Math.floor(width / 30));
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.3 + Math.random() * 0.7,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        size: 10 + Math.random() * 8,
        opacity: 0.08 + Math.random() * 0.22,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint geometric grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw floating math glyphs
      ctx.font = '12px "JetBrains Mono", monospace';
      particles.forEach(p => {
        ctx.fillStyle = `rgba(0, 255, 136, ${p.opacity})`;
        ctx.fillText(p.glyph, p.x, p.y);

        p.y += p.speed;
        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
          p.glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />;
};
