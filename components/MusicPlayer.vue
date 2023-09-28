<template>
	<div>
		<div class="mt-8 bg-gradient-to-r from-fuchsia-100 via-pink-500 to-indigo-600 bg-clip-text text-center text-5xl font-bold text-transparent">
			<h1>Lucía Jukebox</h1>
		</div>
		<div class="mt-16 h-6 w-full bg-zinc-700"></div>
		<div class="grid w-full grid-cols-2 gap-4 bg-slate-200 py-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
		<div class="mb-16 h-6 w-full bg-zinc-700"></div>
		<div class="text-center">
			<h1
				v-if="currentSong.title == 'Not Playing A Song'"
				class="h-12 bg-gradient-to-r from-fuchsia-100 via-pink-500 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent"
			>
				Not Playing A Song
			</h1>
			<h1 v-else class="h-12 bg-gradient-to-r from-fuchsia-100 via-pink-500 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent">
				{{ currentSong.title }} - {{ currentSong.author }}
			</h1>
			<audio class="mx-auto mt-5" ref="audioPlayer" controls></audio>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const songs = ref([]);
const currentSong = ref({ title: 'Not Playing A Song', author: '' });
const audioPlayer = ref(null);

const playSong = (song) => {
	currentSong.value = song;
	audioPlayer.value.src = `/songs/${song.filename}`;

	// Forzar la carga del audio antes de reproducirlo
	audioPlayer.value.load();

	// Escuchar el evento 'canplay' para reproducir la canción cuando esté lista
	audioPlayer.value.addEventListener('canplay', () => {
		audioPlayer.value.play();
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
});
</script>
