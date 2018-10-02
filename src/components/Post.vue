<template>
  <div class="post">
    <h2>{{ title }}</h2>
    <em>{{ date }}</em>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    title: String,
    date: String
  }
}
</script>
