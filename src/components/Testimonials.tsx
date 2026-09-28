import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/kit";
import { testimonials } from "@/data/portfolio";

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// Cards land slightly askew, like notes pinned to a board.
const tilts = [-1.5, 1, -0.75];

const Testimonials = () => (
  <section id="testimonials" className="py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        index="05"
        label="Kind words"
        title={
          <>
            What people <span className="text-muted-foreground">say.</span>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 70, scale: 0.85, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: tilts[i % tilts.length] }}
            whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 140, damping: 15, delay: 0.1 * i }}
            className="flex flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-lg shadow-black/[0.03]"
          >
            <div>
              <Quote size={28} className="mb-5 text-primary" />
              <blockquote className="text-[15px] leading-relaxed">{t.content}</blockquote>
            </div>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary font-display text-sm font-semibold">
                {initials(t.name)}
              </span>
              <span>
                <span className="block text-sm font-semibold">{t.name}</span>
                <span className="block text-xs text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
