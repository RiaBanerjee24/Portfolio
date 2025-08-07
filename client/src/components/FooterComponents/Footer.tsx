import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
const recaptchaKey = import.meta.env.VITE_SITE_KEY
import { FaLinkedin,FaGithub } from 'react-icons/fa';
const Footer = () => {
  const recaptcha = useRef<ReCAPTCHA | null>(null);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!recaptcha.current) {
        console.error("ReCAPTCHA ref is null");
        setStatus("CAPTCHA reference is not initialized. Please refresh the page and try again.");
        return;
    }

    // Get CAPTCHA token
    const captchaToken = recaptcha.current.getValue();

    if (!captchaToken) {
        setStatus("Please complete the CAPTCHA verification.");
        return;
    }

    // Prepare the form data
    const formData = {
        message,
        contact,
        captchaToken,
    };

    try {
        // Make a POST request to the backend
        const response = await fetch("/api/send-email", {
        // const response = await fetch("http://localhost:5000/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // Reset form fields and CAPTCHA
            setStatus("Your message has been sent successfully!");
            setMessage("");
            setContact("");
            recaptcha.current.reset(); // Reset CAPTCHA
        } else {
            const errorData = await response.json(); // Parse response for more details
            setStatus(`Error: ${errorData.message || "Failed to send your message."}`);
        }
    } catch (error) {
        console.error("Error sending email:", error);
        setStatus("There was an error sending your message. Please try again later.");
    }
};

  return (
    <>
      <div className="bg-gray-800 mt-20 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Connect With Me Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Connect With Me</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="message"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-gray-500 focus:outline-none"
                    placeholder="Enter your message here..."
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="contact"
                  >
                    Phone/Email
                  </label>
                  <input
                    id="contact"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-gray-500 focus:outline-none"
                    placeholder="Enter your phone or email..."
                    required
                  />
                </div>
                <div>
                <ReCAPTCHA ref={recaptcha} sitekey={recaptchaKey} />
                </div>                
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                >
                  Send Message                                    
                </button>
                
              </form>
              {status && <p className="mt-4 text-center text-lg">{status}</p>}
            </div>

            {/* Additional Information or Social Links */}
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
      </div>
    </>
  );
};

export default Footer;
