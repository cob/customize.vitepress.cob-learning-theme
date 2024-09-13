<script lang="ts" setup>
import { useData } from '../composables/data'
import VPNavBarMenuLink from './VPNavBarMenuLink.vue'
import VPNavBarMenuGroup from './VPNavBarMenuGroup.vue'
import CoBSitePageLink from './cob/CoBSitePageLink.vue'
import { computed } from 'vue';

const { theme } = useData()
const params = computed( () => theme.value.siteParams )

</script>

<template>
  <nav aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
    <span id="main-nav-aria-label" class="visually-hidden">Main Navigation</span>
    <template v-for="item of params.top_link" :key="item.description[0]">
      <CoBSitePageLink :id="item.link[0]" :text="item.description[0]"/>
    </template>
  </nav>
</template>

<style scoped>
.VPNavBarMenu {
  display: none;
}

@media (min-width: 768px) {
  .VPNavBarMenu {
    display: flex;
  }
}
</style>
