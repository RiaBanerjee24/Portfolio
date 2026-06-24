import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { Accolade } from "../api";

const Accolades = ({ items }: { items: Accolade[] }) => {
  return (
    <section id="work" className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="font-display font-semibold text-3xl mb-12 text-center">
        Things I've <span className="text-gradient">Built</span>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <motion.a
            key={`${item.Title}-${i}`}
            href={item.Link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="glass rounded-xl p-5 flex flex-col justify-between hover:border-(--color-accent) transition-colors group"
          >
            <div>
              <span className="text-xs uppercase tracking-wide text-(--color-accent-2) font-mono">
                {item.Type}
              </span>
              <h3 className="font-display font-medium text-lg mt-2">{item.Title}</h3>
              <p className="text-sm text-(--color-muted) mt-2">{item.Desc}</p>
            </div>
            <FaArrowUpRightFromSquare className="mt-4 text-(--color-muted) group-hover:text-(--color-accent) transition-colors" />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Accolades;
