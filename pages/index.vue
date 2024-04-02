<template>
  <div class="home-container" id="home">
    <ZyIntro @mose="scrollToSection1" v-if="state.layout.intro"/>
    <section class="main-warp" id="about">
      <section class="banner" :style="{backgroundImage:`url(${state.websiteInfo.mainBg})`}"
               v-if="state.layout.main">
        <div class="banner-content">
          <div class="banner-container">
            <div class="row">
              <div class="row-col-left"></div>
              <div class="row-col-right">
                <div class="banner-text"
                     :style="`transform: translateX(-${introAnimationOffset}%)`">
                  <p class="text-tip">Hi! I'm {{ state.websiteInfo.name || 'ZHOU YI' }}</p>
                  <p class="text-main">
                    {{
                      state.websiteInfo.motto || "Welcome To My Personal Homepage! Let's Go!"
                    }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="main-container">
        <!--        主要信息-->
        <section class="container-row" v-if="state.layout.main">
          <div class="container-left">
            <div class="sidebar" :style="`transform: translateY(-${introLeftAnimationOffset}%)`">
              <div class="sidebar-card">
                <div class="sidebar-avatar">
                  <img class="avatar-img lazy-image "
                       v-if="state.websiteInfo.wxMini"
                       :src="state.websiteInfo.wxMini">
                </div>
                <div class="sidebar-name">{{ state.websiteInfo.occupation }}</div>
                <div class="sidebar-label">{{ state.websiteInfo.occupationEn }}</div>
                <div class="c-divider c-mb-40"></div>
                <div class="sidebar-social">
                  <a :href="state.userInfo.github" target="_blank"><i
                      class="iconfont icon-github"></i></a>
                  <a :href="state.userInfo.gitee" target="_blank"><i
                      class="iconfont icon-gitee"></i></a>
                </div>
                <div class="c-divider c-mb-40 c-mt-40"></div>
                <ul class="sidebar-other">
                  <li class="other-item">
                    <span class="item-label">城市：</span>
                    <span class="item-label-light">{{ state.userInfo.city || '-' }}</span>
                  </li>
                  <!--                                    <li class="other-item">-->
                  <!--                                        <span class="item-label">行业：</span>-->
                  <!--                                        <span class="item-label-light">setting.userInfo.industry</span>-->
                  <!--                                    </li>-->
                  <li class="other-item">
                    <span class="item-label">交流群：</span>
                    <span class="item-label-light">{{ state.userInfo.group }}</span>
                  </li>
                  <li class="other-item">
                    <span class="item-label" title="码云关注">关注我：</span>
                    <div class="item-label-light">
                      <ZyAvatarList/>
                    </div>
                  </li>
                  <li class="other-item">
                    <span class="item-label">微信/QQ：</span>
                  </li>
                  <div class="social">
                    <img width="80"
                         v-if="state.userInfo.wx"
                         class="lazy-image"
                         :src="state.userInfo.wx">
                    <img width="80"
                         v-if="state.userInfo.qq"
                         class="lazy-image"
                         :src="state.userInfo.qq">
                  </div>
                </ul>
                <div class="c-divider c-mb-40"></div>

                <div class="sidebar-btn"
                     :style="{backgroundColor:state.theme.primaryColor,borderColor:state.theme.primaryColor}"
                     @click="scrollToSection1('contact')">
                  <span>在线留言</span>
                </div>
                <span class="downResume" :style="{color:state.theme.primaryColor}"
                      v-if="state.userInfo.resumeUrl"
                      @click="downloadResume(state.userInfo.resumeUrl)">下载简历</span>
              </div>
            </div>
          </div>
          <div class="container-right">
            <div class="container-right-content">
              <div class="brand-card-list">
                <div class="brand-card-item" v-for="item in state.userInfo.feature">
                  <div class="card-item">
                    <h3 class="card-item-title">{{ item.title }}</h3>
                    <div class="c-divider"></div>
                    <div class="card-item-content">{{ item.content }}</div>
                  </div>
                </div>
              </div>
              <section class="notice">
                <div class="notice-line">
                  <span class="notice-title">📢 公告：</span>
                  <div class="notice-desc">
                    <div class="notice-txt" v-if="state.anouncementData.length<2"
                         v-for="(item,index) in state.anouncementData"
                         :key="item._id"
                    > {{ item.title || '暂无通知' }}
                    </div>
                    <a-carousel v-else dot-position="right" :dots="false" autoplay>
                      <div class="notice-txt"
                           v-for="(item,index) in state.anouncementData"
                           :key="item._id"
                      > {{ item.title || '暂无通知' }}
                      </div>
                    </a-carousel>
                  </div>
                  <div class="notice-his" @click="goToPage('/announcement')">查看所有<i
                      class="iconfont icon-click"/></div>
                </div>
              </section>
              <section class="brand-tips">
                <ZySectionHeader title="Tips" titleNum="01"/>
                <blockquote class="my-story">
                  <p> ✨基于Nuxt3+JS搭建</p>
                  <p> ✨只移动部分功能并不是完整的</p>
                  <img class="wx-logo lazy-image" width="120"
                       v-if="state.websiteInfo.wxMini"
                       :src="state.websiteInfo.wxMini">
                </blockquote>
              </section>
            </div>
          </div>
        </section>
        <!--        通知-->
        <section class="notice notice-temp c-mb-40">
          <div class="notice-line">
            <span class="notice-title">公告：</span>
            <div class="notice-desc">{{ state.websiteInfo.notice || '暂无通知' }}
            </div>
          </div>
        </section>

        <!--        关于我-->
        <section class="about c-mt-40 " v-if="state.layout.aboutMe">
          <ZySectionHeader title="About me" titleNum="02"/>
          <section class="animate-me" :key="state.key" v-html="state.aboutMe"></section>
        </section>

        <!--        服务-->
        <section class="about c-mt-40 ">
          <ZySectionHeader title="Service" titleNum="03"/>
          <ZySkillsPanel/>
        </section>
        <!--        精选博文-->
        <section class="blog  c-mt-40 c-mb-40" id="blog" v-if="state.layout.blog">
          <ZySectionHeader title="Featured Articles" titleNum="05"/>
          <ZyArticleSection/>
        </section>

        <!--        最近评论-->
        <ZyRecentComments/>


        <!--        作品-->
        <section class="works c-mt-40 c-mb-40" id="work" v-if="state.layout.works">
          <ZySectionHeader title="My Complete Projects" titleNum="07"/>
          <ZyWorksSection class="work-se c-mt-40" :dataList="state.portfoliosData"/>
          <div class="work-box" v-if="false">
            <div class="work-list">
              <div class="work-item" :title="item.abstract" v-for="item in state.portfoliosData"
              >
                <img class="work-cover lazy-image" v-bind:data-src="item.cover"
                     alt="Lazy Loaded Image">
                <div class="work-info">
                  <div class="work-info-icon"><i class="iconfont icon-chakan2"></i></div>
                  <div class="work-info-title">{{ item.title }}</div>
                  <!--                  <div class="work-info-desc"> {{ item.abstract }}</div>-->
                </div>
              </div>
              <div class="work-item" @click="goToPage('/Portfolio')">
                <img class="work-cover lazy-image"
                     v-bind:data-src="`http://www.zhouyi.run:3089/v1/common/files/preview/img/1691545299360.png`">
                <div class="work-info work-more">
                  <div class="work-info-icon"><i class="iconfont icon-click"></i></div>
                  <div class="work-info-title">MORE</div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <!--        留言-->
        <section class="connect c-mt-40 c-mb-40" id="contact">
          <ZySectionHeader title="Contact Me" titleNum="08"/>
          <p class="message-tips">留下你的足迹，让我知道你在这里看过我的留言板。</p>
          <div class="connect-box">
            <div class="contact-form">
              <ZyForm @submitForm="submitMessage" :noRow="true" v-if="state.layout.contact"/>
            </div>
            <ul class="contact-basic">
              <li class="basic-item" v-for="item in state.messageList" :key="item._id">
                <a-avatar
                    v-if="item.userInfo[0].length"
                    :size="40"
                    :src="item.userInfo[0].avatar"
                    alt="匿名"/>
                <a-avatar :size="40" v-else>
                  <template #icon>
                    <i style="font-size: 1.6rem" class="iconfont icon-customer-bussinessman"></i>
                  </template>
                </a-avatar>
                <div class="item-r">
                  <p class="r-t">
                    <span class="r-t-name" :style="{paddingRight:item.userInfo[0].username==='admin'?0:'10px'}">{{
                        item.userInfo[0].nickname
                      }}</span>
                    <span class="author" v-if="item.userInfo[0].username==='admin'"></span>
                    <span class="r-t-time">{{
                        TimeUtils.formatRelativeTime(item.createdAt)
                      }}</span></p>
                  <p class="r-desc"> {{ item.content }} </p>
                </div>
              </li>
              <li class="more-msg" @click="goToPage('/contact')">
                <i class="iconfont icon-click"></i> 查看更多
              </li>
            </ul>
          </div>
        </section>

        <footer class="main-footer" ref="layoutFooter">
          <div class="main-info">
            <div class="info-item" v-if="state.userInfo.wx">
              <div class="item-title">微信</div>
              <a-image
                  :width="80"
                  :src="state.userInfo.wx"
              />
            </div>
            <div class="info-item" v-if="state.userInfo.qq">
              <div class="item-title">QQ</div>
              <a-image
                  :width="90"
                  :src="state.userInfo.qq"
              />
            </div>
          </div>

          <div class="copyright" v-if="state.layout.copyright">
            {{ ` Copyright ©${new Date().getFullYear()} by` }}
            <a target="_blank" class="out-link" :href="state.reference.authorizationUrl">
              @{{ state.reference.authorization }}</a>. All rights reserved. |
            <a target="_blank" class="out-link" href="https://beian.miit.gov.cn/#/Integrated/index">
              {{ state.reference.number }}
            </a> | <a target="_blank" class="out-link" href="http://admin.zhouyi.run/">
            主页管理端👈
          </a>
          </div>
          <div class="copyright" v-if="state.layout.copyright">
            <img src="https://img.shields.io/badge/-Vue3-34495e?logo=vue.js">
            <img src="https://img.shields.io/badge/-JavaScript-yellow?logo=javascript&logoColor=white">
            <img src="https://img.shields.io/badge/-Nodejs-green?logo=node.js&logoColor=white">
            <img src="https://img.shields.io/badge/-Express-red?logo=Express&logoColor=white">
            <img src="https://img.shields.io/badge/-MongoDB-green?logo=MongoDB&logoColor=white">
          </div>
          <!--          <div class="copyright">-->
          <!--            <span style="margin-right: 1rem">总访问数：{{ state.viewTotal }}次</span>-->
          <!--            <span>已运行：{{ state.elapsedTime }}</span>-->
          <!--          </div>-->
        </footer>
      </section>
    </section>
    <ZyGoTop/>

  </div>
</template>
<script setup>
import {blog_articlesList} from "../api/modules/api.blog_articles";
import {anouncementsHomeList, frontendsetups, visitorsCreate} from "../api/modules/api.common";
import observeAndAnimate from "../utils/util.viewportObserve";
import lazyLoadImages from "../utils/util.lazyLoad";
import {portfoliosList} from "../api/modules/api.portfolios";
import {messagesCreate, messagesList} from "../api/modules/api.messages";

const router = useRouter()
const postList = ref([])
const state = reactive({
  setting: {},
  websiteInfo: {},
  theme: {},
  reference: {},
  layout: {},
  aboutMe: '',
  anouncementData: {},
  portfoliosQuery: {
    params: {
      recommended: true,
      status: true,
    },
    pagination: {
      current: 1,
      pageSize: 5,
    },
  },
  messageQuery: {
    pagination: {
      current: 1,
      pageSize: 5,
    },
  },
  messageList: [],
  portfoliosData: [],
  userInfo: {},
  titleAnimation: false,
  textAnimation: false,
  scrollHeight: 0,
  bannerWidth: 100,
  key: 1,
  show: {
    work: false
  },
})

// 实现平滑滚动到锚点的方法
const scrollToSection1 = (id) => {
  const dom = document.getElementById(id)
  dom.scrollIntoView({behavior: 'smooth'});
};

const getPortfolioList = () => {
  portfoliosList(state.portfoliosQuery).then(res => {
    state.portfoliosData = res.data.result || []
  })
}
const getMessageList = () => {
  messagesList(state.messageQuery).then(res => {
    state.messageList = res.data.result
  })
}
const getFrontendSetups = async () => {
  let res = await frontendsetups({})
  // state.setting.assign(res.data.result[0] || {})
  state.websiteInfo = res.data.result[0].websiteInfo || {}
  state.theme = res.data.result[0].theme || {}
  state.userInfo = res.data.result[0].userInfo || {}
  state.layout = res.data.result[0].layout || {}
  state.reference = res.data.result[0].reference || {}
  // 替换高亮词
  state.aboutMe = replaceTextWithRandomSpan(state.userInfo.aboutMeText, state.userInfo.emphasizeAboutMeText)
}
const introAnimationOffset = computed(() => {
  return state.layout.intro ? (state.titleAnimation ? 0 : 50) : 0;
})
const introLeftAnimationOffset = computed(() => {
  return state.layout.intro ? (state.titleAnimation ? 40 : 0) : 40;
})

const getAnouncementRecent = () => {
  anouncementsHomeList({
    sort: {
      columnKey: "createdAt",
      order: "descend" //降序（新的在前面）
    }
  }).then(res => {
    state.anouncementData = res.data.result || []
  })
}
import {Modal, message, notification} from 'ant-design-vue';

const submitMessage = (form) => {
  message.warning('留言暂未开放');
  // messagesCreate(form).then(res => {
  //   if (res.status) {
  //     let info = {
  //       name: form.nickname,
  //       email: form.email,
  //       website: form.website
  //     }
  //     localStorage.setItem('ZY-CLIENT-USERINFO', JSON.stringify(info))
  //     getMessageList()
  //   }
  // })
}

getAnouncementRecent()
getFrontendSetups()
getPortfolioList()
getMessageList()

blog_articlesList({}).then(res => {
  postList.value = res.data.result || []
})
const goPage = (path) => {
  router.push({path})
}

const handleScroll = (e) => {
  // 滚动事件处理逻辑
  if (state.layout.intro) {
    state.titleAnimation = window.scrollY - window.innerHeight / 2.2 > 0;
  }
};
/**
 * SEO
 */
const useHeadOption = computed(() => {
  return {
    title: "ZHOUYI主页",
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'ZHOUYI主页',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'ZHOUYI主页'
      },
    ]
  }
})
useHead(useHeadOption)
// 记录访客
const recordVisitor = () => {
  visitorsCreate({name:'-', page: 'NUXT3/主页'})
}
recordVisitor()

function replaceTextWithRandomSpan(text, replacements) {
  // 随机生成 CSS 类名的函数
  function getRandomClassName() {
    const classNames = ['me-text-a', 'me-text-b', 'me-text-c', 'me-text-d', 'me-text-e'];
    const randomIndex = Math.floor(Math.random() * classNames.length);
    return classNames[randomIndex];
  }

  // 遍历替换文本
  let replacedText = text;
  replacements.forEach((replacement) => {
    const randomClassName = getRandomClassName();
    const pattern = new RegExp(replacement, 'g');
    replacedText = replacedText.replace(
        pattern,
        `<span class="me-text ${randomClassName}">${replacement}</span>`
    );
  });
  return replacedText;
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);

  observeAndAnimate('.news-block-two', (element) => {
    // 自定义动画效果
    element.style.opacity = 1;
    element.style.transform = 'translateX(0px)';
  });
  observeAndAnimate('.box-item', (element) => {
    // 自定义动画效果
    element.style.opacity = 1;
    element.style.transform = 'translateY(0px)';
  });


  await nextTick(() => {
    // 获取所有带有 me-text 类名的元素
    const elementsWithMeText = document.getElementsByClassName('me-text');
    console.log('elementsWithMeText', elementsWithMeText.length)
    // 定义样式属性对象，包含通用属性
    const commonStyles = {
      color: 'transparent',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      'font-size': '1.9rem',
    };

    // 定义不同后缀对应的背景颜色
    const suffixColors = {
      a: 'linear-gradient(to right, #24c6dc, #514a9d)',
      b: 'linear-gradient(to right, #f3cd13, #f35858)',
      c: 'linear-gradient(to right, #dd5e89, #f7bb97)',
      d: 'linear-gradient(to right, #3ca55c, #b5ac49)',
      e: 'linear-gradient(to right, #4cb8c4, #3cd3ad)',
    };

    // 遍历并操作这些元素
    for (const element of elementsWithMeText) {
      // 获取元素的类名
      const classNames = element.className.split(' ');

      // 遍历元素的类名
      for (const className of classNames) {
        // 判断类名是否以 me-text- 开头
        if (className.startsWith('me-text-')) {
          // 提取后缀，例如 'a'、'b'、'c' 等
          const suffix = className.replace('me-text-', '');

          // 设置通用样式属性
          for (const style in commonStyles) {
            if (commonStyles.hasOwnProperty(style)) {
              element.style[style] = commonStyles[style];
            }
          }

          // 根据后缀设置背景颜色
          if (suffixColors[suffix]) {
            element.style.backgroundImage = suffixColors[suffix];
          }
        }
      }
    }
  });

  // 懒加载图片
  lazyLoadImages();
})
</script>
<style lang="scss">
.home-container {
  //font-family: courier new;
  //font-family: "Droid Sans Mono Dotted";
  font-family: -apple-system, BlinkMacSystemFont, "opensans", "Optima", "Microsoft Yahei", sans-serif;
  height: 100%;
  position: relative;
  transition: all .4s linear;

  .main-warp {
    background-color: #FFF;
    box-sizing: border-box;
    width: 100%;

    .notice {
      padding: .7rem .7rem .7rem 1.2rem;
      //background-image: linear-gradient(to right, #f6f6f6, transparent);
      border-radius: 5px;
      transform: translateY(-100px);
      overflow: hidden;

      .notice-line {
        text-align: left;
        padding: 1rem 1rem 1rem 0;

        color: #607d8b;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .notice-title {
          width: 80px;
          font-weight: bold;
        }

        .notice-his {
          width: 80px;
          text-align: center;
          font-size: .7rem;
          display: flex;
          justify-content: center;
          align-content: center;
          cursor: pointer;
        }

        .notice-desc {
          width: calc(100% - 160px);

          .notice-txt {
            width: calc(100% - 80px);
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
            cursor: pointer;

            &:hover {
              color: $color-primary;
            }
          }

        }
      }
    }

    .notice-temp {
      transform: translateY(0);
      margin-top: 20px;
      display: none;

      .notice-line {
        .notice-title {
          width: 60px;
          font-weight: bold;
        }

        .notice-desc {
          width: calc(100% - 60px);

        }
      }
    }

    @media screen and (max-width: 768px) {
      .notice-temp {
        display: block;
      }
    }

    .brand-tips {
      transform: translateY(-80px);
    }

    .banner {
      width: 100%;
      height: 560px;
      position: relative;
      overflow: hidden;
      border-radius: 0 0 20px 20px;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      transition: all .4s linear;
      background-image: url(https://www.zhouyi.run/assets/bg-map-9bef45bb.png);
      background-position: center;
      background-attachment: fixed;
      background-size: cover;

      &:hover {
        background-position: center 51%;
      }

      .banner-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        transition: all .4s linear;
      }

      .banner-content {
        padding-top: 80px;
        //z-index: 1;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        background-image: linear-gradient(to bottom, #000, transparent, transparent);

        .banner-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0;
          width: 100%;

          .row {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;


            .row-col-left {
              width: 33%;
              padding: 0 20px;
              box-sizing: border-box;
              @media screen and (max-width: 768px) {
                display: none;
              }
            }

            .row-col-right {
              width: 66%;
              padding: 0 20px;
              box-sizing: border-box;
              @media screen and (max-width: 768px) {
                width: 100%;
              }

              .banner-text {
                transition: all .2s linear;
                transform: translateX(-50%);

                .text-tip {
                  font-size: 1.2rem;
                  font-weight: bold;
                  color: #ffffff;

                }

                .text-main {
                  font-size: 3.5rem;
                  font-weight: bold;
                  line-height: 1.2;
                  text-shadow: 0 1px 10px rgba(255, 255, 255, 0.2);
                  background: url(https://www.graphicartsunit.com/codepen/images/grunge_bg_1.png);
                  background-clip: text;
                  -webkit-background-clip: text;
                  color: transparent;

                }
              }
            }
          }
        }
      }
    }

    .main-container {
      max-width: 1140px;
      width: 100%;
      margin: 0 auto;
      transition: all .4s linear;

      .container-row {
        display: flex;
        max-width: 1140px;
        width: 100%;
        transition: all .4s linear;
        height: 450px;
        box-sizing: border-box;
        @media screen and (max-width: 768px) {
          display: none;
        }

        .container-left {
          width: 33%;
          padding: 0 20px;
          box-sizing: border-box;

          .sidebar {
            width: 100%;
            transition: all .3s linear;

            .sidebar-card {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              padding: 70px 25px 35px;
              width: 100%;
              border-radius: 10px;
              box-shadow: 0 2px 4px -2px rgba(0, 0, 0, 0.3);
              background-color: #ffffff;
              background-image: url(../assets/img/bg-map.png);
              background-position: center center;

              &:before {
                content: '';
                position: absolute;
                left: 30px;
                top: -8px;
                height: 8px;
                width: calc(100% - 60px);
                background-color: #FCFCFE;
                border-radius: 5px 5px 0 0;
                opacity: .3;
              }

              .sidebar-avatar {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 20px;
                position: absolute;
                top: -65px;
                left: 50%;
                transform: translateX(-50%);


                .avatar-img {
                  border: solid 3px #FCFCFE;
                  width: 120px;
                  height: 120px;
                  border-radius: 50%;
                  object-fit: cover;
                  box-shadow: 0 0 12px #ffffff inset;

                  &:hover {
                    filter: brightness(1.1);
                  }
                }
              }

              .sidebar-name {
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 15px;
              }

              .sidebar-label {
                text-align: center;
              }

              .sidebar-social {
                display: flex;
                justify-content: center;
                align-items: center;

                a {
                  color: #00283A;
                  margin: 0 10px;
                  transition: .4s ease-in-out;

                  &:hover {
                    color: $color-primary;
                  }

                  .iconfont {
                    font-size: 1.3rem;
                  }
                }
              }

              .sidebar-other {
                margin: 0;
                padding: 0;

                .other-item {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 10px;

                  .item-label {
                    font-weight: 700;
                    letter-spacing: 2px;
                    color: #00283A;

                    &-light {
                      color: #7B7B7D;
                    }
                  }
                }
              }

              .social {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                img {
                  border: 2px solid #eee;
                  padding: 2px;
                  border-radius: 5px;
                  margin-right: 8px;
                  display: inline-block;
                }
              }

              .sidebar-btn {
                white-space: nowrap;
                background-color: $color-primary;
                height: 45px;
                border: solid 2px $color-primary;
                color: #fcfcfe;
                letter-spacing: 2px;
                border-radius: 30px;
                padding: 0 25px;
                cursor: pointer;
                transition: .4s ease-in-out;
                line-height: 45px;
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                  margin-right: 5px;
                  font-weight: 700;
                }

                &:hover {
                  transform: scale(1.03);
                  color: #fcfcfe;
                  background-color: $color-primary;
                  border: solid 2px $color-primary;
                }
              }

              .downResume {
                text-align: center;
                line-height: 2rem;
                color: $color-primary;
                cursor: pointer;
              }
            }
          }

        }

        .container-right {
          width: 66%;
          padding: 0 10px 0 20px;
          box-sizing: border-box;

          .container-right-content {
            padding: 0 0 60px;
            position: relative;
            z-index: 1;
            //transform: translateY(-80px);

            .my-story {
              box-shadow: 0 5px 10px -1px rgba(0, 0, 0, 0.15);
              margin: 0;
              display: block;
              position: relative;
              background-color: transparent;
              color: #323232;
              padding: 40px;
              border-radius: 10px;
              font-style: italic;
              font-size: 16px;
              font-weight: 500;
              background-image: url(../assets/img/bg-map.png);
              background-position: center center;

              .wx-logo {
                position: absolute;
                top: 50%;
                right: 30px;
                transform: translateY(-50%);
                mix-blend-mode: color-burn;
              }

              &:before {
                margin: 0;
                color: $color-primary;
                width: 50px;
                line-height: 55px;
                content: '"';
                position: absolute;
                top: 10px;
                left: 10px;
                font-size: 54px;
              }

              &:after {
                margin: 0;
                color: $color-primary;
                width: 50px;
                line-height: 55px;
                content: '"';
                position: absolute;
                bottom: -20px;
                right: 2px;
                font-size: 54px;
              }

            }

            .brand-card-list {
              display: flex;
              justify-content: space-between;
              flex: 1 1 auto;
              width: 100%;
              transform: translateY(-80px);

              .brand-card-item {
                width: calc(33.33% - 20px);
                max-height: 220px;
                box-sizing: border-box;
                position: relative;
                margin-bottom: 40px;

                &:before {
                  content: '';
                  position: absolute;
                  left: 30px;
                  top: -8px;
                  height: 8px;
                  width: calc(100% - 60px);
                  background-color: #FCFCFE;
                  border-radius: 5px 5px 0 0;
                  opacity: .3;
                }

                .card-item {
                  text-align: center;
                  border-radius: 10px;
                  padding: 40px;
                  box-shadow: 0 2px 4px -2px rgba(0, 0, 0, 0.15);
                  background-color: #FFF;
                  background-image: url(../assets/img/bg-map.png);
                  background-position: center center;

                  .card-item-title {
                    font-size: 24px;
                    font-weight: 900;
                    color: #00283A;
                    line-height: 20px;
                  }
                }

              }
            }
          }
        }
      }

      .about {
        padding: 0 1rem;

        .animate-me {
          color: #ffffff;
          transition: all .4s linear;
          font-size: 1.5rem;
          letter-spacing: 2px;
          font-family: "plantc", "Source Han Serif", serif;
          padding: 2rem 10px;
          word-break: break-word;
          text-align: center;

          &:hover {
            color: #c4c3c3;
          }

          .me-text {

            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            font-size: 1.9rem;

            &-a {
              background-image: linear-gradient(to right, #24c6dc, #514a9d);
            }

            &-b {
              background-image: linear-gradient(to right, #f3cd13, #f35858);
            }

            &-c {
              background-image: linear-gradient(to right, #dd5e89, #f7bb97);
            }

            &-d {
              background-image: linear-gradient(to right, #3ca55c, #b5ac49);
            }

            &-e {
              background-image: linear-gradient(to right, #4cb8c4, #3cd3ad);
            }
          }
        }
      }

      .resume {
        padding: 0 1rem;

        .resume-box {
          width: 100%;
          position: relative;
          border-top: 1px solid #eeedf2;
          border-left: 1px solid #eeedf2;
          margin-bottom: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;

          .box-title {
            position: absolute;
            left: 25px;
            top: -20px;
            z-index: 1;
            padding: 0 20px;
            height: 40px;
            line-height: 40px;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;

            .icon {
              font-size: 1rem;
              margin-right: 15px;
            }

            .text {
              font-size: 1rem;
              color: #a5a4a4;
              text-transform: uppercase;
              font-weight: 600;
            }
          }

          .box-item {
            width: 33.3%;
            height: 14rem;
            min-width: 12rem;
            position: relative;
            border-right: 1px solid #eeedf2;
            border-bottom: 1px solid #eeedf2;
            box-sizing: border-box;
            padding: 35px;
            opacity: 0;
            transition: all .3s linear;
            transform: translateY(100px);
            @media screen and (max-width: 768px) {
              width: 50% !important;
              height: 12rem;
              padding: 15px;
            }

            &:hover {
              .experience-time {
                background-color: $color-primary;
                color: #ffffff;
              }

            }

            .experience-time {
              display: inline-block;
              padding: 5px 12px;
              background-color: #f0f0f0;
              font-size: .9rem;
              margin: 10px 0;
              transition: all .3s linear;

            }

            .experience-corporation {
              line-height: 2rem;
              margin-bottom: 5px;
              font-weight: bold;
              color: $color-primary;
            }

            .experience-work {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }

      }

      .blog {
        padding: 0 1.4rem;

        .blog-menu {
          display: flex;
          padding: 1rem;
          flex-wrap: wrap;

          li {
            padding: 6px 20px;
            background-color: #f5f5f5;
            border-radius: 5px;
            font-size: .9rem;
            transition: all .2s linear;
            cursor: pointer;
            margin: 0 .5rem 1rem;

            &:hover {
              background-color: $color-primary;
              color: #EEEEEE;
            }
          }
        }


      }

      .works {
        box-sizing: border-box;
        padding: 0 1.4rem;
        @media screen and (max-width: 750px) {
          padding: 0 1rem;
        }

        .work-se {
          margin-top: calc(1rem + 40px);
        }

        .work-box {

        }

        .work-menu {
          display: flex;
          padding: 1rem;
          flex-wrap: wrap;

          li {
            padding: 6px 20px;
            background-color: #f5f5f5;
            margin: 0 .5rem 1rem;
            border-radius: 5px;
            font-size: .9rem;
            transition: all .2s linear;
            cursor: pointer;

            &:hover {
              background-color: $color-primary;
              color: #EEEEEE;
            }
          }
        }

        .work-list {
          display: flex;
          flex-wrap: wrap;

          .work-item {
            width: calc(31% + 10px);
            height: 14rem;
            overflow: hidden;
            position: relative;
            margin-bottom: 10px;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
            @media screen and (max-width: 900px) {
              width: calc(45% + 10px);
            }
            @media screen and (max-width: 900px) and (max-width: 750px) {
              width: 100%;
            }

            .work-cover {
              display: inline-block;
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: all .3s linear;
            }

            .work-info {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translateX(-50%) translateY(-50%);
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, .5);
              opacity: 0;
              transition: all .3s linear;
              outline: 1px dashed #EEEEEE;
              font-size: .9rem;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              color: #ffffff;
              box-sizing: border-box;
              padding: 8px;

              .work-info-icon .iconfont {
                font-size: 2.5rem;
                color: $color-primary;
                text-shadow: 0 0 10px $color-primary;
              }

              .work-info-title {
                font-size: 1.1rem;
                font-weight: bold;
                margin-bottom: 1rem;
              }

              .work-info-desc {
                text-align: center;
                max-height: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
              }
            }

            .work-more {
              opacity: 1;
            }

            &:hover {
              .work-cover {
                filter: blur(8px);
              }

              .work-info {
                opacity: 1;
                border-radius: 5px;
              }
            }

          }
        }

      }


      .connect {
        box-sizing: border-box;
        padding: 0 1.4rem;

        .connect-box {
          display: flex;
          flex-wrap: wrap;
          @media screen and (max-width: 768px) {
            width: 100%;
          }

          .contact-basic {
            width: 40%;
            padding: 1.2rem 0 0 2rem;
            @media screen and (max-width: 768px) {
              width: 100%;
              margin-top: 2.5rem;
              padding: 0;
              .basic-item {
                padding: 0;
              }
            }


            .basic-item {
              text-align: center;
              border-radius: 5px;
              display: flex;
              justify-content: flex-start;
              overflow: hidden;
              //align-items: center;
              margin-bottom: 1.5rem;
              background-position: top center;

              .item-r {
                width: calc(100% - 60px);
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                flex-wrap: wrap;
                padding: 0 5px 0 1.2rem;
                font-size: 1rem;
                text-align: left;

                .r-t {
                  margin-bottom: 5px;

                  .r-t-name {
                    font-weight: bold;
                    padding-right: 10px;
                  }

                  .author:after {
                    content: '管理员';
                    background: #03658c;
                    color: #FFF;
                    font-size: 12px;
                    padding: 3px 5px;
                    font-weight: 700;
                    margin-left: 10px;
                    -webkit-border-radius: 3px;
                    -moz-border-radius: 3px;
                    border-radius: 3px;
                    margin-right: 10px;
                  }

                  .r-t-time {
                    font-size: .9rem;
                  }
                }

                .r-desc {
                  font-size: .9rem;
                }
              }


            }

            .more-msg {
              color: #adadad;
              text-emphasis: dot;
              text-emphasis-position: under;
              cursor: pointer;
              transition: all .3s linear;
              font-weight: bold;

              &:hover {
                color: $color-primary;
              }
            }
          }

        }

        .message-tips {
          text-align: center;
          margin-bottom: 20px;
          color: #d4d3d3;
          font-size: 1.5rem;
          letter-spacing: 1px;
          font-family: "plantc", "Source Han Serif", serif;
        }
      }
    }

    ul {
      list-style-type: none;
    }
  }
}

// 公共类
.section-title {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  letter-spacing: 0;
  font-weight: 800;
  color: #7c7d7d;
  font-size: 1.25rem;
  line-height: 1.2;
  -webkit-box-reflect: below -5px linear-gradient(transparent, rgba(0, 0, 0, .4));

  span {
    position: relative;
    margin-left: 20px;
    margin-right: 35px;
    display: inline-block;
    height: 1px;
    border-bottom: dotted 2px rgba(225, 225, 235, 0.9);
    width: 100%;

    &:after {
      content: attr(data-number);
      border-radius: 50%;
      position: absolute;
      font-size: 11px;
      font-weight: 600;
      text-align: center;
      color: #7B7B7D;
      opacity: .8;
      width: 15px;
      height: 15px;
      top: -6px;
      right: -35px;
    }
  }
}

.box-title {
  .title-icon {
    font-size: 1.7rem;
    margin-right: 1rem;
  }

}


.c-divider {
  height: 1px;
  border-bottom: dotted 2px rgba(225, 225, 235, 0.9);
  width: 100%;
  margin: 20px 0;
}

.c-mb {
  &-20 {
    margin-bottom: 20px;
  }

  &-40 {
    margin-bottom: 40px;
  }

  &-60 {
    margin-bottom: 60px;
  }
}

.c-mt {
  &-20 {
    margin-top: 20px;
  }

  &-40 {
    margin-top: 40px;
  }

  &-60 {
    margin-top: 60px;
  }
}

.main-footer {
  border-top: 1px solid #f1f1f1;
  padding: 1.5rem;
  background-color: #fff;

  .main-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    @media screen and (min-width: 768px) {
      display: none;
    }

    .info-item {
      margin: 5px;

      .item-title {
        font-size: 1.2rem;
        font-family: "plantc", "Source Han Serif", serif;
      }
    }
  }

  .copyright {
    text-align: center;
    font-size: .8rem;
    color: #a8a8a8;
    letter-spacing: 1px;

    a {
      color: #a8a8a8;
    }

    img {
      margin-right: 5px;
      margin-top: 5px;
    }
  }

}

</style>
