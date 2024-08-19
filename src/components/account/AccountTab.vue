<script setup lang="ts">
import { ref  } from 'vue';
import userImage from '@/assets/images/profile/user-1.jpg';

const props = defineProps<{
    tab: String,
    changeTab: Function,
    email?: String,
    cellphone?: String,        
    uploadAvatar: Function,
}>()

const imageUrl = ref(userImage);
const rules = ref([
    (value: { size: number }) =>
        !value || value.size < 2000000 || "Avatar size should be less than 2 MB!",
]);

const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    imageUrl.value = URL.createObjectURL(file);
    await props.uploadAvatar(file);
}

const openFileDialog = () => {
    document.getElementById('fileInputValidation')?.click();
}
</script>

<template>
    <v-card elevation="10" >
        <v-row class="ma-sm-n2 ma-n1">
            <v-col cols="12" sm="6">
                <v-card elevation="10">
                    <v-card-item>
                        <h5 class="text-h5">Alteração de perfil</h5>
                        <div class="text-subtitle-1 text-medium-emphasis mt-2">Altere sua foto de perfil aqui</div>
                        <div class="text-center mt-6 mb-6">
                            <v-avatar size="120">
                                <img :src="imageUrl" height="120" alt="image" />
                            </v-avatar>
                            <v-file-input id="fileInputValidation" :rules="rules" :onChange=onFileChange accept="image/png, image/jpeg, image/bmp" style="display: none;"></v-file-input>
                        </div>
                        <div class="d-flex justify-center">
                            <v-btn color="primary" class="mx-2" flat :onclick=openFileDialog>Selecionar</v-btn>
                            <v-btn color="error" class="mx-2" variant="outlined" flat>Redefinir</v-btn>
                        </div>
                        <div class="text-subtitle-1 text-medium-emphasis text-center my-sm-8 my-6">Permitido JPG, GIF ou PNG. Tamanho máximo 800K</div>
                    </v-card-item>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card elevation="10">
                    <v-card-item>
                        <h5 class="text-h5">Itens essenciais</h5>
                        <div class="text-subtitle-1 text-medium-emphasis mt-2">To change your password please confirm here</div>
                        <div class="mt-5">
                            <v-label class="mb-2 font-weight-medium">E-mail</v-label>
                            <v-text-field
                                color="primary"
                                variant="outlined"
                                type="email"
                                v-model="props.email"
                                :disabled="true"
                            />
                            <v-label class="mb-2 font-weight-medium">Celular</v-label>
                            <v-text-field
                                color="primary"
                                variant="outlined"
                                type="tel"
                                v-model="props.cellphone"
                                :disabled="true"
                            />
                        </div>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <div class="d-flex justify-end mt-5">
            <v-btn size="large" color="primary" class="mr-4" flat @click="props.changeTab">Continuar</v-btn>
        </div>
    </v-card>
</template>
