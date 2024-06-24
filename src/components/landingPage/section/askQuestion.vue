<template>
  <div class="pt-sm-14 pt-10 pb-sm-16 pb-10">
    <v-container class="">
      <v-row class="justify-center">
        <v-col cols="12" lg="6" sm="10">
          <v-card elevation="10">
            <div class="ticket text-center px-sm-6 px-4 py-sm-10 py-6">
              <h3 class="text-h3">Quero fazer parte dessa história</h3>
              <p class="text-body-1 mt-2">
                Você pode escolher entre dois tipos diferentes de voluntariado.
                Escolher pelo caminho do palhaço trará inúmeras oportunidades,
                enquanto o administrativo nos auxiliará a funcionar
                corretamente.
              </p>
              <div class="mt-10 mb-3 d-sm-flex justify-center gap-4">
                <v-btn
                  href="https://discord.gg/XujgB8ww4n"
                  target="_blank"
                  color="primary"
                  size="large"
                  class="m-btn-full btn-custom-md"
                  flat
                  >Palhaço</v-btn
                >
                <v-btn
                  href="https://www.atados.com.br/ong/viver-de-rir/vagas"
                  target="_blank"
                  color="secondary"
                  variant="outlined"
                  class="lp-btn-shadow m-btn-full btn-custom-md mt-sm-0 mt-4"
                  size="large"
                  >Administrativo (Portal Atados)</v-btn
                >
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.v-container {
  max-width: 1200px !important;
}
</style>
