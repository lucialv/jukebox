<template>
	<div class="relative h-[600px] w-[400px] rounded-t-full bg-brown-700 p-12 pb-0 shadow-2xl" v-if="currentSong">
		<!-- Background gradient -->
		<div
			class="absolute inset-x-0 top-0 z-10 h-[500px] animate-[ping_0.8s_linear_infinite] rounded-t-full"
			:style="{
				backgroundColor: currentSong.color
			}"
		></div>
		<div
			class="absolute inset-x-0 top-0 z-10 h-[500px] rounded-t-full animate-[pulse_0.8s_cubic-bezier(0.4,_0,_0.6,_1)_infinite]  "
			:style="{
				backgroundColor: currentSong.color
			}"
		></div>

		<!-- Content -->
		<div class="relative z-20 flex h-full w-full flex-col gap-6 rounded-t-full bg-brown-500 p-8">
			<!-- top decoration -->
			<div class="h-[130px] w-full rounded-t-full bg-brown-700"></div>

			<!-- sound -->
			<div class="flex items-center justify-between rounded-2xl bg-brown-400 p-4 py-6">
				<button @click="changeSong(-1)">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-8 w-8 stroke-2 text-brown-500 hover:text-brown-200"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
				</button>

				<div class="text-center">
					<p class="text-2xl font-semibold text-brown-100">{{ currentSong.title }}</p>
					<p class="text-lg font-medium text-brown-200">{{ currentSong.author }}</p>
				</div>

				<button @click="changeSong(1)">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-8 w-8 stroke-2 text-brown-500 hover:text-brown-200"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</button>
			</div>

			<!-- Inter gradient -->
			<div
				class="w-full flex-1 rounded-b-full  animate-[pulse_0.8s_cubic-bezier(0.4,_0,_0.6,_1)_infinite]"
				:style="{
					backgroundColor: currentSong.color
				}"
			></div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import getRandomColor from '../utils/getRandomColor';

const songs = ref([]);
const currentSong = ref(null);
const ElmAudioPlayer = ref(null);

onMounted(() => {
	// Crear elm audioplayer
	if (!ElmAudioPlayer.value) {
		ElmAudioPlayer.value = document.createElement('audio');
	}

	// Cargar/seleccionar canciones
	const songContext = import.meta.glob('/public/songs/*.mp3');
	const songsData = Object.keys(songContext).map((key, index) => {
		const filename = key.replace('/public/songs/', '');
		return {
			id: index,
			filename,
			title: filename.split('-')[0],
			author: filename.split('-')[1].replace('.mp3', ''),
			color: getRandomColor()
		};
	});

	songs.value = songsData;
	playSong(songsData[0])
});

// Handlers
const changeSong = (skip = 1) => {
	if (!songs.value) {
		return;
	}

	const newSound = songs.value.at(currentSong.value.id === songs.value.length - 1 && skip > 0 ? 0 : currentSong.value.id + skip);
	playSong(newSound);
};

const playSong = (song) => {
  console.log(ElmAudioPlayer.value)
	if (!ElmAudioPlayer.value) {
		return;
	}

	currentSong.value = song;
	ElmAudioPlayer.value.src = `/songs/${song.filename}`;

	ElmAudioPlayer.value.load();

	ElmAudioPlayer.value.addEventListener('canplay', () => {
		ElmAudioPlayer.value.play();
	});
};
</script>
