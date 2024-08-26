<script setup lang="ts">
import { reactive, ref  } from 'vue';
import defaultImage from '@/assets/images/profile/user-1.jpg';

const props = defineProps<{
    photo?: string,
    uploadAvatar: Function,
    resetAvatar: Function,
}>()
const currentPhoto = ref(props.photo ?? defaultImage);
const rules = ref([
    (value: string) => !!value || "A foto é obrigatória",
    (value: any) =>{
        return !value || !value.length || value[0].size < 2000000 || "A foto deve ter no máximo 2 MB"
    }
        
]);

const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    currentPhoto.value = URL.createObjectURL(file);
    await props.uploadAvatar(file);
}

const openFileDialog = () => {
    document.getElementById('fileInputValidation')?.click();
}

</script>
<template>
    <v-card-item>
        <h5 class="text-h5">Alteração de perfil</h5>
        <div class="text-subtitle-1 text-medium-emphasis mt-2">Altere sua foto de perfil aqui</div>
        <div class="text-center mt-6 mb-6">
            <v-avatar size="120">
                <img :src="currentPhoto" height="120" alt="image" />
            </v-avatar>
            <v-file-input id="fileInputValidation" :rules="rules" :onChange=onFileChange accept="image/png, image/jpeg, image/bmp" style="display: none;"></v-file-input>
        </div>
        <div class="d-flex justify-center">
            <v-btn color="primary" class="mx-2" flat :onclick=openFileDialog>Selecionar</v-btn>
            <v-btn color="error" class="mx-2" variant="outlined" flat :onClick=props.resetAvatar>Redefinir</v-btn>
        </div>
        <div class="text-subtitle-1 text-medium-emphasis text-center my-sm-8 my-6">Formatos permitidos: JPG, GIF ou PNG. Tamanho máximo 2MB</div>
    </v-card-item>
</template>