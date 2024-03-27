
<template>
  <section class="zy-blog-detail">
    <PageHeader title="文章详情" subTitle="有趣的人记录有趣的事" disBgAnimate
                current="文章详情">
      <template #action>
<!--        <NuxtLink :to="`/articleList/${articleDetail.cid}`" :title="articleDetail.catename"-->
<!--                  class="page-action color-555">{{ articleDetail.catename }}-->
<!--        </NuxtLink>-->
        <span> 博文列表/ </span>
      </template>
    </PageHeader>
    <main class="contents-wrap">
      <div class="content-header">
        <h2 class="header-text">{{ articleDetail.title }}</h2>
        <div class="header-tip">
          <div class="tip-item"><i class="iconfont icon-zuozhe tip-icon"></i>Sonder</div>
          <div class="tip-item"><i class="iconfont icon-shijian tip-icon"></i>{{ articleDetail.create_time }}
          </div>
<!--          <div class="tip-item" v-if="wordNum"><i class="iconfont icon-qitawenjianjia tip-icon"></i>2000字-->
<!--          </div>-->
<!--          <div class="tip-item" v-if="readTime"><i-->
<!--              class="iconfont icon-a-xingshizhexueshekebaogaohuishenpibiao tip-icon"></i>3分钟-->
<!--          </div>-->
        </div>
      </div>
      <hr style="margin-bottom: 2rem">
      <LazyMarkdownRenderer :markdownContent="articleDetail.content" />
      <div class="content-footer">
        <div class="footer-l" title="博文标签" v-show="articleDetail.tags">
          # {{ articleDetail.tags }}
        </div>
        <div class="footer-r">
          <div class="view">
            浏览&nbsp;({{ articleDetail.viewNum || 0 }})
          </div>
        </div>
      </div>
<!--      <section class="next-pre" v-if="prev || next">
        <NuxtLink :class="{ 'w-full': !prev || !next }" class="np-item next" v-if="prev"
                  :to="`/post/${prev.id}`" :title="prev.title">
          <img class="page-img" v-lazy="prev.pic || defaultCover" :alt="prev.title">
          <span class="text"> 上一篇 / {{ prev.title }}</span>
        </NuxtLink>
        <NuxtLink :class="{ 'w-full': !prev || !next }" class="np-item pre" v-if="next" :to="`/post/${next.id}`"
                  :title="next.title">
          <img class="page-img" v-lazy="next.pic || defaultCover" :alt="next.title">
          <span class="text"> 下一篇 / {{ next.title }}</span>
        </NuxtLink>
      </section>-->
<!--      <section v-if="likeArticle?.length">
        <h2 class="section-title">
          🎯 相关文章
          <span data-number="01"></span>
        </h2>
        <div class="related">
          <ul>
            <li v-for="item in likeArticle" :key="item.id">
              <NuxtLink class="color-fff" :to="`/post/${item.id}`">{{ item.title }}</NuxtLink>
            </li>
          </ul>
        </div>
      </section>-->
<!--      <section>
        <div id="commentChecker"></div>
        <h2 class="section-title">
          🕵️‍♂️ 评论 ({{ commentData.count || 0 }})
          <span data-number="02"></span>
        </h2>
        <div class="post-comment-form">
          <LazyCommentForm :articleDetail="articleDetail" @onRefreshComment="onRefreshComment" />
        </div>
        <LazyCommentList :commentData="commentData" :articleDetail="articleDetail"
                         @onRefreshComment="onRefreshComment" />
      </section>-->
    </main>
  </section>
</template>
<script setup>
import observeAndAnimate from '../../utils/util.viewportObserve'
import {blog_articlesDetail} from "../../api/modules/api.blog_articles";
/**
 * 文章详情
 */
const route = useRoute()
const articleDetail=ref({})
blog_articlesDetail({_id:route.params.id}).then(res=>{
  articleDetail.value=res.data.currentArticle
  // pageArtcile.value=res.data.currentArticle
})
blog_articlesDetail()
/**
 * 分页
 */
// const prev = computed(() => articleDetail.value.pageArtcile.prev)
// const next = computed(() => articleDetail.value.pageArtcile.next)
//

onMounted(() => {

})
/**
 * SEO
 */
const metaDescription = computed(() => articleDetail.value?.abstract?.substring(0, 100).replace(/\r?\n/g, '').replace(/#/g, '') + '...')
const metaKeywords = computed(() => articleDetail.value?.title?.length > 0 ? articleDetail.value.title : '')
const useHeadOption = computed(() => {
  return {
    title: `${articleDetail.value?.title || '文章详情'}`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: `${articleDetail.value?.title || ''} - ${metaDescription.value}`,
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: metaKeywords.value
      },
    ]
  }
})
useHead(useHeadOption)
</script>
<style lang="scss" scoped>
.zy-blog-detail {
  width: 100%;
  flex: 1 0 auto;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  padding-bottom: 2rem;
  letter-spacing: .5px;
  font-family: Söhne, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;

  .page-action {
    font-size: 1rem;
    cursor: pointer;
  }


  .contents-wrap {
    max-width: 960px;
    box-sizing: border-box;
    padding: 20px 15px;
    position: relative;
    border-radius: 5px;
    //box-shadow: 0 0 3px rgba(60, 72, 88, 0.15);
    margin: 1rem auto 0;

    .content-header {
      margin-top: 2rem;
      margin-bottom: 2rem;

      .header-text {
        line-height: 3rem;
        word-spacing: 2px;
        letter-spacing: .5px;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        font-family: inherit;
      }

      .header-tip {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .tip-item {
          letter-spacing: .5px;
          padding: 10px 10px 0 0;
          color: #afafaf;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: .9rem;
          cursor: pointer;

          .tip-icon {
            margin-right: 5px;
          }
        }
      }
    }

    .content-footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 3rem auto;

      .footer-l {
        .keywords-item {
          margin-right: .85rem;
          font-size: .9rem;
        }
      }

      .footer-r {
        display: flex;
        justify-content: right;
        align-items: center;
        color: #999797;
        font-size: .9rem;
      }

    }

    .next-pre {
      display: flex;
      flex-wrap: wrap;
      margin: 2rem 0;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      border-radius: 5px;

      .np-item {
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 1rem;
        background-size: cover;
        background-position: center center;
        color: #fff;
        cursor: pointer;
        transition: .3s;
        background-color: #e9e9e9;
        position: relative;

        .text {
          position: relative;
          z-index: 1;
        }

        .page-img {
          position: absolute;
          object-fit: cover;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        &::after {
          position: absolute;
          content: '';
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }

        &:hover {
          color: $color-primary;
        }
      }

      .pre {
        text-align: right;
      }
    }

    .reship {
      width: 100%;
      min-height: 120px;
      background-color: #000000;
      position: relative;
      margin: 3rem auto;
      box-sizing: border-box;
      padding: 2rem;

      &:before {
        content: '';
        position: absolute;
        top: -18px;
        left: 50%;
        border: 10px solid transparent;
        border-bottom-color: #000000;
      }
    }
  }

  .related {
    margin: 3rem auto;

    ul {
      padding-left: 2.5rem;

      li {
        letter-spacing: 1px;
        font-size: 14px;
        padding: .1rem 0 .5rem 5px;
        cursor: pointer;
        color: #9a9a9a;

        &:hover {
          color: $color-primary;
        }
      }

      li::marker {
        content: '📍';

      }
    }
  }

  .post-comment-form {
    margin: 2rem auto;

    .cont-form {
      width: 100%;
      background-color: #fff;

      input {
        width: 100%;
        height: 50px;
        margin-bottom: 30px;
        padding: 10px;
        border: none;
        -webkit-box-shadow: 0 0 90px rgba(0, 0, 0, 0.15);
        box-shadow: 0 0 90px rgba(0, 0, 0, 0.15);
        font-family: "Poppins", sans-serif;

        &:first-child {
          margin-right: 1rem;
        }

      }

      textarea {
        width: 100%;
        height: 150px;
        margin-bottom: 30px;
        padding: 10px;
        border: none;
        -webkit-box-shadow: 0 0 90px rgba(0, 0, 0, 0.15);
        box-shadow: 0 0 90px rgba(0, 0, 0, 0.15);
        font-family: "Poppins", sans-serif;
      }

      .site-btn {
        position: relative;
        display: inline-block;
        color: #fff;
        padding: 14px 40px;
        border: none;
        font-family: "Poppins", sans-serif;
        line-height: normal;
        text-transform: uppercase;
        border-radius: 50px;
        font-size: 12px;
        letter-spacing: 1px;
        background: #333;
      }
    }
  }
}
</style>
