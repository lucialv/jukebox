<template>
	<button @click="showModal" class="h-[100px] min-w-[250px] max-w-[250px] rounded-lg border-2 border-green-300 bg-green-100">
		<div class="flex items-center justify-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-12 w-12 text-green-300"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>

			<h1 class="ml-2 font-semibold">Subir una nueva canción</h1>
		</div>
	</button>

	<fwb-modal v-if="isShowModal" @close="closeModal()">
		<template #header>
			<div class="flex items-center text-lg">
				Sube una nueva canción
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
			<div class="grid gap-y-4">
				<fwb-input v-if="!nameStatus" v-model="name" label="Nombre" placeholder="Nombre de la canción" required />
				<fwb-input
					v-else-if="nameStatus"
					v-model="name"
					label="Nombre"
					placeholder="Nombre de la canción"
					required
					validation-status="error"
				/>
				<fwb-input v-if="!authorStatus" v-model="author" label="Autor" placeholder="Autor de la canción" required />
				<fwb-input
					v-else-if="authorStatus"
					v-model="author"
					label="Autor"
					placeholder="Author of the song"
					required
					validation-status="error"
				/>
				<span class="block text-sm font-medium text-gray-900 dark:text-white">Imagen de la canción</span>
				<fwb-file-input v-model="songImage" dropzone />
				<p class="!mt-1 text-sm text-gray-500 dark:text-gray-300">Solo formato JPEG, PNG o GIF!</p>

				<span class="block text-sm font-medium text-gray-900 dark:text-white">Audio de la canción</span>
				<fwb-file-input v-model="songAudio" dropzone />
				<p class="!mt-1 text-sm text-gray-500 dark:text-gray-300">Solo formato MP3!</p>
			</div>
		</template>
		<template #footer>
			<div class="flex justify-between">
				<fwb-button @click="closeModal()" color="red"> Cancelar </fwb-button>
				<fwb-button @click="UploadSong()" color="green"> Subir </fwb-button>
			</div>
		</template>
	</fwb-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FwbButton, FwbModal, FwbFileInput, FwbInput } from 'flowbite-vue';
import { ref as storageRef } from 'firebase/storage';
import { useFirebaseStorage, useStorageFile } from 'vuefire';
import { useToast } from 'vue-toastification';

const storage = useFirebaseStorage();

const nameStatus = ref(false);
const authorStatus = ref(false);

const isShowModal = ref(false);
const songImage = ref<File | null>(null);
const songAudio = ref<File | null>(null);
const name = ref('');
const author = ref('');

const Toast = useToast();

function closeModal() {
	isShowModal.value = false;
}

function showModal() {
	isShowModal.value = true;
}

function saveData() {
	const songName = name.value.trim().replace(/[\\/]/g, ' ');
	const songAuthor = author.value.trim().replace(/[\\/]/g, ' ');
	const songImageFile = songImage.value;
	const songAudioFile = songAudio.value;
	if (!songName && !songAuthor) {
		nameStatus.value = true;
		authorStatus.value = true;
		Toast.error('Completa todos los campos!', {
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
		return;
	} else {
		nameStatus.value = false;
		authorStatus.value = false;
	}
	if (!songName) {
		nameStatus.value = true;
		Toast.error('Completa todos los campos!', {
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
		return;
	} else {
		nameStatus.value = false;
	}
	if (!songAuthor) {
		authorStatus.value = true;
		Toast.error('Completa todos los campos!', {
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
		return;
	} else {
		authorStatus.value = false;
	}
	if (!songImageFile || !songAudioFile) {
		Toast.error('Completa todos los campos!', {
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
		return;
	}

	const imageUploadRef = storageRef(storage, `songs/${songName}-${songAuthor}/image`);
	const audioUploadRef = storageRef(storage, `songs/${songName}-${songAuthor}/audio`);

	const { upload: uploadImage } = useStorageFile(imageUploadRef);
	const { upload: uploadAudio } = useStorageFile(audioUploadRef);

	console.log(songImageFile?.type, songAudioFile?.type);
	const songData = {
		name: songName,
		author: songAuthor,
		image: songImageFile,
		audio: songAudioFile
	};
	if (!['image/jpeg', 'image/png', 'image/gif'].includes(songImageFile?.type)) {
		Toast.error('La imagen debe ser JPEG, PNG o GIF!', {
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
		return;
	} else if (!['audio/mpeg'].includes(songAudioFile?.type)) {
		Toast.error('El audio debe ser MP3!', {
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
		return;
	} else {
		const { image, audio } = songData;
		uploadImage(image);
		uploadAudio(audio);
		Toast.success('Song uploaded successfully!', {
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
		name.value = '';
		author.value = '';
		songImage.value = null;
		songAudio.value = null;
		closeModal();
	}
}

function UploadSong() {
	saveData();

	setTimeout(() => {
		location.reload();
	}, 5000);
}
</script>
