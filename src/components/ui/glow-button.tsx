"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function GlowButton({ children, onClick, className = "", disabled = false }: GlowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const buttonTranslateX = useTransform(springX, [-150, 150], [-10, 10]);
  const buttonTranslateY = useTransform(springY, [-80, 80], [-8, 8]);
  const rotateX = useTransform(springY, [-100, 100], [8, -8]);
  const rotateY = useTransform(springX, [-100, 100], [-8, 8]);
  const auraScale = useTransform(
    [springX, springY],
    ([x, y]) => {
      const distance = Math.sqrt(Math.pow(Number(x), 2) + Math.pow(Number(y), 2));
      return Math.max(0.8, 1.4 - distance / 400);
    }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div className={`relative inline-block ${className}`} style={{ perspective: '1000px' }}>
      <style>{`
        .glow-glass-pill {
          position: relative;
          padding: 10px 24px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 47px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 
            0 4px 12px -4px rgba(0, 0, 0, 0.1),
            inset 0 1px 1px rgba(255, 255, 255, 0.8);
          color: #1a1a1a;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: -0.01em;
          width: 100%;
          height: 100%;
        }
        .glow-glass-pill:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .glow-glass-pill::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 100%);
          pointer-events: none;
          border-radius: inherit;
        }
        .glow-dynamic-edge {
          position: absolute;
          inset: 0;
          border-radius: 47px;
          padding: 1.5px;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%), 
            rgba(236, 72, 153, 0.8) 0%, 
            transparent 50%
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .glow-glass-pill:hover:not(:disabled) .glow-dynamic-edge {
          opacity: 1;
        }
        .glow-pink-aura {
          position: absolute;
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%);
          filter: blur(35px);
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: -1;
          will-change: transform;
        }
      `}</style>
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        disabled={disabled}
        className="glow-glass-pill"
        style={{ 
          x: buttonTranslateX, 
          y: buttonTranslateY,
          rotateX, 
          rotateY 
        }}
        onMouseMove={(e) => {
          handleMouseMove(e);
          setIsHovered(true);
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--x', `${x}px`);
          e.currentTarget.style.setProperty('--y', `${y}px`);
        }}
        onMouseLeave={handleMouseLeave}
        whileTap={disabled ? {} : { scale: 0.97 }}
      >
        <div className="glow-dynamic-edge" />
        <span style={{ position: 'relative', zIndex: 10, userSelect: 'none' }}>{children}</span>
      </motion.button>
      <motion.div 
        className="glow-pink-aura"
        style={{ 
          x: useTransform(springX, (v) => v - 120),
          y: useTransform(springY, (v) => v - 120),
          scale: auraScale,
          left: '50%',
          top: '50%',
        }}
        animate={{ 
          opacity: isHovered && !disabled ? 0.7 : 0.4,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

export default GlowButton;