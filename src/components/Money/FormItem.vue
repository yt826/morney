<template>
  <div>
    <label class="formItem">
      <span class="name">{{this.fieldName}}</span>
      <input type="text"
             :value="value"
             @input="onValueChanged($event.target.value)"
             :placeholder="this.placeHolder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue{
  @Prop({default:''}) readonly value!:string;
  @Prop({required:true}) fieldName!:string;
  @Prop() placeHolder?:string;
  @Watch('value')
  onValueChanged(value: string){
    this.$emit('update:value',value);
  }

}
</script>

<style lang="scss" scoped>
.formItem {
  background: white;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-left: 16px;

  }

}
</style>