import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SignupForm } from '@/components/signup-form'

describe('SignupForm', () => {
  it('renders the heading', () => {
    render(<SignupForm />)
    expect(screen.getByRole('heading', { name: /create your account/i })).toBeDefined()
  })

  it('renders email input', () => {
    render(<SignupForm />)
    expect(screen.getByLabelText(/email/i)).toBeDefined()
    expect(screen.getByPlaceholderText(/your@email.com/i)).toBeDefined()
  })

  it('renders password input', () => {
    render(<SignupForm />)
    expect(screen.getByLabelText(/^password$/i)).toBeDefined()
  })

  it('renders confirm password input', () => {
    render(<SignupForm />)
    expect(screen.getByLabelText(/confirm password/i)).toBeDefined()
  })

  it('renders create account submit button', () => {
    render(<SignupForm />)
    expect(screen.getByRole('button', { name: /create account/i })).toBeDefined()
  })

  it('renders social signup buttons', () => {
    render(<SignupForm />)
    expect(screen.getByText(/sign up with apple/i)).toBeDefined()
    expect(screen.getByText(/sign up with google/i)).toBeDefined()
    expect(screen.getByText(/sign up with meta/i)).toBeDefined()
  })

  it('renders sign in link', () => {
    render(<SignupForm />)
    expect(screen.getByText(/sign in/i)).toBeDefined()
  })

  it('renders terms of service and privacy policy', () => {
    render(<SignupForm />)
    expect(screen.getByText(/terms of service/i)).toBeDefined()
    expect(screen.getByText(/privacy policy/i)).toBeDefined()
  })

  it('applies className prop', () => {
    const { container } = render(<SignupForm className="custom-class" />)
    const div = container.firstChild as HTMLElement
    expect(div.classList).toContain('custom-class')
  })
})