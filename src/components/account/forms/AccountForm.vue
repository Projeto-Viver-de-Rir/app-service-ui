<script setup  lang="ts">
const props = defineProps<{
    email?: String,
    cellphone?: String,
    isEditing?:Boolean
}>();
</script>
<template>
    <v-card-item>
        <h5 class="text-h5">Itens essenciais</h5>
        <div class="text-subtitle-1 text-medium-emphasis mt-2">To change your password please confirm here</div>
        <div class="mt-5">
            <v-label class="mb-2 font-weight-medium">E-mail</v-label>
            <VTextField
                color="primary"
                variant="outlined"
                type="email"
                v-model="props.email"
                :disabled="!props.isEditing"
            />
            <v-label class="mb-2 font-weight-medium">Celular</v-label>
            <VTextField
                color="primary"
                variant="outlined"
                type="tel"
                v-model="props.cellphone"
                v-maska="'(##) #####-####'"
                :disabled="!props.isEditing"
            />
        </div>
    </v-card-item>
</template>