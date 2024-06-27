<script setup>

import MovieItem from "@/MovieItem.vue";
import AppModal from "@/AppModal.vue";
import { items } from "@/movies.json";
import { computed, ref, defineAsyncComponent } from "vue";


const MovieForm = defineAsyncComponent(() => import("@/MovieForm.vue"));
const movies = ref(items);
const currentMovie = ref();

function removeMovie(id) {
  movies.value = movies.value.filter((movie) => movie.id !== id);
}
 function editMovie(id) {

 currentMovie.value = movies.value.find((movie) =>
  movie.id === id
);
  showForm();
}
function saveMovie(data) {
  const isNew = !!movies.value.find((movie) => movie.id === data.id);
  if (!isNew) {
    addMovie(data);
  } else {
    updateMovie(data);
  }
}
function updateMovie(data) {
  movies.value = movies.value.map((m) => {
    if (m.id === data.id) {
      return data;
    }
    return m;
  });
  hideForm();
}
function addMovie(data) {
  movies.value.push(data);
  hideForm();
}

const showMovieForm = ref(false);
function hideForm() {
  showMovieForm.value = false;
  currentMovie.value = null;
}
function showForm() {
  showMovieForm.value = true;
}

const totalMovies = computed(() => {
  return movies.value.length;
});

</script>

<template>
  <div class="app">
    <AppModal
      :show="showMovieForm"
      :title="currentMovie?.id ? 'Edit Movie' : 'Add Movie'"
      @close="hideForm()"
    >
      <MovieForm
        v-if="showMovieForm"
        @update:modelValue="saveMovie"
        :modelValue="currentMovie"
        @cancel="hideForm"
      />
    </AppModal>
    <div class="movie-actions-list-wrapper">
      <div class="movie-actions-list-info">
        <span>Total Movies: {{ totalMovies }}</span>
      </div>
      <div class="flex-spacer"></div>
      <div class="movie-actions-list-actions">
        <button
          class="movie-actions-list-action-button"
          :class="{
            'button-primary': !showMovieForm,
            'button-disabled': showMovieForm,
          }"
          @click="showForm"
          :disabled="showMovieForm"
        >
          Add Movie
        </button>
      </div>
    </div>
    <div class="movie-list">
      <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @edit="editMovie"
        @remove="removeMovie"
      />
    </div>
  </div>
</template>
