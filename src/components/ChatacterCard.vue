<template>
  <div class="card">
    <div class="card__avatar avatar">
      <div class="avatar__inner">
        <span class="avatar__img"
              :style="{ 'background-image': 'url(' + image +')' }">
        </span>
      </div>
    </div>
    <div class="card__content">
      <div class="info">
        <div>
          <router-link :to="{ name: 'character', params: {id}}"><span>{{ name }}</span></router-link>
<!--          <span>
            <app-icon name="unknown" class="info__icon"></app-icon>
          </span>-->
        </div>
        <p>{{ status }}</p>
        <p>{{ species }}</p>
      </div>
      <div class="episodes">
        <span
          v-for="episode in episodes"
          :key="episode"
        >Episode {{ episode.slice(-1) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    name: String,
    status: String,
    species: String,
    image: String,
    episodes: Array
  }
}
</script>

<style scoped>

</style>
