<template>
  <div>
    <router-view/>
    </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
body{
  line-height: 1.5;
  font-family: $font-hei;
  background: #f6f6f6;
}

</style>
<script>

export default {
  name:'app'
}
</script>