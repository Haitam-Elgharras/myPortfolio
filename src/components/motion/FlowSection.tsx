import type { ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

interface Props {
  children: ReactNode;
  intensity?: number;
  dir?: 1 | -1;
}


const FlowSection = ({ children, intensity = 1, dir = 1 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
  });

  const rotateX = useTransform(p, [0, 0.5, 1], [14 * intensity, 0, -8 * intensity]);
  const rotateY = useTransform(
    p,
    [0, 0.5, 1],
    [18 * dir * intensity, 0, -10 * dir * intensity]
  );
  const z = useTransform(p, [0, 0.5, 1], [-220 * intensity, 0, -120 * intensity]);
  const y = useTransform(p, [0, 0.5, 1], [80 * intensity, 0, -48 * intensity]);
  const scale = useTransform(p, [0, 0.5, 1], [0.9, 1, 0.96]);
  const opacity = useTransform(p, [0, 0.22, 0.82, 1], [0, 1, 1, 0.5]);

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        z,
        y,
        scale,
        opacity,
        transformPerspective: 1300,
        transformOrigin: "center 45%",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
};

export default FlowSection;
