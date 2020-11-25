<template>
  <div class='tags'>
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag)"
          :class="{selected:selectedTags.indexOf(tag)>=0}"> {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component,Mixins} from 'vue-property-decorator';
import TagHelper from '@/mixins/TagHelper';

@Component({
  computed: {
    tagList() {
      return (this as any).$store.state.tagList;
    }
  }
})
export default class Tags extends Mixins(TagHelper) {
  selectedTags: string[] = [];

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }

  created() {
    (this as any).$store.commit('fetchTag');
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