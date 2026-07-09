import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TeamSwitcher } from '@/components/team-switcher'
import { SidebarProvider } from '@/components/ui/sidebar'
import { GalleryVerticalEndIcon, type LucideIcon } from 'lucide-react'

const mockTeams: { name: string; logo: LucideIcon; plan: string }[] = [
  { name: 'Acme Corp', logo: GalleryVerticalEndIcon, plan: 'Enterprise' },
  { name: 'Startup Inc', logo: GalleryVerticalEndIcon, plan: 'Free' },
]

function renderWithSidebar(ui: React.ReactElement) {
  return render(<SidebarProvider>{ui}</SidebarProvider>)
}

describe('TeamSwitcher', () => {
  it('renders the active team name', () => {
    renderWithSidebar(<TeamSwitcher teams={mockTeams} />)
    expect(screen.getByText('Acme Corp')).toBeDefined()
  })

  it('renders the active team plan', () => {
    renderWithSidebar(<TeamSwitcher teams={mockTeams} />)
    expect(screen.getByText('Enterprise')).toBeDefined()
  })

  it('renders nothing when teams array is empty', () => {
    const { container } = renderWithSidebar(<TeamSwitcher teams={[]} />)
    // TeamSwitcher returns null, so only the SidebarProvider wrapper renders
    const wrapperDiv = container.firstChild as HTMLElement
    expect(wrapperDiv.children.length).toBe(0)
  })

  it('renders dropdown trigger button', () => {
    renderWithSidebar(<TeamSwitcher teams={mockTeams} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })
})