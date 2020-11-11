<template>
  <nav>
    <router-link to="/money" class="item">
      <Icons name='money'/>
      记账
    </router-link>
    <router-link to="/labels" class="item">
      <Icons name="label"/>
      标签
    </router-link>
    <router-link to="/statistics" class="item">
      <Icons name="statistics"/>
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
nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  flex-direction: row;

  > .item {
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 3px 0;
  }
}
</style>