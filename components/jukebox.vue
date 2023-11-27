<template>
	<fwb-modal v-if="isShowModal" @close="closeModal()">
		<template #header>
			<div class="flex items-center text-lg">
				Escoge una canción!
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="ml-2 h-6 w-6">
					<path
						fill-rule="evenodd"
						d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		</template>
		<template #body>
			<div class="rounded-2xl">
				<h1 class="mb-4 text-2xl font-bold text-white">Listado de Canciones</h1>
				<ul class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<li v-for="(song, index) in songList" :key="index">
						<button
							class="min-w-[250px] max-w-[250px] rounded-lg"
							:class="{
								'animate-pulse border-2 border-blue-300 bg-blue-100': song !== selectedSong ? song === selectedSong : 'bg-white'
							}"
							@click="selectSong(song)"
						>
							<div class="flex items-center">
								<img :src="song.image" alt="Song Image" class="max-h-[100px] min-h-[100px] min-w-[100px] max-w-[100px] rounded-lg" />
								<p class="ml-2 inline-block">{{ song.name }} - {{ song.author }}</p>
							</div>
						</button>
					</li>
					<li>
						<Modal />
					</li>
				</ul>
			</div>
		</template>
	</fwb-modal>
	<div class="relative h-[600px] w-[400px] rounded-t-full bg-brown-700 p-12 pb-0 shadow-2xl" v-if="currentSong">
		<!-- Background gradient -->
		<div
			class="absolute inset-x-0 top-0 z-10 h-[500px] rounded-t-full"
			:style="{
				backgroundColor: currentSong.color
			}"
			:class="{
				'animate-[ping_0.8s_linear_infinite]': isNotPlaying,
				'animate-[pulse_0.4s_linear_infinite]': !isNotPlaying
			}"
		></div>
		<div
			class="absolute inset-x-0 top-0 z-10 h-[500px] rounded-t-full"
			:style="{
				backgroundColor: currentSong.color
			}"
			:class="{
				'animate-[ping_0.8s_linear_infinite]': isNotPlaying,
				'animate-[pulse_0.4s_cubic-bezier(0.4,_0,_0.6,_1)_infinite]': !isNotPlaying
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

				<div class="marquee-container overflow-hidden text-center">
					<button class="min-w-[145px] max-w-[145px]" @click="tooglePausePlay()">
						<p class="text-2xl font-semibold text-brown-100">
							{{ currentSong.name.charAt(0).toUpperCase() + currentSong.name.slice(1) }}
						</p>
						<p class="text-lg font-medium text-brown-200">
							{{ currentSong.author.charAt(0).toUpperCase() + currentSong.author.slice(1) }}
						</p>
					</button>
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
				class="w-full flex-1 rounded-b-full"
				:style="{
					backgroundColor: currentSong.color
				}"
			>
				<button @click="showModal()" class="flex h-full w-full items-center justify-center rounded-b-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="3"
						stroke="currentColor"
						class="h-8 w-8 text-white"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { FwbModal} from 'flowbite-vue';
import { useFirebaseStorage} from 'vuefire';
import { useToast } from 'vue-toastification';

const Toast = useToast();
const storage = useFirebaseStorage();

const songList = ref([]);
const isShowModal = ref(false);
const currentSong = ref(null);
const ElmAudioPlayer = ref(null);
const isNotPlaying = ref(false);
const selectedSong = ref(null);

function closeModal() {
	isShowModal.value = false;
}

function showModal() {
	isShowModal.value = true;
}

const selectSong = (song) => {
  closeModal(); // Cierra el modal al seleccionar una canción
  changeSongToSelected(song);
};

const changeSongToSelected = (song) => {
  if (!songList.value || songList.value.length === 0) {
    console.error('La lista de canciones está vacía');
    return;
  }

  const newIndex = songList.value.findIndex((s) => s === song);

  if (newIndex === -1) {
    console.error('No se pudo encontrar la canción en la lista');
    return;
  }

  console.log('Canción seleccionada:', songList.value[newIndex]);
  playSong(songList.value[newIndex]);
  Toast.success('Canción cambiada correctamente!', {
		timeout: 5000,
		closeOnClick: true,
		pauseOnFocusLoss: true,
		pauseOnHover: false,
		draggable: true,
		draggablePercent: 0.6,
		showCloseButtonOnHover: false,
		hideProgressBar: false,
		closeButton: 'button',
		icon: true,
		rtl: false
	});
};

onMounted(async () => {
	const songsRef = storageRef(storage, 'songs');

	// Listar todos los elementos dentro de la carpeta "songs"
	const folders = await listAll(songsRef);
	if (folders.prefixes.length === 0) {
		console.log('No hay elementos en la carpeta "songs"');
	} else {
		// Crear el elemento de audio
		const Audio = document.createElement('audio');
		Audio.addEventListener('ended', () => {
			changeSong(1);
		});

		ElmAudioPlayer.value = Audio;

		// Array para almacenar las promesas de las URLs de audio
		const audioUrlPromises = [];

		for (const folder of folders.prefixes) {
			const audioFileRef = storageRef(storage, `songs/${folder.name}/audio`);
			const imageFileRef = storageRef(storage, `songs/${folder.name}/image`);

			// Obtener la URL del archivo de audio y añadir la promesa al array
			const audioUrlPromise = getDownloadURL(audioFileRef);
			audioUrlPromises.push(audioUrlPromise);

			// Obtener la URL del archivo de imagen
			const imageUrl = await getDownloadURL(imageFileRef);

			// Agregar la información necesaria a la lista
			songList.value.push({
				name: folder.name.split('-')[0],
				author: folder.name.split('-')[1],
				audio: null, // Inicializar como null
				image: imageUrl,
				color: getRandomColor()
			});
		}

		// Esperar a que todas las promesas se resuelvan
		const audioUrls = await Promise.all(audioUrlPromises);

		// Asignar las URLs de audio a las canciones
		songList.value.forEach((song, index) => {
			song.audio = audioUrls[index];
		});

		// Cargar la primera canción si la lista no está vacía
		if (songList.value.length > 0) {
			playSong(songList.value[0]);
		} else {
			console.error('La lista de canciones está vacía');
		}

		console.log(ElmAudioPlayer.value);
	}
});

const changeSong = (skip = 1) => {
  console.log('Cambiando canción...');
  if (!songList.value || songList.value.length === 0) {
    console.error('La lista de canciones está vacía');
    return;
  }

  let newIndex;

  if (currentSong.value) {
    newIndex = songList.value.findIndex(song => song === currentSong.value);
    if (newIndex === -1) {
      console.error('No se pudo encontrar la canción actual en la lista');
      return;
    }
  } else {
    newIndex = 0;
  }

  newIndex = (newIndex + skip + songList.value.length) % songList.value.length;

  if (!songList.value[newIndex]) {
    console.error('La canción no está definida');
    return;
  }

  console.log('Canción cambiada:', songList.value[newIndex]);
  playSong(songList.value[newIndex]);  // Reproducir la nueva canción
};
const playSong = (song) => {
  console.log('Reproduciendo canción:', song);
  if (!ElmAudioPlayer.value) {
    console.error('El elemento de audio no está definido');
    return;
  }

  if (!song) {
    console.error('La canción no está definida');
    return;
  }

  // Asigna la canción actual a la referencia
  selectedSong.value = song;

  currentSong.value = song;
  ElmAudioPlayer.value.src = song.audio;

  ElmAudioPlayer.value.load();

  ElmAudioPlayer.value.addEventListener('canplay', () => {
    ElmAudioPlayer.value.play();
    isNotPlaying.value = true;
  });
};

const tooglePausePlay = () => {
	if (!ElmAudioPlayer.value) {
		return;
	}

	if (ElmAudioPlayer.value.paused) {
		ElmAudioPlayer.value.play();
		isNotPlaying.value = true;
	} else {
		ElmAudioPlayer.value.pause();
		isNotPlaying.value = false;
	}
};
</script>

<style scoped>
@keyframes marquee {
	0% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(-100%);
	}
}

.marquee-container {
	overflow: hidden;
	white-space: nowrap;
}

.marquee-content {
	display: inline-block;
	animation: marquee 10s linear infinite;
	transition: transform 0.5s ease-in-out; /* Ajusta la duración y la función de temporización según sea necesario */
}
</style>
