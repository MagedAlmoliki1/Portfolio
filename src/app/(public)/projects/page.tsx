import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { ProjectCard } from "@/components/public/ProjectCard";
import { MongoProjectRepository } from "@/infrastructure/repositories/MongoProjectRepository";

export const dynamic = 'force-dynamic';

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const projectRepository = new MongoProjectRepository();
  const category = searchParams.category;

  const projects = await projectRepository.findPublished({
    category: category !== "all" ? category : undefined,
  });

  const categories = ["all", "web", "mobile", "saas", "api"];

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg mb-section-padding pt-32">
        {/* Page Header */}
        <header className="mb-stack-lg flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <span className="font-label-mono text-label-mono text-primary uppercase block mb-stack-sm">
              Portfolio / Work
            </span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background">
              Engineering high-performance digital experiences.
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`/projects?category=${cat}`}
                className={`font-label-mono text-label-mono uppercase border border-on-surface px-6 py-2 transition-all ${
                  (category || "all") === cat
                    ? "bg-on-surface text-on-primary"
                    : "hover:bg-surface-variant"
                }`}
              >
                {cat}
              </a>
            ))}
          </div>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                slug={project.slug}
                description={project.description}
                techStack={project.techStack}
                category={project.category}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-on-surface">
              <span className="font-label-mono text-on-surface-variant uppercase">
                No projects found in this category.
              </span>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
