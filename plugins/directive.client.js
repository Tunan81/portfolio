const modulesFiles = import.meta.glob('../utils/directives/*.js', { eager: true })
const directives = {}
for (const path in modulesFiles) {
	// set page to '../api/home.js' => 'home'
	const moduleName = path.replace(/.*\/([^/]+)\.js$/, '$1')
	directives[moduleName] = modulesFiles[path].default
}
// 定义nuxt插件
export default defineNuxtPlugin((nuxtApp) => {
	// 通过循环注册所有指令
	for (const key in directives) nuxtApp.vueApp.directive(key, directives[key])
})
