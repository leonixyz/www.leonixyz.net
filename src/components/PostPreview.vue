<template>
  <router-link :to="'/blog/' + slug" class="undercorated">
    <div class="post">
      <em>{{ date | prettyDate }}</em>
      <h2 class="post-preview-title">{{ title }}</h2>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'PostPreview',
  props: {
    title: String,
    date: Date,
    slug: String
  }
}
</script>

<style>
  .post {
    padding: 1rem;
    background-color: #eee;
    color: #666;
    margin-bottom: 1rem;
    box-shadow: #888 0px 3px 5px;
  }

  .undercorated {
    text-decoration: none;
  }

  .post-preview-title {
    color: #666;
  }
</style>
