import { motion } from "framer-motion";
import type { TimelineEntry } from "../api";

const Timeline = ({ entries }: { entries: TimelineEntry[] }) => {
  return (
    <section id="journey" className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="font-display font-semibold text-3xl mb-12 text-center">
        My <span className="text-gradient">Journey</span>
      </h2>

      <div className="relative border-l border-(--color-border) pl-8 space-y-10">
        {entries.map((entry, i) => (
          <motion.div
            key={`${entry.Company}-${i}`}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.03 }}
            className="relative"
          >
            <span className="absolute -left-[2.45rem] top-1.5 w-3 h-3 rounded-full bg-(--color-accent) ring-4 ring-(--color-bg)" />
            <div className="glass rounded-xl p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display font-medium text-lg">{entry.Title}</h3>
                <span className="text-xs text-(--color-muted) font-mono">{entry.Duration}</span>
              </div>
              <p className="text-(--color-accent-2) text-sm mt-1">{entry.Company}</p>
              <p className="text-(--color-muted) text-xs mt-1">{entry.Location}</p>
              {entry.Desc && <p className="text-sm mt-3 text-gray-300">{entry.Desc}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
