<template>
  <main>
    <post v-for="post in posts" :key="post.title" :title="post.title" :date="post.date"/>
  </main>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue'
import * as conf from '../../siteconfig.json'

export default {
  name: 'home',
  data: function () {
    return {
      posts: []
    }
  },
  components: {
    Post
  },
  created: function () {
    this.getPosts()
  },
  methods: {
    getPosts: function () {
      this.$http.get(`https://api.github.com/repos/${conf.repo.owner}/${conf.repo.name}/contents/articles`)
        .then(response => {
          if (response.body) {
            response.body.forEach(element => {
              const rawName = element.name.replace(/.md$/g, '')
              const date = rawName.split('_')[0]
              const title = rawName.split('_')[1].replace('-', ' ')
              this.posts.push({
                title: this.toTitleCase(title),
                date: new Date(date)
              })
            })
          }
        }, response => {
          console.error('you fucked up everything as usual')
        })
    },
    toTitleCase: function (str) {
      return str.replace(
        /\w\S*/g,
        function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        }
      )
    }
  }
}
</script>
