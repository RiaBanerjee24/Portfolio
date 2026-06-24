import { motion } from "framer-motion";
import AIDev from "../assets/images/AIDev.jpg";
import GoogleCrowdsource from "../assets/images/Google_Crowdsource.jpg";
import Guitar from "../assets/images/Guitar.jpeg";
import IIT from "../assets/images/iit.jpeg";
import RA from "../assets/images/RA.jpeg";
import Rochelle from "../assets/images/Rochelle.jpeg";

const MOMENTS = [
  { src: AIDev, tag: "AI Dev x SF by Deeplearning.ai 2026", desc: "Keepin' up with the community" },
  { src: IIT, tag: "IIT Gandhinagar & ACM-W India", desc: "1st place, project presentation" },
  { src: GoogleCrowdsource, tag: "Google Crowdsource", desc: "Volunteered for speech training" },
  { src: RA, tag: "UNC Charlotte", desc: "Research participant, anxiety reduction via VR" },
  { src: Rochelle, tag: "Cat Mom", desc: "Adopt, don't shop!" },
  { src: Guitar, tag: "Pastime Guitar Player", desc: "" },
];

const Life = () => {
  return (
    <section id="life" className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="font-display font-semibold text-3xl mb-12 text-center">
        Life Outside <span className="text-gradient">Work</span>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOMENTS.map((m, i) => (
          <motion.div
            key={m.tag}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="glass rounded-xl overflow-hidden hover:border-(--color-accent) transition-colors"
          >
            <img src={m.src} alt={m.tag} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="font-display font-medium text-sm">{m.tag}</p>
              {m.desc && <p className="text-(--color-muted) text-xs mt-1">{m.desc}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Life;
