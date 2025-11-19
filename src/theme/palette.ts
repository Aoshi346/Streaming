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
	// Deep purple/blue foundation
	background: '#10002b',
	// Rich purple surfaces
	surface: '#240046',
	surfaceMuted: '#3c096c',
	brand: {
		// Violet/Blue range
		base: '#7b2cbf',      // Violet
		light: '#9d4edd',     // Light Violet
		dark: '#5a189a',      // Dark Violet
	},
	// Cyan accent for high energy highlights
	accent: '#4cc9f0',        // Vivid Sky Blue
	text: {
		primary: '#ffffff',
		secondary: '#e0aaff',
		muted: '#c77dff',
	},
	border: {
		subtle: 'rgba(123, 44, 191, 0.2)',
		strong: 'rgba(76, 201, 240, 0.4)',
	},
	gradients: {
		page: 'linear-gradient(to bottom right, #10002b, #001233)',
		hero: 'linear-gradient(135deg, #3c096c 0%, #023e8a 100%)', // Purple to Blue
		spotlight: 'radial-gradient(circle at 50% 50%, rgba(60, 9, 108, 0.25), transparent 70%)',
		device: 'linear-gradient(135deg, rgba(60, 9, 108, 0.4), rgba(2, 62, 138, 0.4))',
		button: 'linear-gradient(to right, #7b2cbf, #4361ee)',
	},
	shadows: {
		soft: '0 8px 32px rgba(0, 0, 0, 0.4)',
		strong: '0 12px 48px rgba(60, 9, 108, 0.4)',
	},
}

export const lightPalette: ThemePalette = darkPalette // Unify themes

export const palette: Record<ThemeName, ThemePalette> = {
	dark: darkPalette,
	light: lightPalette,
}

export default palette
