import type { ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMounted } from "../../hooks/useMounted";

interface Props {
  children: ReactNode;
  intensity?: number;
  dir?: 1 | -1;
}

const FlowSection = ({ children, intensity = 1, dir = 1 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mounted = useMounted();

  // Reduced motion flattens every transform to identity instead of dropping the
  // wrapper. Returning `children` bare would change the tree shape between the
  // server pass and the client, which hydration treats as a mismatch. Gating on
  // `mounted` keeps the first client render identical to the prerendered HTML.
  const still = mounted && reduce;
  const k = still ? 0 : intensity;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
  });

  const rotateX = useTransform(p, [0, 0.5, 1], [14 * k, 0, -8 * k]);
  const rotateY = useTransform(p, [0, 0.5, 1], [18 * dir * k, 0, -10 * dir * k]);
  const z = useTransform(p, [0, 0.5, 1], [-220 * k, 0, -120 * k]);
  const y = useTransform(p, [0, 0.5, 1], [80 * k, 0, -48 * k]);
  const scale = useTransform(
    p,
    [0, 0.5, 1],
    still ? [1, 1, 1] : [0.9, 1, 0.96]
  );
  const opacity = useTransform(
    p,
    [0, 0.22, 0.82, 1],
    still ? [1, 1, 1, 1] : [0, 1, 1, 0.5]
  );

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
        willChange: still ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
};

export default FlowSection;
