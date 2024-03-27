import Prism from 'prismjs'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Prism)
})