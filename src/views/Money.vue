<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount"
               @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="note">
    <FormItem field-name="备注" place-holder="在这里输入备注"
              :value.sync="record.notes"/>
    </div>
    <Tags :data-source.sync="tags"
          @update:value="onUpdateTags"/>
  </Layout>
</template>
<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/numberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordeTypeList';
@Component({
  components: {Tabs, NumberPad,FormItem, Tags}
})
export default class Money extends Vue {
  recordTypeList =recordTypeList
  get tags(){
    return this.$store.state.tagList;
  }

  get recordList(){
    return this.$store.state.recordList;
  }
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: Tag[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
   this.$store.commit('createRecordList',this.record)
    this.record.notes=''
    this.record.tags=[]
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.note{
  background: white;
  padding: 12px 0;
}
</style>
<style lang="scss" scoped>
</style>