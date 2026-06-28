import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { CTABand } from "@/components/content/CTABand";
import { EducationList } from "@/components/content/EducationList";
import { ExperienceList } from "@/components/content/ExperienceList";
import { PageHero } from "@/components/content/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SideProjectGrid } from "@/components/content/SideProjectGrid";
import { SkillsBlock } from "@/components/content/SkillsBlock";
import { PageMeta } from "@/components/seo/PageMeta";
import { FRONTEND_COPY } from "@/content/site-copy";
import { useThemeColor } from "@/context/ColorThemeContext";

export function FrontendPortfolioPage() {
  const { color } = useThemeColor();

  return (
    <>
      <PageMeta
        title={FRONTEND_COPY.seo.title}
        description={FRONTEND_COPY.seo.description}
      />

      <div className="space-y-16">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-sm font-medium ${color.text}`}
        >
          <FiArrowLeft /> Back to home
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
          <div className="space-y-8">
            {FRONTEND_COPY.featuredWork.map((study, index) => (
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
          <SectionHeading index="03 — Freelance">Freelance Work</SectionHeading>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Client websites built on contract for Panache Services, Sonlife Printing Press,
            Teen One Movement, TriPath Advisory, and Purple Oyster Events.
          </p>
          <SideProjectGrid projects={FRONTEND_COPY.freelanceWork} />
        </section>

        <section id="personal-projects" className="space-y-6 scroll-mt-28">
          <SectionHeading index="04 — Personal">Personal Projects</SectionHeading>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Side builds and experiments: bootcamp tools, ML explorations, research projects,
            and this portfolio itself.
          </p>
          <SideProjectGrid projects={FRONTEND_COPY.personalProjects} />
        </section>

        <section className="space-y-6">
          <SectionHeading index="05 — Experience">Experience</SectionHeading>
          <ExperienceList entries={FRONTEND_COPY.experience} />
        </section>

        <section className="space-y-6">
          <SectionHeading index="06 — Education">Education & Certifications</SectionHeading>
          <EducationList entries={FRONTEND_COPY.education} />
        </section>

        <CTABand
          headline={FRONTEND_COPY.cta.headline}
          buttons={[...FRONTEND_COPY.cta.buttons]}
        />
      </div>
    </>
  );
}
