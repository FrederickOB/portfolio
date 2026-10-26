import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { CTABand } from "@/components/content/CTABand";
import { ContentGate } from "@/components/content/ContentGate";
import { EducationList } from "@/components/content/EducationList";
import { PageHero } from "@/components/content/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SideProjectGrid } from "@/components/content/SideProjectGrid";
import { SkillsBlock } from "@/components/content/SkillsBlock";
import { PageMeta } from "@/components/seo/PageMeta";
import { achievementsFor, worksIn } from "@/content/selectors";
import { DATA_COPY } from "@/content/site-copy";
import { useThemeColor } from "@/context/ColorThemeContext";
import { useContent } from "@/context/ContentContext";

export function DataPortfolioPage() {
  const { color } = useThemeColor();
  const { works, achievements } = useContent();
  const caseStudies = worksIn(works, "data", "case-study");
  const freelance = worksIn(works, "data", "freelance");
  const personal = worksIn(works, "data", "personal");

  return (
    <>
      <PageMeta title={DATA_COPY.seo.title} description={DATA_COPY.seo.description} />

      <div className="space-y-16">
        <Link
          to="/catalogue"
          className={`inline-flex items-center gap-2 text-sm font-medium ${color.text}`}
        >
          <FiArrowLeft /> Back to the catalogue
        </Link>

        <PageHero title={DATA_COPY.hero.title} subhead={DATA_COPY.hero.subhead} />

        <section className="space-y-6">
          <SectionHeading index="01 — Skills">Skills</SectionHeading>
          <SkillsBlock groups={DATA_COPY.skills} />
        </section>

        <section className="space-y-8">
          <SectionHeading index="02 — Work">Featured Work</SectionHeading>
          <ContentGate count={2} className="space-y-8" itemClassName="h-80">
            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  index={index}
                  alternate
                />
              ))}
            </div>
          </ContentGate>
        </section>

        <section id="freelance-work" className="space-y-6 scroll-mt-28">
          <SectionHeading index="03 — Freelance">Freelance & Consulting</SectionHeading>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Data analytics and reporting engagements delivered on contract, outside
            full-time employer work.
          </p>
          <ContentGate className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-72">
            <SideProjectGrid projects={freelance} />
          </ContentGate>
        </section>

        <section id="personal-projects" className="space-y-6 scroll-mt-28">
          <SectionHeading index="04 — Personal">Personal Projects</SectionHeading>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Independent data and machine learning work outside client and employer
            case studies.
          </p>
          <ContentGate className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-72">
            <SideProjectGrid projects={personal} />
          </ContentGate>
        </section>

        <section className="space-y-6">
          <SectionHeading index="05 — Education">Education & Certifications</SectionHeading>
          <ContentGate className="space-y-4" itemClassName="h-16">
            <EducationList entries={achievementsFor(achievements, "data")} />
          </ContentGate>
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
