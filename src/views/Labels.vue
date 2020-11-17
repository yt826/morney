<template>

    <Layout >
      <ol class="tags">
        <li v-for="tag in tags" :key="tag.id">
          <span >
            {{tag.name}}
          </span>
          <Icons name="right"/>
        </li>
      </ol>
      <div class="createTag-wrapper">
        <button class="createTag" @click="createTag">新增标签</button>
      </div>
    </Layout>
</template>
tagListModel.fetch()
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
@Component
export default class Labels extends Vue{
    tags=tagListModel.data;
    createTag(){
    const name = window.prompt('请输入标签名');
    if(name){
      const massage = tagListModel.create(name);
      if(massage==='fail'){
        window.alert('你已经有一个标签了！')
      }
      else if(massage === 'success') {
        window.alert('创建成功！');
      }
    }
}
}
</script>

<style lang="scss" scoped>
.tags{
  background: white;
  font-size: 16px;
  padding-left: 16px;
  >li{
   min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom : 1px solid #e6e6e6;
    svg{
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #767676;
  color:white;
  border-radius:4px;
  border: none;
  height: 40px;
  &-wrapper{
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>