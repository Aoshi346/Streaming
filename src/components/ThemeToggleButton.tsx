import { HiSun } from 'react-icons/hi'
import Button from './Button'

const ThemeToggleButton = () => {

  return (
    <Button
      aria-label={`Tema claro`}
      disabled
      title="Solo tema claro disponible"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary focus:outline-none"
    >
      <HiSun className="h-5 w-5" />
    </Button>
  )
}

export default ThemeToggleButton
