<template>
  <div :class="['btn', styles.background]" @click="onClick">
    <i :class="['btn-text', styles.color]">{{content}}</i>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { StylesIf } from "@/interface/xbutton.interface";

@Component
export default class Xbutton extends Vue {
  // content
  @Prop({ default: '0' }) private content!: number | string;
  // 样式覆盖
  @Prop({
    default: () => ({ background: "bg-gray", color: "font-white" })
  })
  private styles!: StylesIf;
  // 点击事件
  private onClick() {
    this.$emit("on-click", this.content);
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/var.scss";

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  //   background: $bg-gray;
  &-text {
    font-size: $size-mid;
    font-weight: bold;
    font-style: normal;
  }
}
.bg-gray {
  background: $bg-gray;
}
.bg-orange {
  background: $bg-orange;
}
.font-white {
  color: $font-white;
}
.font-black {
  color: $font-black;
}
</style>