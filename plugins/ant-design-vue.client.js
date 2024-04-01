
import {
    FloatButtonGroup,
    FloatButton,
    BackTop,
    Spin,
    PageHeader,
    Button,
    Comment,
    Avatar,
    Image,
    Dropdown,
    Menu,
    MenuItem,
    ConfigProvider,
    Segmented,
    Empty,
    message
} from 'ant-design-vue';
message.config({
    maxCount: 5
});
export default defineNuxtPlugin((nuxtApp) => {
    // nuxtApp.vueApp.use(Antd);  全局使用 
    nuxtApp.vueApp
        .use(FloatButtonGroup)
        .use(FloatButton)
        .use(BackTop)
        .use(Spin)
        .use(PageHeader)
        .use(Button)
        .use(Empty)
        .use(ConfigProvider)
        .use(Comment)
        .use(Avatar)
        .use(Segmented)
        .use(MenuItem)
        .use(Menu)
        .use(Dropdown)
        .use(Image)
});