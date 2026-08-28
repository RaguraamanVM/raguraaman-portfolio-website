import { useEffect, useState } from 'react';

// True if the user has asked the OS for reduced motion.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const listener = (e) => setReduced(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  return reduced;
}

// True on touch / coarse-pointer devices, where hover-driven effects
// don't make sense and should gracefully degrade.
export function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setCoarse(mq.matches);
    const listener = (e) => setCoarse(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  return coarse;
}

// Convenience: should spatial cursor / tilt effects be active at all?
export function useSpatialEffectsEnabled() {
  const reduced = usePrefersReducedMotion();
  const coarse = useIsCoarsePointer();
  return !reduced && !coarse;
}
