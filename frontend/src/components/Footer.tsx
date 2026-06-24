import type { HomeInfo } from "../api";

const Footer = ({ info }: { info: HomeInfo | null }) => {
  return (
    <footer className="border-t border-(--color-border) py-8 text-center text-sm text-(--color-muted)">
      <p>
        Built by {info?.name ?? "Ria Banerjee"} · {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
