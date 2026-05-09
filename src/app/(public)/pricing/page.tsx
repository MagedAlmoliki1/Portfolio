import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-section-padding pt-32">
        {/* Header */}
        <header className="text-center mb-stack-lg md:mb-[120px]">
          <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary border border-primary px-4 py-2 inline-block mb-8">
            Hire Me / Pricing
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg max-w-4xl mx-auto">
            Let's Build Something Great Together
          </h1>
        </header>

        {/* Pricing Cards Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end max-w-5xl mx-auto">
          {/* Card 1: Monthly Retainer */}
          <div className="border border-on-surface p-8 md:p-12 bg-surface-container-lowest hover:bg-[#F9F2E7] transition-colors duration-300 group">
            <h2 className="font-label-mono text-label-mono uppercase tracking-widest mb-4">
              Monthly Retainer
            </h2>
            <p className="font-body-md text-body-md text-on-secondary-container mb-8">
              Perfect for ongoing development and continuous improvements.
            </p>
            <div className="mb-8 border-b border-on-surface pb-8">
              <span className="font-display-lg-mobile text-display-lg-mobile">
                $1200
              </span>
              <span className="font-label-mono text-label-mono text-on-secondary-container">
                / month
              </span>
            </div>
            <ul className="space-y-4 mb-12">
              <PricingFeature label="40 hours of development time" />
              <PricingFeature label="Weekly progress meetings" />
              <PricingFeature label="Priority bug fixes" />
              <PricingFeature label="Code review & optimization" />
            </ul>
            <a
              className="block w-full text-center font-label-mono text-label-mono uppercase tracking-widest bg-on-surface text-surface-container-lowest border border-on-surface py-4 hover:bg-primary hover:border-primary transition-all duration-200"
              href="#"
            >
              Start Monthly
            </a>
          </div>

          {/* Card 2: Project-Based */}
          <div
            className="border border-on-surface bg-on-surface text-surface-container-lowest p-8 md:p-12 lg:pb-16 relative hover:-translate-y-2 hover:translate-x-2 transition-transform duration-300"
            style={{ boxShadow: "-8px 8px 0px 0px #B50A01" }}
          >
            <div className="absolute top-0 right-0 bg-primary text-on-primary font-label-mono text-label-mono uppercase tracking-widest px-4 py-2 border-b border-l border-on-surface">
              Popular
            </div>
            <h2 className="font-label-mono text-label-mono uppercase tracking-widest mb-4 mt-4">
              Project-Based
            </h2>
            <p className="font-body-md text-body-md text-[#ccc5c4] mb-8">
              Ideal for clearly defined scopes and fixed timelines.
            </p>
            <div className="mb-8 border-b border-surface-container-lowest pb-8">
              <span className="font-display-lg-mobile text-display-lg-mobile">
                Custom Price
              </span>
            </div>
            <ul className="space-y-4 mb-12">
              <PricingFeature label="Comprehensive requirement analysis" isDark />
              <PricingFeature label="Dedicated project management" isDark />
              <PricingFeature label="Custom architectural design" isDark />
              <PricingFeature label="Full deployment support" isDark />
              <PricingFeature label="30 days post-launch warranty" isDark />
            </ul>
            <a
              className="block w-full text-center font-label-mono text-label-mono uppercase tracking-widest bg-primary text-on-primary border border-primary py-4 hover:bg-surface-container-lowest hover:text-on-surface hover:border-on-surface transition-all duration-200"
              href="#"
            >
              Request an Estimate
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PricingFeature({
  label,
  isDark = false,
}: {
  label: string;
  isDark?: boolean;
}) {
  return (
    <li
      className={`flex items-start gap-4 font-body-md text-body-md pt-4 border-t ${
        isDark ? "border-surface-container-lowest" : "border-on-surface"
      } first:border-t-0 first:pt-0`}
    >
      <span
        className="material-symbols-outlined text-primary"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        check
      </span>
      <span>{label}</span>
    </li>
  );
}
