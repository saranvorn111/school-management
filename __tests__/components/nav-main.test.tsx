import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NavMain } from '@/components/nav-main'
import { SidebarProvider } from '@/components/ui/sidebar'

const mockItems: {
  title: string
  url: string
  icon?: React.ComponentType
  isActive?: boolean
  items?: { title: string; url: string }[]
}[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    isActive: true,
    items: [
      { title: 'Analytics', url: '/dashboard/analytics' },
      { title: 'Reports', url: '/dashboard/reports' },
    ],
  },
  {
    title: 'Settings',
    url: '/settings',
    items: [],
  },
]

function renderWithSidebar(ui: React.ReactElement) {
  return render(<SidebarProvider>{ui}</SidebarProvider>)
}

describe('NavMain', () => {
  it('renders the group label', () => {
    renderWithSidebar(<NavMain items={mockItems} />)
    expect(screen.getByText('Platform')).toBeDefined()
  })

  it('renders all main items', () => {
    renderWithSidebar(<NavMain items={mockItems} />)
    expect(screen.getByText('Dashboard')).toBeDefined()
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('renders sub-items for items that are active', () => {
    renderWithSidebar(<NavMain items={mockItems} />)
    expect(screen.getByText('Analytics')).toBeDefined()
    expect(screen.getByText('Reports')).toBeDefined()
  })
})