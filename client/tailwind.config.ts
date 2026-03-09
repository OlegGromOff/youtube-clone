import type { Config } from 'tailwindcss'

// import { COLORS } from './src/constants/colors.constants'
import {COLORS} from './src/constants/colors.constants'



const config: Config = {
	content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
					primary: '#ef4444',
					bg: '#191B28',
					border: 'rgba(255, 255, 255, 0.07)'
			},
			padding: {
				layout: '1.2rem'
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out'
			},
			transitionDuration: {
				DEFAULT: '333ms'
			},
			screens: {
				'xs': {'max': '350px'}, // for screens 350px or smaller
			  },
		}
	},
	plugins: []
}
export default config
