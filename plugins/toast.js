import { createApp } from 'vue';
import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';
export default defineNuxtPlugin(() => {
	const app = createApp();

	const options = {
		transition: 'Vue-Toastification__bounce',
		maxToasts: 20,
		newestOnTop: true
	};

	app.use(Toast, options);
});
