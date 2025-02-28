<template>
  <NuxtLayout>
    <svg class="icon">
        <use xlink:href="#icon-angle-down"></use>
      </svg>
    <NuxtPage/>
    <SvgComponent />

  </NuxtLayout>
</template>


<script setup>

  import SvgComponent from '@/components/icons/SvgComponent.vue';


</script>


<style>
html {
  height: 100%;
  min-width: 320px;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

body {
  font: 14px/1.2 'Roboto', sans-serif;
  height: 100%;
  min-width: 320px;
  position: relative;
  margin: 0;

  background-color: #131f20;
  color: white;
}

#app > svg {
  display: none;
}



@media print {
  body {
      visibility: hidden;
  }
  .schedule {
      visibility: visible;
      position: absolute;
      padding: 0 20px;
      left: 0;
      top: 0;
  }
}
</style>
