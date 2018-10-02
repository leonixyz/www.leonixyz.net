<template>
  <main>
    <post v-for="post in getPosts()" :key="post.title" :title="post.title" :date="post.date"/>
  </main>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue'
import * as conf from '../../siteconfig.json'

export default {
  name: 'home',
  components: {
    Post
  },
  methods: {
    getPosts: () => {
      console.log('im gonna fetch')
      console.log(`https://api.github.com/repos/${conf.repo.owner}/${conf.repo.name}/contents/articles`)
      return [{ title: 'Hello World!', date: '2018-10-02' }]
    }
  }
}
</script>
