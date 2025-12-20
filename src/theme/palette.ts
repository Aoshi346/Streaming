export type ThemeName = 'light'

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

export const lightPalette: ThemePalette = {
	// All-white base palette (starting from scratch)
	background: '#ffffff',
	// Slightly off-white surfaces to create depth
	surface: '#fbfbfb',
	surfaceMuted: '#f3f4f6',
	brand: {
		// Purple brand ramp used for cards/boxes
		base: '#7c3aed',      // Vivid purple
		light: '#a78bfa',     // Light purple
		dark: '#4c1d95',      // Deep purple
	},
	// Pink accent used across UI accents
	accent: '#ec4899',
	text: {
		primary: '#000000',
		secondary: '#ec4899',
		muted: '#6b7280',
	},
	border: {
		subtle: 'rgba(0, 0, 0, 0.08)',
		strong: 'rgba(0, 0, 0, 0.14)',
	},
	gradients: {
		page: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
		hero: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.96) 100%)',
		spotlight: 'radial-gradient(circle at 50% 40%, rgba(0,0,0,0.035), transparent 60%)',
		device: 'linear-gradient(180deg, rgba(250,250,250,0.95), rgba(245,245,245,0.9))',
		button: 'linear-gradient(90deg, #ffffff 0%, #f3f4f6 100%)',
	},
	shadows: {
		soft: '0 6px 18px rgba(0, 0, 0, 0.08)',
		strong: '0 12px 36px rgba(0, 0, 0, 0.12)',
	},
}

export const palette: Record<ThemeName, ThemePalette> = {
	light: lightPalette,
}

export default palette
