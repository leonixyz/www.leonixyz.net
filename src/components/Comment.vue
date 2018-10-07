<template>
  <div class="comment">
    <div class="comment-header">
      <a :href="comment.author.url">
        <img :src="comment.author.avatar" class="avatar">
        {{ comment.author.name }}</a><br>
      <em>{{ comment.date | prettyDate }}</em>
    </div>
    <div v-html="comment.body"></div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment: Object
  }
}
</script>

<style>
  .comment {
    padding: 1rem;
    background-color: #eee;
    color: #666;
    margin-bottom: 1rem;
    box-shadow: #888 0px 3px 5px;
  }

  .avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
    margin-right: 1rem;
    float: left;
  }
</style>
