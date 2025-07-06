
import Navbar from '../NavBarComponents/NavBar';
import AboutMe from '../AboutMeComponents/AboutMe';
import Work from '../WorkComponent/Work';
import Publication from '../PublicationComponent/PublicationComponent';
import Life from '../LifeComponents/Life';

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <div id="home" className="section"><AboutMe /></div>
      <div id="work" className="section"><Work /></div>
      <div id="hustle" className="section"><Publication /></div>      
      <div id="life" className="section"><Life /></div>
    </div>
  );
};

export default HomePage;
