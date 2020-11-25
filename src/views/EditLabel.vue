<template>
  <Layout class="hi">
    <div class="navBar">
      <Icons @click.native='goBack' class="leftIcon" name="left"/>
      <span class="title">编辑标签</span>
      <div @click="reName"
           class="rightIcon">修改
      </div>
    </div>
    <div class="formItem-wrapper">
      <FormItem :value="tag.name"
                @update:value="updateTag"
                field-name="标签名" place-holder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>

  </Layout>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';
@Component({
  components: {Button, FormItem},
})
export default class EditLabel extends Vue {
  get tag() {
    return this.$store.state.currentTag
  }
  created() {
    const id = this.$route.params.id
    this.$store.commit('setCurrentTag',id)
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }
  updateTag(name: string) {
    if (this.tag) {
      const id = this.tag.id
        this.$store.commit('updateTag', {id, name})
    }
  }

  remove() {
    if (this.tag) {
      this.$store.commit('removeTag',this.tag.id)
      this.$router.back()
    }

  }

  goBack() {
    this.$router.back();
  }

  reName() {
    window.alert('修改成功');
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {

    height: 24px;
  }
}

.formItem-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  display: inline-block;
  text-align: center;
  margin-top: 50px;
  margin-left: 50%;
  transform: translate(-42px);
}
</style>