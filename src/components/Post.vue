<template>
  <div class="post">
    <em>{{ printDate(date) }}</em>
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    title: String,
    date: Date
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
