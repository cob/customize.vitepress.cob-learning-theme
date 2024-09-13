<script setup lang="ts">
import { computed } from 'vue';
import VPLink from './../VPLink.vue';
import { umLoggedin } from '@cob/rest-api-wrapper';
import { ref, onMounted } from 'vue'
import { isLoggedOn } from '../../../../../vitepress/.vitepress/theme/utils/auth';

const isLogged = isLoggedOn()

</script>

<template>
    <VPLink v-if="isLogged" class="login-link" href="/recordm/index.html#/domain/2?_=L2RvbWFpbi8yLTE3MTA1MjQ5MTMzOTU%3D" target="_parent">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="login-icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
        </svg>

        Backend
    </VPLink>
    <VPLink 
    v-else
    class="login-link"
        href="/recordm/index.html#/cob.custom-resource/redirect/go-to-docs.html" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="login-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        Login 
    </VPLink>
</template>

<style>
.login-link {
    display: flex;
    padding-right: 0.5em;
    flex-direction: row;
    align-items: center;    
}

.login-icon {
    height: 18px;
    margin-right: 6px;
}

.login-link:hover {
  color: var(--vp-c-brand-1);
}

</style>