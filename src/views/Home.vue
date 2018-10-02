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
    getPosts: function () {
      this.$http.get(`https://api.github.com/repos/${conf.repo.owner}/${conf.repo.name}/contents/articles`)
        .then(response => {
          // get body data
          console.log(response.body)
        }, response => {
          console.error('you fucked up everything')
        })

      return [{ title: 'Hello World!', date: '2018-10-02' }]
    }
  }
}
</script>
