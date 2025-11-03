
import { forwardRef, useCallback } from 'react'
import type React from 'react'
import { gsap } from 'gsap'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  const onMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { y: -2, scale: 1.04, duration: 0.2, ease: 'power3.out' })
  }, [])

  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.2, ease: 'power3.out' })
  }, [])

  return (
    <button
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
