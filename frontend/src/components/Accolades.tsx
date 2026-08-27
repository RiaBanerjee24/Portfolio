import { motion } from "framer-motion";
import {
  FaArrowUpRightFromSquare,
  FaBook,
  FaCode,
  FaFire,
  FaPen,
  FaScrewdriverWrench,
} from "react-icons/fa6";
import type { Accolade } from "../api";
import githubIcon from "../assets/images/github_icon.png";

const WRITING_TYPES = new Set(["Publication", "Writing"]);

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

const Card = ({
  item,
  index,
  linkIcon,
}: {
  item: Accolade;
  index: number;
  linkIcon: React.ReactNode;
}) => (
  <motion.a
    href={item.Link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.4, delay: index * 0.03 }}
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
    <div className="mt-4">{linkIcon}</div>
  </motion.a>
);

const Accolades = ({ items }: { items: Accolade[] }) => {
  const rest = items.filter((i) => !i.Featured);
  const writing = rest.filter((i) => WRITING_TYPES.has(i.Type));
  const projects = rest.filter((i) => !WRITING_TYPES.has(i.Type));

  return (
    <section id="work" className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="font-display font-semibold text-3xl mb-12 text-center">
        I've Worked On....
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {writing.length > 0 && (
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wide text-(--color-muted) mb-4">
              Writing
            </h3>
            <div className="space-y-4">
              {writing.map((item, i) => (
                <Card
                  key={item.Title}
                  item={item}
                  index={i}
                  linkIcon={
                    <FaArrowUpRightFromSquare className="text-(--color-muted) group-hover:text-(--color-accent) transition-colors" />
                  }
                />
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wide text-(--color-muted) mb-4">
              Projects
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {projects.map((item, i) => (
                <Card
                  key={item.Title}
                  item={item}
                  index={i}
                  linkIcon={
                    <img
                      src={githubIcon}
                      alt="GitHub"
                      className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Accolades;
