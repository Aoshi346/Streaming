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
		// Purple/magenta brand ramp used for cards/boxes (from image)
		base: '#7c3aed',      // Vivid purple
		light: '#a78bfa',     // Light purple
		dark: '#6f1b7a',      // Deep magenta-purple
	},
	// Warm pink accent (from image)
	accent: '#ff6f91',
	text: {
		primary: '#000000',
		secondary: '#ff6f91',
		muted: '#6b7280',
	},
	border: {
		subtle: 'rgba(0, 0, 0, 0.08)',
		strong: 'rgba(0, 0, 0, 0.14)',
	},
	gradients: {
		page: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
		// Subtle hero overlay using brand purple → navy from the image, kept lightweight for readability on white
		hero: 'linear-gradient(180deg, rgba(111,27,122,0.12) 0%, rgba(15,58,132,0.12) 100%)',
		// Spotlight cyan glow from image accents
		spotlight: 'radial-gradient(circle at 50% 40%, rgba(61,220,247,0.12), transparent 60%)',
		// Slight device tint with navy
		device: 'linear-gradient(180deg, rgba(250,250,250,0.95), rgba(19,42,111,0.06))',
		// Light button gradient with a soft pink tail
		button: 'linear-gradient(90deg, #ffffff 0%, #f3f4f6 70%, rgba(255,111,145,0.20) 100%)',
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
