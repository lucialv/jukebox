<template>
	<div>
		<div
			class="mb-16 mt-8 bg-gradient-to-r from-fuchsia-100 via-pink-500 to-indigo-600 bg-clip-text text-center text-5xl font-bold text-transparent"
		>
			<h1>Lucía Jukebox</h1>
		</div>
		<div class="mx-8 md:mx-16">
			<div class="h-6 w-full rounded-t-full bg-zinc-800"></div>
			<div class="relative h-6 w-full bg-zinc-800">
				<div class="absolute left-0 top-0 ml-4 h-6 w-6 animate-pulse rounded-full" :style="{ backgroundColor: currentColor }"></div>
				<div class="absolute right-0 top-0 mr-4 h-6 w-6 animate-pulse rounded-full" :style="{ backgroundColor: currentColor }"></div>
			</div>
			<div class="h-6 w-full bg-zinc-800"></div>
			<div class="flex">
				<div class="h-[500px] w-[24px] bg-zinc-800 md:w-[48px]"></div>
				<div class="ml-auto h-[500px] w-[0px] bg-zinc-800 sm:w-[24px] md:w-[48px]"></div>
				<div class="h-[500px] w-full py-8 text-center sm:w-[350px]">
					<div class="mt-[100px] items-center">
						<h1
							v-if="currentSong.title == 'Not Playing A Song'"
							class="h-12 bg-gradient-to-r from-fuchsia-100 via-pink-500 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent md:text-4xl"
						>
							Not Playing A Song
						</h1>
						<h1
							v-else
							class="h-12 animate-bounce bg-gradient-to-r from-fuchsia-100 via-pink-500 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent md:text-4xl"
						>
							{{ currentSong.title }} - {{ currentSong.author }}
						</h1>
						<audio class="mx-auto mt-5" ref="audioPlayer" controls></audio>
					</div>
				</div>
				<div class="h-[500px] w-[0px] bg-zinc-800 sm:w-[24px] md:w-[48px]"></div>
				<div class="no-scrollbar h-[500px] w-full gap-4 overflow-y-scroll bg-slate-200 px-16 py-8 sm:w-[350px]">
					<div class="text-center" v-for="song in songs" :key="song.id" @click="playSong(song)">
						<button
							class="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 text-[12px] font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500 dark:text-white dark:focus:ring-purple-800 xl:text-[16px]"
						>
							<span
								class="relative min-w-[180px] rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900 xl:min-w-[215px]"
							>
								{{ song.title }} - {{ song.author }}
							</span>
						</button>
					</div>
				</div>
				<div class="h-[500px] w-[24px] bg-zinc-800 md:w-[48px]"></div>
			</div>
			<div class="h-6 w-full bg-zinc-800"></div>
			<div class="relative h-6 w-full bg-zinc-800">
				<div class="absolute left-0 top-0 ml-4 h-6 w-6 animate-pulse rounded-full" :style="{ backgroundColor: currentColor }"></div>
				<div class="absolute right-0 top-0 mr-4 h-6 w-6 animate-pulse rounded-full" :style="{ backgroundColor: currentColor }"></div>
			</div>
			<div class="mb-16 h-6 w-full rounded-b-full bg-zinc-800"></div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';

const songs = ref([]);
const currentSong = ref({ title: 'Not Playing A Song', author: '' });
const audioPlayer = ref(null);
const escuchando = ref(false);
const currentColor = ref(''); // Almacena el color actual
const animationInterval = 500;

const getRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	console.log(color);
	return color;
};

const playSong = (song) => {
	currentSong.value = song;
	audioPlayer.value.src = `/songs	song.filename}`;

	// Forzar la carga del audio antes de reproducirlo
	audioPlayer.value.load();

	// Escuchar el evento 'canplay' para reproducir la canción cuando esté lista
	audioPlayer.value.addEventListener('canplay', () => {
		audioPlayer.value.play();
		currentColor.value = getRandomColor(); // Establece el nuevo color al comenzar la canción
	});
};

onMounted(() => {
	// Obtener la lista de canciones desde /public/songs/
	const songContext = import.meta.glob('/public/songs/*.mp3');

	songs.value = Object.keys(songContext).map((key, index) => {
		const filename = key.replace('/public/songs/', '');
		return {
			id: index,
			filename,
			title: filename.split('-')[0],
			author: filename.split('-')[1].replace('.mp3', '')
		};
	});

	watchEffect(() => {
		if (escuchando) {
			// La canción se está reproduciendo, inicia la animación
			const grayDivs = document.querySelectorAll('.bg-gray-200');
			// Intervalo de cambio de color en milisegundos

			const changeColor = () => {
				grayDivs.forEach((div) => {
					// Restablecer las clases de Tailwind CSS para el color de fondo
					div.classList.remove('bg-gray-200');
					currentColor.value = getRandomColor();
					div.style.backgroundColor = currentColor.value; // Aplica el nuevo color
				});
			};

			//cambiar el color cada 500 milisegundos
			const intervalId = setInterval(changeColor, animationInterval);

			// Detener la animación cuando la canción termine o se detenga
			audioPlayer.value.addEventListener('ended', () => {
				clearInterval(intervalId);
				grayDivs.forEach((div) => {
					// Restablecer las clases de Tailwind CSS para el color de fondo
					div.style.backgroundColor = ''; // Elimina el color
					div.classList.add('bg-gray-200');
				});
			});
		}
	});
});
</script>
