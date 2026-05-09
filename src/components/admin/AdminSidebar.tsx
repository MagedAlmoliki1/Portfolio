import Link from 'next/link'

export const AdminSidebar = () => {
  return (
    <aside className="w-[240px] bg-surface-container-lowest border-r border-on-surface fixed h-full flex flex-col z-40 hidden md:flex">
      <div className="p-gutter border-b border-on-surface h-[88px] flex items-center">
        <span className="font-display-lg-mobile text-headline-md text-on-surface border-b-4 border-primary">
          MAGED ALMOLIKY
        </span>
      </div>
      <div className="p-gutter flex items-center gap-4 border-b border-on-surface">
        <div className="w-12 h-12 bg-surface-variant border border-on-surface flex items-center justify-center overflow-hidden">
          <img
            alt="Admin Avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGBjCdSQ3cmaq8awQJFpSl6srkTYKsvgMUqsHJ_RLPTden-572L4SQi5l6B38YnH0TSX3OK57W0mMWhjhylIUnxcehqtcQIno5pVIFX_B6EIz1_ZVeSxN3A8XBPaKz7EEgIVH8bjlZm7vk0PM-NnV_6exj4LGD4t9PWnAHNPDSImIdbtVXP_4VVISwk2Sdt0M8e1O7C15xFPlpZQrsOstECPEjh4XY64-uH5QqpPWhimGefAowegqUyjaTKt1EyLk0Wskmk08Siuk"
          />
        </div>
        <div>
          <div className="font-label-mono text-label-mono uppercase font-bold">
            Admin User
          </div>
          <div className="font-label-mono text-[10px] uppercase text-on-surface-variant mt-1">
            Superadmin
          </div>
        </div>
      </div>
      <nav className="flex-1 py-stack-md flex flex-col gap-2 px-4">
        <SidebarLink href="/admin/dashboard" icon="dashboard" label="Dashboard" active />
        <SidebarLink href="/admin/projects" icon="folder_open" label="Projects" />
        <SidebarLink href="/admin/certificates" icon="workspace_premium" label="Certificates" />
        <SidebarLink href="/admin/resume" icon="description" label="Resume" />
        <SidebarLink href="/admin/settings" icon="settings" label="Settings" />
      </nav>
      <div className="p-4 border-t border-on-surface">
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container font-label-mono text-label-mono uppercase transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </Link>
      </div>
    </aside>
  )
}

function SidebarLink({ href, icon, label, active = false }: { href: string; icon: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 ${
        active ? "bg-on-surface text-on-primary" : "text-on-surface hover:bg-surface-variant"
      } font-label-mono text-label-mono uppercase transition-colors`}
    >
      <span className="material-symbols-outlined" style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>
        {icon}
      </span>
      {label}
    </Link>
  )
}
