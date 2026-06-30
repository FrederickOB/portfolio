import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { CTABand } from "@/components/content/CTABand";
import { EducationList } from "@/components/content/EducationList";
import { PageHero } from "@/components/content/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SideProjectGrid } from "@/components/content/SideProjectGrid";
import { SkillsBlock } from "@/components/content/SkillsBlock";
import { PageMeta } from "@/components/seo/PageMeta";
import { DATA_COPY } from "@/content/site-copy";
import { useThemeColor } from "@/context/ColorThemeContext";

export function DataPortfolioPage() {
  const { color } = useThemeColor();

  return (
    <>
      <PageMeta title={DATA_COPY.seo.title} description={DATA_COPY.seo.description} />

      <div className="space-y-16">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-sm font-medium ${color.text}`}
        >
          <FiArrowLeft /> Back to home
        </Link>

        <PageHero title={DATA_COPY.hero.title} subhead={DATA_COPY.hero.subhead} />

        <section className="space-y-6">
          <SectionHeading index="01 — Skills">Skills</SectionHeading>
          <SkillsBlock groups={DATA_COPY.skills} />
        </section>

        <section className="space-y-8">
          <SectionHeading index="02 — Work">Featured Work</SectionHeading>
          <div className="space-y-8">
            {DATA_COPY.featuredWork.map((study, index) => (
              <CaseStudyCard
                key={study.title}
                study={study}
                index={index}
                alternate
              />
            ))}
          </div>
        </section>

        <section id="freelance-work" className="space-y-6 scroll-mt-28">
          <SectionHeading index="03 — Freelance">Freelance & Consulting</SectionHeading>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Data analytics and reporting engagements delivered on contract, outside
            full-time employer work.
          </p>
          <SideProjectGrid projects={DATA_COPY.freelanceWork} />
        </section>

        <section id="personal-projects" className="space-y-6 scroll-mt-28">
          <SectionHeading index="04 — Personal">Personal Projects</SectionHeading>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Independent data and machine learning work outside client and employer
            case studies.
          </p>
          <SideProjectGrid projects={DATA_COPY.personalProjects} />
        </section>

        <section className="space-y-6">
          <SectionHeading index="05 — Education">Education & Certifications</SectionHeading>
          <EducationList entries={DATA_COPY.education} />
        </section>

        <section className="space-y-4">
          <SectionHeading>{DATA_COPY.whyFrontend.title}</SectionHeading>
          <p className="glass rounded-2xl border p-6 text-sm leading-relaxed md:text-base">
            {DATA_COPY.whyFrontend.body}
          </p>
        </section>

        <CTABand
          headline={DATA_COPY.cta.headline}
          buttons={[...DATA_COPY.cta.buttons]}
        />
      </div>
    </>
  );
}
