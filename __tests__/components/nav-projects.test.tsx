import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NavProjects } from '@/components/nav-projects'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Folder, type LucideIcon } from 'lucide-react'

const mockProjects: { name: string; url: string; icon: LucideIcon }[] = [
  { name: 'Project A', url: '/projects/a', icon: Folder },
  { name: 'Project B', url: '/projects/b', icon: Folder },
]

function renderWithSidebar(ui: React.ReactElement) {
  return render(<SidebarProvider>{ui}</SidebarProvider>)
}

describe('NavProjects', () => {
  it('renders the group label', () => {
    renderWithSidebar(<NavProjects projects={mockProjects} />)
    expect(screen.getByText('Projects')).toBeDefined()
  })

  it('renders all project names', () => {
    renderWithSidebar(<NavProjects projects={mockProjects} />)
    expect(screen.getByText('Project A')).toBeDefined()
    expect(screen.getByText('Project B')).toBeDefined()
  })

  it('renders project links', () => {
    renderWithSidebar(<NavProjects projects={mockProjects} />)
    const linkA = screen.getByText('Project A').closest('a')
    expect(linkA?.getAttribute('href')).toBe('/projects/a')
  })

  it('renders the More button text', () => {
    renderWithSidebar(<NavProjects projects={mockProjects} />)
    const moreElements = screen.getAllByText('More')
    expect(moreElements.length).toBeGreaterThanOrEqual(1)
  })
})