<template>
  <router-link :to="{ name: 'character', params: {id} }">
    <div class="character-img">
      <div class="character-img__inner">
        <span class="character-img__img"
              :style="{ 'background-image': 'url(' + image +')' }">
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    image () {
      return `${process.env.VUE_APP_BASE_URL}/character/avatar/${this.id}.jpeg`
    }
  }
}
</script>
