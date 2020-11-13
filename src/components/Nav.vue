<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icons name='money' active-class="selected" />
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icons  name="label" active-class="selected" />
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icons name="statistics" active-class="selected" />
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Nav',
};

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  display: flex;
 @extend %outerShadow;
  flex-direction: row;

  > .item {
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 3px 0;
    .icon{
      width: 32px;
      height: 32px;
    }
  }
  >.item.selected {
    color: $color-highLight;
  }
}
</style>