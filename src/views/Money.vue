<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount"
               @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="note">
    <FormItem field-name="备注" place-holder="在这里输入备注"
           @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags"
          @update:value="onUpdateTags"/>
  </Layout>
</template>
<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/numberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/formItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';
const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();
@Component({
  components: {NumberPad, Types,FormItem, Tags}
})
export default class Money extends Vue {
  tags = tagList;
  recordList = recordList;
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    const record2 = recordListModel.clone(this.record);
    record2.creatAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordChange() {
    recordListModel.save(this.recordList);
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