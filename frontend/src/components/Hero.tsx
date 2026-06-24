import { motion } from "framer-motion";
import { FaDownload, FaEnvelope, FaLinkedin } from "react-icons/fa";
import type { HomeInfo } from "../api";
import resume from "../assets/docs/Banerjee_Ria_SDE.pdf";
import profilePic from "../assets/images/Riaprofile.jpeg";

const Hero = ({ info }: { info: HomeInfo | null }) => {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, var(--color-accent-2), transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-5xl mx-auto px-6 text-center"
        id="about"
      >
        <img
          src={profilePic}
          alt={info?.name ?? "Ria Banerjee"}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover mx-auto mb-6 ring-2 ring-(--color-border) shadow-lg"
        />
        <p className="text-(--color-accent-2) font-mono text-sm mb-4">Hi, I'm</p>
        <h1 className="font-display font-bold text-5xl sm:text-7xl tracking-tight">
          {info?.name ?? "Ria Banerjee"}
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-(--color-muted)">
          {info?.profession ?? "Software Engineer"}
        </p>

        <div className="mt-8 flex justify-center gap-4">
          {info?.email && (
            <a
              href={`mailto:${info.email}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:border-(--color-accent) transition-colors text-sm"
            >
              <FaEnvelope /> Email
            </a>
          )}
          {info?.linkedin && (
            <a
              href={info.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-(--color-accent) hover:opacity-90 transition-opacity text-sm font-medium"
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
    </section>
  );
};

export default Hero;
