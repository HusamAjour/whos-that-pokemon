<template>
  <section class="w-full min-h-screen flex justify-center items-center">
    <div v-if="state.loading === true">
      <img src="../assets/pokeball.png" class="animate-spin w-20" />
    </div>
    <div v-else>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="(pokemon, index) in state.pokemons" :key="index">
          <PokemonCard :data="{ ...pokemon }" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PokemonCard from "./PokemonCard";
export default {
  name: "MainGrid",
  props: {
    data: Object,
  },
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
    async fetchData() {
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
        }, 1000);
      }
    },
  },
};
</script>
