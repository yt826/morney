<template>
  <Layout>
    <Tabs :data-source="typeList" :value.sync="type"
          class-prefix="type"/>
    <ol v-if="result.length>0">
      <li v-for="(group,index) in result" :key="index">
        <h3 class='title'>{{ beautiful(group.title) }} <span>￥{{group.total}}</span></h3>
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
    <div v-else class="noRecord">
      当前没有记录
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordeTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';


@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    const array: string[] = [];
    if (tags.length !== 0) {
      for (let i = 0; i < tags.length; i++) {
        array.push(tags[i].name);
      }
      return array.join(',');
    } else {
      return '无';
    }
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  get result() {
    type Result = {title:string,total?:number,items:RecordItem[]}[]

    const {recordList} = this;


    const newList = clone(recordList as RecordItem[])
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.creatAt)
            .valueOf() - dayjs(a.creatAt).valueOf());
    if (newList.length === 0) {
      return [];
    }
    const groupList:Result = [{
      title: dayjs(newList[0].creatAt)
          .format('YYYY-MM-DD'), items: [newList[0]]
    }];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];

      const last = groupList[groupList.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.creatAt), 'day')) {
        last.items.push(current);
      } else {
        groupList.push({title: dayjs(current.creatAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    groupList.map(group=>{
      group.total = group.items.reduce((sum,item)=>sum +=item.amount,0)
    })
    return groupList;
  }

  beautiful(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  create() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  interval = 'day';
  typeList = recordTypeList;
}

</script>
<style lang="scss" scoped>
.noRecord{
  color: #777777;

}
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

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999999;
}

::v-deep {
  .type-tabs-item {
    background: #c4c4c4;

    &.selected {
      background: white;

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