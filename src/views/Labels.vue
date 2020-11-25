<template>

  <Layout class="wrapper">
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id"
                   :to=" `/labels/edit/${tag.id}` ">
          <span>
            {{ tag.name }}
          </span>
        <Icons name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag"
              @click.native="createTag">新增标签
      </Button>
    </div>
  </Layout>
</template>
<script lang="ts">
import {Component,Mixins} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import TagHelper from '@/mixins/TagHelper';
@Component({
  components: {Button},
})
export default class Labels extends Mixins(TagHelper) {
 get tags(){
   return this.$store.state.tagList;

 }
  beforeCreate() {
    this.$store.commit('fetchTag');
  }

}
</script>

<style lang="scss" scoped>
.tags {
  height: 80vh;
  background: white;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}

.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;

  &-wrapper {
    text-align: center;
    padding: 16px;
  }
}
</style>