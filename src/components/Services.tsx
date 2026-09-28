import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading, SpotlightCard } from "@/components/kit";
import { services } from "@/data/portfolio";

const Services = () => (
  <section id="services" className="py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        index="04"
        label="Services"
        title={
          <>
            What I can take <span className="text-muted-foreground">off your plate.</span>
          </>
        }
      />

      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={0.08 * (i % 2)}>
            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group block h-full w-full text-left"
            >
              <SpotlightCard className="flex h-full flex-col p-7 transition-transform duration-300 group-hover:-translate-y-1 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {service.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
