<script>
import PokemonCard from "./PokemonCard.vue";
export default {
  name: "MainGrid",
  components: {
    PokemonCard,
  },
  data() {
    return {
      pokemonSearch: "",
      state: {
        loading: true,
        allPokemons: null,
        pokemons: null,
        error: null,
      },
    };
  },
  async created() {
    this.fetchData();
  },
  computed: {
    console: () => console,
    window: () => window,
  },
  methods: {
    pokemonSearchFunc: function () {
      if (this.pokemonSearch === "") {
        this.state.pokemons = this.state.allPokemons;
        this.console.log("Hi");
        return;
      }

      let filteredResult = this.state.allPokemons.filter((poke) => {
        console.log(poke);
        if (poke.name.includes(this.pokemonSearch.toLocaleLowerCase()))
          return poke;
      });
      console.log(filteredResult);
      this.state.pokemons = filteredResult;
    },
    fetchData: async function () {
      this.error = this.post = null;
      let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const fetchedData = await response.json();

      const allPokemons = await Promise.all(
        fetchedData.results.map(async (pokemon) => {
          const resp = await fetch(pokemon.url);
          return resp.json();
        })
      );
      if (allPokemons.length) {
        // let newArr = allPokemons.sort((a, b) => {
        //   if (a.id < b.id) {
        //     return -1;
        //   }
        //   if (a.id > b.id) {
        //     return 1;
        //   }
        //   return 0;
        // });
        this.state.pokemons = allPokemons;
        this.state.allPokemons = allPokemons;
        // this.state.loading = false;
        setTimeout(() => {
          this.state.loading = false;
        }, 1000);
      }
    },
  },
};
</script>

<template>
  <section class="p-4 font-mono">
    <div
      v-if="state.loading"
      class="w-full min-h-screen flex justify-center items-center p-4"
    >
      <img src="../assets/pokeball.png" class="animate-spin w-20" />
    </div>
    <div v-else-if="state.pokemons && !state.loading">
      <div>
        <div class="pt-2 mx-auto mb-10 flex items-center gap-3">
          <label>Search</label>
          <input
            v-model="pokemonSearch"
            v-on:input="pokemonSearchFunc"
            type="search"
            class="
              border-2 border-gray-300
              bg-white
              h-10
              px-5
              rounded-lg
              text-sm
              focus:outline-pokemon-yellow focus:border-pokemon-blue
            "
          />
        </div>
      </div>
      <div class="w-full min-h-screen flex">
        <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
          <div v-for="(pokemon, index) in state.pokemons" :key="index">
            <PokemonCard :data="pokemon" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
