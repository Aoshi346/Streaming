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
	// Pure black foundation for maximum contrast
	background: '#000000',
	// Deep purple-black surfaces for depth
	surface: '#0a0014',
	surfaceMuted: '#15001f',
	brand: {
		// Vibrant purple range - primary brand color
		base: '#a855f7',      // Purple 500 - main brand
		light: '#c084fc',     // Purple 400 - hover states
		dark: '#7e22ce',      // Purple 700 - pressed states
	},
	// Gold accent for premium feel and visual interest
	accent: '#fbbf24',        // Gold/Amber 400 - for dots, icons, highlights
	text: {
		// High contrast white for readability
		primary: '#ffffff',
		// Soft lavender for secondary text
		secondary: '#e9d5ff',  // Purple 200
		// Medium purple for muted text
		muted: '#c4b5fd',      // Purple 300
	},
	border: {
		// Subtle white borders for elegant separation
		subtle: 'rgba(255, 255, 255, 0.08)',
		// Gold borders for premium emphasis
		strong: 'rgba(251, 191, 36, 0.4)',
	},
	gradients: {
		// Deep purple atmospheric gradients
		page: 'radial-gradient(circle at top left, rgba(126, 34, 206, 0.15), transparent 60%), radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.1), transparent 65%)',
		hero: 'radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.25), transparent 50%), radial-gradient(circle at 80% 0%, rgba(192, 132, 252, 0.18), transparent 50%)',
		spotlight: 'radial-gradient(circle at 0% 0%, rgba(126, 34, 206, 0.2), transparent 60%)',
		device: 'radial-gradient(circle at top right, rgba(168, 85, 247, 0.28), transparent 65%), radial-gradient(circle at bottom left, rgba(126, 34, 206, 0.22), transparent 65%)',
		// Purple to gold gradient for premium buttons
		button: 'linear-gradient(135deg, #a855f7 0%, #c084fc 40%, #fbbf24 100%)',
	},
	shadows: {
		// Soft black shadows for depth
		soft: '0 4px 32px rgba(0, 0, 0, 0.6)',
		// Strong gold glow shadows for premium emphasis
		strong: '0 8px 56px rgba(251, 191, 36, 0.35)',
	},
}

export const lightPalette: ThemePalette = {
	// Soft warm white foundation for comfortable reading
	background: '#fefdfb',
	// White surfaces with subtle warmth
	surface: '#ffffff',
	// Light purple-tinted surface for cards
	surfaceMuted: '#faf5ff', // Purple 50
	brand: {
		// Deep vibrant purple - strong contrast on light backgrounds
		base: '#7e22ce',      // Purple 700 - main brand (high contrast)
		light: '#9333ea',     // Purple 600 - hover states
		dark: '#6b21a8',      // Purple 800 - pressed states
	},
	// Warm gold accent for premium feel
	accent: '#f59e0b',        // Amber 500 - warm gold
	text: {
		// Pure black for maximum readability
		primary: '#000000',
		// Deep purple for high-contrast secondary text
		secondary: '#6b21a8',  // Purple 800 (AA+ contrast)
		// Medium purple for muted text with good readability
		muted: '#7e22ce',      // Purple 700 (AA contrast)
	},
	border: {
		// Visible purple borders with good contrast
		subtle: 'rgba(126, 34, 206, 0.2)',
		// Strong purple borders for clear separation
		strong: 'rgba(126, 34, 206, 0.6)',
	},
	gradients: {
		// Subtle purple and gold atmospheric gradients
		page: 'radial-gradient(circle at top left, rgba(168, 85, 247, 0.08), transparent 55%), radial-gradient(circle at bottom right, rgba(245, 158, 11, 0.06), transparent 60%)',
		hero: 'radial-gradient(circle at 20% 20%, rgba(126, 34, 206, 0.12), transparent 45%), radial-gradient(circle at 80% 0%, rgba(245, 158, 11, 0.08), transparent 50%)',
		spotlight: 'radial-gradient(circle at 0% 0%, rgba(126, 34, 206, 0.15), transparent 55%)',
		device: 'radial-gradient(circle at top right, rgba(168, 85, 247, 0.1), transparent 60%), radial-gradient(circle at bottom left, rgba(245, 158, 11, 0.08), transparent 60%)',
		// Purple to gold gradient for premium buttons - high visibility
		button: 'linear-gradient(135deg, #7e22ce 0%, #9333ea 40%, #f59e0b 100%)',
	},
	shadows: {
		// Strong visible shadows for depth
		soft: '0 4px 24px rgba(0, 0, 0, 0.12)',
		// Deep purple shadows for emphasis and separation
		strong: '0 8px 48px rgba(126, 34, 206, 0.25)',
	},
}

export const palette: Record<ThemeName, ThemePalette> = {
	dark: darkPalette,
	light: lightPalette,
}

export default palette
