import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WorkTimeline from "@/components/WorkTimeline";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  return (
    <MotionConfig reducedMotion="user">
      {/* overflow-x-clip (not hidden) so sticky project cards keep working */}
      <div className="min-h-screen overflow-x-clip bg-background text-foreground">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <About />
          <WorkTimeline />
          <Services />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default Index;
