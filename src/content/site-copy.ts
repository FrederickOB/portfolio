export const SITE_LINKS = {
  github: "https://github.com/FrederickOB",
  linkedin: "https://www.linkedin.com/in/frederick-ofori-boadu/",
  twitter: "https://twitter.com/FRED_THE_THIRD",
  email: "friedosei@gmail.com",
  phone: "024 678 9303",
  phoneTel: "+233246789303",
  resume:
    "https://drive.google.com/file/d/1wYa-ItRGthDkWAVMXS-GuY635lebQ4wK/view?usp=sharing",
  gseDailyScraper: "https://github.com/FrederickOB/gse_daily_scrapper",
  memoji:
    "https://firebasestorage.googleapis.com/v0/b/portoflio-79eeb.appspot.com/o/memoji.gif?alt=media&token=b6027028-1d21-4948-88ae-de0b5092c953",
} as const;

// Headline alternatives (swap HOME_COPY.headline to use):
// 2. "Frontend Engineer by craft. Data Analyst by curiosity."
// 3. "I ship interfaces. Then I make the numbers behind them make sense."

export const HOME_COPY = {
  seo: {
    title: "Frederick Ofori-Boadu | Frontend Engineer & Data Expert, Accra",
    description:
      "Frontend engineer with 6+ years building React, Next.js and React Native products, now combining that with data engineering, AI integration, and analytics. Based in Accra, Ghana.",
  },
  eyebrow: "Frontend Engineer × Data Expert",
  headline:
    "I build the screen people use, and the data that makes it worth using and drives decisions.",
  subhead:
    "React & React Native engineer with 6+ years shipping production apps, now building data pipelines, AI-powered tools, and analytics at Stanbic Bank.",
  heroHighlights: [
    "Stanbic Bank · Data Expert",
    "MSc Business Analytics",
    "Accra, Ghana",
  ],
  ctas: [
    { label: "Enter the Gallery", href: "/", internal: true },
    { label: "See Frontend Work", href: "/portfolio/frontend", internal: true },
    { label: "See Data Work", href: "/portfolio/data", internal: true },
    { label: "Get in Touch", href: "#contact", internal: false },
  ],
  proofPoints: [
    {
      stat: "6+ years",
      detail: "shipping production React, Next.js & React Native applications",
    },
    {
      stat: "40% increase",
      detail:
        "in credit eligibility for 100+ agro-dealers via a mobile app he built (AFAP)",
    },
    {
      stat: "7,000+ applications",
      detail:
        "processed through a continent-wide portal he developed (Agrominds 2020)",
    },
    {
      stat: "1 week → 2 days",
      detail:
        "licensing turnaround time cut for a Ghanaian government agency (AGRA/PPRSD)",
    },
    {
      stat: "Machine Learning",
      detail:
        "predictive modeling and forecasting applied to real-world problems, including grain price variability in Ghanaian markets, World cup winner predictive analytics",
    },
  ],
  about: [
    "Frederick is a software engineer based in Accra, Ghana, who spent the last six plus years building consumer and enterprise-facing products in React, Next.js, and React Native. That work spans agritech mobile apps used by hundreds of dealers across Ghana, a government licensing portal funded by AGRA, and a from-scratch rebuild of a U.S. digital greeting card platform with AI-generated content at its core.",
    "More recently, he's been pulling that same problem-solving instinct upstream into the data itself. As a Data Analyst at Stanbic Bank, he builds ETL pipelines, automates operational workflows, and engineers AI systems, including an agentic news aggregation engine that curates and summarizes insights for internal teams. His MSc thesis applies predictive analytics to grain price variability in Ghanaian markets.",
    "The common thread: he doesn't just make things look good. He makes sure they're built on something real underneath, and increasingly, something intelligent on top.",
  ],
  whatIDo: [
    {
      title: "Frontend Engineering",
      description:
        "React, Next.js, React Native, TypeScript, Figma-to-code, and AI integration. I design and ship interfaces that real users rely on, from mobile apps to admin dashboards, including products where AI generates content inside the experience.",
      link: { label: "Explore Frontend Work", href: "/portfolio/frontend" },
    },
    {
      title: "Data & Analytics",
      description:
        "Python, SQL, ETL pipelines, dashboards, predictive modeling, and AI engineering. I turn messy data into pipelines, reports, and intelligent tools that drive decisions.",
      link: { label: "Explore Data Work", href: "/portfolio/data" },
    },
  ],
  techSnapshot: {
    frontend: [
      "React.js, React Native, Next.js, Vite",
      "TypeScript, JavaScript (ES6+)",
      "Tailwind CSS, shadcn/ui, Responsive & Mobile-First UI",
      "HTML5, CSS3, Figma, Design Systems, UI/UX",
      "REST APIs, GraphQL, API Integration, Firebase",
      "Node.js, Express, MongoDB, PostgreSQL",
      "AWS Cloud Engineering, Docker, CI/CD",
      "AI Integration (LLMs, OpenAI APIs), Framer Motion",
      "Git, GitHub, Cross-browser Testing, Performance Optimization",
    ],
    data: [
      "Python, SQL, NoSQL, Pandas",
      "ETL Pipelines, Data Modeling, Web Scraping",
      "Machine Learning, Predictive Analytics, Statistical Modeling",
      "Power BI, Custom React Dashboards, Data Visualization",
      "AWS Cloud, Docker, API & REST Integrations",
      "Microsoft Power Automate, Workflow Automation",
      "LLM Engineering, Agentic AI, OpenAI APIs",
      "Google BigQuery, Segment, Segment-to-Warehouse Pipelines",
    ],
  },
  currently:
    "Currently a Data Analyst at Stanbic Bank, Ghana, building ETL pipelines, automating workflows with Power Automate, and engineering an AI-powered news aggregation engine that scrapes, curates, and generates newsletter-ready insights for internal business units. Still hands-on with frontend and AI-integrated product builds on the side.",
  footerCta: {
    headline: "Let's build something.",
    subtext:
      "Open to frontend, data, AI integration, or full-stack-of-insight roles and projects.",
  },
  sideProjectsIntro:
    "Freelance client websites, data consulting deliverables, and personal builds across frontend engineering and analytics.",
} as const;

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const FRONTEND_COPY = {
  seo: {
    title: "Frontend Engineering Portfolio | Frederick Ofori-Boadu",
    description:
      "6+ years building React, Next.js, and React Native products, including AI-integrated experiences. Agritech apps, government portals, and startup platforms shipped from design to production.",
  },
  hero: {
    title: "Frontend Engineer",
    subhead:
      "Six plus years turning complex, real-world problems in agriculture, government licensing, fintech, and social platforms into interfaces people actually use without thinking twice, including products where AI is part of the core user experience.",
  },
  skills: [
    {
      label: "Core",
      skills: [
        "React.js",
        "React Native",
        "Next.js",
        "TypeScript",
        "JavaScript (ES6+)",
      ],
    },
    {
      label: "Styling & Design",
      skills: ["CSS", "Figma (UI/UX)", "Styled Components / Emotion"],
    },
    {
      label: "AI & Integration",
      skills: [
        "LLM API Integration",
        "AI-Generated Content UX",
        "REST API Integration",
      ],
    },
    {
      label: "Backend-adjacent",
      skills: ["Node.js", "Express", "MongoDB", "GraphQL"],
    },
    {
      label: "Quality",
      skills: [
        "Functional Testing",
        "Integration Testing",
        "Cross-browser Compatibility",
      ],
    },
    {
      label: "Other",
      skills: ["Python", "SQL", "End-user Training & Onboarding"],
    },
  ] satisfies SkillGroup[],
  cta: {
    headline: "Have a product that needs to look as good as it works?",
    buttons: [
      { label: "Let's talk", href: "/catalogue#contact", internal: true },
      { label: "Download Resume", href: SITE_LINKS.resume, external: true },
      { label: "View GitHub", href: SITE_LINKS.github, external: true },
    ],
  },
} as const;

export const DATA_COPY = {
  seo: {
    title: "Data Analytics Portfolio | Frederick Ofori-Boadu",
    description:
      "Data analyst and engineer building ETL pipelines, automation, AI systems, and predictive models, from banking operations to agricultural market forecasting.",
  },
  hero: {
    title: "Data Analyst & Engineer",
    subhead:
      "I build the pipelines that turn raw, messy data into something a business can act on, and the dashboards and AI tools that make sure people actually use it.",
  },
  skills: [
    {
      label: "Languages & Querying",
      skills: ["Python", "SQL", "NoSQL"],
    },
    {
      label: "Engineering",
      skills: ["ETL Pipelines", "Web Scraping & API Integration", "Docker"],
    },
    {
      label: "AI & Automation",
      skills: [
        "LLM Engineering",
        "Agentic Workflows",
        "Microsoft Power Automate",
        "AWS Cloud",
      ],
    },
    {
      label: "Visualization & BI",
      skills: ["Power BI", "Custom React Dashboards"],
    },
    {
      label: "Applied",
      skills: [
        "Predictive Analytics",
        "Workflow Automation",
        "AI-Powered Internal Tools",
      ],
    },
  ] satisfies SkillGroup[],
  whyFrontend: {
    title: "Why a Frontend Engineer Doing Data Work?",
    body: "Because most data work dies in a spreadsheet nobody opens. Six plus years of building interfaces taught me that data is only as useful as the dashboard, report, or tool someone actually engages with. AI makes that even more true: the best pipeline in the world still needs a clear interface or automated delivery layer. So I build both halves: the pipeline that gets the data right, the AI layer that turns it into insight, and the interface that gets it in front of the right person.",
  },
  cta: {
    headline: "Got data that's not earning its keep yet?",
    buttons: [
      { label: "Let's talk", href: "/catalogue#contact", internal: true },
      { label: "Download Resume", href: SITE_LINKS.resume, external: true },
      { label: "View GitHub", href: SITE_LINKS.github, external: true },
    ],
  },
} as const;

/**
 * Wall text for the 3D gallery, in a curator's voice: third person, short,
 * one idea per panel. Every fact here also appears in the copy above.
 */
export const GALLERY_COPY = {
  exhibition: {
    artist: "Frederick Ofori-Boadu",
    title: "Interface & Signal",
    dates: "Frontend and data work, 2019 to now",
  },
  statement: {
    eyebrow: "Why both halves",
    title: "The teeth and the tongue",
    body: "Most data work dies in a spreadsheet nobody opens. So Frederick builds both halves: the pipeline that gets the data right, the AI layer that turns it into insight, and the interface that puts it in front of the right person.",
  },
  now: {
    eyebrow: "Now showing",
    title: "Data Analyst, Stanbic Bank",
    body: "Building ETL pipelines, Power Automate workflows, and an AI engine that scrapes, curates and writes newsletter-ready insights for internal teams. Still shipping frontend and AI products on the side.",
  },
  /** `work` is the id of the work a figure comes from, so its panel can link there. */
  figures: [
    { figure: "6+", caption: "years shipping production React, Next.js and React Native apps" },
    { figure: "40%", caption: "rise in credit eligibility for 100+ agro-dealers on the AFAP app", work: "afap" },
    { figure: "7,000+", caption: "applications through the Agrominds 2020 portal, from across Africa", work: "agrominds-2020" },
    { figure: "2 days", caption: "licensing turnaround at PPRSD, down from a week", work: "pprsd" },
  ],
  quote: HOME_COPY.headline,
  rooms: {
    interface:
      "Interfaces people use without thinking twice: agro-dealers trading paper ledgers for an app, a government licensing office, applicants from across Africa, and the businesses behind each client site.",
    signal:
      "Pipelines, models and AI tools that turn raw, messy data into something a business can act on: a bank’s operations, Ghana Stock Exchange prices, grain markets and exam results.",
    trophy: "Degrees, certifications and awards. Click any piece to see who issued it.",
  },
  symbols: {
    eyebrow: "Adinkra",
    title: "Symbols in this gallery",
    body: "Adinkra are Akan symbols from Ghana, each standing for a proverb or an idea. Every room is marked by one that suits its work.",
  },
} as const;
