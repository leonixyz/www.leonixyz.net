<template>
  <main v-if="post">
    <!-- Post content -->
    <div v-html="post.content">
    </div>
    <hr>
    <!-- Comments -->
    <div>
      <h2>Comments</h2>
      <comment v-for="comment in post.comments.items" :key='comment.id' :comment="comment"></comment>
      <a :href="post.comments.url + '#all_commit_comments'" class="undercorated">
        <div class="comment">
            <span class="fa fa-comment"></span>
            Post a comment
        </div>
      </a>
    </div>
  </main>
</template>

<script>
import * as marked from 'marked'
import * as axios from 'axios'
import GithubApi from '@/github-api.js'
import Comment from '@/components/Comment.vue'

export default {
  name: 'Post',

  data: function () {
    return {
      api: new GithubApi(),
      post: null
    }
  },

  components: {
    Comment
  },

  /**
   * Load the current post data
   */
  created: async function () {
    try {
      const post = {}
      post.object = await this.getPost()
      post.content = await this.getPostHtml(post.object)
      post.comments = await this.api.getComments(post.object)
      this.post = post
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
    getPostHtml: async function (post) {
      if (!post.downloadUrl) throw new Error('Cannot load post, no <code>downloadUrl</code> available')

      const markdown = (await axios.get(post.downloadUrl)).data
      const html = marked(markdown)
      return html
    }
  }
}
</script>
