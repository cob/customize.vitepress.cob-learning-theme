<script setup>
import { useData } from 'vitepress';

import { ref, watch } from 'vue';

const { theme, page, site } = useData()


const section     = ref()
const collection  = ref()
const collections = ref()

// call update on the first load, to load up the values
update(page.value)
watch(page, update)

function update(newV) {
  const pathOptions = newV.relativePath.split("/")
  section.value     = pathOptions[site.value.localeIndex == 'root' ? 0 : 1]
  collection.value  = section.value + "/" + pathOptions[site.value.localeIndex == 'root' ? 1 : 2]
  if(theme.value.collections)
    collections.value = theme.value.collections[section.value]
} 


function activeCollection(tagname) {
    return collection.value == tagname
}

</script>


<template>
    <div class="top-sidebar" v-if="collections">
        <a v-for="col in collections" :class="{ active: activeCollection(col.id), VPLink : true}" :href="col.link">
            {{ col.text }}
        </a>
    </div>
</template>

<style>
.top-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
  border-bottom: 1px solid;
  border-bottom-color: var(--vp-c-divider);
}

.active{
  color: var(--vp-c-brand-1);
}

</style>