import { motion } from "framer-motion";
import { FaDownload, FaEnvelope, FaLinkedin } from "react-icons/fa";
import type { HomeInfo } from "../api";
import resume from "../assets/docs/Banerjee_Ria_SDE.pdf";
import profilePic from "../assets/images/Riaprofile.jpeg";

const ABOUT = `I'm a backend and infrastructure engineer who builds systems that hold up
under real load — real-time event pipelines moving millions of events an hour,
RAG agents over live operational data, and the cloud infrastructure underneath
all of it. Most days I'm somewhere in Python, Kafka, Kubernetes, or Terraform,
turning messy, high-throughput problems into something reliable people can
depend on.`;

const Hero = ({ info }: { info: HomeInfo | null }) => {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-16 overflow-hidden">
      <div
        className="relative max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center"
        id="about"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <img
            src={profilePic}
            alt={info?.name ?? "Ria Banerjee"}
            className="w-44 h-44 sm:w-56 sm:h-56 rounded-full object-cover mx-auto md:mx-0 mb-6 ring-2 ring-(--color-border) shadow-lg"
          />
          <p className="text-(--color-accent-2) font-mono text-sm mb-4">Hi, I'm</p>
          <h1 className="font-display font-bold text-5xl sm:text-7xl tracking-tight">
            {info?.name ?? "Ria Banerjee"}
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-(--color-muted)">
            {info?.profession ?? "Software Engineer"}
          </p>

          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
            {info?.email && (
              <a
                href={`mailto:${info.email}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:border-(--color-accent) transition-colors text-sm"
              >
                <FaEnvelope /> {info.email}
              </a>
            )}
            {info?.linkedin && (
              <a
                href={info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-(--color-accent-2) text-(--color-bg) hover:opacity-90 transition-opacity text-sm font-medium"
              >
                <FaLinkedin /> LinkedIn
              </a>
            )}
            <a
              href={resume}
              download="Ria_Banerjee_Resume.pdf"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:border-(--color-accent) transition-colors text-sm"
            >
              <FaDownload /> Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center md:text-left"
        >
          <p className="text-lg sm:text-xl leading-relaxed text-(--color-muted)">{ABOUT}</p>
          <p className="mt-5 text-lg sm:text-xl leading-relaxed text-(--color-muted)">
            These days I'm building{" "}
            <span className="font-semibold" style={{ color: "#2563EB" }}>
              Tooldex
            </span>
            {" "}— a unified place to visualize your MCP servers across your
            coding agents. Visit {" "} 
            <a
              href="https://tooldex.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--color-accent-2) font-medium underline decoration-(--color-accent) underline-offset-4 hover:decoration-2 transition-all"
            >
              tooldex.dev
            </a>
            {" "}to learn more!
            
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
