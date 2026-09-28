import { useState } from "react";
import { ArrowUpRight, Copy, Check, Send, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SpotlightCard } from "@/components/kit";
import { profile } from "@/data/portfolio";

const fieldClass =
  "w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:bg-background";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    const formDataToSend = new FormData(form);
    formDataToSend.set("access_key", "e3be1817-5671-4ea3-878b-e35645f8b486");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        form.reset();
      } else {
        console.error("Error", data);
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error", error);
      toast.error("An error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-card">
            <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" />
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />

            <div className="relative grid gap-10 p-6 md:p-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col">
                <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span className="text-primary">06</span>
                  <span className="h-px w-8 bg-border" />
                  <span>Contact</span>
                </div>
                <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
                  Let's build <br />
                  <span className="text-primary">something.</span>
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                  Available for freelance work and open to full-time roles. Tell me what you're
                  building and I'll get back within a day.
                </p>

                <div className="mt-10 space-y-3 lg:mt-auto">
                  <button
                    onClick={copyEmail}
                    className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-background/60 px-5 py-4 text-left transition-colors hover:border-primary/50"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        Email
                      </span>
                      <span className="block truncate font-display text-lg font-semibold md:text-xl">
                        {profile.email}
                      </span>
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </span>
                  </button>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <a
                      href={`tel:${profile.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 px-5 py-4 text-sm transition-colors hover:border-primary/50"
                    >
                      <Phone size={16} className="text-primary" /> {profile.phone}
                    </a>
                    <a
                      href="https://maps.app.goo.gl/h1uba1MVV4qNLBnt6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 px-5 py-4 text-sm transition-colors hover:border-primary/50"
                    >
                      <MapPin size={16} className="text-primary" /> Hodal, Haryana
                      <ArrowUpRight size={14} className="ml-auto text-muted-foreground" />
                    </a>
                  </div>
                </div>
              </div>

              <SpotlightCard className="bg-background/40 p-5 backdrop-blur md:p-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-medium">Name</span>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        required
                        className={fieldClass}
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-medium">Email</span>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        required
                        className={fieldClass}
                      />
                    </label>
                  </div>
                  <label className="block space-y-2">
                    <span className="text-sm font-medium">Subject</span>
                    <input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry"
                      required
                      className={fieldClass}
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm font-medium">Message</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project…"
                      required
                      className={`${fieldClass} min-h-[160px] resize-none`}
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending…" : "Send message"}
                    {!isSubmitting && <Send size={15} />}
                  </button>
                </form>
              </SpotlightCard>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
