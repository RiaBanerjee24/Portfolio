import './AboutMe_css.css';
import Riaprofile from '../../assets/images/Riaprofile.jpeg';
import { FaLinkedin,FaRegEnvelope,FaGithub } from 'react-icons/fa';
import RIA_BANERJEE from '../../assets/docs/RIA_BANERJEE.pdf'
function AboutMe() {    
    return (        
        <div className="flex flex-col md:flex-row items-center justify-center p-6 gap-8 max-w-7xl mx-auto">
            {/* Profile Image */}
            <div className="flex justify-center md:justify-start w-full md:w-1/3">
                <img 
                    src={Riaprofile} 
                    className="w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-[#000000] transition-all duration-300" 
                    alt="Profile"                    
                />
            </div>
            
            {/* Text Section */}
            <div className="text-center md:text-left w-full md:w-2/3">
                <h1 className="name-box text-3xl sm:text-5xl font-bold">Ria Banerjee</h1>
                <h2 className="title-box text-xl sm:text-3xl text-gray-600 mt-4 font-semibold">Software Engineer</h2>
                <p className="description text-lg sm:text-2xl mt-5">
                Experienced Software Engineer with expertise in developing scalable solutions integrating backend, frontend, database, and cloud technologies.
                I specialize in creating microservices and applications using Python, Flask, Django, Nginx, Node, React, message queues using Kafka and MQTT, MySQL, PostgreSQL, SLQAlchemy, with containerizations tools like Docker and Kubernetes, 
                along with AWS and DigitalOcean, integrating 20+ third party APIs.
                </p>
                
    
                {/* Connect with me text */}
                <p className="mt-20 text-lg sm:text-3xl font-bold" style={{ color: '#C69749'}}>Connect with me</p>
                <div className="flex space-x-8 mt-4 justify-center md:justify-center">
                    <a href="https://www.linkedin.com/in/riabanerjee2406/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-blue-100 hover:text-blue-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mt-4 mx-auto grayscale" />
                    </a>
                    <a href="mailto:banerjee.ria24@gmail.com" target="_blank" rel="noopener noreferrer">
                        <FaRegEnvelope className="text-red-100 hover:text-red-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mt-4 mx-auto grayscale" />
                    </a>
                    <a href="https://github.com/RiaBanerjee24" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-gray-100 hover:text-gray-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mt-4 mx-auto grayscale" />
                    </a>                    
                </div>
    
                {/* Resume Button */}
                <div className="flex justify-center md:justify-center mt-6">
                    <a 
                        href={RIA_BANERJEE} 
                        download="Ria_Banerjee.pdf" 
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto md:w-auto py-3 px-6 bg-[#D3D3D3] hover:bg-[#A9A9A9] text-black rounded-full border border-black text-center font-semibold transition-all duration-300 focus:outline-none">
                        Get My Resume
                    </a>
                </div>
            </div>
        </div>
        
    );
}

export default AboutMe;
