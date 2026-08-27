import { motion } from "framer-motion";
import {
  FaArrowUpRightFromSquare,
  FaHeart,
  FaNewspaper,
  FaScrewdriverWrench,
} from "react-icons/fa6";
import type { Accolade } from "../api";
import newstackImg from "../assets/images/newstack.png";

const tooldexLogo = new URL("../icons/tooldex.ico", import.meta.url).href;

const TOOLDEX_LINKS = {
  get: "https://pypi.org/project/tooldex/",
  website: "https://tooldex.dev/",
  contribute: "https://github.com/RiaBanerjee24/Tooldex",
};

const PRESS_FEATURE = {
  publication: "The New Stack",
  title: "Microsoft's Agent Lightning Harness",
  desc: "Cited for insight on where agent tooling and observability are headed in the AI dev ecosystem.",
  link: "https://thenewstack.io/microsoft-agent-lightning-harness/",
};

const MiniCard = ({
  item,
  logo,
  size = "default",
  children,
}: {
  item: Accolade;
  logo?: string;
  size?: "default" | "lg";
  children?: React.ReactNode;
}) => (
  <div
    className="relative rounded-2xl p-[1px] overflow-hidden flex-1"
    style={{
      background:
        "linear-gradient(135deg, var(--color-accent), var(--color-accent-2), transparent 70%)",
    }}
  >
    <div
      className={`relative rounded-2xl bg-(--color-surface) h-full flex flex-col justify-between overflow-hidden ${
        size === "lg" ? "p-7" : "p-5"
      }`}
    >
      <div
        className="pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-20"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
      />
      <div className="relative">
        <div className="flex items-center gap-3">
          {logo && (
            <img
              src={logo}
              alt={`${item.Title} logo`}
              className={`rounded-lg ring-1 ring-(--color-border) ${
                size === "lg" ? "w-11 h-11" : "w-8 h-8"
              }`}
            />
          )}
          <span className="flex items-center gap-2 text-xs uppercase tracking-wide text-(--color-accent-2) font-mono">
            <FaScrewdriverWrench className="text-sm" />
            {item.Type}
          </span>
        </div>
        <h3
          className={`font-display font-semibold mt-2 ${size === "lg" ? "text-2xl" : "text-lg"}`}
        >
          {item.Title}
        </h3>
        <p
          className={`text-(--color-muted) mt-2 leading-relaxed ${
            size === "lg" ? "text-base" : "text-sm"
          }`}
        >
          {item.Desc}
        </p>
      </div>
      <div className="relative mt-4">{children}</div>
    </div>
  </div>
);

const Spotlight = ({ items }: { items: Accolade[] }) => {
  const tooldex = items.find((i) => i.Title === "Tooldex");
  const smallstream = items.find((i) => i.Title.startsWith("SmallStream"));

  return (
    <section id="spotlight" className="relative max-w-5xl mx-auto px-6 py-24 overflow-hidden">
      <h2 className="relative font-display font-semibold text-3xl mb-12 text-center">
        In the Spotlight
      </h2>

      <div className="relative grid lg:grid-cols-5 gap-5 items-stretch">
        <motion.a
          href={PRESS_FEATURE.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -4 }}
          className="lg:col-span-3 group relative rounded-2xl overflow-hidden glass flex flex-col"
        >
          <div className="relative h-48 sm:h-56 overflow-hidden shrink-0">
            <img
              src={newstackImg}
              alt="The New Stack feature excerpt"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-(--color-surface) via-transparent to-black/20" />
            <span className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-(--color-bg)/80 backdrop-blur text-(--color-accent-2) ring-1 ring-(--color-accent-2)/40">
              <FaNewspaper /> As Featured In
            </span>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <p className="text-(--color-accent-2) text-xs font-mono uppercase tracking-wide">
              {PRESS_FEATURE.publication}
            </p>
            <h3 className="font-display font-semibold text-xl mt-2">{PRESS_FEATURE.title}</h3>
            <p className="text-sm text-(--color-muted) mt-2 leading-relaxed">
              {PRESS_FEATURE.desc}
            </p>
            <div className="flex items-center gap-2 mt-auto pt-4 text-sm font-medium text-(--color-accent-2) group-hover:gap-3 transition-all">
              Read the feature <FaArrowUpRightFromSquare size={12} />
            </div>
          </div>
        </motion.a>

        <div className="lg:col-span-2 flex flex-col gap-5">
          {tooldex && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <MiniCard item={tooldex} logo={tooldexLogo} size="lg">
                <div className="flex items-center flex-wrap gap-3">
                  <a
                    href={TOOLDEX_LINKS.get}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-(--color-accent-2) hover:text-(--color-accent) transition-colors"
                  >
                    Get the tool
                  </a>
                  <a
                    href={TOOLDEX_LINKS.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full bg-(--color-accent-2) text-(--color-bg) hover:opacity-90 transition-opacity"
                  >
                    Website <FaArrowUpRightFromSquare size={10} />
                  </a>
                  <a
                    href={TOOLDEX_LINKS.contribute}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-(--color-muted) hover:text-(--color-accent) transition-colors"
                  >
                    Contribute <FaHeart className="text-red-500" size={12} />
                  </a>
                </div>
              </MiniCard>
            </motion.div>
          )}

          {smallstream && (
            <motion.a
              href={smallstream.Link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="flex-1 flex"
            >
              <MiniCard item={smallstream}>
                <span className="flex items-center gap-2 text-sm font-medium text-(--color-accent-2) group-hover:gap-3 transition-all">
                  View project <FaArrowUpRightFromSquare size={12} />
                </span>
              </MiniCard>
            </motion.a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
