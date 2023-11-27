// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', 'nuxt-vuefire'],
	plugins: ['@/plugins/toast.js'],
	vuefire: {
		config: {
			apiKey: 'YOUR_API_KEY',
			authDomain: 'YOUR_AUTH_DOMAIN',
			databaseURL: 'YOUR_DATABASE_URL',
			projectId: 'YOUR_PROJECT_ID',
			storageBucket: 'YOUR_STORAGE_BUCKET',
			messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
			appId: 'YOUR_APP_ID'
		}
	},
	app: {
		head: {
			title: 'Lucía JukeBox',
			htmlAttrs: { lang: 'en' },
			link: [
				{ rel: 'canonical', href: 'https://jukebox.mishu.dev' },
				{ rel: 'icon', href: '/catboxx.webp' }
			],
			meta: [
				{
					'http-equiv': 'Cache-Control',
					content: '1y'
				},
				{ 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
				{ 'http-equiv': 'Expires', content: '1y' },
				{ 'http-equiv': 'Pragma', content: '1y' },
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
				{ name: 'apple-mobile-web-app-title', content: 'Lucía Álvarez' },
				{ name: 'application-name', content: 'Lucía Álvarez' },
				{ name: 'audience', content: 'all' },
				{ name: 'author', content: 'Lucía Álvarez, mishudiscord@gmail.com' },
				{ name: 'coverage', content: 'Worldwide' },
				{ name: 'theme-color', content: '#F7FEE7' },
				{
					name: 'description',
					content: 'Lucía JukeBoxo'
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1, maximum-scale=5'
				},
				{ name: 'designer', content: 'Lucía Álvarez, mishudiscord@gmail.com' },
				{ name: 'distribution', content: 'Global' },
				{ name: 'googlebot', content: 'index,follow' },
				{ name: 'HandheldFriendly', content: 'True' },
				{ name: 'identifier-URL', content: 'https://jukebox.mishu.dev' },
				{
					name: 'keywords',
					content: 'mishu, Lucía Álvarez Portfolio, Lucía Álvarez, Lucía Portfolio, mishu portfolio'
				},
				{ name: 'msapplication-config', content: '/browserconfig.xml' },
				{ name: 'msapplication-TileColor', content: '#F7FEE7' },
				{ name: 'owner', content: 'Lucía Álvarez, mishudiscord@gmail.com' },
				{ name: 'rating', content: 'safe for kids' },
				{ name: 'reply-to', content: 'mishudiscord@gmail.com' },
				{ name: 'revisit-after', content: '7 days' },
				{
					name: 'robots',
					content: 'archive,follow,imageindex,index,odp,snippet,translate'
				},
				{ name: 'shortlink', content: 'https://jukebox.mishu.dev' },
				{
					name: 'subject',
					content: 'Lucía JukeBox'
				},
				{
					name: 'summary',
					content: 'Lucía JukeBox.'
				},
				{ name: 'url', content: 'https://jukebox.mishu.dev' },
				{
					property: 'og:description',
					content: 'Lucía JukeBox'
				},
				{ property: 'og:email', content: 'mishudiscord@gmail.com' },
				{ property: 'og:locale', content: 'en_US' },
				{ property: 'og:site_name', content: 'Lucía Álvarez' },
				{ property: 'og:title', content: 'Lucía Jukebox' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: 'https://jukebox.mishu.dev' },
				{ property: 'og:image', content: '/metaimage.png' },
				{ property: 'twitter:card', content: 'summary_large_image' },
				{ property: 'twitter:creator', content: '@lucialv' },
				{ property: 'twitter:site', content: '@lucialv' },
				{ property: 'twitter:title', content: 'Lucía Jukebox' },
				{ property: 'twitter:url', content: 'https://jukebox.mishu.dev' },
				{ property: 'twitter:image', content: '/metaimage.png' },
				{ property: 'twitter:description', content: 'Lucía JukeBox' }
			]
		}
	}
});
