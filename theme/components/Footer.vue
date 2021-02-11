<template>
  <div @click="roro">myFooter</div>
</template>

<script lang="ts">
export default {
  name: 'Footer',
  // eslint-disable-next-line
  data() {
    return {
      toto: false,
    };
  },
  methods: {
    // eslint-disable-next-line
    roro() {
      // eslint-disable-next-line no-console
      console.log(this.toto);
    },
  },
};
</script>
