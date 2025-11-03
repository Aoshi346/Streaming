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
	surfaceMuted: '#120d22',
	brand: {
		base: '#4c1d95',
		light: '#7c3aed',
		dark: '#2e1065',
	},
	accent: '#f59e0b',
	text: {
		primary: '#f8f5ff',
		secondary: '#c7c1d9',
		muted: '#9ca3af',
	},
	border: {
		subtle: 'rgba(255,255,255,0.08)',
		strong: 'rgba(124,58,237,0.4)',
	},
	gradients: {
			page: 'radial-gradient(circle at top left, rgba(76,29,149,0.22), transparent 55%), radial-gradient(circle at bottom right, rgba(37,8,77,0.2), transparent 60%)',
		hero: 'radial-gradient(circle at 20% 20%, rgba(76,29,149,0.3), transparent 40%), radial-gradient(circle at 80% 0%, rgba(124,58,237,0.25), transparent 40%)',
		spotlight: 'radial-gradient(circle at 0% 0%, rgba(76,29,149,0.18), transparent 55%)',
			device: 'radial-gradient(circle at top right, rgba(124,58,237,0.28), transparent 60%), radial-gradient(circle at bottom left, rgba(47,14,94,0.35), transparent 60%)',
		button: 'linear-gradient(90deg, #4c1d95 0%, #7c3aed 50%, #2e1065 100%)',
	},
	shadows: {
		soft: '0 0 30px rgba(12,10,26,0.45)',
		strong: '0 0 60px rgba(32,16,64,0.35)',
	},
}

export const lightPalette: ThemePalette = {
	background: '#f8fafc',
	surface: '#ffffff',
	surfaceMuted: '#ede9fe',
	brand: {
		base: '#4c1d95',
		light: '#7c3aed',
		dark: '#2e1065',
	},
	accent: '#d97706',
	text: {
		primary: '#0f172a',
		secondary: '#334155',
		muted: '#64748b',
	},
	border: {
		subtle: 'rgba(79,70,229,0.12)',
		strong: 'rgba(76,29,149,0.28)',
	},
	gradients: {
			page: 'radial-gradient(circle at top left, rgba(124,58,237,0.18), transparent 55%), radial-gradient(circle at bottom right, rgba(94,53,177,0.16), transparent 55%)',
			hero: 'radial-gradient(circle at 20% 20%, rgba(124,58,237,0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(111,76,255,0.15), transparent 40%)',
			spotlight: 'radial-gradient(circle at 0% 0%, rgba(124,58,237,0.14), transparent 60%)',
			device: 'radial-gradient(circle at top right, rgba(124,58,237,0.22), transparent 55%), radial-gradient(circle at bottom left, rgba(94,53,177,0.18), transparent 55%)',
		button: 'linear-gradient(90deg, #7c3aed 0%, #5b21b6 60%, #4c1d95 100%)',
	},
	shadows: {
		soft: '0 10px 30px rgba(15,23,42,0.12)',
		strong: '0 20px 45px rgba(79,70,229,0.18)',
	},
}

export const palette: Record<ThemeName, ThemePalette> = {
	dark: darkPalette,
	light: lightPalette,
}

export default palette
