import { Github, Twitter, Linkedin, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { profile, socials } from "@/data/portfolio";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-6xl px-4 pb-6 md:px-6">
      <div className="overflow-hidden rounded-[32px] border border-border bg-card">
        <div className="grid gap-10 p-7 md:grid-cols-4 md:p-10">
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground font-display font-bold text-background">
                M
              </span>
              <span className="font-display text-lg font-semibold">{profile.name}</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Backend-leaning full-stack engineer. Performance, reliability and clean code.
            </p>
            <div className="flex gap-1">
              {[
                { href: socials.github, icon: Github, label: "GitHub" },
                { href: socials.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: socials.x, icon: Twitter, label: "X" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Navigate
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ["Work", "projects"],
                ["About", "about"],
                ["Experience", "experience"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <li key={id}>
                  <a href={`/#${id}`} className="transition-colors hover:text-primary">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="relative select-none overflow-hidden px-7 md:px-10">
          <p className="translate-y-[18%] whitespace-nowrap font-display text-[19vw] font-bold leading-none tracking-tighter text-foreground/[0.06] md:text-[11rem]">
            mayank rawat
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-border px-7 py-5 text-xs text-muted-foreground md:px-10">
          <p>© {currentYear} {profile.name}</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Back to top <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
