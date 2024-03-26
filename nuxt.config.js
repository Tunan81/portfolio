// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    devServer: {
        host: '0.0.0.0'
    },
    server:{
        host: '0.0.0.0',
        port:3005
    },
    css: [
        '~/assets/styles/reset.scss'
    ],
    pinia: {
        autoImports: [
            'defineStore' // 自动import { defineStore } from 'pinia'
        ]
    },
    modules: [
        // https://nuxt.com/modules/quasar
        'nuxt-quasar-ui'
    ],
    quasar: {
        plugins: [
            'BottomSheet',
            'Dialog',
            'Loading',
            'LoadingBar',
            'Notify',
            'Dark',
        ],
        // config: {
        //     brand: {
        //         primary: '#00faab',
        //         secondary: '#26A69A',
        //         accent: '#9C27B0',
        //
        //         dark: '#1d1d1d',
        //
        //         positive: '#21BA45',
        //         negative: '#C10015',
        //         info: '#31CCEC',
        //         warning: '#F2C037'
        //     }
        // },

        extras: {
            font: 'roboto-font',
        },
        components: {
            defaults: {
                QBtn: {
                    unelevated: true,
                },
            },
        },
    },
    imports: {
        dirs: ['./stores'] // 导入所有store
    },
    plugins: [
        { src: '@/plugins/directive.client', ssr: false }
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "~/assets/styles/variables.scss";'
                }
            }
        },
    },
    nitro: {
        esbuild: {
            options: {
                ...({drop: ['console']})
            }
        }
    },
    app: {
        head: {
            title: 'ZHOUYI',
            htmlAttrs: {
                lang: 'zh-CN'
            },
            meta: [
                {charset: 'utf-8'},
                {name: 'apple-mobile-web-app-title', content: 'ZHOUYI博客'}, // 添加到主屏后的标题
                {name: 'og:type', content: 'Blog'},
                {name: 'og:title', content: 'ZHOUYI'},
                {name: 'og:description', content: 'ZHOUYI博客'},
                {name: 'og:site_name', content: 'ZHOUYI'},
                {
                    name: 'viewport',
                    content: 'initial-scale=1,maximum-scale=1,user-scalable=no,width=device-width,viewport-fit=cover'
                }
            ],
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
                {rel: 'stylesheet', href: '//at.alicdn.com/t/c/font_4163224_9rzy212m2bm.css'},
                {rel: 'stylesheet', href: '//at.alicdn.com/t/c/font_4123035_h2ne3ntjejc.css'},
            ]
        }
    }
})
