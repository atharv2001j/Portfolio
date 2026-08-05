import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("#hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-5 left-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-lg shadow-black/30 transition-colors hover:border-accent/50 hover:text-accent sm:bottom-6 sm:left-6"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
