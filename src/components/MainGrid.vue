<script>
import PokemonCard from "./PokemonCard.vue";
import Filter from "./Filter.vue";
export default {
  name: "MainGrid",
  components: {
    PokemonCard,
    Filter,
  },
  data() {
    return {
      checkedNames: [
        "dark",
        "bug",
        "dragon",
        "fire",
        "electric",
        "fairy",
        "fighting",
        "flying",
        "ghost",
        "grass",
        "ground",
        "ice",
        "normal",
        "poison",
        "psychic",
        "rock",
        "steel",
        "water",
      ],
      filters: [
        "dark",
        "bug",
        "dragon",
        "fire",
        "electric",
        "fairy",
        "fighting",
        "flying",
        "ghost",
        "grass",
        "ground",
        "ice",
        "normal",
        "poison",
        "psychic",
        "rock",
        "steel",
        "water",
      ],
      pokemonSearch: "",
      state: {
        loading: true,
        allPokemons: null,
        pokemons: null,
        error: null,
      },
    };
  },
  watch: {
    checkedNames: {
      handler(val, oldVal) {
        this.pokemonSearchFunc();
      },
      deep: true,
    },
    allPokemons: function (val) {
      this.console.log(this.allPokemons);
      this.console.log(val);
    },
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
        let filteredResult = this.state.allPokemons.filter((poke) => {
          if (this.pokemonFilterCheck(poke)) return poke;
        });
        this.state.pokemons = filteredResult;
      }

      let filteredResult = this.state.allPokemons.filter((poke) => {
        if (
          poke.name.includes(this.pokemonSearch.toLocaleLowerCase()) &&
          this.pokemonFilterCheck(poke)
        )
          return poke;
      });
      this.state.pokemons = filteredResult;
    },
    pokemonFilterCheck: function (pokemon) {
      let isFound = false;
      pokemon.types.forEach((item) => {
        if (this.checkedNames.includes(item.type.name)) {
          isFound = true;
          return;
        }
      });
      return isFound;
    },
    filterPokemons: function () {},
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
        this.state.pokemons = allPokemons;
        this.state.allPokemons = allPokemons;
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
          <label>Search: </label>
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
        <div class="flex align-center items-center gap-3 mb-4 flex-wrap">
          <div class="flex-none">
            <label>Filter: </label>
          </div>
          <div class="flex-1 items-center flex gap-4 flex-wrap">
            <template v-for="(pokefilter, index) in filters" :key="index">
              <Filter
                :id="`checkbox ${index}`"
                :inputValue="pokefilter"
                :model="checkedNames"
                :label="pokefilter"
              />
            </template>
          </div>
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
