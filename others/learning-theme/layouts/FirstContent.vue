<script setup lang="ts">
import { useData, useRouter, withBase } from 'vitepress';
import { onMounted } from 'vue';
import { ContentTree } from '../schema/content-tree'


const router = useRouter()
const { params, localeIndex } = useData()
const entryPoint = (params.value!.children as ContentTree).L1s[0].path 



onMounted( () => {
    router.go(withBase(`/${localeIndex.value == "root" ? "" : localeIndex.value + "/"}${entryPoint}`))
})

</script>


<template>
<div></div>
</template>