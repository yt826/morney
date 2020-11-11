<template>
  <div>
    <svg class="icon">
      <use :xlink:href="'#'+name" />
    </svg>
  </div>
</template>

<script lang="ts">
let importAll = (requireContext:__WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try{importAll(require.context('../assets/icons',true,/\.svg$/))
}catch{console.log(Error);}
export default {
  props:['name'],
  name: 'Icons'
};
</script>

<style lang="scss" scoped>
.icon {
  width: 32px;
  height: 32px;
}
</style>