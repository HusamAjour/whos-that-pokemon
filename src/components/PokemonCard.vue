<script>
import { getImgUrl } from "../utils/util";
export default {
  name: "PokemonCard",
  props: {
    data: Object,
  },
  computed: {
    console: () => console,
    window: () => window,
  },
  created() {
    // this.console.log(this.data);
  },
  methods: {
    getImgUrl,
  },
};
</script>

<template>
  <div class="p-4 shadow max-w-360 m-auto">
    <pre>{{
      data.id < 10
        ? `00${data.id}`
        : data.id < 100
        ? `0${data.id}`
        : `${data.id}`
    }}</pre>
    <div>
      <img
        class="w-1/2 m-auto transform hover:scale-125"
        :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
          data.id < 10
            ? `00${data.id}`
            : data.id < 100
            ? `0${data.id}`
            : `${data.id}`
        }.png`"
        :alt="data.name"
      />
    </div>
    <h1 class="capitalize text-center">
      {{ data.name }}
    </h1>
    <div class="flex">
      <div v-for="(pokemonType, index) in data.types" :key="index">
        <img
          loading="lazy"
          :src="getImgUrl(pokemonType.type.name)"
          class="w-8"
          :alt="pokemonType.type.name"
        />
      </div>
    </div>
  </div>
</template>
