<template>
  <div class="display">
    <i class="display-text">{{minus?'-':''}}{{content}}</i>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class XDisplayer extends Vue {
  @Prop({ default: "0" }) private content!: string;
  @Prop({ default: false }) private minus!: boolean;
}
</script>
<style scoped lang="scss">
@import "@/styles/var.scss";
.display {
  width: 100%;
  text-align: right;
  &-text {
    font-size: $size-large;
    color: $font-white;
    font-style: normal;
  }
}
</style>

