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
		// Neutral brand ramp (dark tones for contrast)
		base: '#0f172a',      // Dark slate for UI accents
		light: '#374151',     // Lighter slate
		dark: '#020617',      // Almost black for emphasis
	},
	// Warm accent for highlights
	accent: '#f59e0b',
	text: {
		primary: '#0b1220',
		secondary: '#334155',
		muted: '#6b7280',
	},
	border: {
		subtle: 'rgba(15, 23, 42, 0.06)',
		strong: 'rgba(2, 6, 23, 0.08)',
	},
	gradients: {
		page: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
		hero: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(245,245,245,0.95) 100%)',
		spotlight: 'radial-gradient(circle at 50% 40%, rgba(0,0,0,0.03), transparent 60%)',
		device: 'linear-gradient(180deg, rgba(250,250,250,0.9), rgba(245,245,245,0.85))',
		button: 'linear-gradient(90deg, #ffffff 0%, #f3f4f6 100%)',
	},
	shadows: {
		soft: '0 6px 18px rgba(15, 23, 42, 0.06)',
		strong: '0 12px 36px rgba(15, 23, 42, 0.09)',
	},
}

export const palette: Record<ThemeName, ThemePalette> = {
	light: lightPalette,
}

export default palette
