<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const primary = ref('rgb(var(--v-theme-primary))');
const secondary = ref('rgb(var(--v-theme-secondary))');
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img src="@/assets/images/logos/logo-vdr.jpg" alt="favicon" style="height: 70px;"/>
        </RouterLink>
    </div>
</template>
