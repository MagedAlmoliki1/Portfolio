import { personalInfo } from '@/lib/data/portfolio-data'

export const Footer = () => {
  return (
    <footer className="w-full py-12 px-12 mt-stack-lg flex flex-col md:flex-row justify-between items-center gap-stack-md bg-surface-container-lowest border-t border-on-surface">
      <div className="font-display-lg text-headline-md font-black text-on-surface">
        {personalInfo.name.toUpperCase()}
      </div>
      <p className="font-label-mono text-label-mono uppercase text-on-surface text-center md:text-left">
        © {new Date().getFullYear()} {personalInfo.name.toUpperCase()}. ARCHITECTURAL INTEGRITY GUARANTEED.
      </p>
      <div className="flex gap-6">
        <a className="font-label-mono text-label-mono uppercase text-on-secondary-container hover:text-primary transition-colors hover:bg-on-surface px-2 py-1" href={personalInfo.socials.x} target="_blank" rel="noopener noreferrer">X</a>
        <a className="font-label-mono text-label-mono uppercase text-on-secondary-container hover:text-primary transition-colors hover:bg-on-surface px-2 py-1" href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a className="font-label-mono text-label-mono uppercase text-on-secondary-container hover:text-primary transition-colors hover:bg-on-surface px-2 py-1" href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </footer>
  )
}
