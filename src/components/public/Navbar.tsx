import Link from 'next/link'
import { personalInfo } from '@/lib/data/portfolio-data'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-6 bg-surface-container-lowest border-b border-on-surface">
      <div className="font-display-lg text-headline-md font-extrabold text-on-surface border-b-4 border-primary">
        {personalInfo.name.toUpperCase()}
      </div>
      <div className="hidden md:flex gap-8 items-center">
        <Link 
          className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold border-b-2 border-primary" 
          href="/"
        >
          Home
        </Link>
        <Link 
          className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface hover:bg-primary hover:text-on-primary transition-all duration-200 px-2 py-1" 
          href="/projects"
        >
          Projects
        </Link>
        <Link 
          className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface hover:bg-primary hover:text-on-primary transition-all duration-200 px-2 py-1" 
          href="/resume"
        >
          Resume
        </Link>
        <Link 
          className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface hover:bg-primary hover:text-on-primary transition-all duration-200 px-2 py-1" 
          href="/blog"
        >
          Blog
        </Link>
      </div>
      <div className="hidden md:block">
        <Link href="/contact" className="brutalist-button brutalist-button-primary px-6 py-3 font-label-mono text-label-mono uppercase inline-block">
          Get in Touch
        </Link>
      </div>
    </nav>
  )
}
