<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useEvents } from "@/stores/eventStore";

const { getList: eventsList } = storeToRefs(useEvents());

</script>
<template>
  <v-card class="border" elevation="0">
    <div class="flex-table">
      <div class="flex-table-head">
        <div class="flex-table-head-th text-h6">Nome</div>
        <div class="flex-table-head-th text-h6">Quando</div>
        <div class="flex-table-head-th text-h6"></div>
      </div>
      <div class="flex-table-body">
        <div class="flex-table-body-tr" v-for="item in eventsList" :key="item.id">
          <div class="flex-table-body-td text-body-1">{{ item.name }}</div>
          <div class="flex-table-body-td text-body-1">
            {{
              new Date(item.happenAt).toLocaleDateString() +
              " " +
              new Date(item.happenAt).getHours() +
              ":" +
              (new Date(item.happenAt).getMinutes() < 10 ? "0" : "") +
              new Date(item.happenAt).getMinutes()
            }}
          </div>
          <div class="flex-table-body-td">
            <router-link
              tag="v-btn"
              :to="{ name: 'DetailtEvent', params: { id: item.id } }"
            >
              <v-btn size="small" color="primary" type="submit" variant="text"
                >Detalhes</v-btn
              >
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.flex-table {
  display: flex;
  flex-direction: column;
  overflow: auto;

  &-head, &-body-tr {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 16px;
  }

  &-head-th, &-body-td {
    flex-basis: 33%;
    min-width: 150px;
  }

  &-body-td {
    min-width: 150px;
    padding-right: 10px;
  }
}
</style>
