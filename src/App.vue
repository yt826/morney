<template>
  <div id="app">
    <router-view/>
    </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
body{
  line-height: 1.5;
  font-family: $font-hei;
  background-color: rgb(211,211,211);

}
#app{
max-width: 500px;
  margin: 0 auto;
  background: #f6f6f6;
}
</style>
<script>

export default {
  name:'app'
}
</script>