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

/** Hero images for featured case studies (local assets + Firebase originals). */
export const CASE_STUDY_IMAGES = {
  afap: "/case-studies/afap.png",
  pprsd: "/case-studies/pprsd.png",
  agrominds: "/case-studies/agrominds.jpg",
  chaleCard: "/case-studies/chale-cards.png",
  agama:
    "https://firebasestorage.googleapis.com/v0/b/portoflio-79eeb.appspot.com/o/agama.png?alt=media&token=e043b89a-718a-4962-afbc-22bb4c19e012",
  grainThesis: "/case-studies/grain-thesis.jpg",
  creditGuarantee: "/case-studies/credit-guarantee.png",
  panache: "/case-studies/panache.png",
  sonlife: "/case-studies/sonlife.png",
  teenOne: "/case-studies/teen-one.png",
  tripath: "/case-studies/tripath.png",
  gse: "/case-studies/gse.png",
  prempeh: "/case-studies/prempeh.png",
  purpleOyster: "/case-studies/purple-oyster.png",
  worldcup: "/case-studies/worldcup.png",
  stanbic: "/case-studies/stanbic.jpg",
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
  featuredProjects: [
    {
      title: "AFAP Mobile App",
      description: "40% credit uplift for 100+ agro-dealers across Ghana",
      image: CASE_STUDY_IMAGES.afap,
      href: "/portfolio/frontend",
      category: "Frontend",
    },
    {
      title: "PPRSD Licensing Portal",
      description: "Government licensing cut from a week to two days",
      image: CASE_STUDY_IMAGES.pprsd,
      href: "/portfolio/frontend",
      category: "Frontend",
    },
    {
      title: "Stanbic Data & AI",
      description: "ETL pipelines, automation, and agentic news engine",
      href: "/portfolio/data",
      category: "Data",
    },
  ],
  ctas: [
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
  freelancePreview: [
    {
      title: "Panache Services",
      description:
        "Catering and events platform where clients order food, track deliveries, and rate service providers.",
      tags: ["Next.js", "React", "Redux"],
      kind: "freelance",
      period: "2023",
      liveUrl: "https://staging-app.panache.services",
    },
    {
      title: "Sonlife Printing Press",
      description:
        "Marketing site for a Ghanaian printing press with services, portfolio gallery, bookshop, and quote requests.",
      tags: ["React", "TypeScript", "Framer Motion"],
      kind: "freelance",
    },
    {
      title: "Teen One Movement",
      description:
        "NGO site for youth camp programs, skills development, and annual Christian youth conferences in Ghana.",
      tags: ["React", "Sanity CMS", "shadcn/ui"],
      kind: "freelance",
    },
    {
      title: "TriPath Advisory",
      description:
        "ESG and sustainability consulting site covering strategy, services, insights, and impact advisory.",
      tags: ["React", "Vite", "Sanity CMS"],
      kind: "freelance",
    },
    {
      title: "Purple Oyster Events",
      description:
        "Event planning and design studio site with packages, portfolio, and full-service celebration production.",
      tags: ["React", "TypeScript", "Sanity CMS"],
      kind: "freelance",
    },
  ],
  dataFreelancePreview: [
    {
      title: "Prempeh College · WASSCE Report",
      description:
        "Analytics report for the Academic Committee on historical WASSCE results, with trend analysis, SWOT insights, and strategic recommendations.",
      tags: ["Trend Analysis", "SWOT", "WASSCE", "Education"],
      kind: "freelance",
    },
  ],
  personalPreview: [
    {
      title: "IESO Bootcamp Portal",
      description:
        "Application portal for the 2021 IESO Bootcamp, handling 200+ applications and 20+ active cohort members.",
      tags: ["React", "Web App"],
      kind: "personal",
      period: "2021",
    },
    {
      title: "This Portfolio",
      description:
        "Personal site built with React, Vite, TypeScript, Tailwind, and Framer Motion, with accent themes and Adinkra background.",
      tags: ["React", "Vite", "Framer Motion"],
      kind: "personal",
      githubUrl: SITE_LINKS.github,
    },
  ],
  dataPersonalPreview: [
    {
      title: "World Cup Predictive Analytics",
      description:
        "Machine learning project applying predictive modeling to World Cup outcomes, with feature engineering and classification experiments.",
      tags: ["Python", "Machine Learning", "Sports Analytics"],
      kind: "personal",
      githubUrl: SITE_LINKS.github,
    },
    {
      title: "Grain Price Variability (MSc)",
      description:
        "MSc thesis modeling price swings in Ghanaian grain markets, with a Python analysis and forecasting pipeline.",
      tags: ["Python", "Predictive Analytics", "Research"],
      kind: "personal",
      image: CASE_STUDY_IMAGES.grainThesis,
    },
    {
      title: "GSE Daily Overview",
      description:
        "Automated pipeline that scrapes daily market data from the Ghana Stock Exchange with Python and Selenium, cleans and structures the output, and feeds a Power BI report for daily market tracking.",
      tags: ["Python", "Selenium", "Power BI", "Web Scraping"],
      kind: "personal",
      githubUrl: SITE_LINKS.gseDailyScraper,
    },
  ],
} as const;

export interface CaseStudy {
  title: string;
  tags: string;
  body: string;
  image?: string;
  metrics?: string[];
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
}

export interface EducationEntry {
  title: string;
  detail?: string;
}

export interface ProjectEntry {
  title: string;
  description: string;
  tags: readonly string[];
  kind: "freelance" | "personal";
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  period?: string;
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
  featuredWork: [
    {
      title: "AFAP Mobile App: Digitizing Agriculture, One Record at a Time",
      tags: "React Native, TypeScript · for African Fertilizer and Agribusiness Partnership (AFAP)",
      body: "Agro-dealers across Ghana were tracking inventory and sales on paper, which made it nearly impossible to prove creditworthiness to lenders. I built a React Native app, now live on the Google Play Store, that let dealers digitize inventory, sales records, and financial reports in the field. It created the first central database for Ghana's fertilizer and agro-input sector, and gave dealers a 40% boost in credit eligibility while cutting the time it took to retrieve sales records.",
      image: CASE_STUDY_IMAGES.afap,
      metrics: ["40% credit uplift", "100+ agro-dealers", "Google Play"],
    },
    {
      title: "PPRSD Licensing Portal: Cutting a Week Down to Two Days",
      tags: "React, data dashboards · funded by AGRA, for Ghana's Ministry of Food & Agriculture",
      body: "The Plant Protection and Regulatory Services Division was running stakeholder registration and licensing entirely on manual processes. I designed and built a registration and licensing portal with a dashboard for data visualization, fully digitizing the workflow. Application turnaround dropped from a week to at most two days, and staff could finally see and visualize stakeholder data instead of digging through paper files.",
      image: CASE_STUDY_IMAGES.pprsd,
      metrics: ["1 week → 2 days", "AGRA funded", "Gov licensing portal"],
    },
    {
      title: "Agrominds 2020: A Portal for a Continent",
      tags: "React",
      body: "Built the application portal for Agrominds 2020, an Africa-wide Youth in Agribusiness Challenge. The portal simplified the application flow enough to handle over 7,000 applications from across the continent without buckling.",
      image: CASE_STUDY_IMAGES.agrominds,
      metrics: ["7,000+ applications", "Africa-wide", "React portal"],
    },
    {
      title: "Chale Card: Rebuilding a Business With AI-Generated Greetings",
      tags: "React, TypeScript, AI integration · sole frontend developer, Chale Card LLC (Las Vegas, NV)",
      body: "Chale Card shipped physical greeting cards through a Wix storefront. As the sole frontend developer, I led the build of a new React and TypeScript web application that integrated AI generation into the product flow. Users could create instant, AI-generated digital cards through API-connected backends, replacing physical shipping with on-demand delivery anywhere with an internet connection. I owned the full frontend experience around that AI integration, including generation states, previews, and error handling, plus a saved-recipient feature that let users send cards in a couple of clicks instead of re-entering details every time.",
      image: CASE_STUDY_IMAGES.chaleCard,
      metrics: [
        "AI-generated cards",
        "Sole frontend dev",
        "React + TypeScript",
      ],
    },
    {
      title: "Agama Africana: A Social Platform From the Ground Up",
      tags: "React, TypeScript, Styled Components (Emotion), Firebase",
      body: "Built the frontend (and contributed on Firebase backend) for Agama Africana, a social media startup. Designed and shipped the login/sign-up flow with Firebase Authentication for a smooth onboarding experience, built a location- and trending-topic filter widget so users could explore what's happening nearby without digging through a map, and owned the like/dislike/comment system end-to-end, engineering it for responsive, low-friction interaction at social-media scale.",
      image: CASE_STUDY_IMAGES.agama,
      metrics: ["Social platform", "Firebase auth", "End-to-end UX"],
    },
  ] satisfies CaseStudy[],
  freelanceWork: [
    {
      title: "Panache Services",
      description:
        "Frontend development for Panache Catering and Events across the client portal, admin dashboard, and service provider portal. The client app lets users order catering and event services, track orders, and review providers. Built with Next.js, React, Redux Toolkit, React Query, Tailwind CSS, and Framer Motion, deployed on AWS Amplify.",
      tags: ["Next.js", "React", "Redux", "React Query", "Tailwind CSS"],
      kind: "freelance",
      period: "2023",
      liveUrl: "https://staging-app.panache.services",
      image: CASE_STUDY_IMAGES.panache,
    },
    {
      title: "Sonlife Printing Press",
      description:
        "Designed and built a modern, mobile-first marketing website for Sonlife Printing Press, one of Ghana's printing businesses. The site covers services, a portfolio gallery, promotions, an online bookshop, about content, and a quote request flow, with Framer Motion animations and shadcn/ui components throughout.",
      tags: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "shadcn/ui",
      ],
      kind: "freelance",
      liveUrl: "https://sonlife.com",
      image: CASE_STUDY_IMAGES.sonlife,
    },
    {
      title: "Teen One Movement",
      description:
        "Freelance website for Teen One Movement, a Ghanaian NGO focused on youth development. The site highlights a 60-acre youth camp center in Dawa, skills development programs for young Ghanaians, and an annual Christian youth conference, with gallery, events, resources, and contact pages powered by Sanity CMS.",
      tags: ["React", "TypeScript", "Vite", "Sanity CMS", "shadcn/ui"],
      kind: "freelance",
      image: CASE_STUDY_IMAGES.teenOne,
    },
    {
      title: "TriPath Advisory",
      description:
        "Marketing and content site for TriPath Advisory, a Ghana-based consulting firm helping organizations align strategy with sustainability, inclusion, and impact. Built service and insights pages, about and team storytelling, and ESG-focused content sections, with Sanity CMS for blog and page content and Framer Motion for scroll-driven presentation.",
      tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Sanity CMS"],
      kind: "freelance",
      image: CASE_STUDY_IMAGES.tripath,
    },
    {
      title: "Purple Oyster Events",
      description:
        "Full website for Purple Oyster Events and Design, a Ghana-based events atelier offering planning, production, styling, and floral design. Shipped package listings, portfolio showcases, about and contact flows, and Sanity-backed content for weddings, corporate events, and private celebrations, with video hero sections and a polished luxury aesthetic.",
      tags: ["React", "TypeScript", "Vite", "Sanity CMS", "shadcn/ui"],
      kind: "freelance",
      image: CASE_STUDY_IMAGES.purpleOyster,
    },
  ] satisfies ProjectEntry[],
  personalProjects: [
    {
      title: "IESO Bootcamp Portal",
      description:
        "Web application for the 2021 IESO Bootcamp intake, processing 200+ applications and supporting 20+ active cohort members through the program lifecycle.",
      tags: ["React", "Web App", "Forms"],
      kind: "personal",
      period: "2021",
    },
    {
      title: "This Portfolio",
      description:
        "Personal portfolio site showcasing dual frontend and data positioning, with Adinkra background, accent theme picker, dark mode, and case-study-driven pages.",
      tags: ["React", "Vite", "TypeScript", "Tailwind", "Framer Motion"],
      kind: "personal",
      githubUrl: SITE_LINKS.github,
    },
  ] satisfies ProjectEntry[],
  experience: [
    {
      role: "Senior Front End Developer",
      company: "IESO Agribusiness Consult",
      period: "2019-2025",
    },
    {
      role: "Front End Developer",
      company: "Chale Card LLC (Las Vegas, NV)",
      period: "2023",
    },
    {
      role: "Front End Developer",
      company: "Panache Services Ltd",
      period: "2023",
    },
    {
      role: "React Developer",
      company: "Slightly Techie",
      period: "2023-2024",
    },
    {
      role: "Front End Developer",
      company: "Agama Africana",
      period: "2021-2022",
    },
  ] satisfies ExperienceEntry[],
  education: [
    { title: "BSc Information Technology, University of Ghana" },
    {
      title: "Data Science 101, IBM SkillsBuild",
      detail: "Issued Jan 2026",
    },
    {
      title: "Data Science Methodology, IBM SkillsBuild",
      detail: "Issued Jan 2026",
    },
    {
      title: "Gen AI Essentials, Maven Analytics",
      detail: "Issued Jan 2026",
    },
    {
      title: "SQL (Advanced), HackerRank",
      detail: "Issued Dec 2025",
    },
    {
      title: "SQL (Basic), HackerRank",
      detail: "Issued Dec 2025",
    },
    { title: "Cloud Developer, Udacity" },
    {
      title: "React and Redux Development, React Native, Udemy",
      detail: "Issued Apr 2020",
    },
    {
      title: "Cisco Certified Network Associate (Routing & Switching)",
      detail: "Issued Sep 2019",
    },
    {
      title: "IBM Mobile Application Developer Mastery Award",
      detail: "Issued Nov 2016",
    },
    {
      title: "IBM Application Security Analyst Mastery Award",
      detail: "Issued Nov 2016",
    },
  ] satisfies EducationEntry[],
  cta: {
    headline: "Have a product that needs to look as good as it works?",
    buttons: [
      { label: "Let's talk", href: "/#contact", internal: true },
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
  featuredWork: [
    {
      title: "Stanbic Bank: Automating Data Operations With AI",
      tags: "Python, ETL, Power Automate, LLM engineering · Data Analyst (Graduate Internship), Jan 2026-present",
      body: "Stepped into a bank-wide data function and immediately started removing manual bottlenecks: designed automated workflows in Microsoft Power Automate to cut repetitive operational work, built web scraping tools and API integrations to feed analytics and ML pipelines with clean data, and built and maintained ETL pipelines that pull from multiple sources into analysis-ready, structured storage. A major focus of the role has been AI engineering: I designed and built an automated, agentic news aggregation engine that scrapes sources, filters relevance, and uses LLMs to curate and generate newsletter-ready insights for internal business units. I also shipped reporting dashboards that teams now use directly for operational decisions.",
      metrics: ["ETL pipelines", "Agentic AI engine", "Power Automate"],
      image: CASE_STUDY_IMAGES.stanbic,
    },
    {
      title: "Agama Africana: From Clicks to Insights",
      tags: "Segment, Google BigQuery, SQL",
      body: "Beyond the frontend, I integrated Agama Africana's app with Segment to collect and pipe user behavior data into Google BigQuery. From there, I wrote advanced SQL queries to extract insight on user activity and built a dashboard surfacing key engagement metrics, giving the team a data-driven view of how people were actually using the platform, instead of guessing.",
      image: CASE_STUDY_IMAGES.agama,
      metrics: ["Segment → BigQuery", "SQL analytics", "Engagement dashboard"],
    },
    {
      title: "Predicting Grain Price Variability in Ghana",
      tags: "MSc Thesis · University of Ghana, Business Analytics",
      body: 'My MSc thesis, "Price Variability Analysis of Grains in Ghanaian Markets: A Predictive Analytics Approach," applies predictive modeling to one of Ghana\'s most volatile and economically important markets: grain pricing. The work combines statistical analysis with practical forecasting to help stakeholders anticipate price swings rather than react to them.',
      image: CASE_STUDY_IMAGES.grainThesis,
      metrics: ["MSc thesis", "Predictive modeling", "Ghana grain markets"],
    },
  ] satisfies CaseStudy[],
  freelanceWork: [
    {
      title: "Prempeh College · WASSCE Performance Report",
      image: CASE_STUDY_IMAGES.prempeh,
      description:
        "Freelance analytics engagement for Prempeh College's Academic Committee, analyzing historical West African Senior School Certificate Examination (WASSCE) results. Delivered multi-year trend analysis across subjects and cohorts, SWOT analysis on academic strengths and gaps, pass-rate and grade-distribution breakdowns, comparative performance insights, and data-backed recommendations to guide teaching priorities, intervention planning, and resource allocation.",
      tags: [
        "Python",
        "Excel",
        "Trend Analysis",
        "SWOT Analysis",
        "WASSCE",
        "Education Analytics",
      ],
      kind: "freelance",
    },
  ] satisfies ProjectEntry[],
  personalProjects: [
    {
      title: "GSE Daily Overview",
      description:
        "Built an end-to-end data pipeline that scrapes daily trading data from the Ghana Stock Exchange (GSE) website using Python and Selenium, cleans and standardizes the extracts, and loads the results into a Power BI report for a daily market overview. The workflow removes manual copy-paste from the exchange site and keeps price and volume trends current for analysis.",
      tags: ["Python", "Selenium", "Web Scraping", "Power BI", "ETL"],
      kind: "personal",
      image: CASE_STUDY_IMAGES.gse,
      githubUrl: SITE_LINKS.gseDailyScraper,
    },
    {
      title: "World Cup Predictive Analytics",
      description:
        "Personal machine learning project applying predictive modeling to World Cup outcomes, experimenting with feature engineering and classification approaches.",
      tags: ["Python", "Machine Learning", "Sports Analytics"],
      kind: "personal",
      image: CASE_STUDY_IMAGES.worldcup,
      githubUrl: SITE_LINKS.github,
    },
  ] satisfies ProjectEntry[],
  education: [
    {
      title: "MSc Business Analytics, University of Ghana, Accra",
      detail:
        "Thesis: Price Variability Analysis of Grains in Ghanaian Markets: A Predictive Analytics Approach",
    },
    { title: "BSc Information Technology, University of Ghana, Accra" },
    {
      title: "Data Science 101, IBM SkillsBuild",
      detail: "Issued Jan 2026",
    },
    {
      title: "Data Science Methodology, IBM SkillsBuild",
      detail: "Issued Jan 2026",
    },
    {
      title: "Gen AI Essentials, Maven Analytics",
      detail: "Issued Jan 2026",
    },
    {
      title: "SQL (Advanced), HackerRank",
      detail: "Issued Dec 2025",
    },
    {
      title: "SQL (Basic), HackerRank",
      detail: "Issued Dec 2025",
    },
    { title: "Cloud Developer, Udacity" },
    {
      title: "Cisco Certified Network Associate (Routing & Switching)",
      detail: "Issued Sep 2019",
    },
    {
      title: "IBM Mobile Application Developer Mastery Award",
      detail: "Issued Nov 2016",
    },
    {
      title: "IBM Application Security Analyst Mastery Award",
      detail: "Issued Nov 2016",
    },
  ] satisfies EducationEntry[],
  whyFrontend: {
    title: "Why a Frontend Engineer Doing Data Work?",
    body: "Because most data work dies in a spreadsheet nobody opens. Six plus years of building interfaces taught me that data is only as useful as the dashboard, report, or tool someone actually engages with. AI makes that even more true: the best pipeline in the world still needs a clear interface or automated delivery layer. So I build both halves: the pipeline that gets the data right, the AI layer that turns it into insight, and the interface that gets it in front of the right person.",
  },
  cta: {
    headline: "Got data that's not earning its keep yet?",
    buttons: [
      { label: "Let's talk", href: "/#contact", internal: true },
      { label: "Download Resume", href: SITE_LINKS.resume, external: true },
      { label: "View GitHub", href: SITE_LINKS.github, external: true },
    ],
  },
} as const;
