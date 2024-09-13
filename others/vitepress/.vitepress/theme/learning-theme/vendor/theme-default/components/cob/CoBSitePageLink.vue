<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress/theme'
import { useData } from '../../composables/data'
import VPLink from '../VPLink.vue'
import { computed, reactive, ref, watch, watchEffect } from 'vue';
import { SitePage } from '../../../../schema/site-page';
import { useRoute, useRouter } from 'vitepress';
import { link } from 'fs';

const props = defineProps<{
  id: string,
  text: string
}>()

const { theme, localeIndex  } = useData()
const { route }  = useRouter() 

const isRoot = () => localeIndex.value == "root" 

const linkPath = ( isRoot() ? "" : ("/" +localeIndex.value + "/")) + theme.value.index[props.id]
const domain = linkPath.split("/").filter( p => p != "/")[isRoot() ? 0 : 1]

console.log(linkPath)

const activeDomain = (pth: string) => pth.split("/").filter( p => p != "/" && p != "")[isRoot() ? 0 : 1]
const isActive = computed( () => domain == activeDomain(route.path) )
console.log(isActive.value, domain, activeDomain(route.path), route.path, linkPath)
</script>



<template>
  <VPLink
    :class="{
      VPNavBarMenuLink: true,
      active: isActive
    }"
    :href="linkPath"
    tabindex="0"
  >
    <span v-html="text"></span>
  </VPLink>
</template>

<style scoped>
.VPNavBarMenuLink {
  display: flex;
  align-items: center;
  padding: 0 12px;
  line-height: var(--vp-nav-height);
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.VPNavBarMenuLink.active {
  color: var(--vp-c-brand-1);
}

.VPNavBarMenuLink:hover {
  color: var(--vp-c-brand-1);
}
</style>
