/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				brown: {
					100: '#d8d5d4',
					200: '#b1aba9',
					300: '#8a827e',
					400: '#635853',
					500: '#3c2e28',
					600: '#302520',
					700: '#241c18',
					800: '#181210',
					900: '#0c0908'
				}
			}
		}
	},
	content: ['./pages/*.vue', './components/*.{js,jsx,ts,tsx,vue}']
};
