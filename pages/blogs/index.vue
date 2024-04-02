<template>
  <section class="zy-blog">
    <aside class="blog-left"
           :style="{'background-image': backgroundImg ,'background-position': backgroundPosition}">
      <div class="blog-l-content">
        <section class="blog-l-info">
          <img class="info-avatar lazy-image"
               :data-src="websiteInfo.avatar">
          <p class="info-title">{{ websiteInfo.name }}的博客</p>
          <p class="info-title-sub">有趣的人记录有趣的事。 </p>
          <p class="info-title-sub ban-bred">
          <span @click="goToPage('/')" title="回到主页" class="iconfont icon-shouye">
          </span>
<!--            <span @click="goToPage('/archive')" title="博文归档" class="iconfont icon-guanlizhuanjiawenzhang"></span>-->
<!--            <span @click="goToPage('/contact')" title="留言" class="iconfont icon-pinglun"></span>-->
            <span @click="openFullscreen" title="全屏阅读更舒适" class="iconfont icon-quanping1">
          </span>
          </p>
          <p class="search-box">
<!--            <q-input outlined v-model="state.query.params.title" @input.native="goPage(1)" placeholder="🔎" :dense="dense" />-->
            <input type="text" v-model="state.query.params.title" @input="goPage(1)" placeholder="🔎"  >
          </p>
        </section>
      </div>
    </aside>
    <section class="blog-right">
      <ZyPageMenuList @select="searchClass"/>
      <section class="blog-list c-mb-40 ">
        <div class="sortMenu" style="transform: translateY(-50%);padding-left: 1rem">
          <span @click="goSort('viewNum')" :style="{color:state.selectSort==='viewNum'?theme.primaryColor:''}">默认</span>
          <span @click="goSort('createdAt')"
                :style="{color:state.selectSort==='createdAt'?theme.primaryColor:''}">最新</span>
          <span @click="goSort('recommended')"
                :style="{color:state.selectSort==='recommended'?theme.primaryColor:''}">推荐</span>
        </div>
        <template v-if="state.postList.length">
          <article class="blog-item c-mb-20" v-for="(post,index) in state.postList" :key="index"
                   @click="goToPage('/posts/'+post._id,{title:post.title})">
            <header class="blog-header" :style="{width:!post.cover&&'100%'}">
              <h2>{{ post.title }}</h2>
              <p>{{ post.abstract }}</p>
              <div class="blog-tip">
                <div class="tip-left">
                  <span>{{ TimeUtils.formatRelativeTime(post.createdAt) }}</span>
                  <span title="浏览量">
                  <svg width="18" height="18" viewBox="0 0 24 24" style="padding-right: 5px"
                       class="ZDI ZDI--FireFill24 css-15ro776"
                       fill="currentColor">
                <path fill-rule="evenodd"
                      d="M14.602 21.118a8.89 8.89 0 0 0 3.72-2.232 8.85 8.85 0 0 0 2.618-6.31c0-.928-.14-1.836-.418-2.697a8.093 8.093 0 0 0-1.204-2.356s.025.035-.045-.055-.1-.115-.1-.115c-.955-1.078-1.504-1.984-1.726-2.854-.06-.232-.138-.88-.22-1.824L17.171 2l-.681.02c-.654.018-1.089.049-1.366.096a7.212 7.212 0 0 0-3.77 1.863 6.728 6.728 0 0 0-1.993 3.544l-.088.431-.182-.4a5.032 5.032 0 0 1-.326-.946 71.054 71.054 0 0 1-.204-.916l-.199-.909-.833.42c-.52.263-.862.462-1.076.624a8.588 8.588 0 0 0-2.5 2.976 8.211 8.211 0 0 0-.888 3.723c0 2.402.928 4.657 2.616 6.35a8.87 8.87 0 0 0 3.093 2.027c-.919-.74-1.593-1.799-1.76-3.051-.186-.703.05-2.352.849-2.79 0 1.938 2.202 3.198 4.131 2.62 2.07-.62 3.07-2.182 2.773-5.688 1.245 1.402 1.65 2.562 1.838 3.264.603 2.269-.357 4.606-2.003 5.86Z"
                      clip-rule="evenodd"></path>
                </svg>
                  {{ post.viewNum }}
                </span>
                  <span title="评论数">
                  <i class="iconfont icon-pinglun" style="padding-right: 5px"></i>
                  {{ post.commentCount }}
                </span>
                </div>
                <div class="tip-right" v-if="post.tags">
                  <span v-for="item in post.tags.split('、')"># {{ item }}</span>
                </div>
              </div>
            </header>
            <div class="blog-cover" v-if="post.cover">
              <img class="lazy-image" :data-src="post.cover">
            </div>
          </article>
          <div class="pagination" v-if="state.query.pagination.total>state.query.pagination.pageSize">
            <!--            <a-pagination-->
            <!--                v-model:current="state.query.pagination.current"-->
            <!--                :pageSize="state.query.pagination.pageSize"-->
            <!--                :total="state.query.pagination.total"-->
            <!--                @change="goPage"-->
            <!--                show-less-items/>-->
          </div>
        </template>
        <div v-else>空文章</div>
      </section>
    </section>
  </section>
</template>
<script setup>
import {frontendsetups} from "../../api/modules/api.common";
import {blog_articlesList} from "../../api/modules/api.blog_articles";
import lazyLoadImages from "../../utils/util.lazyLoad";
import {TimeUtils} from "../../utils/util.time";

const router = useRouter()
const setting = ref({})
const theme = ref({})
const websiteInfo = ref({})
const backgroundPosition = ref('50% 0');
const backgroundImg = ref('url(http://www.zhouyi.run:3089/v1/common/files/preview/img/03.jpg)');
const handleScroll = (e) => {
  const offsetY = window.scrollY;
  backgroundPosition.value = `50% ${offsetY * 0.02}%`;
}
const state = reactive({
  selectSort: 'viewNum',// 默认浏览量最高排序
  query: {
    params: {
      status: true
    },
    pagination: {
      total: 0,
      pageSize: 15,
      current: 1
    },
    sort: {
      columnKey: "viewNum",
      order: "descend"
    }
  },
  postList: []
})
const goToPage = (path) => {
  router.push({path})
}
const getFrontendSetups = async () => {
  let res = await frontendsetups({})
  console.log(res)
  setting.value = res.data.result[0] || {}
  websiteInfo.value = res.data.result[0].websiteInfo || {}
  theme.value = res.data.result[0].theme || {}
}

const goSort = (key) => {
  state.query.sort.columnKey = key
  state.selectSort = key
  goPage()

}

const searchClass = (item) => {
  if (item.dict_value === -1) {
    state.query.params.category = ''
    goPage()
    return
  }
  state.query.params.category = item.dict_value
  goPage()
}

let currentImageIndex = 1;
const totalImages = 9;

function updateBackgroundImage() {
  backgroundImg.value = `url(http://www.zhouyi.run:3089/v1/common/files/preview/img/${getImageName(currentImageIndex)}.jpg)`;
  currentImageIndex = (currentImageIndex % totalImages) + 1;
}

function getImageName(index) {
  return index < 10 ? `0${index}` : `${index}`;
}


const inputChange = () => {

}
// 查询
const goPage = (num = 1) => {
  state.query.pagination.current = num;
  getDataList()

}
const smoothScroll = (ele) => {
  document.querySelector(ele).scrollIntoView({
    behavior: 'smooth'
  })
}

// 数据更新后使用 nextTick 来确保在 DOM 更新后执行 lazyLoadImages 方法
watch(() => state.postList, () => {
  nextTick(() => {
    lazyLoadImages();
  })
});
const getDataList = () => {
  blog_articlesList(state.query).then(res => {
    state.postList = res.data.result || []
    state.query.pagination.total = res.data.total
    state.query.pagination.current = res.data.current
    state.query.pagination.pageSize = res.data.pageSize
  })
}
getDataList()
getFrontendSetups()
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  setInterval(updateBackgroundImage, 8000);
})
</script>

<style lang="scss" scoped>
.zy-blog {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  background-color: #fff;

  .blog-left {
    width: 35%;
    height: 100vh;
    position: sticky;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    background-repeat: no-repeat;
    background-position: center -30px;
    transform-style: preserve-3d;
    transition: background-image 2s ease-in-out;
    will-change: transition;

    .blog-l-content {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .blog-l-info {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);

      .info-avatar {
        border-radius: 100%;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5), 0px 2px 20px 3px rgba(0, 0, 0, 0.25);
        width: 8rem;
        height: 8rem;
        display: inline-block;
        object-fit: cover;
        margin-bottom: 1rem;
      }

      .info-title {
        color: #fff;
        font-size: 2.1rem;
        font-family: "plantc", "Source Han Serif", serif;
        letter-spacing: 2px;
      }

      .info-title-sub {
        color: #EEEEEE;
      }

      .ban-bred {
        padding: 5px 10px;
        //background-color: rgba(#fff,.5);
        text-align: left;

        span {
          cursor: pointer;
          margin-right: 1rem;
        }

        .current {
          color: #ffffff;
        }
      }

      .search-box {
        height: 35px;

        input {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          border: none;
          color: #EEEEEE;
          padding: 0 .5rem;

          &::placeholder {
            opacity: .5;
          }
        }
      }
    }
  }

  .blog-right {
    width: 65%;
    //height: 100vh;
    overflow: auto;
  }

  .blog-list {
    margin: 40px auto;
    padding: 0 4.5rem 3rem;

    .sortMenu {
      span {
        cursor: pointer;
        margin-right: 1rem;
        font-size: .8rem;
      }
    }

    .blog-item {
      display: flex;
      justify-content: space-between;
      letter-spacing: 1px;
      cursor: pointer;
      opacity: .7;
      transition: all .3s linear;
      margin: 0 auto 3.5rem;

      &:hover {
        opacity: 1;

        img {
          filter: brightness(1.1);
        }
      }

      .blog-header {
        width: 68%;

        h2 {
          margin-bottom: 10px;
          font-weight: bold;
          position: relative;
          transition: all .3s linear;
          display: inline-block;

          &:before {
            position: absolute;
            left: 0;
            bottom: 0;
            content: '';
            width: 0;
            height: 1px;
            border: none;
            border-top: 1px dashed #a1a1a1;
            transition: all .3s linear;
          }
        }

        &:hover {
          h2 {
            //color: $color-primary;
          }

          h2:before {
            width: 100%;
          }
        }


        .blog-tip {
          padding: 5px 0;
          font-size: .8rem;
          color: #a1a0a0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;

          .tip-left, .tip-right {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }

          span {
            margin-right: 8px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        }
      }

      .blog-cover {
        width: 30%;
        max-height: 160px;
        //width: 260px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
          transition: all .3s linear;
          //box-shadow: 0 2px 5px rgba(0, 0, 25, 0.1), 0 5px 35px 1px rgba(0, 0, 50, 0.2) inset;
        }
      }

    }
  }

  @media screen and (max-width: 968px) {
    flex-direction: column;
    .blog-left {
      height: 300px;
      width: 100%;
      position: relative;

      .blog-l-info {
        .info-title {
          font-size: 1.7rem;
        }
      }
    }
    .blog-right {
      width: 100%;

      .blog-list {
        padding: 2rem;

        .blog-item {
          flex-direction: column-reverse;
          margin-bottom: 40px;

          .blog-header {
            width: 100%;
          }

          .blog-cover {
            width: 100%;
            height: 160px;
            margin-bottom: 2.5rem;
          }
        }
      }
    }
  }
}

</style>

