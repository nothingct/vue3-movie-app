<template>
  <div 
    :style="{
      width : `${size}rem`,
      height : `${size}rem`,
      //'z-index' : zIndex 
      zIndex
    }"
    :class="{ 
      absolute,
      fixed 
    }"
    class="spinner-border text-primary"></div>
</template>

<script>
export default {
  props:{
    size:{
      type:Number,
      default:2
    },
    absolute:{
      type: Boolean,
      default:false
    },
    fixed:{
      type: Boolean,
      default : false 
    },
    zIndex:{
      type:Number,
      default: 0 
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner-border{
  //position 이 absolute 이거나 fixed일 때 가운데 배치를 해주는 용도의 속성들 
  margin : auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &.absolute{
    position: absolute;
  }
  &.fixed{
    position: fixed;
  }
}
</style>