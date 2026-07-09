import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from '@/hooks/use-mobile'

describe('useIsMobile', () => {
  let matchMediaMock: ReturnType<typeof vi.fn>
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns false on desktop width (1024px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    })
    matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(max-width: 767px)' ? false : true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    vi.stubGlobal('matchMedia', matchMediaMock)

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('returns true on mobile width (375px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 375,
      writable: true,
    })
    matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(max-width: 767px)' ? true : false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    vi.stubGlobal('matchMedia', matchMediaMock)

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('updates value on resize event', () => {
    let listener: ((e: { matches: boolean }) => void) | null = null
    matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      addEventListener: (_: string, fn: typeof listener) => { listener = fn },
      removeEventListener: vi.fn(),
    }))
    vi.stubGlobal('matchMedia', matchMediaMock)

    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
      configurable: true,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true })
      if (listener) listener({ matches: true })
    })

    expect(result.current).toBe(true)
  })

  it('cleans up event listener on unmount', () => {
    const removeEventListener = vi.fn()
    matchMediaMock = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener,
    }))
    vi.stubGlobal('matchMedia', matchMediaMock)

    const { unmount } = renderHook(() => useIsMobile())
    unmount()

    expect(removeEventListener).toHaveBeenCalledTimes(1)
  })
})