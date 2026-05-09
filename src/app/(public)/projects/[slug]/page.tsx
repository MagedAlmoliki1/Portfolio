import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-on-surface text-on-primary min-h-[819px] flex flex-col justify-center items-center text-center px-gutter py-section-padding border-b border-on-surface pt-32">
          <div className="max-w-4xl mx-auto space-y-stack-lg">
            <span className="inline-block font-label-mono text-label-mono uppercase tracking-widest text-primary-container border border-primary-container px-4 py-2">
              Web Application
            </span>
            <h1 className="font-display-lg text-display-lg text-on-primary uppercase tracking-tight">
              Nexus Core Platform
            </h1>
            <p className="font-body-lg text-body-lg text-secondary-fixed-dim max-w-2xl mx-auto">
              A high-performance enterprise dashboard architected for realtime
              data visualization and complex state management, handling over
              10M+ daily events.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["React", "TypeScript", "GraphQL", "TailwindCSS"].map((tech) => (
                <span
                  key={tech}
                  className="font-label-mono text-label-mono text-primary-container border border-primary-container px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-6 pt-stack-md">
              <a
                className="font-label-mono text-label-mono uppercase tracking-widest border border-on-primary px-8 py-4 hover:bg-on-primary hover:text-on-surface transition-all duration-200"
                href="#"
              >
                Live Demo
              </a>
              <a
                className="font-label-mono text-label-mono uppercase tracking-widest bg-on-primary text-on-surface border border-on-primary px-8 py-4 hover:bg-primary-container hover:text-on-primary hover:border-primary-container transition-all duration-200"
                href="#"
              >
                GitHub Repo
              </a>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="px-gutter md:px-margin-desktop py-stack-lg bg-surface-container-lowest border-b border-on-surface">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-on-surface">
            <StatItem label="Timeline" value="6 Months" isLast={false} />
            <StatItem label="Role" value="Lead Front-End" isLast={false} />
            <StatItem label="Year" value="2023" isLast={true} />
          </div>
        </section>

        {/* Problem Statement */}
        <section className="px-gutter md:px-margin-desktop py-section-padding bg-background border-b border-on-surface">
          <div className="max-w-4xl flex gap-stack-md">
            <div className="w-2 bg-primary-container shrink-0"></div>
            <div>
              <h2 className="font-display-lg-mobile text-display-lg-mobile uppercase mb-stack-md">
                The Problem
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface mb-stack-md">
                The existing legacy system was buckling under the weight of
                increased data throughput. Stakeholders were experiencing
                critical latency issues during peak operational hours, and the
                visual hierarchy of the dashboard was failing to prioritize
                actionable insights, leading to cognitive overload for the
                end-users.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface">
                Our objective was to completely re-architect the client-side
                application, reducing initial load times by 40% while
                implementing a scalable component library that adhered strictly
                to Brutalist design principles—ensuring high contrast and
                unwavering structural integrity.
              </p>
            </div>
          </div>
        </section>

        {/* Solution & Process */}
        <section className="bg-surface-container-lowest border-b border-on-surface">
          <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-on-surface">
            <div className="p-gutter md:p-margin-desktop flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-on-surface">
              <h3 className="font-headline-md text-headline-md uppercase mb-6">
                Structural Refactoring
              </h3>
              <p className="font-body-lg text-body-lg text-secondary">
                I initiated the process by stripping away redundant UI layers
                and abstracting complex state management into modular React
                hooks. We enforced a strict 12-column grid system, mapping data
                visualization widgets to precise mathematical coordinates to
                eliminate visual clutter.
              </p>
            </div>
            <div className="h-[500px] lg:h-auto bg-on-surface relative">
              <img
                alt="Code architecture"
                className="w-full h-full object-cover filter grayscale contrast-125"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJt0Rafq8gFe72J8QyaG1iL-i6jkdvJ1DaYfeQ-NyIhpFnfi_vbZbS663hyPJRv_bdU6qDQG0p6xPU5LYsCyfG5v9YWm1uzN6Fvrfb8XntcWiqsZd8XWYReAwTXXBUb1J-zSXWn25Z0m-Cp4oR9qmWL5qAueSAUhihrpR2GuY4xidteWqyNnUhFGjnxnC08p0XCTDCJhpaKCWKtuxD623JUZuPF72vSQgP-BL0mC0jumiQiMggCe_GGFnaZxfnJ7q3leAgnGCM1OM"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-[500px] lg:h-auto bg-on-surface relative order-2 lg:order-1 border-r border-on-surface">
              <img
                alt="Brutalist architecture"
                className="w-full h-full object-cover filter grayscale contrast-125"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrBpQRz-VRfKnqmQ1JjWJWqM9ggLd7fxKeNqtZwj4gKxYZa-bg4pXwRGIDI0HGiT_yUHI-hIG_-KjmpNbToeMlB6mm_p_GUMIZg4VVRX0xZpOWeZ74i2NopfoD8qxruSmzAg7ciypRebkccC6IqhGTnqJTDq_f9mJ8J-2tofQAuYuES0B0_OysII4hOu6lf2pS2p1m7BZ990L5zqeY_cA9zaaLOjpsRcOt3LIjn0lWBQ6xDhdFvXInMAjzTvo46Oj380oRr-uplMM"
              />
            </div>
            <div className="p-gutter md:p-margin-desktop flex flex-col justify-center order-1 lg:order-2">
              <h3 className="font-headline-md text-headline-md uppercase mb-6">
                Component Engineering
              </h3>
              <p className="font-body-lg text-body-lg text-secondary">
                Every atomic element was designed with zero-pixel border radii
                and solid hex colors. We discarded soft shadows entirely,
                opting for hard 1px borders and solid offset blocks to indicate
                elevation. This approach not only reinforced the brand identity
                but significantly reduced rendering overhead.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-on-surface text-on-primary px-gutter md:px-margin-desktop py-section-padding border-b border-on-surface">
          <h2 className="font-display-lg-mobile text-display-lg-mobile uppercase mb-stack-lg text-center text-white">
            Technical Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TechCard
              icon="terminal"
              title="React 18"
              description="Leveraged concurrent features for non-blocking UI rendering during heavy data parsing."
            />
            <TechCard
              icon="data_object"
              title="GraphQL"
              description="Implemented efficient over-fetching mitigation via precise schema definitions and Apollo Client."
            />
            <TechCard
              icon="speed"
              title="Vite"
              description="Migrated from Webpack to Vite, drastically reducing HMR latency and build times."
            />
            <TechCard
              icon="format_paint"
              title="Tailwind"
              description="Constructed a bespoke utility-class configuration strictly enforcing the brutalist design token system."
            />
          </div>
        </section>

        {/* Results */}
        <section className="px-gutter md:px-margin-desktop py-section-padding bg-background border-b border-on-surface">
          <h2 className="font-display-lg-mobile text-display-lg-mobile uppercase mb-stack-lg text-center">
            Impact & Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ResultCard value="40%" label="Reduction in Load Time" />
            <ResultCard value="98" label="Lighthouse Perf Score" />
            <ResultCard value="Zero" label="Runtime Errors (Post-Launch)" />
          </div>
        </section>

        {/* Project Navigation */}
        <section className="grid grid-cols-2 border-b border-on-surface">
          <a
            className="p-gutter md:p-margin-desktop border-r border-on-surface flex flex-col justify-center items-start hover:bg-on-surface hover:text-on-primary transition-colors duration-200 group"
            href="#"
          >
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary group-hover:text-secondary-fixed-dim mb-4">
              Previous Project
            </span>
            <span className="font-headline-md text-headline-md uppercase">
              Aura OS
            </span>
          </a>
          <a
            className="p-gutter md:p-margin-desktop flex flex-col justify-center items-end text-right hover:bg-on-surface hover:text-on-primary transition-colors duration-200 group"
            href="#"
          >
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary group-hover:text-secondary-fixed-dim mb-4">
              Next Project
            </span>
            <span className="font-headline-md text-headline-md uppercase">
              FinTech App
            </span>
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

function StatItem({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast: boolean;
}) {
  return (
    <div
      className={`p-8 ${!isLast ? "border-b md:border-b-0 md:border-r" : ""} border-on-surface`}
    >
      <span className="block font-label-mono text-label-mono uppercase tracking-widest text-secondary mb-4">
        {label}
      </span>
      <strong className="block font-headline-md text-headline-md">{value}</strong>
    </div>
  );
}

function TechCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-on-primary p-8 hover:bg-primary-container transition-colors duration-200">
      <span className="material-symbols-outlined text-4xl mb-4 block">
        {icon}
      </span>
      <h4 className="font-headline-md text-[24px] uppercase mb-4 text-white">{title}</h4>
      <p className="font-body-md text-secondary-fixed-dim">{description}</p>
    </div>
  );
}

function ResultCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-on-surface p-8 text-center hover:shadow-[4px_4px_0px_0px_rgba(26,25,48,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 hover:bg-surface-container-high">
      <span className="block font-display-lg text-display-lg text-primary-container mb-4">
        {value}
      </span>
      <p className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface">
        {label}
      </p>
    </div>
  );
}
