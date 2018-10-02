<template>
  <main v-html="data">
  </main>
</template>

<script>
import * as conf from '../../siteconfig.json'
import * as marked from 'marked'

export default {
  name: 'Post',
  data: function () {
    return {
      posts: [],
      data: ''
    }
  },
  created: function () {
    this.findPost()
  },
  methods: {
    findPost: function () {
      this.$http.get(`https://api.github.com/repos/${conf.repo.owner}/${conf.repo.name}/contents/articles`)
        .then(response => {
          if (response.body) {
            response.body.forEach(element => {
              const rawName = element.name.replace(/.md$/g, '')
              const slug = rawName.split('_')[1]
              if (slug === this.$route.params['slug']) {
                this.fetchData(element.download_url)
              }
            })
          }
        }, response => {
          console.error('you fucked up everything as usual')
        })
        .then(() => this.fetchData())
    },
    fetchData: function (downloadUrl) {
      if (!downloadUrl) return

      this.$http.get(downloadUrl)
        .then(response => {
          this.data = marked(response.body)
        }, response => {
          console.error('you fucked up everything as usual')
        })
    }
  }
}
</script>
