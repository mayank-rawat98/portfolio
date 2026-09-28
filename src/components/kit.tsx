import { useCallback, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Pops its children into place (scale + lift) the first time they scroll into view.
 */
export const Reveal = ({
  children,
  delay = 0,
  className,
  ...rest
}: { children: ReactNode; delay?: number; className?: string } & Omit<
  HTMLMotionProps<"div">,
  "children"
>) => (
  <motion.div
    initial={{ opacity: 0, y: 48, scale: 0.92 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.8, delay }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

/**
 * Rounded surface with a glow that follows the cursor.
 */
export const SpotlightCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      onMouseMove={onMove}
      className={cn(
        "spotlight rounded-3xl border border-border bg-card text-card-foreground transition-colors duration-300 hover:border-foreground/20",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const SectionHeading = ({
  index,
  label,
  title,
  description,
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  className?: string;
}) => (
  <Reveal className={cn("mb-12 md:mb-16", className)}>
    <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="text-primary">{index}</span>
      <span className="h-px w-8 bg-border" />
      <span>{label}</span>
    </div>
    <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
      {title}
    </h2>
    {description && (
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
        {description}
      </p>
    )}
  </Reveal>
);

/**
 * A miniature browser window used to frame project screenshots.
 */
export const BrowserFrame = ({
  src,
  alt,
  url,
  compact = false,
  className,
  bodyClassName,
  imgClassName,
}: {
  src: string;
  alt: string;
  url?: string;
  compact?: boolean;
  className?: string;
  bodyClassName?: string;
  imgClassName?: string;
}) => (
  <div
    className={cn(
      "overflow-hidden border border-border bg-secondary shadow-sm",
      compact ? "rounded-lg" : "rounded-2xl",
      className,
    )}
  >
    <div
      className={cn(
        "flex items-center border-b border-border bg-card",
        compact ? "gap-1 px-2 py-1.5" : "gap-1.5 px-3 py-2.5",
      )}
    >
      {["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"].map((c) => (
        <span
          key={c}
          className={cn("rounded-full", c, compact ? "h-1.5 w-1.5" : "h-2.5 w-2.5")}
        />
      ))}
      {url && !compact && (
        <span className="ml-3 truncate rounded-md bg-secondary px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
          {url}
        </span>
      )}
    </div>
    <div className={cn("overflow-hidden", bodyClassName)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("block h-auto w-full", imgClassName)}
      />
    </div>
  </div>
);
