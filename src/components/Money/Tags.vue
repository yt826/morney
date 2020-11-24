<template>
  <div class='tags'>
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag.id" @click="toggle(tag)"
          :class="{selected:selectedTags.indexOf(tag)>=0}"> {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';


@Component
export default class Tags extends Vue {
  @Prop() dataSource: string[] | undefined;
  selectedTags: string[] = [];

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value',this.selectedTags)
  }

  create() {
    console.log('hello');
    const name = window.prompt('请输入标签名');
    if (name === '') {
      window.alert('标签名不能为空');
    } else if (this.dataSource && name) {
      const massage = tagListModel.create(name);
      if (massage === 'success'){
        window.alert('添加成功！')
      }
      else if(massage === 'fail'){
        window.alert('创建失败！')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.tags {
  background: #f6f6f6;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;

      &.selected {
        background: darken($bg, 20%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    > button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }

}
</style>