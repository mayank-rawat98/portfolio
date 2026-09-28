import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, Github, Check } from "lucide-react";
import { projects, socials, type Project } from "@/data/portfolio";
import { BrowserFrame, Reveal, SectionHeading } from "@/components/kit";
import { cn, hostOf } from "@/lib/utils";

// Sticky offset of the first card and the extra step each following card peeks by.
const STICK_TOP = 96;
const STICK_STEP = 20;

// Tinted backdrop behind each project's miniature.
const tints = [
  "from-orange-500/25 via-rose-500/10",
  "from-sky-500/25 via-indigo-500/10",
  "from-violet-500/25 via-fuchsia-500/10",
  "from-emerald-500/25 via-teal-500/10",
];

const ProjectCard = ({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  // Earlier cards shrink slightly as later ones stack over them.
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <motion.div
      style={{ scale, top: STICK_TOP + index * STICK_STEP }}
      className="sticky origin-top"
    >
      <motion.article
        initial={{ opacity: 0, y: 90, scale: 0.88, rotate: index % 2 ? 2.5 : -2.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 110, damping: 16, mass: 0.9 }}
        className="group grid overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_-12px_40px_-20px_rgba(0,0,0,0.35)] md:grid-cols-[1fr_1.25fr]"
      >
        {/* Copy */}
        <div className="flex flex-col gap-4 p-6 md:gap-5 md:p-8">
          <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
            <span className="text-primary">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span>{project.year}</span>
          </div>

          <div>
            <h3 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight md:text-4xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{project.tagline}</p>
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground md:line-clamp-none md:text-[15px]">
            {project.description}
          </p>

          <ul className="hidden space-y-1.5 sm:block">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm">
                <Check size={14} className="shrink-0 text-primary" />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex gap-2 pt-2">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.04]"
              >
                Visit site <ArrowUpRight size={15} />
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
              >
                <Github size={15} /> Code
              </a>
            )}
          </div>
        </div>

        {/* Miniature */}
        <div
          className={cn(
            "relative order-first flex items-center justify-center overflow-hidden bg-gradient-to-br to-transparent p-5 md:order-none md:p-8",
            tints[index % tints.length],
          )}
        >
          <motion.div
            initial={{ y: 60, rotate: -4 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.15 }}
            className="w-full"
          >
            <BrowserFrame
              src={project.image}
              alt={`${project.title} screenshot`}
              url={hostOf(project.links.demo)}
              className="shadow-2xl transition-transform duration-500 group-hover:-translate-y-1"
            />
          </motion.div>
        </div>
      </motion.article>
    </motion.div>
  );
};

const Projects = () => {
  const stackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  // Active card = the last one that has slid up into the top half of the viewport.
  useMotionValueEvent(scrollYProgress, "change", () => {
    const cards = Array.from(stackRef.current?.children ?? []);
    let next = 0;
    cards.forEach((card, i) => {
      if (card.getBoundingClientRect().top < window.innerHeight * 0.5) next = i;
    });
    setActive(next);
  });

  // Sticky cards can't be targeted with scrollIntoView, so compute where card i locks in place.
  const goTo = (i: number) => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = Array.from(stack.children) as HTMLElement[];
    const gap = parseFloat(getComputedStyle(stack).rowGap) || 0;
    let y = stack.getBoundingClientRect().top + window.scrollY;
    for (let k = 0; k < i; k++) y += cards[k].offsetHeight + gap;
    window.scrollTo({ top: y - (STICK_TOP + i * STICK_STEP), behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          index="01"
          label="Selected work"
          title={
            <>
              Things I've built <span className="text-muted-foreground">& shipped.</span>
            </>
          }
          description="Production systems, from gateways to real-time collaboration. Keep scrolling: each project stacks onto the last."
        />

        {/* Miniature strip (mobile / tablet) */}
        <div className="no-scrollbar -mx-4 mb-8 flex gap-3 overflow-x-auto px-4 lg:hidden">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => goTo(i)}
              className={cn(
                "w-40 shrink-0 rounded-2xl border p-2 text-left transition-colors",
                active === i ? "border-primary/60 bg-card" : "border-border",
              )}
            >
              <BrowserFrame src={p.image} alt="" compact />
              <p className="mt-2 px-1 text-xs font-semibold">{p.title}</p>
            </button>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Miniature rail (desktop) */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky" style={{ top: STICK_TOP }}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Index
              </p>
              <div className="relative space-y-3 pl-4">
                <div className="absolute bottom-2 left-0 top-2 w-px bg-border" />
                <motion.div
                  className="absolute left-0 top-2 w-px origin-top bg-primary"
                  style={{ scaleY: scrollYProgress, bottom: 8 }}
                />
                {projects.map((p, i) => (
                  <motion.button
                    key={p.title}
                    onClick={() => goTo(i)}
                    animate={{ scale: active === i ? 1 : 0.94, opacity: active === i ? 1 : 0.55 }}
                    whileHover={{ opacity: 1, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className={cn(
                      "flex w-full origin-left items-center gap-3 rounded-2xl border p-2 text-left transition-colors",
                      active === i ? "border-border bg-card shadow-sm" : "border-transparent",
                    )}
                  >
                    <BrowserFrame src={p.image} alt="" compact className="w-24 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="truncate text-sm font-semibold">{p.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{p.tagline}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </aside>

          {/* Stacking cards */}
          <div ref={stackRef} className="flex flex-col gap-[14vh] lg:col-span-9">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                total={projects.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <Reveal className="mt-16 flex justify-center">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <Github size={16} /> More experiments on GitHub
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
