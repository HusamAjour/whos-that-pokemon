<template>
  <div class="p-4 shadow">
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
          :src="getImgUrl(pokemonType.type.name)"
          class="w-8"
          :alt="pokemonType.type.name"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PokemonCard",
  props: {
    data: Object,
  },

  data() {
    return {
      pokemonTypes: {
        normal: {
          logo: "https://archives.bulbagarden.net/media/upload/9/95/Normal_icon_SwSh.png",
        },
        fighting: {
          logo: "https://archives.bulbagarden.net/media/upload/3/3b/Fighting_icon_SwSh.png",
        },
        flying: {
          logo: "https://archives.bulbagarden.net/media/upload/b/b5/Flying_icon_SwSh.png",
        },
        poison: {
          logo: "https://archives.bulbagarden.net/media/upload/8/8d/Poison_icon_SwSh.png",
        },
        ground: {
          logo: "https://archives.bulbagarden.net/media/upload/2/27/Ground_icon_SwSh.png",
        },
        rock: {
          logo: "https://archives.bulbagarden.net/media/upload/1/11/Rock_icon_SwSh.png",
        },
        bug: {
          logo: "https://archives.bulbagarden.net/media/upload/9/9c/Bug_icon_SwSh.png",
        },
        ghost: {
          logo: "https://archives.bulbagarden.net/media/upload/0/01/Ghost_icon_SwSh.png",
        },
        steel: {
          logo: "https://archives.bulbagarden.net/media/upload/0/09/Steel_icon_SwSh.png",
        },
        fire: {
          logo: "https://archives.bulbagarden.net/media/upload/a/ab/Fire_icon_SwSh.png",
        },
        water: {
          logo: "https://archives.bulbagarden.net/media/upload/8/80/Water_icon_SwSh.png",
        },
        grass: {
          logo: "https://archives.bulbagarden.net/media/upload/a/a8/Grass_icon_SwSh.png",
        },
        electric: {
          logo: "https://archives.bulbagarden.net/media/upload/7/7b/Electric_icon_SwSh.png",
        },
        psychic: {
          logo: "https://archives.bulbagarden.net/media/upload/7/73/Psychic_icon_SwSh.png",
        },
        ice: {
          logo: "https://archives.bulbagarden.net/media/upload/1/15/Ice_icon_SwSh.png",
        },
        dragon: {
          logo: "https://archives.bulbagarden.net/media/upload/7/70/Dragon_icon_SwSh.png",
        },
        dark: {
          logo: "https://archives.bulbagarden.net/media/upload/d/d5/Dark_icon_SwSh.png",
        },
        fairy: {
          logo: "https://archives.bulbagarden.net/media/upload/c/c6/Fairy_icon_SwSh.png",
        },
      },
    };
  },
  computed: {
    console: () => console,
    window: () => window,
  },
  created() {
    // this.console.log(this.data);
  },
  methods: {
    getImgUrl(pet) {
      var images = require.context("../assets/", false, /\.png$/);
      return images("./" + pet + ".png");
    },
  },
};
</script>
