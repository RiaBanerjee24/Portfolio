const LINKS = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#work", label: "Work" },
  { href: "#life", label: "Outside Work" },
];

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="font-display font-semibold text-lg tracking-tight">
          riabanerjee<span className="text-gradient">.dev</span>
        </a>
        <ul className="flex gap-6 text-sm text-(--color-muted)">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-white transition-colors">
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
