<template>
  <div class="home">
    <x-displayer :content="viewNum" :minus="isMinus"/>
    <ul class="home-keyboard">
      <li class="home-keyboard-li">
        <x-button content="ac" @on-click="onEmpty"/>
        <x-button content="±" @on-click="onMinus"/>
        <x-button content="%" @on-click="onOperator"/>
        <x-button content="÷" @on-click="onOperator"/>
      </li>
      <li class="home-keyboard-li">
        <x-button content="7" @on-click="onNumber"/>
        <x-button content="8" @on-click="onNumber"/>
        <x-button content="9" @on-click="onNumber"/>
        <x-button content="×" @on-click="onOperator"/>
      </li>
      <li class="home-keyboard-li">
        <x-button content="4" @on-click="onNumber"/>
        <x-button content="5" @on-click="onNumber"/>
        <x-button content="6" @on-click="onNumber"/>
        <x-button content="-" @on-click="onOperator"/>
      </li>
      <li class="home-keyboard-li">
        <x-button content="1" @on-click="onNumber"/>
        <x-button content="2" @on-click="onNumber"/>
        <x-button content="3" @on-click="onNumber"/>
        <x-button content="+" @on-click="onOperator"/>
      </li>
      <li class="home-keyboard-li">
        <x-button content="." @on-click="onNumber"/>
        <x-button content="0" @on-click="onNumber"/>
        <x-button content="←" @on-click="onDelete"/>
        <x-button content="=" @on-click="onCompute"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { fomatDigit } from "@/utils/format";

@Component({
  components: {
    XButton: () => import("@/components/x-button.vue"),
    XDisplayer: () => import("@/components/x-displayer.vue")
  }
})
export default class Home extends Vue {
  // 运算符之后的值
  private curNum: string = "0";
  // 运算符之前的值
  private oldNum: string = "0";
  // 运算符
  private operator: string = "";
  // 是否是负数
  private isMinus: boolean = false;

  // 显示数字
  private get viewNum(): string {
    const { curNum = "" } = this;
    const [integer, decimals = ""] = curNum.split(".");
    const _integer = fomatDigit(integer)
      .reverse()
      .join();
    return `${_integer}${/\./.test(curNum) ? "." : ""}${decimals}`;
  }

  // 数字键盘
  private onNumber(num: number) {
    if (this.operator) {
      this.curNum = "0";
      if (this.oldNum === "0") {
        this.operator = "";
      }
    }
    const { curNum } = this;
    // 是否0开头
    const old: string = /^0/.test(curNum) ? curNum.replace("0", "") : curNum;
    this.curNum = `${old}${num}`;
  }
  // AC
  private onEmpty() {
    this.curNum = "0";
    this.oldNum = "0";
    this.operator = "";
  }
  // ±
  private onMinus() {
    this.isMinus = true;
  }
  // operator
  private onOperator(op: string) {
    this.operator = op;
    if (this.oldNum === "0") {
      // 将值赋给运算符前值 考虑负数情况
      this.oldNum = this.isMinus ? "-" + this.curNum : this.curNum;
    } else {
      this.onCompute();
    }
  }
  // compute
  private onCompute() {
    const { operator, curNum, oldNum, formatOperator, isMinus } = this;
    // 在eval中计算
    this.curNum = eval(oldNum + formatOperator(operator) + curNum).toString();
    this.oldNum = "0";
  }
  // 退格
  private onDelete() {
    const { curNum } = this;
    if (curNum.length == 1) {
      this.curNum = "0";
      return;
    }
    this.curNum = curNum.substring(0, curNum.length - 1);
  }
  // 替换运算符
  private formatOperator(operator: string) {
    switch (operator) {
      case "÷":
        return "/";
      case "×":
        return "*";
      default:
        return operator;
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/styles/var.scss";

.home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 80px;
  background-color: $bg-black;
  &-keyboard {
    &-li {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 30px;
    }
  }
}
</style>

