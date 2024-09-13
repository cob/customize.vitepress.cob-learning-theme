<script setup>
import CollectionSidebar from './CollectionSidebar.vue';
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>

  <Layout>

    
  
    <template #sidebar-nav-before>
      <CollectionSidebar/>
    </template> 

    <template #nav-bar-content-after>
    </template>
    

    
  </Layout>
</template>


