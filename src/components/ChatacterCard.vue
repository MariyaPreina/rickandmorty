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
          <router-link :to="{ name: 'character', params: {id} }"><span>{{ name }}</span></router-link>
<!--          <span>
            <app-icon name="unknown" class="info__icon"></app-icon>
          </span>-->
        </div>
        <p>{{ status }}</p>
        <p>{{ species }}</p>
      </div>
      <div class="card__episodes">
        <episode-item
          class="card__episode-item"
          v-for="episode in episodes"
          :key="episode"
          :id="episode.split('/').slice(-1).join()"
        ></episode-item>
      </div>
    </div>
  </div>
</template>

<script>
import EpisodeItem from './EpisodeItem'

export default {
  props: {
    id: Number,
    name: String,
    status: String,
    species: String,
    image: String,
    episodes: Array
  },
  components: {
    EpisodeItem
  }
}
</script>

<style scoped>

</style>
