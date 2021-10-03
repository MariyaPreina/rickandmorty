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
      <div class="card__info">
        <div class="card__info-wrap">
          <router-link :to="{ name: 'character', params: {id} }" class="card__info-name">
            <span>{{ name }}</span>
          </router-link>
          <span v-if="status.toLowerCase() === 'alive'" class="card__info-img card__info-img--alive">
            <app-icon name="alive" class="card__info-icon"></app-icon>
          </span>
          <span v-else-if="status.toLowerCase() === 'dead'" class="card__info-img card__info-img--dead">
            <app-icon name="dead" class="card__info-icon"></app-icon>
          </span>
          <span v-else class="card__info-img card__info-img--unknown">
            <app-icon name="unknown" class="card__info-icon"></app-icon>
          </span>
        </div>
        <p class="card__info-species"><span>Species:</span>{{ species.toLowerCase() }}</p>
      </div>
      <div class="card__episodes">
        <span class="card__episodes-title">Episodes:</span>
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
