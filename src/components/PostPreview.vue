<template>
  <router-link :to="'/blog/' + slug" class="undercorated">
    <div class="post">
      <em>{{ printDate(date) }}</em>
      <h2>{{ title }}</h2>
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
  },
  methods: {
    printDate: function (date) {
      const day = date.getDate().toString().padStart(2, '0')
      const month = date.getMonth().toString().padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    }
  }
}
</script>

<style>
  .post {
    padding: 1rem;
    background-color: #eee;
    color: #666;
    margin-bottom: 1rem;
  }

  .undercorated {
    text-decoration: none;
  }
</style>
