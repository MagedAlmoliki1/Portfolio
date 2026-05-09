import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { 
  personalInfo, 
  professionalSummary, 
  experiences, 
  education, 
  certifications, 
  technicalSkills,
  languages,
  projects
} from "@/lib/data/portfolio-data";

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-section-padding">
        
        {/* Header */}
        <section className="py-12 border-b-4 border-on-surface">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-4">
            <h1 className="font-display-2xl text-display-lg-mobile md:text-display-lg uppercase leading-none">
              Curriculum <br className="hidden md:block"/> Vitae
            </h1>
            <a 
              href="/resume.pdf" 
              download 
              className="brutalist-button px-8 py-4 bg-[#030202] text-[#FFFFFF] font-label-mono text-label-mono uppercase tracking-widest flex items-center gap-3 hover:bg-primary transition-all border-2 border-on-surface"
            >
              <span className="material-symbols-outlined">download</span>
              Download PDF
            </a>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-end mt-12">
            <div>
              <h2 className="font-headline-md text-primary uppercase">{personalInfo.name}</h2>
              <p className="font-label-mono text-on-surface-variant uppercase tracking-widest">{personalInfo.title}</p>
            </div>
            <div className="flex flex-col gap-1 font-label-mono text-sm text-on-surface-variant text-right">
              <span>{personalInfo.email}</span>
              <span>{personalInfo.phone}</span>
              <span>{personalInfo.location}</span>
              <span className="text-primary font-bold">{personalInfo.availability}</span>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="py-16 border-b border-on-surface grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <h3 className="font-label-mono uppercase tracking-widest text-primary sticky top-32">Summary</h3>
          </div>
          <div className="md:col-span-9">
            <p className="font-body-lg text-on-surface leading-relaxed">
              {professionalSummary}
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="py-16 border-b border-on-surface grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <h3 className="font-label-mono uppercase tracking-widest text-primary sticky top-32">Experience</h3>
          </div>
          <div className="md:col-span-9 flex flex-col gap-16">
            {experiences.map((exp, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline border-b-2 border-on-surface pb-4">
                  <h4 className="font-headline-md uppercase">{exp.role}</h4>
                  <span className="font-label-mono text-on-surface-variant whitespace-nowrap">{exp.period}</span>
                </div>
                <div className="flex flex-col gap-1 mb-4">
                  <span className="font-body-md font-bold text-primary">{exp.company}</span>
                  {exp.project && <span className="font-label-mono text-sm">Project: {exp.project}</span>}
                  <span className="font-label-mono text-sm text-on-surface-variant">{exp.location}</span>
                </div>
                <ul className="list-[square] pl-6 flex flex-col gap-3">
                  {exp.achievements.map((achievement, aIdx) => (
                    <li key={aIdx} className="font-body-md text-on-surface-variant">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Key Projects */}
        <section className="py-16 border-b border-on-surface grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <h3 className="font-label-mono uppercase tracking-widest text-primary sticky top-32">Key Projects</h3>
          </div>
          <div className="md:col-span-9 flex flex-col gap-16">
            {projects.map((proj, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline border-b-2 border-on-surface pb-4">
                  <h4 className="font-headline-md uppercase">{proj.title}</h4>
                </div>
                <div className="flex flex-col gap-4 mb-4">
                  <p className="font-body-md text-on-surface-variant">
                    {proj.description}
                  </p>
                  <div>
                    <span className="font-label-mono text-sm uppercase tracking-widest text-primary block mb-2">Tech Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {proj.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="px-3 py-1 border border-on-surface text-sm font-label-mono text-on-surface-variant bg-surface-container-low">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <ul className="list-[square] pl-6 flex flex-col gap-3">
                  {proj.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="font-body-md text-on-surface-variant">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="py-16 border-b border-on-surface grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <h3 className="font-label-mono uppercase tracking-widest text-primary sticky top-32">Technical Skills</h3>
          </div>
          <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {technicalSkills.map((category, idx) => (
              <div key={idx} className="flex flex-col gap-4 border-l-4 border-on-surface pl-6">
                <h4 className="font-label-mono uppercase font-bold">{category.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3 py-1 bg-surface-container border border-on-surface font-body-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <h3 className="font-label-mono uppercase tracking-widest text-primary sticky top-32">Education & Certs</h3>
          </div>
          <div className="md:col-span-9 flex flex-col gap-16">
            {/* Education */}
            <div className="flex flex-col gap-4">
              <h4 className="font-headline-md uppercase border-b-2 border-on-surface pb-4">Education</h4>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline">
                <span className="font-body-lg font-bold">{education.degree}</span>
                <span className="font-label-mono text-on-surface-variant">{education.period}</span>
              </div>
              <span className="font-body-md text-primary">{education.university} — {education.location}</span>
              <div className="mt-4">
                <span className="font-label-mono uppercase text-sm mb-2 block">Relevant Coursework</span>
                <div className="flex flex-wrap gap-2">
                  {education.coursework.map((course, idx) => (
                    <span key={idx} className="px-3 py-1 border border-on-surface font-body-md text-sm">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex flex-col gap-4">
              <h4 className="font-headline-md uppercase border-b-2 border-on-surface pb-4">Certifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="p-6 border border-on-surface bg-surface-container-low hover:bg-surface-variant transition-colors">
                    <h5 className="font-body-md font-bold mb-2">{cert.title}</h5>
                    <div className="flex flex-col gap-1 font-label-mono text-sm text-on-surface-variant">
                      <span>{cert.issuer}</span>
                      {cert.platform && <span>Platform: {cert.platform}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="flex flex-col gap-4">
              <h4 className="font-headline-md uppercase border-b-2 border-on-surface pb-4">Languages</h4>
              <div className="flex flex-col gap-2">
                {languages.map((lang, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 border border-on-surface">
                    <span className="font-body-md font-bold">{lang.language}</span>
                    <span className="font-label-mono text-primary">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
