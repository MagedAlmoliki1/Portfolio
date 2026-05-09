import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg mb-section-padding">
        {/* Page Header */}
        <header className="mb-stack-lg">
          <span className="font-label-mono text-label-mono text-primary uppercase block mb-stack-sm">
            Latest Updates & Insights
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background max-w-4xl">
            I share my thoughts on software architecture, coding best practices,
            and the tools I use daily.
          </h1>
        </header>

        {/* Featured Article */}
        <section className="border border-on-surface mb-section-padding group">
          <div className="flex flex-col md:flex-row">
            {/* Left Content */}
            <div className="w-full md:w-[55%] bg-[#030202] text-on-primary p-8 md:p-12 flex flex-col justify-center">
              <span className="font-label-mono text-label-mono text-primary uppercase border border-primary px-3 py-1 self-start mb-stack-md">
                Architecture
              </span>
              <h2 className="font-headline-md text-headline-md mb-stack-md text-white">
                Decoupling Monoliths: A Pragmatic Approach to Microservices
                Integration
              </h2>
              <p className="font-body-lg text-body-lg text-surface-variant mb-stack-lg">
                Transitioning from a monolithic architecture doesn't have to
                mean a complete rewrite. We explore a phased, strangler-fig
                pattern approach to introducing microservices while maintaining
                high availability and architectural integrity.
              </p>
              <a
                className="font-label-mono text-label-mono uppercase flex items-center gap-2 hover:text-primary transition-colors self-start pb-1 border-b border-on-primary hover:border-primary"
                href="#"
              >
                Read Article{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </a>
            </div>
            {/* Right Image */}
            <div className="w-full md:w-[45%] h-[300px] md:h-auto border-t md:border-t-0 md:border-l border-on-surface overflow-hidden relative">
              <img
                alt="Server racks"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC44K9mo89lNis9VvTotSwnA5U_pFI_0ViLwXwTgIWTVBNzqLLdqvM9VnfRIg4dBOOQFfL0-kPmbsiDXBvwuXT7PGxbqlN2PVtZRAiz6F1GVaAggH8i2rr7F5Zmi_wqtvkzSMyLI3K4bBwYgUWxTdu96K0OV6rfNzIqM61tEqZYADIG9PwdQSziWVgQQ0f75z3WoqiqtnP8t5ScfDeVS3nLUU5oYZkdRF5IQeUrWlHP2byYY5uvAj0Y2kN933-z7yKjQiC19xLxmx8"
              />
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            <BlogCard
              title="Optimizing Developer Workflows with Custom CLI Tools"
              category="Tooling"
              date="Oct 12, 2023"
              readTime="5 min read"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuB_TGWxpHKHXtNiFF2tKgq5ChP2PxqmG0gkU-6cBtiiJ9s4MoxiZAK6-57oQVdD_PqqGEomhzSSAYlB_MOYYvDlMh0c1ITd466MxpD5TNThP_HGT4TfLsRaeKdTmz85mOkkvfaY1BAt10k0z3nyuAXZ2q_uxi7JmOGOU3o9Zdp2GWJ2SYEasZpMCBz5FJXAjjcDeRwvSwTj2XORrtpRWxxuYhve9apFshaOzOsEiA-kRF2d6JynkKoZI93mtWaxejtqsLwdB_LJjcQ"
            />
            <BlogCard
              title="The Case for Immutable Data Structures in Modern UIs"
              category="Best Practices"
              date="Sep 28, 2023"
              readTime="8 min read"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDfqoHq_HWay2Kmn252m74JMZ5Qh4Cqu3UL_H-vEdyk40fEmRwXji8NztHMXhLEREmCkMq5iOZ4cDzkDqmdDZ3ScL8w6g-KjLhwOWI8YezlU2D3Gf_hREXbuioEIhPbg8azpAwG86gZ2UNJ7kjaiEFapwRujtJIqj0D8-qK7TIaOb99mvaNppJvy7eeCrMa2hrDFtGDQm7wCbb32rik_XjxOEYZVd_C_0ICx3kcGBIK2ZWVhhcM-ilpM1gPeVXAsh9w4ya8nbJ063A"
            />
            <BlogCard
              title="Caching Strategies for High-Traffic Next.js Applications"
              category="System Design"
              date="Sep 15, 2023"
              readTime="12 min read"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDywmO1PlEjLj3vs0EZYVmEQ3w4HngFnu3p-xoET5WEqn62JBbx74S0MldI18q9gKMtAXpAUD8xMl3ofrxDmC9VQfCnRqNLAMOC5axLDmQg81QuMoi2LsCA2MTyNpQySN_UzIVnhCEXXTu_HtbAiwYh57x9y0xJVZaqJLM0u_zKFCg7acEZkg1tbehUmSjvKLCH0TKRPgl-V1vVw4m_kwFJTqy1fa8XvtR6zSThAhanahx6IBff9r1Jn83RboaFbxKjnKGpdEi5h6s"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function BlogCard({
  title,
  category,
  date,
  readTime,
  image,
}: {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}) {
  return (
    <article className="border border-on-surface hover:bg-surface-container transition-colors group cursor-pointer p-6 flex flex-col h-full">
      <div className="h-[200px] border border-on-surface mb-stack-md overflow-hidden bg-on-background relative">
        <img
          alt={title}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          src={image}
        />
      </div>
      <span className="font-label-mono text-label-mono text-primary uppercase mb-stack-sm block">
        {category}
      </span>
      <h3 className="font-headline-md text-[24px] leading-[32px] font-bold mb-stack-md flex-grow">
        {title}
      </h3>
      <div className="font-label-mono text-label-mono text-on-surface-variant uppercase mt-auto pt-stack-sm border-t border-on-surface">
        {date} • {readTime}
      </div>
    </article>
  );
}
