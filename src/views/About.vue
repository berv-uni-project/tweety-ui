<template>
  <div class="content">
    <h1 class="title">About</h1>
    <div class="columns">
      <div class="column is-one-third is-multiline" v-for="author in authors" :key="author.id">
        <div class="card">
          <div class="card-image">
            <figure class="image is-square">
              <img class="is-rounded" :src="author.image" alt="author image" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <p class="title is-4">{{ author.name }}</p>
              <p class="subtitle is-6">{{ author.nim }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./About.js"></script>
