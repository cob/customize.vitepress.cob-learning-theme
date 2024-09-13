<script setup lang="ts">
import RmInstance from '../../vitepress/.vitepress/theme/ts-cob/RmInstance'
import mdVue from '../../vitepress/.vitepress/theme/markdown/md-vue.vue'
import { onMounted, ref, watch } from 'vue';
import { useData } from 'vitepress';
import { isLoggedOn } from '../../vitepress/.vitepress/theme/utils/auth';
import Loading from './Loading.vue';

const props = defineProps<{ instance: number}>()
const isLogged = isLoggedOn()
const { site } = useData()
const content = ref<string | undefined>(undefined)

const get = () => {
    if(isLogged)
        RmInstance.load(props.instance)
            .then( r => content.value = r.fields("Name").find( f => f.field("Locale")?.label ==  site.value.lang )?.value("Content") ?? "Empty")
} 

onMounted( get )

</script>
<template>
    <ClientOnly>
        <Loading v-if="isLogged == undefined || (isLogged && !content)" />
        <template v-else-if="isLogged && content" >
                <mdVue :raw="content" />
        </template>
        <slot v-else-if="!isLogged"></slot>
    </ClientOnly>
</template>