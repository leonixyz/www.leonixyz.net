<template>
  <main>
    <span v-if="!posts || !posts.length">loading...</span>
    <post-preview v-for="post in posts" :key="post.title" :title="post.title" :date="post.date" :slug="post.slug"/>
  </main>
</template>

<script>
import PostPreview from '@/components/PostPreview.vue'
import GithubApi from '@/github-api.js'

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

  /**
   * Load the list of posts
   */
  created: async function () {
    const api = new GithubApi()
    const posts = await api.getPosts()
    this.posts = this.posts.concat(posts.items)
  }
}
</script>
