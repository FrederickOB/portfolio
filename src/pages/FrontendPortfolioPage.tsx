import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { CTABand } from "@/components/content/CTABand";
import { ContentGate } from "@/components/content/ContentGate";
import { EducationList } from "@/components/content/EducationList";
import { ExperienceList } from "@/components/content/ExperienceList";
import { PageHero } from "@/components/content/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SideProjectGrid } from "@/components/content/SideProjectGrid";
import { SkillsBlock } from "@/components/content/SkillsBlock";
import { PageMeta } from "@/components/seo/PageMeta";
import { achievementsFor, experienceFor, formatList, worksIn } from "@/content/selectors";
import { FRONTEND_COPY } from "@/content/site-copy";
import { useThemeColor } from "@/context/ColorThemeContext";
import { useContent } from "@/context/ContentContext";

export function FrontendPortfolioPage() {
  const { color } = useThemeColor();
  const { works, achievements, experience } = useContent();
  const caseStudies = worksIn(works, "frontend", "case-study");
  const freelance = worksIn(works, "frontend", "freelance");
  const personal = worksIn(works, "frontend", "personal");

  return (
    <>
      <PageMeta
        title={FRONTEND_COPY.seo.title}
        description={FRONTEND_COPY.seo.description}
      />

      <div className="space-y-16">
        <Link
          to="/catalogue"
          className={`inline-flex items-center gap-2 text-sm font-medium ${color.text}`}
        >
          <FiArrowLeft /> Back to the catalogue
        </Link>

        <PageHero
          title={FRONTEND_COPY.hero.title}
          subhead={FRONTEND_COPY.hero.subhead}
        />

        <section className="space-y-6">
          <SectionHeading index="01 — Skills">Skills</SectionHeading>
          <SkillsBlock groups={FRONTEND_COPY.skills} />
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
          <SectionHeading index="03 — Freelance">Freelance Work</SectionHeading>
          {freelance.length > 0 && (
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Client websites built on contract for{" "}
              {formatList(freelance.map((work) => work.title))}.
            </p>
          )}
          <ContentGate className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-72">
            <SideProjectGrid projects={freelance} />
          </ContentGate>
        </section>

        <section id="personal-projects" className="space-y-6 scroll-mt-28">
          <SectionHeading index="04 — Personal">Personal Projects</SectionHeading>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Side builds and experiments: bootcamp tools, ML explorations, research projects,
            and this portfolio itself.
          </p>
          <ContentGate className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-72">
            <SideProjectGrid projects={personal} />
          </ContentGate>
        </section>

        <section className="space-y-6">
          <SectionHeading index="05 — Experience">Experience</SectionHeading>
          <ContentGate className="space-y-4" itemClassName="h-20">
            <ExperienceList entries={experienceFor(experience, "frontend")} />
          </ContentGate>
        </section>

        <section className="space-y-6">
          <SectionHeading index="06 — Education">Education & Certifications</SectionHeading>
          <ContentGate className="space-y-4" itemClassName="h-16">
            <EducationList entries={achievementsFor(achievements, "frontend")} />
          </ContentGate>
        </section>

        <CTABand
          headline={FRONTEND_COPY.cta.headline}
          buttons={[...FRONTEND_COPY.cta.buttons]}
        />
      </div>
    </>
  );
}
