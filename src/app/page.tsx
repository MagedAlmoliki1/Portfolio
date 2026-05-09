import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { ProjectCard } from "@/components/public/ProjectCard";
import { MongoProjectRepository } from "@/infrastructure/repositories/MongoProjectRepository";
import Link from "next/link";
import {
  personalInfo,
  heroTagline,
  heroHeadline,
  heroDescription,
  focusAreas,
  expertise,
} from "@/lib/data/portfolio-data";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projectRepository = new MongoProjectRepository();
  const featuredProjects = await projectRepository.findPublished({ featured: true });

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop pt-32">
        {/* Hero Section */}
        <section className="min-h-[80vh] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-section-padding border-b border-on-surface">
          <div className="md:col-span-7 flex flex-col justify-center items-start">
            <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest mb-stack-md block">
              {heroTagline}
            </span>
            <h1 className="font-display-2xl text-display-lg-mobile md:text-display-2xl text-on-background mb-stack-lg uppercase leading-none">
              {heroHeadline.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < heroHeadline.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h1>
            <div className="flex flex-col gap-8 w-full">
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                {heroDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="brutalist-button-primary px-8 py-4 font-label-mono text-label-mono uppercase bg-on-surface text-on-primary hover:bg-primary transition-all"
                >
                  View Portfolio
                </Link>
                <Link
                  href="/resume"
                  className="brutalist-button px-8 py-4 font-label-mono text-label-mono uppercase border border-on-surface hover:bg-surface-variant transition-all"
                >
                  View Resume
                </Link>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-5 flex justify-center md:justify-end mt-12 md:mt-0 relative group">
            <div className="relative z-10 border-2 border-on-surface overflow-hidden bg-surface-dim brutalist-button transition-transform">
              <img 
                src="/images/profile.webp" 
                alt="Maged Almoliky" 
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500 min-h-[400px] max-h-[600px]"
              />
            </div>
            {/* Hard Brutalist shadow block */}
            <div className="absolute top-4 left-4 w-full h-full bg-primary z-0 border-2 border-on-surface hidden md:block"></div>
          </div>
        </section>

        {/* Technical Focus */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-on-surface">
          {focusAreas.map((area, i) => (
            <FocusItem
              key={area.title}
              title={area.title}
              desc={area.description}
              isMiddle={i === 1}
            />
          ))}
        </section>

        {/* Featured Projects */}
        <section className="py-section-padding">
          <div className="flex justify-between items-end mb-stack-lg">
            <h2 className="font-display-lg-mobile text-display-lg-mobile md:text-display-lg uppercase leading-none">
              Featured <br /> Projects
            </h2>
            <Link
              href="/projects"
              className="font-label-mono text-label-mono uppercase text-primary hover:underline flex items-center gap-2"
            >
              All Projects{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {featuredProjects.slice(0, 2).map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                slug={project.slug}
                description={project.description}
                techStack={project.techStack}
                category={project.category}
              />
            ))}
          </div>
        </section>

        {/* Expertise Accordion */}
        <section className="py-section-padding border-t border-on-surface">
          <h2 className="font-display-lg-mobile text-display-lg-mobile uppercase mb-stack-lg">
            Expertise
          </h2>
          <div className="flex flex-col border-t border-on-surface">
            {expertise.map((item) => (
              <AccordionItem
                key={item.number}
                number={item.number}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FocusItem({
  title,
  desc,
  isMiddle = false,
}: {
  title: string;
  desc: string;
  isMiddle?: boolean;
}) {
  return (
    <div
      className={`p-12 ${isMiddle ? "md:border-x border-on-surface" : ""} border-b md:border-b-0 border-on-surface flex flex-col gap-4`}
    >
      <h3 className="font-label-mono text-label-mono uppercase text-primary">
        {title}
      </h3>
      <p className="font-body-md text-on-surface-variant">{desc}</p>
    </div>
  );
}

function AccordionItem({
  number,
  title,
  content,
}: {
  number: string;
  title: string;
  content: string;
}) {
  return (
    <details className="group border-b border-on-surface overflow-hidden">
      <summary className="list-none cursor-pointer p-8 flex items-center gap-8 group-hover:bg-surface-container transition-colors">
        <span className="font-label-mono text-label-mono text-on-surface-variant">
          {number}
        </span>
        <h3 className="font-headline-md text-headline-md uppercase flex-grow">
          {title}
        </h3>
        <span className="material-symbols-outlined transition-transform group-open:rotate-180">
          expand_more
        </span>
      </summary>
      <div className="px-8 pb-12 pl-24 max-w-3xl">
        <p className="font-body-lg text-on-surface-variant">{content}</p>
      </div>
    </details>
  );
}
