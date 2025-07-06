import React, { useState, useEffect } from 'react';
import Navbar from './components/NavBarComponents/NavBar';
import './index.css';
import AboutMe from './components/AboutMeComponents/AboutMe';
import Work from './components/WorkComponent/Work';
import Publication from './components/PublicationComponent/PublicationComponent';
import Footer from './components/FooterComponents/Footer';

import Life from './components/LifeComponents/Life';

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  useEffect(() => {
    console.log('Active Index:', activeIndex);
  }, [activeIndex]);
  // Set up IntersectionObserver to track the sections in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            switch (sectionId) {
              case 'home':
                setActiveIndex(0);
                break;
              case 'work':
                setActiveIndex(1);
                break;
              case 'hustle':
                setActiveIndex(2);
                break;
              case 'projects':
                setActiveIndex(3);
                break;
              case 'life':
                setActiveIndex(4);
                break;
              default:
                break;
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is in the viewport
      }
    );

    // Observe all sections with IDs
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    // Cleanup observer
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navbar/>
      <section id="home" className="section p-6 sm:p-0 md:p-16 lg:p-24">
        <AboutMe />
      </section>
      <section id="work" className="section">
        <Work />
      </section>
      <section id="hustle" className="section">
        <Publication />
      </section>      
      <section id="life" className="section">
        <Life />
      </section>
      <section><Footer /></section>
    </div>
  );
};

export default App;
