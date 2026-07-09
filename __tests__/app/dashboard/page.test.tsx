import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '@/app/dashboard/page'

describe('Dashboard page', () => {
  it('renders sidebar trigger button', () => {
    render(<Page />)
    expect(screen.getByText(/toggle sidebar/i)).toBeDefined()
  })

  it('renders breadcrumb with Data Fetching', () => {
    render(<Page />)
    const items = screen.getAllByText('Data Fetching')
    expect(items.length).toBeGreaterThanOrEqual(1)
  })

  it('renders breadcrumb link to Build Your Application', () => {
    render(<Page />)
    const items = screen.getAllByText('Build Your Application')
    expect(items.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the sidebar via AppSidebar', () => {
    render(<Page />)
    expect(screen.getByText('Documentation')).toBeDefined()
  })

  it('renders content placeholder divs', () => {
    const { container } = render(<Page />)
    const mutedDivs = container.querySelectorAll('.bg-muted\\/50')
    expect(mutedDivs.length).toBeGreaterThanOrEqual(4)
  })
})