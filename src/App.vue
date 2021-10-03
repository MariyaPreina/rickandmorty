<template>
  <router-view></router-view>
</template>

<script>
export default {
  watch: {
    '$route' (to) {
      document.title = to.meta.title || `${process.env.VUE_APP_ROOT_TITLE}`
    }
  }
}
</script>
