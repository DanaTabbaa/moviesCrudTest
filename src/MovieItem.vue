<script setup>
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/vue/24/solid";


const props = defineProps({
  movie: { type: Object, default: null },
  index: { type: Number, default: null },
});

const emit = defineEmits(["edit", "remove", "update:rating"]);


function removeMovie() {
  emit("remove", props.movie.id);
}

function editMovie() {
  emit("edit", props.movie.id);
}
</script>

<template>
  <div class="movie-item group" style="height: 500px;" >
    <div class="movie-item-image-wrapper">
      <img
        v-if="movie?.image"
        :src="movie.image"
        class="movie-item-image"
        :alt="movie.name"
      />
      <span v-else class="movie-item-no-image">
        <span class="text-4xl text-white">No image</span>
      </span>
    </div>

    <div class="movie-item-content-wrapper">
      <div class="movie-item-title-wrapper">
        <h3 class="movie-item-title">{{ movie.title }}</h3>
             
        <span class="movie-item-genre-tag">{{ movie.year }}</span>
        <div>
          <span class="mt-4" >{{ movie.actors.length }} actors</span>
        </div>
      

        <div class="movie-item-genres-wrapper">
          <span
            v-for="genre in movie.genres"
            :key="`${movie.id}-${genre}`"
            class="movie-item-genre-tag"
            >{{ genre }}</span
          >


        </div>

      </div>
      <div class="movie-item-description-wrapper">
        <p class="movie-item-description">{{ movie.description }}</p>
      </div>
      <div class="movie-item-rating-wrapper mt-4">

        <div
          class="items-center justify-end hidden space-x-2 group-hover:flex shrink-0"
        >
          <div class="movie-item-actions-list-wrapper">
            <button class="movie-item-action-edit-button" @click="editMovie()">
              <PencilIcon class="w-4 h-4" />
            </button>
            <button
              class="movie-item-action-remove-button"
              @click="removeMovie()"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
            <RouterLink class="movie-item-action-edit-button" 
            :to="{ name: 'movie', params: { id: movie.id } }">
              <EyeIcon class="w-4 h-4" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
