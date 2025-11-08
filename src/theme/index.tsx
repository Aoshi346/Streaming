import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import palette, { darkPalette, type ThemeName, type ThemePalette } from './palette'

type ThemeContextValue = {
	theme: ThemeName
	setTheme: (theme: ThemeName) => void
	palette: ThemePalette
}

const STORAGE_KEY = 'fullvision-theme'

const ThemeContext = createContext<ThemeContextValue>({
	theme: 'dark',
	setTheme: () => {},
	palette: darkPalette,
})

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const hexToRgb = (hex: string): string => {
	const normalized = hex.replace('#', '')
	const value = normalized.length === 3
		? normalized.split('').map((char) => char + char).join('')
		: normalized

	const int = parseInt(value, 16)
	const r = (int >> 16) & 255
	const g = (int >> 8) & 255
	const b = int & 255
	return `${r} ${g} ${b}`
}

const setColorVariable = (root: HTMLElement, key: string, hex: string) => {
	root.style.setProperty(`--color-${key}`, hex)
	root.style.setProperty(`--color-${key}-rgb`, hexToRgb(hex))
}

const applyPalette = (themePalette: ThemePalette) => {
	if (typeof document === 'undefined') return

	const root = document.documentElement

	setColorVariable(root, 'background', themePalette.background)
	setColorVariable(root, 'surface', themePalette.surface)
	setColorVariable(root, 'surface-muted', themePalette.surfaceMuted)

	setColorVariable(root, 'brand-base', themePalette.brand.base)
	setColorVariable(root, 'brand-light', themePalette.brand.light)
	setColorVariable(root, 'brand-dark', themePalette.brand.dark)

	setColorVariable(root, 'accent', themePalette.accent)

	setColorVariable(root, 'text-primary', themePalette.text.primary)
	setColorVariable(root, 'text-secondary', themePalette.text.secondary)
	setColorVariable(root, 'text-muted', themePalette.text.muted)

	setColorVariable(root, 'border-subtle', themePalette.border.subtle)
	setColorVariable(root, 'border-strong', themePalette.border.strong)

	root.style.setProperty('--gradient-page', themePalette.gradients.page)
	root.style.setProperty('--gradient-hero', themePalette.gradients.hero)
	root.style.setProperty('--gradient-spotlight', themePalette.gradients.spotlight)
	root.style.setProperty('--gradient-device', themePalette.gradients.device)
	root.style.setProperty('--gradient-button', themePalette.gradients.button)

	root.style.setProperty('--shadow-soft', themePalette.shadows.soft)
	root.style.setProperty('--shadow-strong', themePalette.shadows.strong)
}

type ThemeProviderProps = {
	initialTheme?: ThemeName
	children: ReactNode
}

export function ThemeProvider({ initialTheme = 'dark', children }: ThemeProviderProps) {
	const [theme, setThemeState] = useState<ThemeName>(() => {
		if (typeof window === 'undefined') return initialTheme
		const stored = window.localStorage.getItem(STORAGE_KEY)
		if (stored === 'dark' || stored === 'light') return stored
		return initialTheme
	})

	const setTheme = useCallback((next: ThemeName) => {
		setThemeState((current) => (current === next ? current : next))
	}, [])

	useIsomorphicLayoutEffect(() => {
		const activePalette = palette[theme]
		applyPalette(activePalette)
		if (typeof document !== 'undefined') {
			document.documentElement.dataset.theme = theme
			document.documentElement.style.setProperty('color-scheme', theme)
		}
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(STORAGE_KEY, theme)
		}
	}, [theme])

	const value = useMemo<ThemeContextValue>(() => ({
		theme,
		setTheme,
		palette: palette[theme],
	}), [theme, setTheme])

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

export const themePalette = palette

export default ThemeProvider
