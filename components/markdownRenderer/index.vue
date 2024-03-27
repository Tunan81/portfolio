<template>
    <div class="post-main-container" :class="{ 'sidebar-empty': !cata.menuData.length }">
        <div class="main-container">
            <div class="article-area">
                <div class="markdown-body custom-markdown line-numbers" v-html="markdownContent"
                    v-lazy-container="{ selector: 'img' }" @click="imageEnlargement"></div>
            </div>
            <div class="sidebar" v-if="showToc">
                <div class="sticky-block-box post_tree" :style="{ top: anchorPosition.top }">
                    <ul class="menu_content">
                        <li class="menu_content-item" v-for="(item, key) in cata.menuData" :key="key">
                            <a :style="menuStyle(item.type)" @click="doMenu(item)" href="javascript:void(0);"
                                class="tree_list" :title="item.txt" :id="item.point"
                                :class="{ active_tree_item: cata.menuState === item.point }">
                                {{ item.txt }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <a-image :width="200" :style="{ display: 'none' }" :preview="{visible,onVisibleChange: setVisible}" :src="imagePreview" />
    </div>
</template>

<script setup>
const visible = ref(false)
const imagePreview = ref('')
function setVisible(val) {
    visible.value = val
}


function imageEnlargement(e) {
    if (e.target.nodeName !== 'IMG') return
    imagePreview.value = e.target.src
    visible.value = true
}

const props = defineProps({
    markdownContent: {
        type: String,
        default: ''
    },
    showToc: {
        type: Boolean,
        default: true
    }
})

const cata = reactive({
    menuData: [],
    menuState: ""
})

const anchorPosition = reactive({
    top: '110px'
})

async function componentDidMount() {
    await sleep(500)
    await getElement(['H1', 'H2', 'H3', 'H4', 'H5', 'H6'])
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                cata.menuState = targetId;
            }
        });
    }, { threshold: 1, rootMargin: '0px 0px -950px' });

    cata.menuData.forEach(item => {
        observer.observe(document.getElementById(item.point));
    });
}
function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}
function getElement(nodeArr) {
    return new Promise(resolve => {
        let nodeInfo = []
        const dom = document.querySelector('.markdown-body')
        dom?.childNodes.forEach((item, key) => {
            if (nodeArr.includes(item.nodeName)) {
                nodeInfo.push({
                    type: item.nodeName,
                    txt: item.innerText,
                    offsetTop: item.offsetTop,
                    point: `target_${key}`,
                })
                item.setAttribute('id', `target_${key}`)
            }
        })
        if (!nodeInfo.length) return
        cata.menuData = nodeInfo
        cata.menuState = nodeInfo[0].point
        resolve()
    })
}
function menuStyle(type) {
    const paddingValues = {
        'H2': 10,
        'H3': 20,
        'H4': 30,
        'H5': 35,
        'H6': 40,
    };
    return {
        'padding-left': paddingValues[type] ? `${paddingValues[type]}px` : 0
    };
}

function doMenu(item) {
    const { point: id } = item
    if (!id) return
    const target = document.querySelector(`#${id}`);
    const targetTop = target.getBoundingClientRect().top + window.scrollY - 30;
    window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
    });
    cata.menuState = id
}

onMounted(async () => {
    if (props.showToc) await componentDidMount()
})
/**
 * watchPostEffect 侦听器延迟到组件渲染之后再执行 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。
 */
watchPostEffect(() => {
    setTimeout(() => {
        Prism && Prism.highlightAll({ async: true })
    }, 100)
})
</script>

<style scoped lang="scss">
.post-main-container {
    margin: 0 auto;
    width: 100%;
}

.sidebar-empty {
    .article-area {
        width: 100%;
    }

    .sidebar {
        width: 0;
    }
}

.main-container {
    display: flex;
    justify-content: space-between;
    position: relative;
}

.article-area {
    width: 81%;
    transition: width .2s ease-in;

    @media screen and (max-width: 968px) {
        width: 100%;
    }
}

.sidebar {
    width: 15.6666666%;
    transition: width .2s ease-in;

    @media screen and (max-width: 968px) {
        display: none;
    }
}

.sticky-block-box {
    position: sticky;
    top: 0;
    width: 100%;
    transition: top .3s;
    display: flex;
    flex-direction: column;
}

.post_tree {
    min-height: 400px;
    max-height: 70vh;
    overflow-y: auto;
}

.post_tree .menu_content {
    width: 100%;
    padding: 0;
    margin: 0;
}

.post_tree .menu_content .menu_content-item {
    list-style-type: none;
    text-decoration: none;
    padding: 0 !important;
}

.post_tree .menu_content .tree_list {
    display: block;
    text-decoration: none;
    padding: 5px 0 5px 10px;
    border-left: 1px solid transparent;
    line-height: 20px;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    outline: 0;
    color: #808080;
    position: relative;

    &:hover {
        color: $color-primary;
        background-color: $color-bg;

        &::before {
            content: '';
            height: 20px;
            width: 3px;
            background: $color-primary;
            position: absolute;
            left: 0;
        }
    }

    &.active_tree_item {
        position: relative;
        color: $color-primary;
        background-color: $color-bg;

        &::before {
            content: '';
            height: 20px;
            width: 3px;
            background: $color-primary;
            position: absolute;
            left: 0;
        }
    }
}
</style>
