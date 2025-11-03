import { useTheme } from '../theme'
import { HiSun, HiMoon } from 'react-icons/hi'
import Button from './Button'

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-light/60 hover:text-text-primary focus:outline-none focus-visible:ring focus-visible:ring-brand-light/60"
    >
      {theme === 'light' ? <HiMoon className="h-5 w-5" /> : <HiSun className="h-5 w-5" />}
    </Button>
  )
}

export default ThemeToggleButton