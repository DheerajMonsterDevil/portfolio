import { projects } from "@/data/portfolio";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <SectionHeading
            title="Projects"
            subtitle="Selected work spanning Generative AI, multimodal pipelines, and large-scale data platforms."
          />
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <FadeIn key={project.title} delay={index * 0.1}>
              <ProjectCard title={project.title} role={project.roles[0]} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
