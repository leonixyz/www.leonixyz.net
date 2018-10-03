<template>
  <main>
    <post-preview v-for="post in posts" :key="post.title" :title="post.title" :date="post.date" :slug="post.slug"/>
  </main>
</template>

<script>
// @ is an alias to /src
import PostPreview from '@/components/PostPreview.vue'
import * as conf from '../../siteconfig.json'

export default {
  name: 'home',
  data: function () {
    return {
      posts: []
    }
  },
  components: {
    PostPreview
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
              const slug = rawName.split('_')[1]
              const title = slug.replace(/-/g, ' ')
              const downloadUrl = element.download_url
              this.posts.push({
                title: this.toTitleCase(title),
                date: new Date(date),
                slug: slug,
                downloadUrl: downloadUrl
              })
              this.posts.sort((a, b) => b.date.getTime() - a.date.getTime())
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
