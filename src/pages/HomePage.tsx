import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { ContactSection } from "@/components/contact/ContactSection";
import { CTABand } from "@/components/content/CTABand";
import { FeaturedWorkBento } from "@/components/content/FeaturedWorkBento";
import { PageHero } from "@/components/content/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SideProjectGrid } from "@/components/content/SideProjectGrid";
import { StatStrip } from "@/components/content/StatStrip";
import { TechSnapshotTable } from "@/components/content/TechSnapshotTable";
import { PageMeta } from "@/components/seo/PageMeta";
import { HOME_COPY, SITE_LINKS } from "@/content/site-copy";
import { useThemeColor } from "@/context/ColorThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function HomePage() {
  const { color } = useThemeColor();

  return (
    <>
      <PageMeta title={HOME_COPY.seo.title} description={HOME_COPY.seo.description} />

      <div className="space-y-24">
        <section
          id="intro"
          className="grid min-h-[80vh] grid-cols-1 items-center gap-10 lg:grid-cols-12"
        >
          <motion.div
            className="order-2 space-y-8 lg:col-span-8 lg:order-1"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={item}>
              <PageHero
                eyebrow={HOME_COPY.eyebrow}
                title={HOME_COPY.headline}
                subhead={HOME_COPY.subhead}
                highlights={HOME_COPY.heroHighlights}
                ctas={[...HOME_COPY.ctas]}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 flex justify-center lg:col-span-4 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`absolute inset-0 -z-10 rounded-full ${color.bg} opacity-25 blur-3xl`}
              />
              <div
                className={`absolute -inset-2 -z-10 rounded-full border-2 ${color.border} opacity-30`}
              />
              <img
                src={SITE_LINKS.memoji}
                alt="Frederick Ofori-Boadu"
                width={300}
                height={300}
                className={`relative z-10 rounded-full ${color.softGlow}`}
              />
            </motion.div>
          </motion.div>
        </section>

        <section>
          <StatStrip points={HOME_COPY.proofPoints} />
        </section>

        <section className="space-y-8">
          <SectionHeading index="01 — Selected Work">Featured Projects</SectionHeading>
          <FeaturedWorkBento projects={HOME_COPY.featuredProjects} />
        </section>

        <section className="section-panel space-y-6">
          <SectionHeading index="02 — About">About</SectionHeading>
          <div className="space-y-4 text-sm leading-relaxed md:text-base">
            {HOME_COPY.about.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <div className="space-y-3">
            <SectionHeading index="03 — More Work">
              Freelance & Personal Projects
            </SectionHeading>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {HOME_COPY.sideProjectsIntro}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Freelance
            </h3>
            <SideProjectGrid projects={HOME_COPY.freelancePreview} />
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Personal · Frontend
            </h3>
            <SideProjectGrid projects={HOME_COPY.personalPreview} />
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Personal · Data
            </h3>
            <SideProjectGrid projects={HOME_COPY.dataPersonalPreview} />
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/portfolio/frontend#freelance-work"
              className={`group inline-flex items-center gap-2 text-sm font-medium ${color.text}`}
            >
              See all freelance work
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/portfolio/data#personal-projects"
              className={`group inline-flex items-center gap-2 text-sm font-medium ${color.text}`}
            >
              See all data projects
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading index="04 — Focus">What I Do</SectionHeading>
          <div className="grid gap-6 md:grid-cols-2">
            {HOME_COPY.whatIDo.map((item) => (
              <Link key={item.title} to={item.link.href} className="group">
                <Card className="glass h-full transition hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-display text-foreground">
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span
                      className={`inline-flex items-center gap-2 text-sm font-medium ${color.text}`}
                    >
                      {item.link.label}
                      <FiArrowRight className="transition group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading index="05 — Stack">Tech Snapshot</SectionHeading>
          <TechSnapshotTable
            frontend={HOME_COPY.techSnapshot.frontend}
            data={HOME_COPY.techSnapshot.data}
          />
        </section>

        <section className="space-y-4">
          <SectionHeading index="06 — Now">Currently</SectionHeading>
          <blockquote className="section-panel text-sm leading-relaxed italic md:text-base">
            &ldquo;{HOME_COPY.currently}&rdquo;
          </blockquote>
        </section>

        <CTABand
          headline={HOME_COPY.footerCta.headline}
          subtext={HOME_COPY.footerCta.subtext}
          buttons={[
            { label: "Get in Touch", href: "#contact", internal: false },
            { label: "Download Resume", href: SITE_LINKS.resume, external: true },
            { label: "LinkedIn", href: SITE_LINKS.linkedin, external: true },
          ]}
        />

        <ContactSection />
      </div>
    </>
  );
}
