import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock GSAP
vi.mock('gsap', () => {
  const tweenMock = {
    kill: vi.fn(),
    pause: vi.fn(),
    play: vi.fn(),
  }
  
  const gsapMock = {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({
      revert: vi.fn(),
    })),
    timeline: vi.fn(() => ({
      from: vi.fn(() => tweenMock),
      to: vi.fn(() => tweenMock),
      progress: vi.fn(),
      restart: vi.fn(),
    })),
    set: vi.fn(),
    killTweensOf: vi.fn(),
    to: vi.fn(() => tweenMock),
    from: vi.fn(() => tweenMock),
    fromTo: vi.fn(() => tweenMock),
    utils: {
      toArray: vi.fn(() => []),
    },
    core: {
      Timeline: class {
        to() { return this }
        progress() { return this }
        restart() { return this }
      }
    }
  }
  return {
    gsap: gsapMock,
    default: gsapMock,
  }
})

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}))
