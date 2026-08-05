import { motion } from "framer-motion";

export default function GradientOrb({
  className = "",
  size = 360,
  duration = 24,
}: {
  className?: string;
  size?: number;
  duration?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full bg-accent blur-3xl ${className}`}
      style={{ width: size, height: size, opacity: 0.06 }}
      animate={{ x: [0, 36, -24, 0], y: [0, -28, 18, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
