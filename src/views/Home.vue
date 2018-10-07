<template>
  <main v-if="posts">
    <span v-if="posts.length === 0">There aren't currently any posts to show.</span>
    <post-preview v-for="post in posts.items" :key="post.title" :title="post.title" :date="post.date" :slug="post.slug"/>
  </main>
  <main v-else>
    <span class="spinner"></span>
  </main>
</template>

<script>
import PostPreview from '@/components/PostPreview.vue'
import GithubApi from '@/github-api.js'

export default {
  name: 'home',

  data: function () {
    return {
      posts: null
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
    this.posts = await api.getPosts()
  }
}
</script>
