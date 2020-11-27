<template>
  <Layout>
    <Tabs :data-source="typeList" :value.sync="type"
          class-prefix="type"/>
    <Tabs :data-source="intervalList" :value.sync="interval"
          class-prefix="interval"
    />
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class='title'>{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span> {{ tagString(item.tags) }}</span>
            <span class='notes'>{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordeTypeList';

class recordList {
}

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    const array:string[] = []
    if (tags.length!== 0){
     for (let i = 0; i < tags.length;i++){
       array.push(tags[i].name)
     }
     return array.join(',')
    }
    else{
      return '无'
    }
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  get result() {
    const {recordList} = this;
    type hashTableValue = {
      title: string,
      items: recordList[]
    }
    const hashTable: { [key: string]: hashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date] = recordList[i].creatAt.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  create() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  interval = 'day';
  typeList = recordTypeList;
  intervalList = intervalList;
}
</script>
<style lang="scss" scoped>
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item;
}

.record {
  background: white;
  @extend %item;
}
.notes{
  margin-right: auto;
  margin-left: 16px;
  color: #999999;
}
::v-deep {
  .type-tabs-item {
    background: white;

    &.selected {
      background: #c4c4c4;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 36px;
  }
}

</style>