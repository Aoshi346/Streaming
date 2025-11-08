export type ThemeName = 'dark' | 'light'

type ColorRamp = {
	base: string
	light: string
	dark: string
}

type TextPalette = {
	primary: string
	secondary: string
	muted: string
}

type BorderPalette = {
	subtle: string
	strong: string
}

type GradientPalette = {
	page: string
	hero: string
	spotlight: string
	device: string
	button: string
}

type ShadowPalette = {
	soft: string
	strong: string
}

export type ThemePalette = {
	background: string
	surface: string
	surfaceMuted: string
	brand: ColorRamp
	accent: string
	text: TextPalette
	border: BorderPalette
	gradients: GradientPalette
	shadows: ShadowPalette
}

export const darkPalette: ThemePalette = {
	background: '#000000',
	surface: '#0d0719',
	surfaceMuted: '#1a0f2e',
	brand: {
		base: '#6d28d9',
		light: '#8b5cf6',
		dark: '#4c1d95',
	},
	accent: '#f59e0b',
	text: {
		primary: '#faf8ff',
		secondary: '#d4c5f9',
		muted: '#a78bfa',
	},
	border: {
		subtle: 'rgba(255,255,255,0.1)',
		strong: 'rgba(139,92,246,0.5)',
	},
	gradients: {
		page: 'radial-gradient(circle at top left, rgba(109,40,217,0.25), transparent 55%), radial-gradient(circle at bottom right, rgba(76,29,149,0.2), transparent 60%)',
		hero: 'radial-gradient(circle at 20% 20%, rgba(109,40,217,0.35), transparent 40%), radial-gradient(circle at 80% 0%, rgba(139,92,246,0.28), transparent 40%)',
		spotlight: 'radial-gradient(circle at 0% 0%, rgba(109,40,217,0.22), transparent 55%)',
		device: 'radial-gradient(circle at top right, rgba(139,92,246,0.32), transparent 60%), radial-gradient(circle at bottom left, rgba(76,29,149,0.4), transparent 60%)',
		button: 'linear-gradient(90deg, #6d28d9 0%, #8b5cf6 50%, #4c1d95 100%)',
	},
	shadows: {
		soft: '0 4px 24px rgba(0,0,0,0.5)',
		strong: '0 8px 48px rgba(109,40,217,0.4)',
	},
}

export const lightPalette: ThemePalette = {
	background: '#fdfcff',
	surface: '#ffffff',
	surfaceMuted: '#f5f3ff',
	brand: {
		base: '#7c3aed',
		light: '#a78bfa',
		dark: '#5b21b6',
	},
	accent: '#ec4899',
	text: {
		primary: '#1f1333',
		secondary: '#4c1d95',
		muted: '#6d28d9',
	},
	border: {
		subtle: 'rgba(124,58,237,0.15)',
		strong: 'rgba(124,58,237,0.4)',
	},
	gradients: {
		page: 'radial-gradient(circle at top left, rgba(167,139,250,0.12), transparent 55%), radial-gradient(circle at bottom right, rgba(236,72,153,0.08), transparent 60%)',
		hero: 'radial-gradient(circle at 20% 20%, rgba(167,139,250,0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(236,72,153,0.12), transparent 45%)',
		spotlight: 'radial-gradient(circle at 0% 0%, rgba(124,58,237,0.1), transparent 60%)',
		device: 'radial-gradient(circle at top right, rgba(167,139,250,0.15), transparent 55%), radial-gradient(circle at bottom left, rgba(236,72,153,0.1), transparent 60%)',
		button: 'linear-gradient(90deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)',
	},
	shadows: {
		soft: '0 4px 16px rgba(124,58,237,0.12)',
		strong: '0 8px 32px rgba(124,58,237,0.2)',
	},
}

export const palette: Record<ThemeName, ThemePalette> = {
	dark: darkPalette,
	light: lightPalette,
}

export default palette
