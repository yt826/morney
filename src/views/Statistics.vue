<template>
  <Layout>
    <Tabs :data-source="typeList" :value.sync="type"
          class-prefix="type"/>
    <Tabs :data-source="intervalList" :value.sync="interval"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordeTypeList';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  typeList = recordTypeList
  intervalList = intervalList
}
</script>
<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }
}
</style>