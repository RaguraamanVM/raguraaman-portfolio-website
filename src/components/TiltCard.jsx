import { useRef } from 'react';
import { useSpatialEffectsEnabled } from '../lib/useEnvironment.js';

// Wraps any card in a subtle, eased 3D tilt that follows the pointer.
// Inert on touch devices and when the user prefers reduced motion.
export default function TiltCard({ children, className = '', maxTilt = 6, ...rest }) {
  const ref = useRef(null);
  const enabled = useSpatialEffectsEnabled();

  function handleMove(e) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateZ(0)`;
    ref.current.style.setProperty('--glare-x', `${(px + 0.5) * 100}%`);
    ref.current.style.setProperty('--glare-y', `${(py + 0.5) * 100}%`);
  }

  function handleLeave() {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
    </div>
  );
}
