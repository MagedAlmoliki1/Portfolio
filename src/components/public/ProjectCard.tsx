import Link from "next/link";

interface ProjectCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  category: string;
}

export const ProjectCard = ({
  title,
  slug,
  description,
  techStack,
  category,
}: ProjectCardProps) => {
  return (
    <Link
      href={`/projects/${slug}`}
      className="border border-on-surface hover:bg-surface-container transition-all group flex flex-col h-full hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-4px_4px_0px_0px_rgba(26,25,48,1)]"
    >
      <div className="h-[300px] border-b border-on-surface bg-on-background overflow-hidden relative">
        <img
          alt={title}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
          src={`https://lh3.googleusercontent.com/aida-public/AB6AXuB_TGWxpHKHXtNiFF2tKgq5ChP2PxqmG0gkU-6cBtiiJ9s4MoxiZAK6-57oQVdD_PqqGEomhzSSAYlB_MOYYvDlMh0c1ITd466MxpD5TNThP_HGT4TfLsRaeKdTmz85mOkkvfaY1BAt10k0z3nyuAXZ2q_uxi7JmOGOU3o9Zdp2GWJ2SYEasZpMCBz5FJXAjjcDeRwvSwTj2XORrtpRWxxuYhve9apFshaOzOsEiA-kRF2d6JynkKoZI93mtWaxejtqsLwdB_LJjcQ`}
        />
        <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-mono text-[10px] uppercase tracking-widest px-3 py-1">
          {category}
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="font-label-mono text-[10px] text-on-surface-variant border border-on-surface-variant px-2 py-0.5 uppercase"
            >
              {tech}
            </span>
          ))}
        </div>
        <h3 className="font-display-lg-mobile text-[32px] leading-tight mb-4 uppercase group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="font-body-md text-on-surface-variant line-clamp-3">
          {description}
        </p>
        <div className="mt-auto pt-8 flex items-center justify-between font-label-mono text-label-mono uppercase tracking-widest group-hover:text-primary transition-colors">
          <span>View Case Study</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </div>
      </div>
    </Link>
  );
};
