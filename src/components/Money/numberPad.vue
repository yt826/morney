<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="outputAdd">1</button>
      <button @click="outputAdd">2</button>
      <button @click="outputAdd">3</button>
      <button @click="remove">删除</button>
      <button @click="outputAdd">4</button>
      <button @click="outputAdd">5</button>
      <button @click="outputAdd">6</button>
      <button @click="clear">清空</button>
      <button @click="outputAdd">7</button>
      <button @click="outputAdd">8</button>
      <button @click="outputAdd">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="outputAdd" class="zero">0</button>
      <button @click="outputAdd">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  output = '0';

  outputAdd(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent!;
    if (this.output.length === 16) {return;}
    if (this.output === '0') {
      if ('1234567890'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    }
    this.output += input;
  }

  remove() {
    this.output = this.output.slice(0, -1);
    if (!this.output) {
      this.output = '0';
    }
  }

  clear() {
    this.output = '0';
  }

  ok() {
    const number = parseFloat(this.output);
    if (number === 0) {
      alert('请输入金额！');
    } else {
      this.$emit('update:value', number);
      this.$emit('submit', number);
      alert('创建成功！');

      this.output = '0';
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
  }

  .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;

      &.ok {
        height: 64*2px;
        float: right;
      }

      &.zero {
        width: 25*2%;
      }

      $bg: #f2f2f2;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 8%);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10), &:nth-child(13) {
        background: darken($bg, 12%);
      }

      &:nth-child(8), &:nth-child(11) {
        background: darken($bg, 16%);
      }

      &:nth-child(14) {
        background: darken($bg, 20%);
      }

      &:nth-child(12) {
        background: darken($bg, 24%);
      }
    }
  }
}

</style>