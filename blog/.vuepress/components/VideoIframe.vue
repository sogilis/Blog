<template>
  <div class="videoiframe">
    <slot> </slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VideoIframe',
};
</script>

<style lang="css" scoped>
.videoiframe {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  border: 0;
}
</style>
