import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface Props {
  children: ReactNode;
  /** Fraction of the cursor offset the element follows (0-1). */
  strength?: number;
  className?: string;
}

/**
 * Magnetic wrapper: the element is gently pulled toward the cursor while it
 * hovers, then springs back on leave. Pointer offset is written to motion
 * values (no React re-renders) and smoothed with a spring. Disabled under
 * reduced-motion and on touch (pointermove without hover never fires the pull).
 */
const Magnetic = ({ children, strength = 0.35, className }: Props) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 14, mass: 0.4 });

  const handleMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        display: "inline-flex",
        x: reduce ? 0 : springX,
        y: reduce ? 0 : springY,
      }}
    >
      {children}
    </motion.span>
  );
};

export default Magnetic;
