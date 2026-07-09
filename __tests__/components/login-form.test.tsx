import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoginForm } from '@/components/login-form'

describe('LoginForm', () => {
  it('renders the heading', () => {
    render(<LoginForm />)
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeDefined()
  })

  it('renders email input', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/email/i)).toBeDefined()
    expect(screen.getByPlaceholderText(/your@email.com/i)).toBeDefined()
  })

  it('renders password input', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/password/i)).toBeDefined()
  })

  it('renders login submit button', () => {
    render(<LoginForm />)
    const buttons = screen.getAllByRole('button')
    const submitBtn = buttons.find(
      (b) => b.getAttribute('type') === 'submit' && b.textContent === 'Login'
    )
    expect(submitBtn).toBeDefined()
  })

  it('renders forgot password link', () => {
    render(<LoginForm />)
    expect(screen.getByText(/forgot your password/i)).toBeDefined()
  })

  it('renders social login buttons', () => {
    render(<LoginForm />)
    expect(screen.getByText(/login with apple/i)).toBeDefined()
    expect(screen.getByText(/login with google/i)).toBeDefined()
    expect(screen.getByText(/login with meta/i)).toBeDefined()
  })

  it('renders signup link', () => {
    render(<LoginForm />)
    expect(screen.getByText(/sign up/i)).toBeDefined()
  })

  it('renders terms of service and privacy policy', () => {
    render(<LoginForm />)
    expect(screen.getByText(/terms of service/i)).toBeDefined()
    expect(screen.getByText(/privacy policy/i)).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<LoginForm className="custom-class" />)
    const div = container.firstChild as HTMLElement
    expect(div.className).toContain('custom-class')
  })
})