import { Layers, Container, Workflow, Server } from "lucide-react";
import { Reveal, SectionHeading, SpotlightCard } from "@/components/kit";
import { profile } from "@/data/portfolio";

const focus = [
  { icon: Server, title: "Backend first", text: "NestJS services, clean APIs, sane data models." },
  { icon: Layers, title: "Monorepos", text: "Nx workspaces that keep teams moving fast." },
  { icon: Container, title: "Containers", text: "Dockerised everything, deployed to any VPS." },
  { icon: Workflow, title: "Automation", text: "CI/CD pipelines and n8n workflows." },
];

const About = () => (
  <section id="about" className="py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        index="02"
        label="About"
        title={
          <>
            Driven by modern web architecture,{" "}
            <span className="text-muted-foreground">end to end.</span>
          </>
        }
      />

      <div className="grid gap-3 md:grid-cols-12 md:gap-4">
        <Reveal className="md:col-span-7">
          <SpotlightCard className="h-full p-7 md:p-10">
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
              <p>
                Hi, I'm <span className="font-semibold text-foreground">{profile.name}</span>, a
                backend-leaning full-stack engineer who likes owning a product from the database
                schema all the way to the deploy.
              </p>
              <p>
                Day to day that means setting up efficient{" "}
                <span className="text-foreground">Nx monorepos</span>, orchestrating containers with{" "}
                <span className="text-foreground">Docker</span>, building robust services in{" "}
                <span className="text-foreground">NestJS</span> and fast frontends in{" "}
                <span className="text-foreground">Next.js</span>, and wiring the boring-but-critical
                bits: SMTP, DNS and CI/CD.
              </p>
            </div>
          </SpotlightCard>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:col-span-5 md:gap-4">
          {focus.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={0.08 * i}>
              <SpotlightCard className="group h-full p-5 md:p-6">
                <div className="mb-6 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon size={20} />
                </div>
                <p className="font-display text-lg font-semibold leading-tight">{title}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
