import { motion } from "framer-motion";
import { Reveal, SectionHeading, SpotlightCard } from "@/components/kit";
import { jobs } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const WorkTimeline = () => (
  <section id="experience" className="py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        index="03"
        label="Experience"
        title={
          <>
            Where I've been <span className="text-muted-foreground">building.</span>
          </>
        }
      />

      <div className="relative">
        {/* Rail */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-gradient-to-b from-primary via-border to-transparent md:left-[calc(25%-0.5px)]"
        />

        <div className="space-y-6 md:space-y-8">
          {jobs.map((job, i) => (
            <Reveal key={job.company} delay={0.05 * i} className="relative grid gap-3 md:grid-cols-4 md:gap-10">
              {/* Dot */}
              <span
                className={cn(
                  "absolute left-[5px] top-7 h-[13px] w-[13px] rounded-full border-2 bg-background md:left-[calc(25%-6.5px)]",
                  job.current ? "border-primary" : "border-muted-foreground/50",
                )}
              />

              <div className="pl-10 md:pl-0 md:pr-10 md:pt-6 md:text-right">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {job.period}
                </p>
                {job.current && (
                  <span className="mt-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    Current
                  </span>
                )}
              </div>

              <SpotlightCard className="ml-10 p-6 md:col-span-3 md:ml-0 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{job.role}</h3>
                  <p className="text-sm font-medium text-primary">{job.company}</p>
                </div>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WorkTimeline;
