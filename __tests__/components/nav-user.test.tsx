import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NavUser } from '@/components/nav-user'
import { SidebarProvider } from '@/components/ui/sidebar'

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/avatars/john.jpg',
}

function renderWithSidebar(ui: React.ReactElement) {
  return render(<SidebarProvider>{ui}</SidebarProvider>)
}

describe('NavUser', () => {
  it('renders user name', () => {
    renderWithSidebar(<NavUser user={mockUser} />)
    expect(screen.getByText('John Doe')).toBeDefined()
  })

  it('renders user email', () => {
    renderWithSidebar(<NavUser user={mockUser} />)
    expect(screen.getByText('john@example.com')).toBeDefined()
  })

  it('renders avatar with fallback initials', () => {
    renderWithSidebar(<NavUser user={mockUser} />)
    expect(screen.getByText('CN')).toBeDefined()
  })

  it('renders multiple buttons (dropdown trigger + menu button)', () => {
    renderWithSidebar(<NavUser user={mockUser} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })
})