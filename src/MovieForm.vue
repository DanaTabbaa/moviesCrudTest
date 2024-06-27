<script setup>
import { reactive } from "vue";
import { Form, Field, ErrorMessage, configure } from 'vee-validate';
import {PlusIcon,TrashIcon} from "@heroicons/vue/24/solid";

import * as yup from 'yup';

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().optional(),
  year: yup.date().required(),
  image:yup.string().optional(),
  actors: yup.array().of(
    yup.object({
      actorName: yup.string().required(),
      actorAge: yup.number().required(),
      joinDate: yup.date().required(),
      actorRole:yup.string().required()
    })
  )
});
const emit = defineEmits(["update:modelValue", "cancel"]);
const props = defineProps({
  modelValue: { type: Object, default: null },
});

configure({
  validateOnInput: true,
});
function cancelForm() {
  emit("cancel");
}


const form = reactive({
  id: props.modelValue?.id,
  title: props.modelValue?.title,
  description: props.modelValue?.description,
  year: props.modelValue?.year,
  image:props.modelValue?.image,
  actors:props.modelValue?.actors || []

});

function addActor() {
  form.actors.push({
    actorName: "",
    actorAge: "",
    joinDate: "",
    actorRole:""
  });
}

function removeActor(index) {
  form.actors.splice(index, 1);
}

function onSubmit() {

  const data = {
    id:form.id || Number(Date.now()),
    title: form.title,
    description: form.description,
    year: form.year,
    image:form.image,
    actors: form.actors
  };
  emit("update:modelValue", data);
}
</script>

<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <Field type="hidden" name="id" v-model="form.id" />
    <h4 class="mb-4 font-bold">Movie</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="movie-form-input-wrapper">
        <label for="title">Title</label>
        <Field name="title" type="text" class="movie-form-input" v-model="form.title"/>
        <ErrorMessage class="movie-form-error" name="title" />
      </div>

      <div class="movie-form-input-wrapper">
        <label for="year">Year</label>
        <Field v-model="form.year" name="year" class="movie-form-input" />
        <ErrorMessage class="movie-form-error" name="year" />
      </div>
      <div class="movie-form-input-wrapper">
        <label for="description">Description</label>
        <Field v-model="form.description" name="description" type="text" as="textarea" class="movie-form-input" />
        <ErrorMessage class="movie-form-error" name="description" />
      </div>
      <div class="movie-form-input-wrapper">
        <label for="year">Image</label>
        <Field v-model="form.image" name="image" class="movie-form-input" />
        <ErrorMessage class="movie-form-error" name="image" />
      </div>
    </div>
 
      
    <h4 class="mb-4 font-bold">Actors</h4>
    <button class="movie-item-action-edit-button" @click.prevent="addActor">
      <PlusIcon  class="w-4 h-4" />
    </button>
 
    <div v-for="(actor, index) in form.actors" :key="index" class="grid grid-cols-5 gap-4">
      <div class="movie-form-input-wrapper">
        <label :for="'actorName-' + index">Actor Name</label>
        <Field :name="'actorName-' + index" type="text" class="movie-form-input" v-model="actor.actorName"/>
        <ErrorMessage :name="'actorName-' + index" class="movie-form-error" />
      </div>
      <div class="movie-form-input-wrapper">
        <label :for="'actorAge-' + index">Actor Age</label>
        <Field :name="'actorAge-' + index" type="text" class="movie-form-input" v-model="actor.actorAge"/>
        <ErrorMessage :name="'actorAge-' + index" class="movie-form-error" />
      </div>
      <div class="movie-form-input-wrapper">
        <label :for="'joinDate-' + index">Join Date</label>
        <Field :name="'joinDate-' + index" class="movie-form-input" v-model="actor.joinDate"/>
        <ErrorMessage :name="'joinDate-' + index" class="movie-form-error" />
      </div>
      <div class="movie-form-input-wrapper">
  <label :for="'actorRole-' + index">Actor's Role</label>
  <Field :name="'actorRole-' + index" as="select"  class="movie-form-input" v-model="actor.actorRole">
    <option disabled value="">Role</option>
    <option value="backgroundRole">Background role</option>
    <option value="Cameo">Cameo</option>
    <option value="recurringCharacter">Recurring character</option>
    <option value="sideCharacter">Side character</option>
    <option value="seriesRegular">Series regular</option>
    
  </Field>
  <ErrorMessage :name="'actorRole-' + index" class="movie-form-error" />
</div>

      <div class="movie-item-actions-list-dy">

<button v-if="form.actors.length != 0" class="movie-item-action-remove-button" @click="removeActor(index)">
<TrashIcon  class="w-4 h-4" />
</button>
</div>

    </div>


    <div class="movie-form-actions-wrapper mt-4">
      <button type="button" class="button text-white" @click="cancelForm">Cancel</button>

      <button type="submit" class="button-primary">
        <span v-if="form.id">Save</span>
        <span v-else>Create</span>
      </button>
    </div>

  </Form>
</template>