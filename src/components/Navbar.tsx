import { useState, useEffect } from "react";
import { Menu, X, ArrowDownToLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Work", id: "projects" },
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    // Unlisted sections are observed too, so the pill clears when you pass them.
    ["top", "services", "testimonials", ...navLinks.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsOpen(false);
    // On the home page, scroll smoothly; elsewhere let "/#id" navigate home.
    if (onHome) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);
    if (onHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
        className={cn(
          "w-full max-w-3xl border transition-all duration-300",
          isOpen ? "rounded-[28px]" : "rounded-full",
          scrolled || isOpen
            ? "border-border bg-background/75 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="flex items-center justify-between gap-2 py-1.5 pl-2 pr-1.5">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3"
            aria-label="Home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground font-display text-sm font-bold text-background">
              M
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:inline">
              {profile.name}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active === link.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <ModeToggle />
            <a
              href={profile.resume}
              download="Mayank_Rawat_Resume.pdf"
              className="hidden items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Resume <ArrowDownToLine size={14} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="grid h-9 w-9 place-items-center rounded-full text-foreground hover:bg-secondary md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 px-3 pb-4 pt-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={`/#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 font-display text-2xl font-semibold hover:bg-secondary"
                  >
                    {link.name}
                    <span className="font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </span>
                  </motion.a>
                ))}
                <a
                  href={profile.resume}
                  download="Mayank_Rawat_Resume.pdf"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background"
                >
                  Download resume <ArrowDownToLine size={14} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;
