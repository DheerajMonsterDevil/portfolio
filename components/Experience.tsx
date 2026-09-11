import { experiences } from "@/data/portfolio";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 bg-card/30 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <SectionHeading
            title="Experience"
            subtitle="Professional roles across AI engineering and production software."
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <ExperienceTimeline experiences={experiences} />
        </FadeIn>
      </div>
    </section>
  );
}
