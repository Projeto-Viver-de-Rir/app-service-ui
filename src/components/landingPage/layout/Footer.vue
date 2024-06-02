<script setup lang="ts">
import { BrandFacebookIcon, BrandInstagramIcon } from 'vue-tabler-icons';;
</script>
<template>
    <v-container>
        <v-row class="mt-10">
                <v-col cols="12" md="1" sm="1" class="pl-sm-3 pt-sm-6 pr-sm-2">
                    <div class="text-center">
                        <img src="@/assets/images/logos/logo-vdr.jpg" alt="favicon" style="height: 80px;"/>
                    </div>    
                </v-col>
                <v-col cols="12" md="2" sm="2" class="pl-sm-3 pt-sm-6 pr-sm-2">
                    <div class="text-center">
                        <a href="/" class="text-body-1 text-primary text-decoration-none"><h6 class="text-body-1 mt-3 mb-6 text-13">Pagina Inicial</h6></a>
                        <!-- <a href="/our-team" class="text-body-1 text-primary text-decoration-none"><h6 class="text-body-1 mt-3 mb-6 text-13">Nossa Equipe</h6></a> -->
                        <a href="/contact" class="text-body-1 text-primary text-decoration-none"><h6 class="text-body-1 mt-3 mb-6 text-13">Contato</h6></a>
                        <a href="/login" class="text-body-1 text-primary text-decoration-none"><h6 class="text-body-1 mt-3 mb-6 text-13">Login</h6></a>
                    </div>    
                </v-col>                
                <v-col cols="12" md="5" sm="5" class="pl-sm-3 pt-sm-6 pr-sm-2">
                    <div class="text-center">
                        <h6 class="text-body-1 mt-3 mb-6 text-13">Av. Assis Brasil, 3257 - Sala 307</h6>
                        <h6 class="text-body-1 mt-3 mb-6 text-13">Cristo Redentor, Porto Alegre</h6>
                        <h6 class="text-body-1 mt-3 mb-6 text-13">RS, 91010-007</h6>
                        <h6 class="text-body-1 mt-3 mb-6 text-13">Brasil</h6>
                    </div>    
                </v-col>
                <v-col cols="12" md="3" sm="3" class="pl-sm-3 pt-sm-6 pr-sm-2">
                    <div class="text-center">
                        <h6 class="text-body-1 mt-3 mb-6 text-13">E-mail: projetoviverderir@gmail.com</h6>
                        <h6 class="text-body-1 mt-3 mb-6 text-13">CNPJ: 17.838.115/0001-52</h6>
                    </div>    
                </v-col>
                <v-col cols="12" md="1" sm="1" class="pl-sm-3 pt-sm-6 pr-sm-2">
                    <div class="text-center">
                        <a href="https://www.facebook.com/ongviverderir/">
                            <component :is="BrandFacebookIcon" stroke-width="1.5" class="text-primary" size="40" />
                        </a>
                        <a href="https://www.instagram.com/ongviverderir/">
                            <component :is="BrandInstagramIcon" stroke-width="1.5" class="text-primary" size="40" />
                        </a>
                    </div>    
                </v-col>                                                
            </v-row>        
    </v-container>
</template>


<style lang="scss" scoped>
.v-container {
    max-width: 1200px !important;
}
</style>