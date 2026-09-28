import { useEffect, useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Twitter, MapPin } from "lucide-react";
import { profile, socials, projects, stack } from "@/data/portfolio";
import { BrowserFrame, SpotlightCard } from "@/components/kit";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const pop: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 18 },
  },
};

const Tile = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div variants={pop} className={className}>
    <SpotlightCard className="h-full p-6 md:p-7">{children}</SpotlightCard>
  </motion.div>
);

const useLocalTime = (timeZone: string) => {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
};

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Hero = () => {
  const time = useLocalTime(profile.timezone);
  const latest = projects[0];

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-4 md:grid-cols-6 md:gap-4 md:px-6 lg:grid-cols-12"
      >
        {/* Intro */}
        <Tile className="md:col-span-6 lg:col-span-8 lg:row-span-2">
          <div className="flex h-full flex-col justify-between gap-10">
            <div className="self-start rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium">
              Open to new opportunities
            </div>

            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {profile.name} — {profile.role}
              </p>
              <h1 className="font-display text-[2.6rem] font-semibold leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                I build backends that <span className="text-primary">scale</span>, and the
                products on top of them.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                API gateways, real-time platforms and mail infrastructure, shipped with NestJS,
                Next.js and Docker.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo("projects")}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                See my work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Get in touch
              </button>
              <div className="ml-auto flex items-center gap-1">
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
                    className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Tile>

        {/* Latest build — a miniature preview */}
        <motion.button
          variants={pop}
          onClick={() => scrollTo("projects")}
          className="group text-left md:col-span-3 lg:col-span-4"
        >
          <SpotlightCard className="flex h-full flex-col overflow-hidden p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Latest build
              </span>
              <ArrowUpRight
                size={18}
                className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </div>
            <div className="rotate-[-2deg] px-1 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-0">
              <BrowserFrame src={latest.image} alt={latest.title} compact />
            </div>
            <div className="mt-auto pt-5">
              <p className="font-display text-lg font-semibold">{latest.title}</p>
              <p className="text-sm text-muted-foreground">{latest.tagline}</p>
            </div>
          </SpotlightCard>
        </motion.button>

        {/* Local time */}
        <Tile className="md:col-span-3 lg:col-span-4">
          <div className="flex h-full flex-col justify-between gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Local time
            </span>
            <div>
              <p className="font-display text-5xl font-semibold tabular-nums tracking-tight">
                {time}
                <span className="ml-2 align-top font-mono text-xs font-normal text-muted-foreground">
                  IST
                </span>
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin size={14} /> {profile.location}
              </p>
            </div>
          </div>
        </Tile>

        {/* Stats */}
        {[
          { value: "1+", label: "Years shipping production code" },
          { value: `${projects.length}`, label: "Products live on the web" },
        ].map((stat) => (
          <Tile key={stat.label} className="md:col-span-3 lg:col-span-3">
            <p className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
              {stat.value}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
          </Tile>
        ))}

        {/* Stack marquee */}
        <motion.div variants={pop} className="md:col-span-6 lg:col-span-6">
          <SpotlightCard className="flex h-full flex-col justify-center gap-5 overflow-hidden py-6">
            <span className="px-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:px-7">
              Daily stack
            </span>
            <div className="mask-fade-x flex overflow-hidden">
              <div className="flex w-max animate-marquee gap-2 pr-2 motion-reduce:animate-none">
                {[...stack, ...stack].map((s, i) => (
                  <span
                    key={i}
                    className={cn(
                      "whitespace-nowrap rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-sm",
                      i % 5 === 0 && "border-primary/40 text-primary",
                    )}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
