<script setup lang="ts">
import { useData } from 'vitepress'
// import VPFeatures from "./VPFeatures.vue"
import { computed, watch } from 'vue';
import { Locale } from '../schema/template-parameters';
import VPFeatures from '../vendor/theme-default/components/VPFeatures.vue';
import { title } from 'process';

const { params, site  } = useData()
const vars = computed( () => params.value!.vars as Locale )
const header = computed( () => vars.value.header[0])
const blocks = computed ( () => vars.value.blocks.map( b => ({
    title: b.title[0],
    details: b.details[0],
    link: site.value.themeConfig.index[b.link[0]],
    linkText: b.linkText ? b.linkText[0] : ""
})))

</script>

<template>
  <main class="home">
    <div class="headline">
      <img class="headlineImg" :src="header.imageUrl[0]"/>
      <div class="headlineLeft">
        <span style="fontSize: 1.235em ">
          {{ header.topHeader[0] }}
        </span>
        <br>
        <span>
          {{ header.botHeader[0]}}
        </span>
      </div>
      <div class="line" />
      <div class="headlineRight">
        <span v-for="line in header.slogan">
          {{ line }} <br /> 
        </span>
      </div>
    </div>
    <div v-html="header.center"/>
  </main>
  <VPFeatures :features="blocks" class="HeroFeatures" />
</template>
            
<style>

.home .headline .headlineImg {
    width: 100px;
  }

.home {
  text-align: center;
  max-width: 65em;
  margin: 3em auto -2em auto;
  padding: 35px;
  margin-bottom: 0.7em;
}

.home .headline .headlineLeft {
    font-size: 4em;
    margin-top: 10px;
    font-weight: 700;
    color: var(--vp-c-brand-1);
    min-width: 300px;
    line-height: 0.9em;
  }

.home .headline .line {
  border-left: solid 1px #fff;
}

.home .headline {
  font-size: larger;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 2.5rem;
  justify-content: center;
}

@media (min-width: 768px) {



  .home .headline .headlineRight {
    font-size: larger;
    line-height: 32px;
    width: 380px;
  }

}



@media (min-width: 960px) {

  .home .headline {
    justify-content: space-between;
  }

  .home .headline .line {
    border-left: solid 1px #808080;
    height:150px
  }


  .home .headline .headlineLeft {
    font-size: 4em;
  }

  .home .headline .headlineRight {
    line-height: 32px;
    font-size: larger;
    text-align: left;
  }

}

@media (max-width: 438px) {
  .home .headline .headlineLeft {
    font-size: 3em;
  }

  .home .headline .headlineRight {
    text-align: center;
    font-size: 1.3em;
    margin-top: 20px;
    /* color: #50585d; */
  }

  .home .headline .line {
    display: none;
  }
}
</style>
