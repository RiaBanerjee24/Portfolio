
import Rochelle from '../../assets/images/Rochelle.jpeg';
import iit from '../../assets/images/iit.jpeg'
import Google_crowdsource from '../../assets/images/Google_Crowdsource.jpg'
import RA from '../../assets/images/RA.jpeg'
import Visamo from '../../assets/images/Visamo.jpeg'
import Guitar from '../../assets/images/Guitar.jpeg'

const images = [
  { src: iit, alt: 'Riaprofile', tag:"IIT Gandhinagar and ACM-Women's Chapter, India",desc:"Stood 1st for Project Presentation"},
  { src: Google_crowdsource, alt: 'AU',tag:"Google Crowdsource", desc:"Volunteered for Speech Training" },
  { src: RA, alt: 'Rochelle',tag:"UNC Charlotte",desc:"Research participant for Anxiety Reduction via VR environments" },
  { src: Visamo, alt: 'Rochelle',tag:"Conducted Art class in local orphanage",desc:"" },
  { src: Rochelle, alt: 'Rochelle',tag:"Cat Mom",desc:"Adopt, don't shop!" },
  { src: Guitar, alt: 'Rochelle',tag:"Passtime Guitar Player",desc:"" },
  
  // Add more images as needed
];

function Life() {
  return (
    <>
    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-center" style={{color:'#BBBBBB'}}>Life Outside Of Work</div>
    <div className="flex min-h-screen w-full mt-20 justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-60 shadow-md rounded-md p-3 transition-transform hover:scale-105 overflow-hidden flex flex-col border-3 border-[#735F32]" 
              style={{color:'#000000'}} // Added flex flex-col
            >
              <div className="relative pb-50 flex-grow"> {/* This will make the image container more horizontally tall and allow input to stick to the bottom */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover mb-3 mx-auto"  // Ensure the image fills the container properly
                />
              </div>
              <div className="w-full p-2 rounded-md text-lg mt-auto" style={{color:'#BBBBBB'}}>
                <b>{image.tag} </b>{image.desc} 
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  }

export default Life;
