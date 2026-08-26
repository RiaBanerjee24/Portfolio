import { motion } from "framer-motion";
import {
  FaBook,
  FaCode,
  FaFire,
  FaPen,
  FaScrewdriverWrench,
} from "react-icons/fa6";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { Accolade } from "../api";

const TYPE_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  Tool: FaScrewdriverWrench,
  Project: FaCode,
  Publication: FaBook,
  Writing: FaPen,
  Hustle: FaFire,
};

const TypeIcon = ({ type, className }: { type: string; className?: string }) => {
  const Icon = TYPE_ICON[type] ?? FaCode;
  return <Icon className={className} />;
};

const Accolades = ({ items }: { items: Accolade[] }) => {
  const rest = items.filter((i) => !i.Featured);

  return (
    <section id="work" className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="font-display font-semibold text-3xl mb-12 text-center">
        Things I've Built
      </h2>

      {rest.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((item, i) => (
            <motion.a
              key={item.Title}
              href={item.Link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="glass rounded-xl p-5 flex flex-col justify-between hover:border-(--color-accent) transition-colors group"
            >
              <div>
                <span className="flex items-center gap-2 text-xs uppercase tracking-wide text-(--color-accent-2) font-mono">
                  <TypeIcon type={item.Type} />
                  {item.Type}
                </span>
                <h3 className="font-display font-medium text-lg mt-2">{item.Title}</h3>
                <p className="text-sm text-(--color-muted) mt-2">{item.Desc}</p>
              </div>
              <FaArrowUpRightFromSquare className="mt-4 text-(--color-muted) group-hover:text-(--color-accent) transition-colors" />
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Accolades;
