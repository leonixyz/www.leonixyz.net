<template>
  <main v-html="post.content">
  </main>
</template>

<script>
import * as marked from 'marked'
import * as axios from 'axios'
import GithubApi from '@/github-api.js'

export default {
  name: 'Post',

  data: function () {
    return {
      api: new GithubApi(),
      post: {
        content: 'loading...'
      }
    }
  },

  /**
   * Load the current post data
   */
  created: async function () {
    try {
      this.post.object = await this.getPost()
      this.post.content = await this.getPostHtml()
    } catch (e) {
      if (e.bodyText) {
        this.post.content = `An error occurred: ${JSON.parse(e.bodyText).message}`
      } else {
        this.post.content = e.toString()
      }
    }
  },

  methods: {
    /**
     * Get the metadata of the current post
     */
    getPost: async function () {
      // get list of all posts
      const posts = await this.api.getPosts()

      // return the post whose name matches the current route
      if (posts.items) {
        return posts.items.find(post => post.slug === this.$route.params['slug'])
      }
    },

    /**
     * Get the content of the current post converted to HTML
     */
    getPostHtml: async function () {
      if (!this.post.object.downloadUrl) throw new Error('Cannot load post, no <code>downloadUrl</code> available')

      const markdown = (await axios.get(this.post.object.downloadUrl)).data
      const html = marked(markdown)
      return html
    }
  }
}
</script>
