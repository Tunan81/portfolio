<template>
  <main class="zy-layout-all-group" id="zy-layout-all-group" ref="layoutGroup">
    <!-- 顶栏-->
    <!--    <section class="zy-theme-header"-->
    <!--             v-if="router.currentRoute.name!=='index'"-->
    <!--             :style="{top:showHeader?0:'-100%'}">-->
    <!--      <div class="header-logo">-->
    <!--        <span class="logo-text" @click="goIndex">ZHOU YI</span>-->
    <!--      </div>-->
    <!--      <div class="header-right">-->
    <!--        <ZyMenuList/>-->
    <!--      </div>-->
    <!--    </section>-->
    <section class="zy-theme-container-main"
             id="zy-theme-container-main"
    >
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </section>
  </main>
</template>
<script setup>
const router = useRouter()
const showHeader = ref(true)
const state = reactive({
  lastScrollTop: 0,
  viewTotal: 0,
  elapsedTime: "-",
  startTime: new Date('2023/08/10').getTime(),
  show: {
    menuList: true
  },
})

watch(router.currentRoute.value, (e) => {
  console.log('9*', router.currentRoute.value)
  state.show.menuList = e.path === '/'
  console.log('123465', state.show.menuList)
})

const goIndex = () => {
  router.push('/')
}

const watchScroll = () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop === 0) {
    showHeader.value = true
  } else showHeader.value = scrollTop < state.lastScrollTop;
  state.lastScrollTop = scrollTop
}

const initCursor = () => {
  var CURSOR;

  Math.lerp = (a, b, n) => (1 - n) * a + n * b;

  const getStyle = (el, attr) => {
    try {
      return window.getComputedStyle
          ? window.getComputedStyle(el)[attr]
          : el.currentStyle[attr];
    } catch (e) {
    }
    return "";
  };

  class Cursor {
    constructor() {
      this.pos = {curr: null, prev: null};
      this.pt = [];
      this.create();
      this.init();
      this.render();
    }

    move(left, top) {
      this.cursor.style["left"] = `${left}px`;
      this.cursor.style["top"] = `${top}px`;
    }

    create() {
      if (!this.cursor) {
        this.cursor = document.createElement("div");
        this.cursor.id = "cursor";
        this.cursor.classList.add("hidden");
        document.body.append(this.cursor);
      }

      var el = document.getElementsByTagName('*');
      for (let i = 0; i < el.length; i++)
        if (getStyle(el[i], "cursor") == "pointer")
          this.pt.push(el[i].outerHTML);
      document.body.appendChild((this.scr = document.createElement("style")));
      this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='.5'/></svg>") 4 4, auto !important}`;
    }

    refresh() {
      this.scr.remove();
      this.cursor.classList.remove("hover");
      this.cursor.classList.remove("active");
      this.pos = {curr: null, prev: null};
      this.pt = [];
      this.create();
      this.init();
      this.render();
    }

    init() {
      document.onmouseover = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
      document.onmouseout = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
      document.onmousemove = e => {
        (this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8);
        this.pos.curr = {x: e.clientX - 8, y: e.clientY - 8};
        this.cursor.classList.remove("hidden");
      };
      document.onmouseenter = e => this.cursor.classList.remove("hidden");
      document.onmouseleave = e => this.cursor.classList.add("hidden");
      document.onmousedown = e => this.cursor.classList.add("active");
      document.onmouseup = e => this.cursor.classList.remove("active");
    }

    render() {
      if (this.pos.prev) {
        this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
        this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
        this.move(this.pos.prev.x, this.pos.prev.y);
      } else {
        this.pos.prev = this.pos.curr;
      }
      requestAnimationFrame(() => this.render());
    }
  }

  CURSOR = new Cursor();
}

onMounted(() => {
  window.addEventListener('scroll', watchScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', watchScroll);
});
</script>
<style lang="scss" scoped>
.zy-layout-all-group {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;

  .zy-theme-header {
    height: 50px;
    background-color: rgba(#000000, .5);
    position: fixed;
    top: -100%;
    left: 0;
    width: 100%;
    z-index: 9;
    pointer-events: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    transition: all .4s ease;

    .header-logo {
      width: 200px;

      img {
        display: inline-block;
        width: 40px;
        height: 40px;
        object-fit: cover;
      }

      .logo-text {
        color: #EEEEEE;
        font-weight: bold;
        font-size: 20px;
        font-family: "Droid Sans Mono";
        padding: 0 15px;
        cursor: pointer;
        display: inline-block;
        /* -webkit-box-reflect: below -5px linear-gradient(transparent, rgba(0, 0, 0, .4));*/
      }
    }

    .header-right {
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }

    }
  }

  .zy-theme-container-main {
    box-sizing: border-box;
    position: relative;
    scroll-behavior: smooth;
    height: 100%;

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


}

</style>
<style>
#cursor {
  position: fixed;
  width: 16px;
  height: 16px;
  background: #000;
  border-radius: 8px;
  opacity: 0.25;
  z-index: 10086;
  pointer-events: none;
  transition: 0.2s ease-in-out;
  transition-property: background, opacity, transform;
}

#cursor.hidden {
  opacity: 0;
}

#cursor.hover {
  opacity: 0.1;
  transform: scale(2.5);
}

#cursor.active {
  opacity: 0.5;
  transform: scale(0.5);
}

</style>