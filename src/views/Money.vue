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
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
@Component({
  components: {NumberPad, Types,FormItem, Tags}
})
export default class Money extends Vue {
  get tags(){
    return this.$store.state.tagList;
  }
  get recordList(){
    return this.$store.state.recordList;
  }
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
   this.$store.commit('createRecordList',this.record)
    console.log(this.record);
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