<template>
  <section class="renderBox" :class="{showTocA:showTocState}">
    <ul class="renderToc">
      <li class="title" @click="taggerToc">
        目录
      </li>
      <li v-for="item in renderedMarkdownToc" :key="item.anchor">
        <template v-if="item.children.length">
          <p class="has-children" @click="scrollTo(item.anchor)">{{ item.titleText }}</p>
          <ul class="subToc">
            <li v-for="childItem in item.children" :key="childItem.anchor"
                @click="scrollTo(childItem.anchor)">
              {{ childItem.titleText }}
            </li>
          </ul>
        </template>
        <p class="toc-item" v-else @click="scrollTo(item.anchor)">
          {{ item.titleText }}
        </p>
      </li>
    </ul>
    <section v-html="renderedMarkdown" id="custom-markdown">
    </section>
<!--    <a-image
        :style="{ display: 'none' }"
        :preview="{
        visible,
        onVisibleChange: setVisible,
      }"
        :src="imgUrl"
    />-->
  </section>
</template>

<script setup>
import MarkdownIt from 'markdown-it';
// import emoji from 'markdown-it-emoji';
import checkbox from 'markdown-it-checkbox';
import markdownItSup from 'markdown-it-sup';
import markdownItSub from 'markdown-it-sub';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';
// import markdownItMark from 'markdown-it-mark';
// import markdownItDefList from 'markdown-it-deflist';
import markdownItContainer from 'markdown-it-container';
// import markdownItAbbr from 'markdown-it-abbr';
// 流程图表文档： https://mermaid.js.org/syntax/classDiagram.html
// import markdownItMermaid from "@md-reader/markdown-it-mermaid";
import hljs from 'highlight.js';
// 代码主题选择 https://highlightjs.org/static/demo/
import 'highlight.js/styles/github.css';
import Clipboard from 'clipboard'
// import 'highlight.js/styles/github-dark.css';
// import 'highlight.js/styles/kimbie-light.css';
// import 'highlight.js/styles/monokai.css';
// import 'highlight.js/styles/purebasic.css';
// import 'highlight.js/styles/school-book.css';
// import 'highlight.js/styles/xcode.css';
// import 'highlight.js/styles/atom-one-dark.css';
// import 'highlight.js/styles/brown-paper.css';
// import 'highlight.js/styles/intellij-light.css';
// import 'highlight.js/styles/gradient-light.css';
// import 'highlight.js/styles/foundation.css';


const props = defineProps({
  markdownContent: {
    type: String,
    required: true,
    default: () => ''
  },
  showToc: {
    type: Boolean,
    default: () => false
  }
})

const showTocState = computed(() => props.showToc);

const show = ref(true)
const clipboard = ref('')
const taggerToc = () => {
  show.value = !show.value
}


const renderedMarkdown = ref('');
const tempData = ref([]);
const renderedMarkdownToc = ref([]);
const visible = ref(false);
const imgUrl = ref('');
const setVisible = value => {
  visible.value = value;
};

// 打开图片预览
const openImagePreview = (imageUrl) => {
  // imgUrl.value = imageUrl
  window.open(imageUrl, '_blank')
  // setVisible(true)
};
// 添加点击事件处理程序
const addClickEventToImages = () => {
  const images = document.querySelectorAll('img');
  if (!images.length) return
  images.forEach((image) => {
    image.addEventListener('click', () => {
      openImagePreview(image.src);
    });
  });
};

const renderMarkdown = () => {
  const md = new MarkdownIt({
    html: true, // 允许解析和渲染 HTML 标签
    breaks: true,
    linkify: true,
    quotes: true,

    highlight: (str, lang) => {
      // 当前时间加随机数生成唯一的id标识
      const codeIndex = parseInt(Date.now()) + Math.floor(Math.random() * 10000000)
      // 复制功能主要使用的是 clipboard.js
      let html = `<button class="copy-btn" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">COPY</button>`
      const linesLength = str.split(/\n/).length - 1
      // 生成行号
      let linesNum = '<span aria-hidden="true" class="line-numbers-rows">'
      for (let index = 0; index < linesLength; index++) {
        linesNum = linesNum + '<span></span>'
      }
      linesNum += '</span>'
      if (lang && hljs.getLanguage(lang)) {
        try {
          // highlight.js 高亮代码
          const preCode = hljs.highlight(lang, str, true).value
          html = html + preCode
          if (linesLength) {
            html += '<b class="name">' + lang + '</b>'
          }
          // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "&lt;" 代替，不影响复制功能
          return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(/<\/textarea>/g, '&lt;/textarea>')}</textarea>`
        } catch (error) {
          console.log(error)
        }
      }

      const preCode = md.utils.escapeHtml(str)
      html = html + preCode
      return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(/<\/textarea>/g, '&lt;/textarea>')}</textarea>`

    },
  });
  // md.use(emoji);
  md.use(checkbox);
  md.use(markdownItSup);
  md.use(markdownItSub);
  md.use(markdownItFootnote);
  md.use(markdownItTocDoneRight);
  // md.use(markdownItMermaid, {
  //   startOnLoad: true,
  //   securityLevel: true,
  //   theme: "base", // default: 默认主题 dark: 暗色主题 neutral: 中性主题 forest: 森林主题 neutral: 中性主题 dark: 暗色主题 base: 基本主题
  // });

  // 使用 markdown-it-container 插件定义自定义容器的渲染逻辑
  const containers = ["tip", "warning", "danger", "details"];
  containers.forEach((container) => {
    md.use(markdownItContainer, container, {
      // 渲染逻辑
      render: (tokens, idx) => {
        const token = tokens[idx];
        if (token.nesting === 1) {
          // 容器开始标签
          return container !== "details" ?
              `<div class="${container}-container"><p class="cu-title">${container === 'tip' ? '提示' : container === 'warning' ? '注意' : '警告'}</p>` :
              '<details class="details-container">';
        } else {
          // 容器结束标签
          return container !== "details" ? `</div>` : '</details>';
        }
      },
    });

  });


  // 自定义摘要的渲染逻辑
  md.renderer.rules.details_summary = function (tokens, idx) {
    const token = tokens[idx];
    return '<summary class="details-summary">' + md.utils.escapeHtml(token.content) + '</summary>';
  };
  // 目录配置
  md.use(markdownItTocDoneRight, {
    level: [1, 2],
    slugify: (s) => {
      // 修改 slugify 方法，生成标题的唯一 id 属性
      const anchor = s.trim().toLowerCase().replace(/\s+/g, '-');
      return 'toc_' + anchor;
    },
  });
  md.renderer.rules.heading_open = (tokens, idx, options, env, renderer) => {
    const token = tokens[idx];
    const level = Number(token.tag.substr(1));
    const titleToken = tokens[idx + 1];
    const titleText = titleToken.content;
    const anchor = titleText.trim().toLowerCase().replace(/\s+/g, '-');
    // 在标题标签上添加id属性
    token.attrSet('id', 'toc_' + anchor);
    tempData.value.push({level, anchor: 'toc_' + anchor, titleText})
    renderedMarkdownToc.value = buildTree(tempData.value)
    return `<h${level} id="toc_${anchor}">`;
  };

// 构建树状结构的函数
  function buildTree(dataList) {
    const root = {children: []}; // 创建根节点
    const stack = [root]; // 使用栈来辅助构建树结构
    for (const item of dataList) {
      const node = {anchor: item.anchor, titleText: item.titleText, children: []};
      if (item.level === 1) {
        // 处理栈为空或当前项的 level 为 1 的情况
        while (stack.length > 1) {
          stack.pop();
        }
      }
      // 获取当前父节点
      const parent = stack[stack.length - 1];
      // 将当前节点添加到父节点的 children 数组中
      parent.children.push(node);
      if (item.level === 1) {
        // 如果当前项的 level 为 1，将其视为新的一级节点并将其推入栈中
        stack.push(node);
      }
    }
    return root.children; // 返回根节点的 children 数组作为最终的树结构
  }

  let htmlOutput = md.render(props.markdownContent)
  renderedMarkdown.value = htmlOutput.replaceAll('<input', '<input disabled ');

  // 在DOM更新后，添加点击事件处理程序
  nextTick(() => {
    addClickEventToImages()

    // 一键复制功能
    clipboard.value = new Clipboard('.copy-btn')
    // 复制成功失败的提示
    clipboard.value.on('success', (e) => {
      alert('复制成功')
      clipboard.value.destroy()
    })
  });

};


// 添加 scrollTo 方法用于滚动跳转
const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({behavior: 'smooth'});
  }
}
// 监听 markdownContent 属性变化，并重新解析 Markdown 和更新视图
watch(() => props.markdownContent, () => {
  renderMarkdown();
});

onMounted(() => {
  renderMarkdown();
});

</script>
<style lang="scss">

/* 定义通用的颜色变量 */
:root {
  --color-primary: #279262;
}

.renderBox {
  position: relative;
  display: flex;

  .renderToc {
    font-family: inherit;
    z-index: 1;
    width: 0;
    max-width: 220px;
    list-style-type: none;
    border-radius: 8px;
    overflow: hidden;
    transition: all .2s linear;

    ul {
      padding: 0 !important;
    }

    li {
      margin-bottom: 5px;
      cursor: pointer;
      transition: all .3s linear;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
      &:hover {
        color: var(--color-primary);
      }
    }

    .title {
      color: var(--color-primary);
      font-weight: bold;
      border-bottom: 1px solid #d4d4d4;
    }

    .toc-item, .has-children {
      font-weight: bold;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
      &:hover {
        color: var(--color-primary);
      }
    }
  }

  .subToc {
    list-style: none;
    padding-left: 20px;
  }

  .subToc li {
    color: #333;
    font-size: .9rem;
  }
}

.showTocA {
  .renderToc {
    transition: all .2s linear;
    width: 300px;
  }

  #custom-markdown {
    box-sizing: border-box;
    transition: all .2s linear;
    width: calc(100% - 220px);
    padding-left: 20px;
    position: relative;
  }
}


/* 通用样式 */
#custom-markdown {
  font-family: inherit;
  transition: all .2s linear;
  letter-spacing: .5px;
  width: 100%;
  position: relative;
  word-break: break-word;
  line-height: 1.75;
  font-weight: 400;
  font-size: 15px;

  // 主题颜色
  $p-color: #279262;


  nav.table-of-contents {
    display: none;
  }

  /* 标题样式 */
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.5;
    margin-top: 25px;
    margin-bottom: 10px;
    padding-bottom: 5px;
    font-weight: 600;
    color: #454545;
  }

  h1 {
    font-size: 30px;
    margin-bottom: 5px;
    //color: $p-color;
  }

  h2 {
    font-size: 22px;
    font-weight: 700;
    //font-size: 22px;
    //display: inline-block;
    //font-weight: 700;
    //background: $p-color;
    //color: #fff;
    //padding: 6px 8px 0 0;
    //border-top-right-radius: 6px;
    //margin-right: 2px;
    //box-shadow: 6px 3px 0 0 rgba(47, 132, 194, .2);
    //
    //&:before {
    //  content: " ";
    //  display: inline-block;
    //  width: 8px;
    //}
    //
    //&:after {
    //  content: " ";
    //  position: absolute;
    //  display: block;
    //  width: calc(100% - 32px);
    //  border-bottom: 3px solid $p-color;
    //}
  }

  h3 {
    font-size: 18px;
    padding-bottom: 0;
  }

  h4 {
    font-size: 16px;
  }

  h5 {
    font-size: 15px;
  }

  h6 {
    margin-top: 5px;
  }


  p {
    line-height: inherit;
    margin: 15px 0;
  }

  /* 横线样式 */
  hr {
    border: none;
    border-top: 1px dashed rgba($p-color, .15) !important;
    margin-top: 32px;
    margin-bottom: 32px;
    background-image: none;
  }

  /* 加粗样式 */
  strong {
    font-weight: 600;
    background-color: inherit;
    color: $p-color;
  }

  /* 斜体样式 */
  em {
    background-color: inherit;
    color: #949415;
  }

  a {
    text-decoration: none;
    color: $p-color;
    margin: 0 3px;
    border-bottom: 1px solid rgba($p-color, .6);

    &:active, &:hover {
      color: rgba($p-color, .6);
    }
  }

  a:before {
    content: "➤ ";
  }


  blockquote {
    padding: 1px 22px;
    margin: 22px 0;
    border-left: 6px solid $p-color;
    background-color: rgba($p-color, .1);
    border-radius: 2px;

    &:after {
      display: block;
      content: "";
    }

    > p {
      margin: 10px 0;
    }
  }

  /* 表格样式 */
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.5rem auto;
  }

  thead tr {
    border: 1px solid red;
  }

  th,
  td {
    border: 1px solid #ececec;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    transition: all 0.3s linear;
    background-color: #f6f6f6;
  }

  ol, ul {
    padding-left: 28px;

    li {
      margin-bottom: 0;
      list-style: inherit;

      &::marker {
        color: $p-color;
      }

      .task-list-item {
        list-style: none;

        ol, ul {
          margin-top: 0;
        }
      }

      ol ol, ol ul, ul ol, ul ul {
        margin-top: 3px;
      }

      ol li {
        padding-left: 6px;
        color: #282d36;
      }
    }
  }


  del {
    color: $p-color;
  }


  /* 缩写样式 */
  abbr {
    text-decoration: none;
    border-bottom: 2px dashed $p-color;
    font-weight: bold;
    cursor: help;
    transition: all .2s linear;
  }


  input[type=checkbox]:checked:before {
    content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/klEQVQ4T72TMU7DQBBF318XdFR06egQEnAXRINEGlqgowoIR8AF4AZOZ4JEGq5AC5EixBU4A55BNrEVHAcSBTHlaubt37/zxZKlcn7n6mDPXJvz8IJ89HzWu8t7C8D2dfsY52ae4apHnLx0ktsCsHXZjiUuFgG40x2eJ/H/AhztB+zDUTpLwWj8jGkzxSHiHaMPrDQC8sMoilKzLAUqiKQjmb+ZuAdW80tmelCHODoNgSfP7AFprTTaRTzsJN1GEyuIZ7uW6TEEHwCtyV/6EVBKJHhfzgC0Xv/iXwEFBF4FG0378bd7sPQq5xK/hSnk6sdlX3mZrKkwLZKBeu8n9XuWEUE7X+YAAAAASUVORK5CYII=);
    position: relative;
    top: -1px;
    left: -1px;
  }


  .math .katex {
    font-family: Menlo, Monaco, Consolas, Courier New, monospace;
    word-break: break-word;
    border-radius: 2px;
    overflow-x: auto;
    background-color: #f6ffed;
    color: #52c41a;
    font-size: .87em;
    padding: .065em .4em;
  }

  @media (max-width: 720px) {
    h1 {
      font-size: 22px;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 18px;
    }
  }

  pre {
    width: 100%;
    margin: 0.8rem 0;
    border: 1px solid #f6f6f6;
  }

  code {
    word-wrap: break-word;
    padding: 2px 4px;
    color: #555;
    background: #eee;
    border-radius: 3px;
    font-size: 14px;
  }

  pre code {
    width: 100%;
    font-size: 14px;
    border-radius: 4px;
    display: inline-block;
    font-family: Consolas, Liberation Mono, Menlo, Courier, monospace;
    box-sizing: border-box;
    word-break: break-all;
    padding: 1em;
    margin: 0;
  }

  pre.hljs {
    padding: 12px 2px 12px 40px !important;
    border-radius: 5px !important;
    position: relative;
    font-size: 14px !important;
    line-height: 22px !important;
    overflow: hidden !important;
    background: linear-gradient(180deg, rgba($p-color, .1), transparent) !important;
    //border-top: 2px solid $p-color;
    /*box-shadow: 0 0 10px rgba(66, 185, 131, .2);*/
    &:before {
      content: "";
      display: block;
      height: 30px;
      width: 100%;
      position: absolute;
      left: 0px;
      top: -2px;
      background: url(data:image/png;base64,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) 10px 10px no-repeat;
      background-size: 40px
    }

    code {
      display: block !important;
      margin: 0 10px !important;
      margin-left: 0 !important;
      overflow-x: auto !important;
      background: transparent !important;
      color: inherit !important;
    }

    .line-numbers-rows {
      position: absolute;
      pointer-events: none;
      top: 28px;
      bottom: 12px;
      left: 0;
      font-size: 100%;
      width: 40px;
      text-align: center;
      letter-spacing: -1px;
      border-right: 1px solid #eee;
      user-select: none;
      counter-reset: linenumber;

      span {
        pointer-events: none;
        display: block;
        counter-increment: linenumber;

        &:before {
          content: counter(linenumber);
          color: #c1c0c0;
          display: block;
          font-size: .8rem;
          text-align: center;
        }
      }
    }

    b.name {
      position: absolute;
      top: 5px;
      right: 70px;
      z-index: 10;
      color: #999;
      pointer-events: none;
    }

    .copy-btn {
      position: absolute;
      top: 5px;
      right: 4px;
      z-index: 10;
      color: #333;
      cursor: pointer;
      background-color: rgba(#ffffff, .5);
      border: 0;
      border-radius: 2px;

      &:hover {
        background-color: rgba(#ffffff, 1);
      }
    }
  }


  video,
  img {
    border-radius: 8px;
    transition: all 0.3s linear;
  }

  video:hover,
  img:hover {
    border-radius: 3px;
  }


  audio {
    display: block;
    margin: 10px 0;
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
  }

  audio::-webkit-media-controls-panel {
    background-color: #f2f2f2;
    border: none;
    border-radius: 5px;
    padding: 5px;
  }

  audio::-webkit-media-controls-play-button {
    color: var(--color-primary);
  }


  /* 自定义容器样式 */
  .tip-container,
  .warning-container,
  .danger-container,
  .details-container {
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 10px;

    .cu-title {
      font-weight: bold;
    }
  }

  .tip-container {
    border: 1px solid #8bc34a;
    background-color: #f1f8e9;

    .cu-title {
      color: #8bc34a;
    }
  }

  .warning-container {
    border: 1px solid #ffc107;
    background-color: #fff8e1;

    .cu-title {
      color: #ffc107;
    }
  }

  .danger-container {
    border: 2px solid #f44336;
    background-color: #ffebee;

    .cu-title {
      color: #f44336;
    }
  }

  .details-container {
    border: 1px solid #ddd;
    background-color: #f0f9ff;
  }

  /* 自定义容器摘要样式 */
  .details-summary {
    font-weight: bold;
    cursor: pointer;
  }

  /* 待办列表样式 */
  input[type="checkbox"] {
    width: 15px;
    height: 15px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    border-radius: 2px;
  }

  label {
    position: relative;
    padding-left: 5px;
    cursor: pointer;
    font-size: 14px;
  }

  input[type="checkbox"]:disabled + label {
    opacity: 0.9;
    cursor: not-allowed;
    pointer-events: none;
  }

  input:checked + label::after {
    display: block;
  }

  /* 序列表样式 */
  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
    padding-left: 30px;
  }

  ul ul,
  ol ul,
  ul ol,
  ol ol {
    margin-top: 10px;
    padding-left: 30px;
  }

}

</style>
