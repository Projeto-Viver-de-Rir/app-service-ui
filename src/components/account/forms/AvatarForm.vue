<script setup lang="ts">
import { onMounted, ref  } from 'vue';
import defaultImage from '@/assets/images/profile/user-1.jpg';
import { useAccountData } from "@/stores/accountStore";
import { storeToRefs } from 'pinia';

const store = useAccountData();

const { account } = storeToRefs(store);
 
const currentPhoto = ref(defaultImage);
const error = ref('');

const props = defineProps({
    noHeader: {
    type: Boolean,
    default: false,
  },
});

const onFileChange = async (e: any) => {
    const file = e.target.files[0];

    if(!['image/png','image/jpeg','image/gif'].includes(file['type'])){
        error.value = "Formato de arquivo não permitido";
        return;
    }

    if (file['size'] > 2000000) {
        error.value = "A foto deve ter no máximo 2 MB";
        return;
    }

    error.value = '';

    currentPhoto.value = URL.createObjectURL(file);
    await store.uploadPhoto(file);
}

const openFileDialog = () => {
    document.getElementById('fileInputAvatar')?.click();
}

const reset = () => {
    error.value = '';
    currentPhoto.value = defaultImage;

    const input = document.getElementById('fileInputAvatar');
    input.value = '';

    if (store.account) store.account.photo = '';
}

onMounted(async () => {
    if (account.value?.volunteer.photo) {
        currentPhoto.value = account.value?.volunteer.photo
    }
});
</script>
<template>
    <v-card-item>
        <h5 class="text-h5" v-if="!props.noHeader">Alteração de perfil</h5>
        <div class="text-subtitle-1 text-medium-emphasis mt-2" v-if="!props.noHeader">Altere sua foto de perfil aqui</div>
        <div class="text-center mt-6 mb-6">
            <v-avatar size="120">
                <img :src="currentPhoto" height="120" alt="image" />
            </v-avatar>
            <v-file-input id="fileInputAvatar" :onChange=onFileChange accept="image/png, image/jpeg, image/gif" style="display: none;"></v-file-input>
        </div>
        <div class="d-flex justify-center">
            <v-btn color="primary" class="mx-2" flat :onclick=openFileDialog>Selecionar</v-btn>
            <v-btn color="error" class="mx-2" variant="outlined" flat :onClick=reset>Redefinir</v-btn>
        </div>
        <div v-if="error" class="mt-5">
            <v-alert color="error">
                <p class="pl-5">{{ error }}</p>
            </v-alert>
        </div>
        <div class="text-subtitle-1 text-medium-emphasis text-center my-sm-8 my-6">Formatos permitidos: JPG, GIF ou PNG. Tamanho máximo 2MB</div>
    </v-card-item>
</template>