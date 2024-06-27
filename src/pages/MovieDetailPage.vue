<script setup>
import { ref, computed } from "vue";
import { items } from "@/movies.json";

const props = defineProps({
  id: { type: Number, default: null },
});

const movies = ref(items);
const movie = computed(() => movies.value.find((m) => m.id === props.id));
</script>
<template>
  <div
    class="container flex items-center max-w-6xl gap-4 p-10 m-auto text-white"
  >
    <RouterLink class="w-full" :to="{ name: 'home' }">
      Back to Category
    </RouterLink>
  </div>

  <div
    class="container flex items-center max-w-6xl gap-4 p-10 m-auto text-white"
  >
    <figure class="relative">
      <img :src="movie.image" :alt="movie.title" class="w-96" />
    </figure>

    <div>
      <h1 class="mb-8 text-5xl">{{ movie.title }}</h1>

     
      <p class="text-xl mt-4 mb-4">{{ movie.description }}</p>
      <span class="!text-lg movie-item-genre-tag">{{ movie.actors.length }}actors</span>

      <div class=" mt-4 movie-item-genres-wrapper">
        <div class="grid grid-cols-3 gap-4">
  <div
    v-for="actor in movie.actors"
    :key="`${movie.id}-${actor.actorName}`"
    class="actor-info"
  >
    <div>Name: {{ actor.actorName }}</div>
    <div>Age: {{ actor.actorAge }}</div>
  </div>
</div>
      </div>
    </div>
  </div>
</template>
