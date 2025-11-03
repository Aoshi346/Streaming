import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders hero headline', () => {
    render(<App />)
    expect(
      screen.getByText(/Unlimited movies, TV shows, and more/i)
    ).toBeInTheDocument()
  })
})
