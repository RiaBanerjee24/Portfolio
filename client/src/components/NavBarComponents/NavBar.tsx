import { useState, useEffect, useRef } from "react";
import './NavBar.css'

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const sections = useRef<NodeListOf<HTMLElement> | null>(null);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Track all sections
    // const sections = useRef<NodeListOf<HTMLElement> | null>(null);

    sections.current = document.querySelectorAll("section");

    // Intersection Observer to handle active link change on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id); // Update active link
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    // Observe all sections
    sections.current.forEach((section) => observer.observe(section));

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  const handleSetActive = (link:string) => {
    setActiveLink(link);
    const element = document.getElementById(link);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
    setMobileMenuOpen(false); // Close mobile menu on navigation
  };

  return (
    <nav className="custom-nav sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {["home", "work", "hustle", "life"].map((link) => (
                  <a
                    key={link}
                    href={`#${link}`}
                    onClick={() => handleSetActive(link)}
                    className={`px-3 py-2 rounded-md sm:text-base md:text-lg lg:text-xl ${
                      activeLink === link
                        ? "text-white font-bold"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {["home", "work", "hustle", "life"].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={() => handleSetActive(link)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeLink === link
                    ? "text-white font-bold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
