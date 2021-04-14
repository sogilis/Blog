<template>
  <div class="disclaimer">
    Remarque 04/2020 : les pratiques et les outils pour nous organiser évoluent
    sans cesse. Ainsi cet article peut les évoquer alors qu'ils ne sont plus
    présents au sein de Sogilis. N'hésitez pas à nous contacter pour en savoir
    plus !)
  </div>
</template>

<script lang="ts">
export default {
  name: 'Disclaimer',
  youtubeLink: {
    type: String,
    required: true,
  },
};
</script>

<style lang="css" scoped>
.disclaimer {
  font-weight: bold;
  font-style: italic;
  margin: 2rem;
}
</style>
