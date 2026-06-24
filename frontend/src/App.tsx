import { useEffect, useState } from "react";
import { getAccolades, getHome, getWork } from "./api";
import type { Accolade, HomeInfo, TimelineEntry } from "./api";
import Accolades from "./components/Accolades";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Life from "./components/Life";
import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";

function App() {
  const [info, setInfo] = useState<HomeInfo | null>(null);
  const [work, setWork] = useState<TimelineEntry[]>([]);
  const [accolades, setAccolades] = useState<Accolade[]>([]);

  useEffect(() => {
    getHome().then(setInfo).catch(console.error);
    getWork().then(setWork).catch(console.error);
    getAccolades().then(setAccolades).catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <Hero info={info} />
      <Timeline entries={work} />
      <Accolades items={accolades} />
      <Life />
      <Footer info={info} />
      <Chatbot />
    </>
  );
}

export default App;
