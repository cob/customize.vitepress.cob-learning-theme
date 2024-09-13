<script lang="ts" setup>
import { rmDefinitionSearch, setServer } from '@cob/rest-api-wrapper'
import {
  computedAsync,
  debouncedWatch,
  onKeyStroke,
  useEventListener,
  useLocalStorage,
  useScrollLock,
  useSessionStorage
} from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import Mark from 'mark.js/src/vanilla.js'
import MiniSearch, { type SearchResult } from 'minisearch'
import { dataSymbol, inBrowser, useData, useRouter } from 'vitepress'
import {
  computed,
  createApp,
  markRaw,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
  watchEffect,
  type Ref
} from 'vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const el = shallowRef<HTMLElement>()
const resultsEl = shallowRef<HTMLElement>()

/* Search */


interface Result {
  title: string
  titles: string[]
  instanceof: string,
  text?: string // html
}

const vitePressData = useData()

// Trap focus in modal (clicking outside disables it)
const { activate } = useFocusTrap(el, {
  immediate: true,
  allowOutsideClick: true,
  clickOutsideDeactivates: true,
  escapeDeactivates: true
})

const { localeIndex, theme } = vitePressData

const disableQueryPersistence = computed(() => {
  return (
    theme.value.search?.provider === 'local' &&
    theme.value.search.options?.disableQueryPersistence === true
  )
})

// const filterText = disableQueryPersistence.value
//   ? ref('')
//   : useSessionStorage('vitepress:local-search-filter', '')

const filterText = ref('')

// To avoid sending a query every time the user types a letter, we specify
// a callback, so that we only send every x milliseconds. Worth it?
const timeoutSet = ref(false)
const queryInterval = 700

watch(filterText, () => {
  if(timeoutSet.value)
    return

  timeoutSet.value = true
  setTimeout( async () => {
    timeoutSet.value = false
    const hits = (await rmDefinitionSearch("Contents", `content:${filterText.value}*`, 0, 30)).hits.hits;
    results.value = hitsToResult(hits)
  }, queryInterval)

} )

const hitsToResult = (hits) => {
  const results :Result[] = []
  for(const curr of hits) {
    const res = hitToResult(curr)
    if(res)
      results.push(res)
  }
  return results

}

const hitToResult = (hit) : Result  | undefined => ( hit._id in theme.value.index ? {
  title: hit._source.name[0],
  instanceof: hit._id,    
  titles: []
} : undefined )


const showDetailedList = useLocalStorage(
  'vitepress:local-search-detailed-list',
  false
)

const disableDetailedView = computed(() => {
  return (
    false
  )
})

const buttonText = computed(() => {
  const options = theme.value.search?.options ?? theme.value.algolia

  return (
    options?.locales?.[localeIndex.value]?.translations?.button?.buttonText ||
    options?.translations?.button?.buttonText ||
    'Search'
  )
})

watchEffect(() => {
  if (disableDetailedView.value) {
    showDetailedList.value = false
  }
})

const results: Ref<Result[]> = shallowRef([])

const enableNoResults = ref(false)

watch(filterText, () => {
  enableNoResults.value = false
})

/* Search input focus */

const searchInput = ref<HTMLInputElement>()
const disableReset = computed(() => {
  return filterText.value?.length <= 0
})
function focusSearchInput(select = true) {
  searchInput.value?.focus()
  select && searchInput.value?.select()
}

onMounted(() => {
  focusSearchInput()
})

function onSearchBarClick(event: PointerEvent) {
  if (event.pointerType === 'mouse') {
    focusSearchInput()
  }
}

/* Search keyboard selection */

const selectedIndex = ref(-1)
const disableMouseOver = ref(false)

watch(results, (r) => {
  selectedIndex.value = r.length ? 0 : -1
  scrollToSelectedResult()
})

function scrollToSelectedResult() {
  nextTick(() => {
    const selectedEl = document.querySelector('.result.selected')
    if (selectedEl) {
      selectedEl.scrollIntoView({
        block: 'nearest'
      })
    }
  })
}

onKeyStroke('ArrowUp', (event) => {
  event.preventDefault()
  selectedIndex.value--
  if (selectedIndex.value < 0) {
    selectedIndex.value = results.value.length - 1
  }
  disableMouseOver.value = true
  scrollToSelectedResult()
})

onKeyStroke('ArrowDown', (event) => {
  event.preventDefault()
  selectedIndex.value++
  if (selectedIndex.value >= results.value.length) {
    selectedIndex.value = 0
  }
  disableMouseOver.value = true
  scrollToSelectedResult()
})

const router = useRouter()

onKeyStroke('Enter', (e) => {
  if (e.isComposing) return

  if (e.target instanceof HTMLButtonElement && e.target.type !== 'submit')
    return

  const selectedPackage = results.value[selectedIndex.value]
  if (e.target instanceof HTMLInputElement && !selectedPackage) {
    e.preventDefault()
    return
  }

  if (selectedPackage) {
    // TODO: locale
    router.go(theme.value.index[selectedPackage.instanceof])
    emit('close')
  }
})


onKeyStroke('Escape', () => {
  emit('close')
})

onMounted(() => {
  // Prevents going to previous site
  window.history.pushState(null, '', null)
})

useEventListener('popstate', (event) => {
  event.preventDefault()
  emit('close')
})

/** Lock body */
const isLocked = useScrollLock(inBrowser ? document.body : null)

onMounted(() => {
  nextTick(() => {
    isLocked.value = true
    nextTick().then(() => activate())
  })
})

onBeforeUnmount(() => {
  isLocked.value = false
})

function resetSearch() {
  filterText.value = ''
  nextTick().then(() => focusSearchInput(false))
}

</script>

<template>
  <Teleport to="body">
    <div
      ref="el"
      role="button"
      :aria-owns="results?.length ? 'localsearch-list' : undefined"
      aria-expanded="true"
      aria-haspopup="listbox"
      aria-labelledby="localsearch-label"
      class="VPLocalSearchBox"
    >
      <div class="backdrop" @click="$emit('close')" />

      <div class="shell">
        <form
          class="search-bar"
          @pointerup="onSearchBarClick($event)"
          @submit.prevent=""
        >
          <label
            :title="buttonText"
            id="localsearch-label"
            for="localsearch-input"
          >
            <svg
              class="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21l-4.35-4.35" />
              </g>
            </svg>
          </label>
          <div class="search-actions before">
            <button
              class="back-button"
              :title="'modal.backButtonTitle'"
              @click="$emit('close')"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m7 7l-7-7l7-7"
                />
              </svg>
            </button>
          </div>
          <input
            ref="searchInput"
            v-model="filterText"
            :placeholder="buttonText"
            id="localsearch-input"
            aria-labelledby="localsearch-label"
            class="search-input"
          />
          <div class="search-actions">
            <button
              v-if="!disableDetailedView"
              class="toggle-layout-button"
              type="button"
              :class="{ 'detailed-list': showDetailedList }"
              :title="'modal.displayDetails'"
              @click="
                selectedIndex > -1 && (showDetailedList = !showDetailedList)
              "
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 14h7v7H3zM3 3h7v7H3zm11 1h7m-7 5h7m-7 6h7m-7 5h7"
                />
              </svg>
            </button>

            <button
              class="clear-button"
              type="reset"
              :disabled="disableReset"
              :title="'modal.resetButtonTitle'"
              @click="resetSearch"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 5H9l-7 7l7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-2 4l-6 6m0-6l6 6"
                />
              </svg>
            </button>
          </div>
        </form>

        <ul
          ref="resultsEl"
          :id="results?.length ? 'localsearch-list' : undefined"
          :role="results?.length ? 'listbox' : undefined"
          :aria-labelledby="results?.length ? 'localsearch-label' : undefined"
          class="results"
          @mousemove="disableMouseOver = false"
        >
          <li
            v-for="(p, index) in results"
            :key="p.text"
            role="option"
            :aria-selected="selectedIndex === index ? 'true' : 'false'"
          >
            <a
              :href="p.text"
              class="result"
              :class="{
                selected: selectedIndex === index
              }"
              :aria-label="[...p.titles, p.title].join(' > ')"
              @mouseenter="!disableMouseOver && (selectedIndex = index)"
              @focusin="selectedIndex = index"
              @click="$emit('close')"
            >
              <div>
                <div class="titles">
                  <span class="title-icon">#</span>
                  <span
                    v-for="(t, index) in p.titles"
                    :key="index"
                    class="title"
                  >
                    <span class="text" v-html="t" />
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m9 18l6-6l-6-6"
                      />
                    </svg>
                  </span>
                  <span class="title main">
                    <span class="text" v-html="p.title" />
                  </span>
                </div>

                <div v-if="showDetailedList" class="excerpt-wrapper">
                  <div v-if="p.text" class="excerpt" inert>
                    <div class="vp-doc" v-html="p.text" />
                  </div>
                  <div class="excerpt-gradient-bottom" />
                  <div class="excerpt-gradient-top" />
                </div>
              </div>
            </a>
          </li>
          <li
            v-if="filterText && !results.length && enableNoResults"
            class="no-results"
          >
            {{ 'modal.noResultsText' }} "<strong>{{ filterText }}</strong
            >"
          </li>
        </ul>

        <div class="search-keyboard-shortcuts">
          <span>
            <kbd >
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19V5m-7 7l7-7l7 7"
                />
              </svg>
            </kbd>
            <kbd >
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 5v14m7-7l-7 7l-7-7"
                />
              </svg>
            </kbd>
            Navigate
          </span>
          <span>
            <kbd >
              <svg width="14" height="14" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentcolor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="m9 10l-5 5l5 5" />
                  <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                </g>
              </svg>
            </kbd>
           Select
          </span>
          <span>
            <kbd >esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.VPLocalSearchBox {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: flex;
}

.backdrop {
  position: absolute;
  inset: 0;
  background: var(--vp-backdrop-bg-color);
  transition: opacity 0.5s;
}

.shell {
  position: relative;
  padding: 12px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--vp-local-search-bg);
  width: min(100vw - 60px, 900px);
  height: min-content;
  max-height: min(100vh - 128px, 900px);
  border-radius: 6px;
}

@media (max-width: 767px) {
  .shell {
    margin: 0;
    width: 100vw;
    height: 100vh;
    max-height: none;
    border-radius: 0;
  }
}

.search-bar {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  cursor: text;
}

@media (max-width: 767px) {
  .search-bar {
    padding: 0 8px;
  }
}

.search-bar:focus-within {
  border-color: var(--vp-c-brand-1);
}

.search-icon {
  margin: 8px;
}

@media (max-width: 767px) {
  .search-icon {
    display: none;
  }
}

.search-input {
  padding: 6px 12px;
  font-size: inherit;
  width: 100%;
}

@media (max-width: 767px) {
  .search-input {
    padding: 6px 4px;
  }
}

.search-actions {
  display: flex;
  gap: 4px;
}

@media (any-pointer: coarse) {
  .search-actions {
    gap: 8px;
  }
}

@media (min-width: 769px) {
  .search-actions.before {
    display: none;
  }
}

.search-actions button {
  padding: 8px;
}

.search-actions button:not([disabled]):hover,
.toggle-layout-button.detailed-list {
  color: var(--vp-c-brand-1);
}

.search-actions button.clear-button:disabled {
  opacity: 0.37;
}

.search-keyboard-shortcuts {
  font-size: 0.8rem;
  opacity: 75%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  line-height: 14px;
}

.search-keyboard-shortcuts span {
  display: flex;
  align-items: center;
  gap: 4px;
}

@media (max-width: 767px) {
  .search-keyboard-shortcuts {
    display: none;
  }
}

.search-keyboard-shortcuts kbd {
  background: rgba(128, 128, 128, 0.1);
  border-radius: 4px;
  padding: 3px 6px;
  min-width: 24px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  border: 1px solid rgba(128, 128, 128, 0.15);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.results {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.result {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  transition: none;
  line-height: 1rem;
  border: solid 2px var(--vp-local-search-result-border);
  outline: none;
}

.result > div {
  margin: 12px;
  width: 100%;
  overflow: hidden;
}

@media (max-width: 767px) {
  .result > div {
    margin: 8px;
  }
}

.titles {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  position: relative;
  z-index: 1001;
  padding: 2px 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 4px;
}

.title.main {
  font-weight: 500;
}

.title-icon {
  opacity: 0.5;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.title svg {
  opacity: 0.5;
}

.result.selected {
  --vp-local-search-result-bg: var(--vp-local-search-result-selected-bg);
  border-color: var(--vp-local-search-result-selected-border);
}

.excerpt-wrapper {
  position: relative;
}

.excerpt {
  opacity: 75%;
  pointer-events: none;
  max-height: 140px;
  overflow: hidden;
  position: relative;
  opacity: 0.5;
  margin-top: 4px;
}

.result.selected .excerpt {
  opacity: 1;
}

.excerpt :deep(*) {
  font-size: 0.8rem !important;
  line-height: 130% !important;
}

.titles :deep(mark),
.excerpt :deep(mark) {
  background-color: var(--vp-local-search-highlight-bg);
  color: var(--vp-local-search-highlight-text);
  border-radius: 2px;
  padding: 0 2px;
}

.excerpt :deep(.vp-code-group) .tabs {
  display: none;
}

.excerpt :deep(.vp-code-group) div[class*='language-'] {
  border-radius: 8px !important;
}

.excerpt-gradient-bottom {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(transparent, var(--vp-local-search-result-bg));
  z-index: 1000;
}

.excerpt-gradient-top {
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(var(--vp-local-search-result-bg), transparent);
  z-index: 1000;
}

.result.selected .titles,
.result.selected .title-icon {
  color: var(--vp-c-brand-1) !important;
}

.no-results {
  font-size: 0.9rem;
  text-align: center;
  padding: 12px;
}

svg {
  flex: none;
}
</style>