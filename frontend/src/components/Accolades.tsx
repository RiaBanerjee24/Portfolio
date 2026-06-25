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

const FeaturedCard = ({ item, i }: { item: Accolade; i: number }) => (
  <motion.a
    href={item.Link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: i * 0.08 }}
    whileHover={{ y: -4 }}
    className="relative rounded-2xl p-[1px] overflow-hidden group"
    style={{
      background:
        "linear-gradient(135deg, var(--color-accent), var(--color-accent-2), transparent 70%)",
    }}
  >
    <div className="relative rounded-2xl bg-(--color-surface) p-6 h-full flex flex-col justify-between overflow-hidden">
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-xs uppercase tracking-wide text-(--color-accent-2) font-mono">
            <TypeIcon type={item.Type} className="text-sm" />
            {item.Type}
          </span>
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-1 rounded-full bg-(--color-accent)/20 text-(--color-accent)">
            Featured
          </span>
        </div>
        <h3 className="font-display font-semibold text-2xl mt-3">{item.Title}</h3>
        <p className="text-sm text-(--color-muted) mt-3 leading-relaxed">{item.Desc}</p>
      </div>
      <div className="relative flex items-center gap-2 mt-5 text-sm font-medium text-(--color-accent-2) group-hover:gap-3 transition-all">
        View project <FaArrowUpRightFromSquare size={12} />
      </div>
    </div>
  </motion.a>
);

const Accolades = ({ items }: { items: Accolade[] }) => {
  const featured = items.filter((i) => i.Featured);
  const rest = items.filter((i) => !i.Featured);

  return (
    <section id="work" className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="font-display font-semibold text-3xl mb-12 text-center">
        Things I've <span className="text-gradient">Built</span>
      </h2>

      {featured.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {featured.map((item, i) => (
            <FeaturedCard key={item.Title} item={item} i={i} />
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <>
          <p className="text-xs uppercase tracking-widest text-(--color-muted) font-mono mb-4">
            More Projects
          </p>
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
        </>
      )}
    </section>
  );
};

export default Accolades;
