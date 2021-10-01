<template>
  <router-link :to="{ name: 'episode', params: {id}}">
    <span>Episode {{id}}</span>
  </router-link>
</template>

<script>
export default {
  props: ['id']
}
</script>
