
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#FF6B35',
					foreground: '#FFFFFF',
					50: '#FFF5F2',
					100: '#FFE7DE',
					200: '#FFD1BE',
					300: '#FFB599',
					400: '#FF9066',
					500: '#FF6B35',
					600: '#E8481D',
					700: '#C73713',
					800: '#A52E0F',
					900: '#82270D'
				},
				secondary: {
					DEFAULT: '#F5F5F5',
					foreground: '#1A1A1A'
				},
				accent: {
					DEFAULT: '#FF6B35',
					foreground: '#FFFFFF'
				},
				black: {
					DEFAULT: '#000000',
					50: '#F7F7F7',
					100: '#E3E3E3',
					200: '#C8C8C8',
					300: '#A4A4A4',
					400: '#818181',
					500: '#666666',
					600: '#515151',
					700: '#434343',
					800: '#383838',
					900: '#1A1A1A'
				},
				orange: {
					DEFAULT: '#FF6B35',
					50: '#FFF5F2',
					100: '#FFE7DE',
					200: '#FFD1BE',
					300: '#FFB599',
					400: '#FF9066',
					500: '#FF6B35',
					600: '#E8481D',
					700: '#C73713',
					800: '#A52E0F',
					900: '#82270D'
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#F9FAFB',
					foreground: '#6B7280'
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#1A1A1A'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#1A1A1A'
				},
			},
			borderRadius: {
				lg: '0.75rem',
				md: '0.5rem',
				sm: '0.25rem'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Space Grotesk', 'system-ui', 'sans-serif'],
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'slide-down': 'slideDown 0.5s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				slideDown: {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				glow: {
					'0%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' },
					'100%': { boxShadow: '0 0 30px rgba(255, 107, 53, 0.6)' },
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'hero-gradient': 'linear-gradient(135deg, #000000 0%, #1A1A1A 50%, #000000 100%)',
				'orange-gradient': 'linear-gradient(135deg, #FF6B35 0%, #E8481D 100%)',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
