import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className="bg-gray-800 mt-20 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Social Links Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Follow Me</h2>
            <p className="text-gray-400">
              Stay connected through my social media channels for updates on
              projects and work.
            </p>
            <ul className="flex space-x-4 mt-4">
              <li>
                <a
                  href="https://www.linkedin.com/in/riabanerjee2406/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaLinkedin className="text-blue-200 hover:text-blue-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mt-4 mx-auto grayscale" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/RiaBanerjee24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaGithub className="text-gray-200 hover:text-gray-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mt-4 mx-auto grayscale" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
