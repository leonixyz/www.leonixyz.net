<template>
  <main>
    <post title="Hello World!" date="2018-10-02"/>
  </main>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue'

export default {
  name: 'home',
  components: {
    Post
  }
}
</script>
