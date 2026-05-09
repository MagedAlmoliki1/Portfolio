import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { MongoProjectRepository } from "@/infrastructure/repositories/MongoProjectRepository";
import { MongoInquiryRepository } from "@/infrastructure/repositories/MongoInquiryRepository";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const projectRepository = new MongoProjectRepository();
  const inquiryRepository = new MongoInquiryRepository();

  const projects = await projectRepository.findAll();
  const inquiries = await inquiryRepository.findAll();

  // Stats
  const totalProjects = projects.total;
  const totalInquiries = inquiries.total;
  const publishedProjects = projects.data.filter(p => p.status === 'published').length;

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      <AdminSidebar />
      <main className="flex-1 ml-0 md:ml-[240px] bg-surface flex flex-col min-h-screen">
        {/* Top Header Mobile */}
        <header className="md:hidden bg-surface-container-lowest border-b border-on-surface p-4 flex justify-between items-center sticky top-0 z-30">
          <span className="font-display-lg-mobile text-headline-md text-on-surface border-b-4 border-primary">
            MAGED ALMOLIKY
          </span>
          <button className="p-2 border border-on-surface brutalist-button bg-surface">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Dashboard Content */}
        <div className="p-gutter md:p-margin-mobile lg:p-stack-lg flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-stack-lg gap-4">
            <div>
              <h1 className="font-display-lg text-display-lg text-on-background uppercase tracking-tight">
                Dashboard Overview
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
                System status and key metrics
              </p>
            </div>
            <button className="brutalist-button-primary px-6 py-3 font-label-mono text-label-mono uppercase flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Add New Project
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg">
            <StatCard
              label="Total Projects"
              value={totalProjects.toString()}
              icon="folder"
              trend={`+${publishedProjects} published`}
              trendColor="text-[#166534]"
            />
            <StatCard
              label="Inquiries"
              value={totalInquiries.toString()}
              icon="mail"
              trend="New submissions"
              trendColor="text-primary"
            />
            <StatCard
              label="Certificates"
              value="8"
              icon="workspace_premium"
              trend="Architecture & Design"
              trendColor="text-on-surface-variant"
            />
            <StatCard
              label="Active Views"
              value="1.2K"
              icon="visibility"
              trend="+12% this week"
              trendColor="text-[#166534]"
            />
          </div>

          {/* Projects Management Table Section */}
          <div className="mb-stack-lg">
            <div className="flex justify-between items-center mb-6 border-b border-on-surface pb-4">
              <h2 className="font-headline-md text-headline-md text-on-surface uppercase">
                Manage Projects
              </h2>
              <Link
                className="font-label-mono text-label-mono uppercase text-primary hover:underline flex items-center gap-1"
                href="/admin/projects"
              >
                View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
            <div className="bg-surface-container-lowest border border-on-surface overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b-2 border-on-surface bg-surface-variant">
                    <th className="p-4 font-label-mono text-label-mono uppercase text-on-surface w-16">
                      Thumbnail
                    </th>
                    <th className="p-4 font-label-mono text-label-mono uppercase text-on-surface">
                      Project Name
                    </th>
                    <th className="p-4 font-label-mono text-label-mono uppercase text-on-surface">
                      Tech Stack
                    </th>
                    <th className="p-4 font-label-mono text-label-mono uppercase text-on-surface">
                      Status
                    </th>
                    <th className="p-4 font-label-mono text-label-mono uppercase text-on-surface text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.data.slice(0, 5).map((project) => (
                    <ProjectTableRow
                      key={project.id}
                      title={project.title}
                      subtitle={project.category.toUpperCase()}
                      tech={project.techStack}
                      status={project.status}
                      isPublished={project.status === 'published'}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity / Inquiries */}
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface uppercase mb-6 border-b border-on-surface pb-4">
              Recent Inquiries
            </h2>
            <div className="bg-surface-container-lowest border border-on-surface p-6 flex flex-col gap-4">
              {inquiries.data.length > 0 ? (
                inquiries.data.slice(0, 3).map((inquiry) => (
                  <LogItem
                    key={inquiry.id}
                    icon="mail"
                    title={`${inquiry.subject} from ${inquiry.name}`}
                    description={inquiry.message}
                    time={new Date(inquiry.createdAt).toLocaleString()}
                    variant={inquiry.status === 'new' ? "primary" : "neutral"}
                  />
                ))
              ) : (
                <div className="py-8 text-center font-label-mono text-on-surface-variant uppercase">
                  No inquiries yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  trend,
  trendColor,
}: {
  label: string;
  value: string;
  icon: string;
  trend: string;
  trendColor: string;
}) {
  return (
    <div className="border border-on-surface bg-white p-6 flex flex-col hover:shadow-[4px_4px_0px_0px_rgba(26,25,48,1)] transition-all">
      <div className="flex justify-between items-start mb-4">
        <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">
          {label}
        </span>
        <span className="material-symbols-outlined text-primary">{icon}</span>
      </div>
      <div className="font-display-lg-mobile text-display-lg-mobile text-on-surface">
        {value}
      </div>
      <div className={`mt-4 flex items-center gap-1 font-label-mono text-[12px] uppercase ${trendColor}`}>
        <span className="material-symbols-outlined text-[16px]">
          {trend.startsWith("+") ? "trending_up" : trend.startsWith("-") ? "trending_down" : "info"}
        </span>
        {trend}
      </div>
    </div>
  );
}

function ProjectTableRow({
  title,
  subtitle,
  tech,
  status,
  isPublished,
}: {
  title: string;
  subtitle: string;
  tech: string[];
  status: string;
  isPublished: boolean;
}) {
  return (
    <tr className="border-b border-on-surface hover:bg-surface transition-colors">
      <td className="p-4">
        <div className="w-12 h-12 bg-tertiary-fixed border border-on-surface flex items-center justify-center font-bold">
          {title.charAt(0)}
        </div>
      </td>
      <td className="p-4">
        <div className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
          {title}
        </div>
        <div className="font-body-md text-[12px] text-on-surface-variant mt-1">
          {subtitle}
        </div>
      </td>
      <td className="p-4">
        <div className="flex gap-2 flex-wrap">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 border border-on-surface text-[10px] font-label-mono uppercase bg-surface"
            >
              {t}
            </span>
          ))}
        </div>
      </td>
      <td className="p-4">
        <span
          className={`px-3 py-1 ${isPublished ? "bg-[#166534] text-white" : "bg-surface-variant text-on-surface"} text-[10px] font-label-mono uppercase border border-on-surface`}
        >
          {status}
        </span>
      </td>
      <td className="p-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            className="p-2 border border-on-surface hover:bg-surface-variant transition-colors"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            className="p-2 border border-on-surface hover:bg-error-container text-error transition-colors"
            title="Delete"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

function LogItem({
  icon,
  title,
  description,
  time,
  variant,
}: {
  icon: string;
  title: string;
  description: string;
  time: string;
  variant: "primary" | "neutral" | "error";
}) {
  const bgColor = {
    primary: "bg-primary-container text-on-primary-container",
    neutral: "bg-surface-variant text-on-surface",
    error: "bg-error-container text-on-error-container",
  }[variant];

  return (
    <div className="flex items-start gap-4 pb-4 border-b border-surface-variant last:border-b-0 last:pb-0">
      <div className={`p-2 border border-on-surface ${bgColor}`}>
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <div>
        <div className="font-label-mono text-label-mono uppercase font-bold text-on-surface">
          {title}
        </div>
        <div className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-1">
          {description}
        </div>
        <div className="font-label-mono text-[10px] uppercase text-on-surface-variant mt-2">
          {time}
        </div>
      </div>
    </div>
  );
}
