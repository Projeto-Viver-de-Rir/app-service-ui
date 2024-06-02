<script setup lang="ts">
import { ref } from 'vue';
</script>
<template>
    <div class="overflow-hidden">
        <v-container class="" id="demos">
            <v-row class="justify-center">
                <v-col cols="12" lg="8" sm="10" data-aos="fade-up" data-aos-duration="500">
                    <h2 class="text-center mt-4 sectionTitle font-weight-bold">
                        Nossa História
                    </h2>
                </v-col>
            </v-row>
            <div class="mt-sm-16 mt-10">
                <div class="position-relative lp_wrapper">
                    <v-row class="mt-3 row-up">
                        <v-col cols="12" lg="8" sm="8" data-aos="fade-up">
                            <img src="@/assets/images/landingPage/our-history-a.png"/>
                        </v-col>
                        <v-col cols="12" lg="4" sm="4" data-aos="fade-up">
                            <p>
                                A ONG "Viver de Rir" surgiu de um projeto de conclusão de curso dedicado à humanização do ambiente hospitalar. 
                                Durante a pesquisa, uma abordagem inovadora foi descoberta: criar um ambiente hospitalar alegre e descontraído para pacientes, 
                                reduzindo o tempo de internação por meio de adaptações comportamentais. Essa descoberta inspirou a fundação da ONG, 
                                que compartilha valores alinhados com essa abordagem.
                            </p>
                        </v-col>
                    </v-row>
                    <v-row class="mt-3 row-up">
                        <v-col cols="12" lg="4" sm="4" data-aos="fade-up">
                            <p>
                                Renata, fundadora da "Viver de Rir", criou a ONG em resposta à falta de acolhimento na rede pública de saúde durante seu mestrado em Saúde Coletiva. 
                                Inspirada pela história de Patch Adams, ela buscou uma solução independente e, após um curso com Adams na Costa Rica, 
                                voltou com o desejo de aplicar seu aprendizado.
                            </p>
                        </v-col>
                        <v-col cols="12" lg="8" sm="8" data-aos="fade-up">
                            <img src="@/assets/images/landingPage/our-history-b.png"/>
                        </v-col>                    
                    </v-row>
                    <v-row class="mt-3 row-up">
                        <v-col cols="12" lg="8" sm="8" data-aos="fade-up">
                            <img src="@/assets/images/landingPage/our-history-c.png"/>
                        </v-col>
                        <v-col cols="12" lg="4" sm="4" data-aos="fade-up">
                            <p>
                                Para concretizar essa visão, Renata reuniu um grupo de amigos e colaboradores que compartilhavam o objetivo de "mudar o mundo"
                                através da promoção do acolhimento, carinho e alegria em ambientes hospitalares. Ao longo do tempo, a iniciativa cresceu, 
                                atraindo centenas de voluntários que se uniram à causa da "Viver de Rir", dedicando seu tempo e esforço para tornar a experiência hospitalar
                                mais humana e calorosa. A organização continua a expandir seu alcance, tocando inúmeras vidas e cumprindo sua missão de trazer sorrisos
                                e esperança a quem mais precisa.
                            </p>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </v-container>
    </div>
</template>

<style lang="scss" scoped>
.v-container {
    max-width: 1200px !important;
}
</style>
