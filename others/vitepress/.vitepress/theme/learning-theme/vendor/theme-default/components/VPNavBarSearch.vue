<script lang="ts" setup>
import '@docsearch/css'
import { onKeyStroke } from '@vueuse/core'
import {
  defineAsyncComponent,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'
import type { DefaultTheme } from '../../shared'
import { useData } from '../composables/data'
import VPNavBarSearchButton from './VPNavBarSearchButton.vue'
import CoBRecordMSearch from './cob/CoBRecordMSearch.vue'


const { theme } = useData()

// to avoid loading the docsearch js upfront (which is more than 1/3 of the
// payload), we delay initializing it until the user has actually clicked or
// hit the hotkey to invoke it.
const loaded = ref(false)
const actuallyLoaded = ref(false)



onMounted(() => {

  const handleSearchHotKey = (event: KeyboardEvent) => {
    if (
      (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) ||
      (!isEditingContent(event) && event.key === '/')
    ) {
      event.preventDefault()
      // load()
      remove()
    }
  }

  const remove = () => {
    window.removeEventListener('keydown', handleSearchHotKey)
  }

  window.addEventListener('keydown', handleSearchHotKey)

  onUnmounted(remove)
})


function isEditingContent(event: KeyboardEvent): boolean {
  const element = event.target as HTMLElement
  const tagName = element.tagName

  return (
    element.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  )
}

// Local search

const showSearch = ref(false)

onKeyStroke('k', (event) => {
  if (event.ctrlKey || event.metaKey) {
    event.preventDefault()
    showSearch.value = true
  }
})

onKeyStroke('/', (event) => {
  if (!isEditingContent(event)) {
    event.preventDefault()
    showSearch.value = true
  }
})

</script>

<template>
  <div class="VPNavBarSearch">
      <CoBRecordMSearch
        v-if="showSearch"
        @close="showSearch = false"
      />

      <div id="local-search">
        <VPNavBarSearchButton @click="showSearch = true" />
      </div>
  </div>
</template>

<style>
.VPNavBarSearch {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .VPNavBarSearch {
    flex-grow: 1;
    padding-left: 24px;
  }
}

@media (min-width: 960px) {
  .VPNavBarSearch {
    padding-left: 32px;
  }
}

.dark .DocSearch-Footer {
  border-top: 1px solid var(--vp-c-divider);
}

.DocSearch-Form {
  border: 1px solid var(--vp-c-brand-1);
  background-color: var(--vp-c-white);
}

.dark .DocSearch-Form {
  background-color: var(--vp-c-default-soft);
}

.DocSearch-Screen-Icon > svg {
  margin: auto;
}
</style>
