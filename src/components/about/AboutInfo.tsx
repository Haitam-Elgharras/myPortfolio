import { useEffect, useRef, type ReactNode } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Stat = { value: string; label: ReactNode };

const stats: Stat[] = [
  {
    value: "2+",
    label: (
      <>
        Years <br /> experience
      </>
    ),
  },
  {
    value: "12",
    label: (
      <>
        Projects <br /> shipped
      </>
    ),
  },
  {
    value: "3",
    label: (
      <>
        Companies <br /> worked
      </>
    ),
  },
];

// Counts up from 0 to the numeric part of `value` when scrolled into view.
// Writes to the DOM node directly (no per-frame React state).
const StatCounter = ({ value }: { value: string }) => {
  const match = value.match(/^(\d+)(.*)$/);
  const target = Number(match?.[1] ?? 0);
  const suffix = match?.[2] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduce) {
      node.textContent = `${target}${suffix}`;
      return;
    }
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, target, suffix, reduce]);

  return (
    <span ref={ref} className="about__info-title">
      {reduce ? `${target}${suffix}` : `0${suffix}`}
    </span>
  );
};

const AboutInfo = () => {
  return (
    <div className="about__info">
      {stats.map((stat) => (
        <div key={stat.value}>
          <StatCounter value={stat.value} />
          <span className="about__info-name">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default AboutInfo;
