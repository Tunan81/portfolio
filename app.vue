<template>
  <div class="home">
<!--    {{page.createdAt}}-->
<!--    <ZyIntro/>-->
<!--    <section class="main-warp" id="about">
      <section class="banner" :style="{backgroundImage:`url(${setting.websiteInfo.mainBg})`}"
               v-if="setting.layout.main">
        <div class="banner-content">
          <div class="banner-container">
            <div class="row">
              <div class="row-col-left"></div>
              <div class="row-col-right">
                <div class="banner-text"
                     :style="`transform: translateX(-${introAnimationOffset}%)`">
                  <p class="text-tip">Hi! I'm {{ setting.websiteInfo.name || 'ZHOU YI' }}</p>
                  <p class="text-main">
                    {{
                      setting.websiteInfo.motto || "Welcome To My Personal Homepage! Let's Go!"
                    }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>-->
    <q-btn color="primary" label="Primary" />
    <QBtn color="secondary" label="Secondary" />
    <LazyQBtn color="amber" glossy label="Amber" />
    <q-item>
       <ZyToggleTheme/>
    </q-item>
    <div class="q-pa-md">
      <q-list bordered separator style="max-width: 318px">
        <q-item v-ripple clickable v-for="item in postList" :key="item._id">
          <q-item-section>{{item.title}}</q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="q-pa-md q-gutter-y-md">
      <div class="q-gutter-sm">
        <q-chip>
          <q-avatar color="red" text-color="white">50</q-avatar>
          Emails
        </q-chip>
        <q-chip>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          John
        </q-chip>
      </div>

      <div class="q-gutter-x-sm">
        <q-btn round>
          <q-avatar size="28px">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
          </q-avatar>
        </q-btn>
        <q-btn round>
          <q-avatar size="32px">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
          </q-avatar>
        </q-btn>
        <q-btn round>
          <q-avatar size="40px">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
          </q-avatar>
        </q-btn>
      </div>

      <q-item clickable v-ripple>
        <q-item-section side>
          <q-avatar rounded size="48px">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
            <q-badge floating color="teal">new</q-badge>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Mary</q-item-label>
          <q-item-label caption>2 new messages</q-item-label>
        </q-item-section>
        <q-item-section side>
          3 min ago
        </q-item-section>
      </q-item>
      <div class="q-pa-md">
        <q-parallax :height="150">
          <template v-slot:media>
            <video width="720" height="440" poster="https://cdn.quasar.dev/img/polina.jpg" autoplay loop muted>
              <source type="video/webm" src="https://cdn.quasar.dev/img/polina.webm">
              <source type="video/mp4" src="https://cdn.quasar.dev/img/polina.mp4">
            </video>
          </template>

          <h3 class="text-white">Video</h3>
        </q-parallax>
      </div>
      <q-banner rounded class="bg-primary text-white">
        <template v-slot:avatar>
          <q-avatar icon="signal_wifi_off" color="white" text-color="primary" />
        </template>

        You have lost connection to the internet. This app is offline.

        <template v-slot:action>
          <q-btn flat color="white" label="Turn ON Wifi" />
        </template>
      </q-banner>
    </div>
    <q-badge color="red" />
  </div>
</template>
<script setup>
import {blog_articlesList} from "./api/modules/api.blog_articles";
const postList = ref([])



onMounted(()=>{
  blog_articlesList({}).then(res=>{
    postList.value = res.data.result || []
  })
})
</script>
<style lang="scss" scoped>
.home {
  //background-color: $color-primary;
}
</style>
<script>

</script>
