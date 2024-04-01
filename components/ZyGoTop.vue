<template>
  <section :style="{opacity:showToTop? 1 :0}" title="回到顶部">
    <div class='goTop' id="goTop"></div>
    <div class='goTop2' id="goTop2">
      <div class="go-top-progress-wrap">
        <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path :style="{stroke:'#f50'}" ref="progressPathRef"
                d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
        </svg>
      </div>
    </div>
    <div class='goTop3' id="goTop3" @click="scrollToTop">
      <i class="iconfont icon-icon-test"></i>
    </div>
  </section>
</template>

<script setup>


const showToTop = ref(false)
const progressPathRef = ref(null)
const pathLength = ref(0)

const handleScroll = () => {
  showToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

const initProgress = () => {
  let progressPath = progressPathRef.value
  pathLength.value = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength.value + ' ' + pathLength.value;
  progressPath.style.strokeDashoffset = pathLength.value;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
}

// 更新进度条的进度
const updateProgress = () => {
  let scroll = window.scrollY;
  let height = document.documentElement.scrollHeight - window.innerHeight;
  progressPathRef.value.style.strokeDashoffset = pathLength.value - (scroll * pathLength.value / height);
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  // 初始时更新进度条的进度
  initProgress()
  updateProgress();
  // 监听页面滚动事件，实时更新进度条的进度
  document.addEventListener('scroll', updateProgress);

})

</script>

<style lang="scss" scoped>

.go-top-progress-wrap {
  height: 46px;
  width: 46px;
  cursor: pointer;
  display: block;
  border-radius: 50px;
  z-index: 10000;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.go-top-progress-wrap svg path {
  fill: none;
}

.go-top-progress-wrap svg.progress-circle path {
  stroke: $color-primary;
  stroke-width: 4;
  box-sizing: border-box;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}


.goTop,
.goTop2,
.goTop3 {
  position: fixed;
  border-radius: 50%;
  transform: translateX(-50%) translateY(-50%);
  bottom: 20px;
  right: 20px;
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
  pointer-events: auto;
  cursor: pointer;
}

.goTop {
  z-index: 99999;
  height: 0;
  width: 0;
}

.goTop2, .goTop3 {
  height: 46px;
  width: 46px;
  z-index: 99998;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  line-height: 46px;
  text-align: center;
  font-size: .8rem;
}

.goTop3 {
  transition: all .4s linear;
  color: $color-primary;
  //font-size: 3.3rem;
}

</style>
