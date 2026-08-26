const LINKS = [
  { href: "#about", label: "About" },
  { href: "#spotlight", label: "Spotlight" },
  { href: "#work", label: "Work" },
  { href: "#journey", label: "Journey" },
  { href: "#life", label: "Outside Work" },
];

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <nav className="max-w-5xl mx-auto flex items-center gap-4 px-4 sm:px-6 py-4">
        <a
          href="#top"
          className="shrink-0 font-display font-semibold text-base sm:text-lg tracking-tight"
        >
          riabanerjee.dev
        </a>
        <ul className="flex min-w-0 gap-4 sm:gap-6 overflow-x-auto text-sm text-(--color-muted) [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LINKS.map((link) => (
            <li key={link.href} className="shrink-0">
              <a href={link.href} className="hover:text-(--color-accent-2) transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
