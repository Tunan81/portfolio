<template>
  <section class="zy-form">
    <form @submit="handleSubmit"
          class="cont-form" id="contact-form" method="POST">
      <div class="row" :class="{'fold':props.noRow}">
        <input type="text" v-model="state.form.name" placeholder="昵称">
        <input type="email" v-model="state.form.email" required
               placeholder="请填写正确邮箱接收反馈通知">
        <input type="text" v-model="state.form.website"
               placeholder="个人站点">
      </div>
      <textarea id="massage" v-model="state.form.content" required
                placeholder="说点什么"></textarea>
      <div class="text-center">
        <button type="submit" class="site-btn"  data-wow-delay="0.2s"
                id="send-form">Send
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import {ref, reactive} from 'vue'
// import {useThemeStore} from "../../stores/themeStore";
import { message } from 'ant-design-vue';
// const themeStore = useThemeStore()
// const setting = ref({...themeStore.themeData})
const props = defineProps({
  defaultUser: {
    type: Object
  },
  noRow: {
    type: Boolean,
    default: () => {
      return false
    }
  },

})
const emits = defineEmits(['submit-form'])
const userinfo = localStorage.getItem('ZY-CLIENT-USERINFO')
const state = reactive({
  form: {
    name: '',
    email: '',
    website: '',
    content: '',
  }
})

if (userinfo) {
  let info = JSON.parse(userinfo)
  state.form.name = info.name
  state.form.email = info.email
  state.form.website = info.website
}


const resetForm = () => {
  state.form.content = ''
}
function isEmail(str){
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}
const handleSubmit = (event) => {
  event.preventDefault();
  if (!isEmail(state.form.email)) return message.error('邮箱格式不正确');
  emits('submit-form', state.form);
  resetForm()
}
</script>

<style lang="scss" scoped>
.zy-form {
  width: 100%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  .cont-form {
    width: 100%;
    background-color: #fff;
    @media screen and (max-width: 768px) {
      padding: 0;
      .row {
        flex-direction: column;

        input {
          width: 100%;
        }
      }
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    .fold {
      display: block;

      input {
        width: 100%;
      }
    }

    input {
      width: 32%;
      height: 50px;
      margin-bottom: 30px;
      padding: 10px;
      border: none;
      box-shadow: 0 0 90px rgba(0, 0, 0, 0.15);
      font-family: "Poppins", sans-serif;
    }

    textarea {
      width: 100%;
      height: 150px;
      margin-bottom: 30px;
      padding: 10px;
      border: none;
      box-shadow: 0 0 90px rgba(0, 0, 0, 0.15);
      font-family: "Poppins", sans-serif;
      line-height: 1.5rem;
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

</style>
