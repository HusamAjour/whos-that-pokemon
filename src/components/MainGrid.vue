<script>
import PokemonCard from "./PokemonCard.vue";
export default {
  name: "MainGrid",

  components: {
    PokemonCard,
  },
  data() {
    return {
      state: {
        loading: true,
        pokemons: [],
        error: null,
      },
    };
  },
  async created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  computed: {
    console: () => console,
    window: () => window,
  },
  methods: {
    // compare(a, b) {
    //   this.console.log("Gi");
    //   this.console.log(a, b);
    // if (a.id < b.id) {
    //   return -1;
    // }
    // if (a.id > b.id) {
    //   return 1;
    // }
    // return 0;
    // },
    fetchData: async function () {
      this.error = this.post = null;
      let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const fetchedData = await response.json();
      this.console.log(fetchedData);
      // let y = await this.fetchSinglePokemon(fetchedData.results);
      // await fetchedData.results.forEach(async (pokemon) => {
      //   let z = await fetch(pokemon.url);
      //   let w = await z.json();
      //   allPokemons.push({ ...w, url: pokemon.url });
      // });
      // let promises = [];
      // for (let i = 0; i < fetchedData.length; i++) {
      //   promises.push(fetch(fetchedData[i].url));
      // }
      const allPokemons = await Promise.all(
        fetchedData.results.map(async (pokemon) => {
          const resp = await fetch(pokemon.url);
          return resp.json();
        })
      );
      this.console.log(allPokemons);
      if (allPokemons.length) {
        let newArr = allPokemons.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
        this.state.pokemons = newArr;
        this.console.log("79: ", newArr);
        // this.state.loading = false;
        setTimeout(() => {
          this.state.loading = false;
          console.log("Hi");
        }, 1000);
      }
    },
  },
};
</script>

<template>
  <section class="w-full min-h-screen flex justify-center items-center p-4">
    <div v-if="state.loading">
      <img src="../assets/pokeball.png" class="animate-spin w-20" />
    </div>
    <div v-else-if="state.pokemons.length && !state.loading">
      <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
        <div v-for="(pokemon, index) in state.pokemons" :key="index">
          <PokemonCard :data="pokemon" />
        </div>
      </div>
    </div>
  </section>
</template>
