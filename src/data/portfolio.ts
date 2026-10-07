export const profile = {
  name: "Mayank Rawat",
  role: "SDE 1 · Backend",
  location: "Hodal, Haryana, IN",
  timezone: "Asia/Kolkata",
  email: "mr.mayank2402@gmail.com",
  phone: "+91 9813420403",
  resume: "/resume.pdf",
};

export const socials = {
  github: "https://github.com/mayank-rawat98",
  linkedin: "https://www.linkedin.com/in/mayankrawat2402/",
  x: "https://x.com/home",
};

export type Project = {
  title: string;
  tagline: string;
  description: string;
  image: string;
  year: string;
  tags: string[];
  highlights: string[];
  links: { repo?: string; demo?: string };
};

export const projects: Project[] = [
  {
    title: "NovaGate",
    tagline: "Self-hosted API gateway",
    description:
      "API gateway platform deployable via Docker on any VPS. A WebSocket control plane hot-reloads config, provisions multi-tenant PostgreSQL, and ships with a Next.js admin dashboard.",
    image:
      "https://res.cloudinary.com/dic7czrqe/image/upload/v1778434501/Screenshot_2026-05-10_at_11.04.54_PM_xfkmv1.png",
    year: "2026",
    tags: ["Docker", "NestJS", "Next.js", "PostgreSQL", "WebSockets", "Prometheus"],
    highlights: ["Rate limiting & JWT auth", "Prometheus metrics", "Batched request logs"],
    links: {
      repo: "https://github.com/mayank-rawat98/NovaGate",
      demo: "https://novagate.dev",
    },
  },
  {
    title: "SquadUp",
    tagline: "Real-time rooms for students",
    description:
      "Collaboration platform with private coding rooms and shared whiteboards. Built on Nx with NestJS & React, featuring a multi-language compiler and Dockerized deployment.",
    image:
      "https://res.cloudinary.com/didovzx3t/image/upload/v1768926525/Screenshot_2026-01-20_at_21.58.35_grttfr.png",
    year: "2026",
    tags: ["Nx", "NestJS", "React", "Docker", "WebSockets"],
    highlights: ["Live coding rooms", "Multi-language compiler", "Collaborative whiteboard"],
    links: {
      repo: "https://github.com/mayank-rawat98/squadup.in",
      demo: "https://squadup.in",
    },
  },
  {
    title: "Mailtr",
    tagline: "Mailer SaaS for custom domains",
    description:
      "Create unlimited mailboxes on your own domain with a full inbox experience. An Nx monorepo with NestJS and React, shipped through automated CI/CD to a VPS.",
    image:
      "https://res.cloudinary.com/didovzx3t/image/upload/v1768926505/Screenshot_2026-01-20_at_21.52.08_mlged3.png",
    year: "2025",
    tags: ["Nx", "NestJS", "React", "TypeScript", "VPS"],
    highlights: ["Custom SMTP & DNS", "Unlimited inboxes", "Automated CI/CD"],
    links: {
      demo: "https://mailtr.co/about",
    },
  },
];

export const jobs = [
  {
    role: "SDE 1",
    company: "The Regiment",
    period: "May 2025 — Present",
    current: true,
    description:
      "Building full-stack applications on Docker and Nx. Robust NestJS backends with custom SMTP server configuration and DNS management, alongside dynamic Next.js frontends.",
    tags: ["NestJS", "Next.js", "Nx", "Docker", "SMTP"],
  },
  {
    role: "Frontend Developer",
    company: "Tems Tech Solutions",
    period: "Feb 2025 — May 2025",
    current: false,
    description:
      "Shipped modern frontends with React, Tailwind CSS and RTK Query, working closely with designers and backend engineers on responsive, high-performance UIs.",
    tags: ["React", "Tailwind CSS", "RTK Query", "TypeScript"],
  },
  {
    role: "B.Tech, Computer Engineering",
    company: "JC Bose University YMCA",
    period: "2021 — 2025",
    current: false,
    description:
      "Specialised in Data Science. Built projects around WebSockets, message queues and telemetry monitoring systems.",
    tags: ["Data Science", "WebSockets", "System Design", "Telemetry"],
  },
];

export const stack = [
  "NestJS",
  "Node.js",
  "Next.js",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Redis",
  "MongoDB",
  "Prisma",
  "Docker",
  "Nx Monorepo",
  "GitHub Actions",
  "WebSockets",
  "Prometheus",
  "n8n",
  "Tailwind CSS",
];

export const services = [
  {
    title: "Backend Architecture",
    description:
      "Scalable services, REST/GraphQL APIs and data models designed to stay fast as traffic grows.",
    skills: ["NestJS", "Node.js", "Microservices", "REST / GraphQL"],
  },
  {
    title: "DevOps & Infrastructure",
    description:
      "Containerised deploys, CI/CD pipelines, SMTP and DNS — the plumbing that keeps products shipping.",
    skills: ["Docker", "CI/CD", "SMTP & DNS", "VPS"],
  },
  {
    title: "Frontend Engineering",
    description:
      "Responsive, accessible interfaces in the modern React ecosystem, with state that stays sane.",
    skills: ["Next.js", "React", "Tailwind", "TypeScript"],
  },
  {
    title: "Data & Quality",
    description:
      "Efficient schemas, query tuning, auth and tests that make systems safe to change.",
    skills: ["PostgreSQL", "Redis", "JWT / OAuth", "Jest"],
  },
];

export const testimonials = [
  {
    name: "Bhanu Pratap",
    role: "Founder, The Regiment",
    content:
      "Mayank is one of those rare developers who understands the business impact of code. His architecture decisions saved us months of development time.",
  },
  {
    name: "Arun Rawat",
    role: "Owner, Blue River Hostel",
    content:
      "Incredible attention to detail. The user interface he built was not only pixel-perfect but also highly accessible and performant.",
  },
  {
    name: "Chetan Chauhan",
    role: "Software Developer, Spectacom Global",
    content:
      "A true full-stack expert. From database optimization to complex frontend state management, Mayank handles it all with ease.",
  },
];
