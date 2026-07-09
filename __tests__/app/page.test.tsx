import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home page', () => {
  it('renders Hello World heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: /hello world/i })).toBeDefined()
  })
})