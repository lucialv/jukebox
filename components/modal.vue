<template>
	<button class="absolute bottom-36 right-12 rounded-full border-2 border-opacity-20 px-4 py-4 text-white" @click="showModal">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
			/>
		</svg>
	</button>

	<fwb-modal v-if="isShowModal" @close="closeModal">
		<template #header>
			<div class="flex items-center text-lg">Upload a new Song</div>
		</template>
		<template #body>
			<div class="grid gap-y-4">
				<fwb-input v-model="name" label="Name" placeholder="Name of the song" required />
				<fwb-input v-model="author" label="Author" placeholder="Author of the song" required />
				<fwb-file-input v-model="songImage" label="Song Image">
					<p class="!mt-1 text-sm text-gray-500 dark:text-gray-300">PNG, JPG or WEBP (MAX. 800x400px).</p>
				</fwb-file-input>
				<span class="block text-sm font-medium text-gray-900 dark:text-white">Song Audio</span>
				<fwb-file-input v-model="songAudio" dropzone />
			</div>
		</template>
		<template #footer>
			<div class="flex justify-between">
				<fwb-button @click="closeModal" color="red"> Cancel </fwb-button>
				<fwb-button @click="UploadSong()" color="green"> Upload </fwb-button>
			</div>
		</template>
	</fwb-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FwbButton, FwbModal, FwbFileInput, FwbInput } from 'flowbite-vue';
import { useToast } from 'vue-toastification';

const isShowModal = ref(false);
const songImage = ref(null);
const songAudio = ref(null);
const name = ref('');
const author = ref('');

const Toast = useToast();

function saveData() {
	const songName = name.value;
	const songAuthor = author.value;
	const songImageFile = songImage.value;
	const songAudioFile = songAudio.value;

	if (!songName || !songAuthor || !songImageFile || !songAudioFile) {
		Toast.error('Complete all the fields!', {
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
		closeModal();
		return;
	} else {
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
		closeModal();
		return;
	}
}

// check if file is audio

function closeModal() {
	isShowModal.value = false;
}
function UploadSong() {
	saveData();
}
function showModal() {
	isShowModal.value = true;
	name.value = '';
	author.value = '';
	songImage.value = null;
	songAudio.value = null;
}
</script>
