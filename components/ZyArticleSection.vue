<template>
  <section class="zy-blog-article">
    <aside class="blog-left"
           :style="{'background-image': backgroundImg}">
      <section class="blog-l-info">
        <p class="info-title">博文精选</p>
        <p class="info-title-sub">有趣的人记录有趣的事。 </p>
        <p class="info-title-sub ban-bred">
          <span @click="goToPage('/blogs')" title="发现更多有趣的文章"> 发现更多 <i class="iconfont icon-shujuzhongxin"></i></span>
        </p>
      </section>
    </aside>
    <section class="blog-right">
      <section class="blog-list">
        <article class="blog-item" v-for="(post,index) in state.postList" :key="index"
                 @click="goToPage('/posts/'+post._id,{title:post.title})">
          <header class="blog-header" :style="{width:!post.cover&&'100%'}">
            <h2>{{ post.title }}</h2>
            <p class="abstract">{{ post.abstract }}</p>
            <div class="blog-tip">
              <span>{{ TimeUtils.formatRelativeTime(post.createdAt) }} 发布</span>
              <span title="浏览量"><svg width="18" height="18" viewBox="0 0 24 24" style="padding-right: 5px"
                                     class="ZDI ZDI--FireFill24 css-15ro776"
                                     fill="currentColor">
                <path fill-rule="evenodd"
                      d="M14.602 21.118a8.89 8.89 0 0 0 3.72-2.232 8.85 8.85 0 0 0 2.618-6.31c0-.928-.14-1.836-.418-2.697a8.093 8.093 0 0 0-1.204-2.356s.025.035-.045-.055-.1-.115-.1-.115c-.955-1.078-1.504-1.984-1.726-2.854-.06-.232-.138-.88-.22-1.824L17.171 2l-.681.02c-.654.018-1.089.049-1.366.096a7.212 7.212 0 0 0-3.77 1.863 6.728 6.728 0 0 0-1.993 3.544l-.088.431-.182-.4a5.032 5.032 0 0 1-.326-.946 71.054 71.054 0 0 1-.204-.916l-.199-.909-.833.42c-.52.263-.862.462-1.076.624a8.588 8.588 0 0 0-2.5 2.976 8.211 8.211 0 0 0-.888 3.723c0 2.402.928 4.657 2.616 6.35a8.87 8.87 0 0 0 3.093 2.027c-.919-.74-1.593-1.799-1.76-3.051-.186-.703.05-2.352.849-2.79 0 1.938 2.202 3.198 4.131 2.62 2.07-.62 3.07-2.182 2.773-5.688 1.245 1.402 1.65 2.562 1.838 3.264.603 2.269-.357 4.606-2.003 5.86Z"
                      clip-rule="evenodd"></path></svg> {{
                  post.viewNum
                }}</span>
              <span title="评论数"> <i class="iconfont icon-pinglun" style="padding-right: 5px"></i> {{
                  post.commentCount
                }} </span>
            </div>
          </header>
          <div class="blog-cover" v-if="post.cover">
            <img class="lazy-image" :data-src="post.cover">
          </div>
        </article>
      </section>
    </section>
  </section>
</template>

<script setup>
import lazyLoadImages from "../utils/util.lazyLoad";
import {blog_articlesList} from "../api/modules/api.blog_articles";

const router = useRouter()
const backgroundPosition = ref('50% 0');
const backgroundImg = ref('url(http://www.zhouyi.run:3089/v1/common/files/preview/img/03.jpg)');
const handleScroll = (e) => {
  const offsetY = window.scrollY;
  backgroundPosition.value = `50% ${offsetY * 0.02}%`;
}
let currentImageIndex = 1;
const totalImages = 9;

function updateBackgroundImage() {
  backgroundImg.value = `url(http://www.zhouyi.run:3089/v1/common/files/preview/img/${getImageName(currentImageIndex)}.jpg)`;
  currentImageIndex = (currentImageIndex % totalImages) + 1;
}

const goToPage = (path) => {
  router.push({path})
}

function getImageName(index) {
  return index < 10 ? `0${index}` : `${index}`;
}

const state = reactive({
  query: {
    params: {
      recommended: true,
      status: true,
    },
    pagination: {
      current: 1,
      pageSize: 4,
    },
    sort: {
      columnKey: "createdAt",
      order: "descend"
    }
  },
  postList: []
})

// 数据更新后使用 nextTick 来确保在 DOM 更新后执行 lazyLoadImages 方法
watch(() => state.postList, () => {
  nextTick(() => {
    lazyLoadImages();
  })
});
const getDataList = () => {
  blog_articlesList(state.query).then(res => {
    state.postList = res.data.result || []
  })
}
getDataList()

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  setInterval(updateBackgroundImage, 8000);
});


onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
.zy-blog-article {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  background-color: #fff;
  margin: 4rem 0;
  min-height: 350px;

  .blog-left {
    width: 35%;
    background-color: rgba(0, 0, 0, 0.5);
    background-image: url(https://blogcdn.dandyweng.com/backgrounds/08.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    transform-style: preserve-3d;
    transition: background-image 2s ease-in-out;
    will-change: transition;
    border-radius: 5px;

    .blog-l-info {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);

      .info-title {
        color: #fff;
        font-size: 2.5rem;
        font-family: "plantc", "Source Han Serif", serif;
        letter-spacing: 2px;
      }

      .info-title-sub {
        color: #EEEEEE;
      }

      .ban-bred {
        padding: 5px 10px;
        cursor: pointer;
        transition: all .3s linear;

        &:hover {
          color: #ffffff;
        }

      }
    }
  }

  .blog-right {
    width: 65%;
    height: 100%;
  }

  .blog-list {
    margin: 0 auto;
    padding: 1rem 3rem 1rem;
    padding-right: 0;

    .blog-item {
      display: flex;
      justify-content: space-between;
      letter-spacing: 1px;
      cursor: pointer;
      opacity: .7;
      transition: all .3s linear;
      margin: 0 auto 2rem;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        opacity: 1;

        img {
          filter: brightness(1.1);
        }
      }

      .blog-header {
        width: 68%;
        //font-family: "EB Garamond","Noto Serif SC",source-han-serif-sc,'source han serif sc','source han serif cn','source han serif tc','source han serif tw','source han serif',simsun,songti sc,microsoft yahei,serif;

        h2 {
          margin-bottom: 10px;
          //font-weight: bold;
        }

        .abstract {
          line-height: 1.7;
        }

        .blog-tip {
          padding: 5px 0;
          font-size: .8rem;
          color: #a1a0a0;
          display: flex;
          justify-content: flex-start;
          align-items: center;

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
        padding-top: .6rem;
        //width: 260px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2px;
          transition: all .3s linear;
          //box-shadow: 0 2px 5px rgba(0, 0, 25, 0.1), 0 5px 35px 1px rgba(0, 0, 50, 0.2) inset;
        }
      }

    }
  }

  @media screen and (max-width: 968px) {
    flex-direction: column;
    .blog-left {
      height: 180px;
      width: 100%;
      position: relative;
    }
    .blog-right {
      width: 100%;

      .blog-list {
        padding: 2rem 0 0 0;

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
