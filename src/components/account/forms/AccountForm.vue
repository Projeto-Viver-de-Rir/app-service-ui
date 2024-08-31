<script setup  lang="ts">
import { useAccountData } from "@/stores/accountStore";
import { reactive } from "vue";
const store = useAccountData();

const props = defineProps<{
    isEditing?:Boolean
}>();

const data = reactive({
    email: store.account?.email || "",
    phone: store.account?.phone || ""
});


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
                v-model="data.email"
                :disabled="!props.isEditing"
            />
            <v-label class="mb-2 font-weight-medium">Celular</v-label>
            <VTextField
                color="primary"
                variant="outlined"
                type="tel"
                v-model="data.phone"
                v-maska="'(##) #####-####'"
                :disabled="!props.isEditing"
            />
        </div>
    </v-card-item>
</template>