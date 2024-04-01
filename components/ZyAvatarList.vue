<template>
  <div class="align">
    <ul class="avatars">
      <li v-for="item in userList" :key="item.id">
        <div class="avatar" :title="item.name" @click="goUser(item)"
             :style="{ backgroundColor: getRandomColor() }">
          <img v-if="!isNoPortrait(item.avatar_url)" :src="item.avatar_url" alt="">
          <span v-else class="avatar-text">{{ item.name.charAt(0) }}</span>
        </div>
      </li>
      <li>
        <div class="avatar" title="查看更多">
          <a href="https://gitee.com/Z568_568" target="_blank" class="avatar-text more">+40</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const userList = ref([
  {
    "id": 12104955,
    "login": "zhanglinhsm",
    "name": "张霖",
    "avatar_url": "https://gitee.com/assets/no_portrait.png",
    "url": "https://gitee.com/api/v5/users/zhanglinhsm",
    "html_url": "https://gitee.com/zhanglinhsm",
    "remark": "",
    "followers_url": "https://gitee.com/api/v5/users/zhanglinhsm/followers",
    "following_url": "https://gitee.com/api/v5/users/zhanglinhsm/following_url{/other_user}",
    "gists_url": "https://gitee.com/api/v5/users/zhanglinhsm/gists{/gist_id}",
    "starred_url": "https://gitee.com/api/v5/users/zhanglinhsm/starred{/owner}{/repo}",
    "subscriptions_url": "https://gitee.com/api/v5/users/zhanglinhsm/subscriptions",
    "organizations_url": "https://gitee.com/api/v5/users/zhanglinhsm/orgs",
    "repos_url": "https://gitee.com/api/v5/users/zhanglinhsm/repos",
    "events_url": "https://gitee.com/api/v5/users/zhanglinhsm/events{/privacy}",
    "received_events_url": "https://gitee.com/api/v5/users/zhanglinhsm/received_events",
    "type": "User"
  },
  {
    "id": 9975324,
    "login": "jian-bin-zhao",
    "name": "一叶孤城",
    "avatar_url": "https://foruda.gitee.com/avatar/1685413237851386668/9975324_jian-bin-zhao_1685413237.png",
    "url": "https://gitee.com/api/v5/users/jian-bin-zhao",
    "html_url": "https://gitee.com/jian-bin-zhao",
    "remark": "",
    "followers_url": "https://gitee.com/api/v5/users/jian-bin-zhao/followers",
    "following_url": "https://gitee.com/api/v5/users/jian-bin-zhao/following_url{/other_user}",
    "gists_url": "https://gitee.com/api/v5/users/jian-bin-zhao/gists{/gist_id}",
    "starred_url": "https://gitee.com/api/v5/users/jian-bin-zhao/starred{/owner}{/repo}",
    "subscriptions_url": "https://gitee.com/api/v5/users/jian-bin-zhao/subscriptions",
    "organizations_url": "https://gitee.com/api/v5/users/jian-bin-zhao/orgs",
    "repos_url": "https://gitee.com/api/v5/users/jian-bin-zhao/repos",
    "events_url": "https://gitee.com/api/v5/users/jian-bin-zhao/events{/privacy}",
    "received_events_url": "https://gitee.com/api/v5/users/jian-bin-zhao/received_events",
    "type": "User"
  },
  {
    "id": 7783815,
    "login": "nanshanxie",
    "name": "南山",
    "avatar_url": "https://foruda.gitee.com/avatar/1677095295449488749/7783815_nanshanxie_1655967567.png",
    "url": "https://gitee.com/api/v5/users/nanshanxie",
    "html_url": "https://gitee.com/nanshanxie",
    "remark": "",
    "followers_url": "https://gitee.com/api/v5/users/nanshanxie/followers",
    "following_url": "https://gitee.com/api/v5/users/nanshanxie/following_url{/other_user}",
    "gists_url": "https://gitee.com/api/v5/users/nanshanxie/gists{/gist_id}",
    "starred_url": "https://gitee.com/api/v5/users/nanshanxie/starred{/owner}{/repo}",
    "subscriptions_url": "https://gitee.com/api/v5/users/nanshanxie/subscriptions",
    "organizations_url": "https://gitee.com/api/v5/users/nanshanxie/orgs",
    "repos_url": "https://gitee.com/api/v5/users/nanshanxie/repos",
    "events_url": "https://gitee.com/api/v5/users/nanshanxie/events{/privacy}",
    "received_events_url": "https://gitee.com/api/v5/users/nanshanxie/received_events",
    "type": "User"
  },
  {
    "id": 2338399,
    "login": "aohanhongzhi",
    "name": "尖斌卡",
    "avatar_url": "https://foruda.gitee.com/avatar/1677016165452869420/2338399_aohanhongzhi_1578972252.png",
    "url": "https://gitee.com/api/v5/users/aohanhongzhi",
    "html_url": "https://gitee.com/aohanhongzhi",
    "remark": "",
    "followers_url": "https://gitee.com/api/v5/users/aohanhongzhi/followers",
    "following_url": "https://gitee.com/api/v5/users/aohanhongzhi/following_url{/other_user}",
    "gists_url": "https://gitee.com/api/v5/users/aohanhongzhi/gists{/gist_id}",
    "starred_url": "https://gitee.com/api/v5/users/aohanhongzhi/starred{/owner}{/repo}",
    "subscriptions_url": "https://gitee.com/api/v5/users/aohanhongzhi/subscriptions",
    "organizations_url": "https://gitee.com/api/v5/users/aohanhongzhi/orgs",
    "repos_url": "https://gitee.com/api/v5/users/aohanhongzhi/repos",
    "events_url": "https://gitee.com/api/v5/users/aohanhongzhi/events{/privacy}",
    "received_events_url": "https://gitee.com/api/v5/users/aohanhongzhi/received_events",
    "type": "User"
  },
  {
    "id": 13108783,
    "login": "fangchong0713",
    "name": "小房",
    "avatar_url": "https://gitee.com/assets/no_portrait.png",
    "url": "https://gitee.com/api/v5/users/fangchong0713",
    "html_url": "https://gitee.com/fangchong0713",
    "remark": "",
    "followers_url": "https://gitee.com/api/v5/users/fangchong0713/followers",
    "following_url": "https://gitee.com/api/v5/users/fangchong0713/following_url{/other_user}",
    "gists_url": "https://gitee.com/api/v5/users/fangchong0713/gists{/gist_id}",
    "starred_url": "https://gitee.com/api/v5/users/fangchong0713/starred{/owner}{/repo}",
    "subscriptions_url": "https://gitee.com/api/v5/users/fangchong0713/subscriptions",
    "organizations_url": "https://gitee.com/api/v5/users/fangchong0713/orgs",
    "repos_url": "https://gitee.com/api/v5/users/fangchong0713/repos",
    "events_url": "https://gitee.com/api/v5/users/fangchong0713/events{/privacy}",
    "received_events_url": "https://gitee.com/api/v5/users/fangchong0713/received_events",
    "type": "User"
  },
  {
    "id": 10428935,
    "login": "stanlxl",
    "name": "LXL_MAS",
    "avatar_url": "https://foruda.gitee.com/avatar/1677209386731211828/10428935_stanlxl_1660203324.png",
    "url": "https://gitee.com/api/v5/users/stanlxl",
    "html_url": "https://gitee.com/stanlxl",
    "remark": "",
    "followers_url": "https://gitee.com/api/v5/users/stanlxl/followers",
    "following_url": "https://gitee.com/api/v5/users/stanlxl/following_url{/other_user}",
    "gists_url": "https://gitee.com/api/v5/users/stanlxl/gists{/gist_id}",
    "starred_url": "https://gitee.com/api/v5/users/stanlxl/starred{/owner}{/repo}",
    "subscriptions_url": "https://gitee.com/api/v5/users/stanlxl/subscriptions",
    "organizations_url": "https://gitee.com/api/v5/users/stanlxl/orgs",
    "repos_url": "https://gitee.com/api/v5/users/stanlxl/repos",
    "events_url": "https://gitee.com/api/v5/users/stanlxl/events{/privacy}",
    "received_events_url": "https://gitee.com/api/v5/users/stanlxl/received_events",
    "type": "User"
  },
  {
    "id": 9925653,
    "login": "ljq1226",
    "name": "李家祺",
    "avatar_url": "https://gitee.com/assets/no_portrait.png",
    "url": "https://gitee.com/api/v5/users/ljq1226",
    "html_url": "https://gitee.com/ljq1226",
    "remark": "",
    "followers_url": "https://gitee.com/api/v5/users/ljq1226/followers",
    "following_url": "https://gitee.com/api/v5/users/ljq1226/following_url{/other_user}",
    "gists_url": "https://gitee.com/api/v5/users/ljq1226/gists{/gist_id}",
    "starred_url": "https://gitee.com/api/v5/users/ljq1226/starred{/owner}{/repo}",
    "subscriptions_url": "https://gitee.com/api/v5/users/ljq1226/subscriptions",
    "organizations_url": "https://gitee.com/api/v5/users/ljq1226/orgs",
    "repos_url": "https://gitee.com/api/v5/users/ljq1226/repos",
    "events_url": "https://gitee.com/api/v5/users/ljq1226/events{/privacy}",
    "received_events_url": "https://gitee.com/api/v5/users/ljq1226/received_events",
    "type": "User"
  },
  {
    "id": 10840286,
    "login": "liangsWorkSpace",
    "name": "liang",
    "avatar_url": "https://foruda.gitee.com/avatar/1692350946570291322/10840286_liangsworkspace_1692350946.png",
    "url": "https://gitee.com/api/v5/users/liangsWorkSpace",
    "html_url": "https://gitee.com/liangsWorkSpace",
    "remark": "",
    "followers_url": "https://gitee.com/api/v5/users/liangsWorkSpace/followers",
    "following_url": "https://gitee.com/api/v5/users/liangsWorkSpace/following_url{/other_user}",
    "gists_url": "https://gitee.com/api/v5/users/liangsWorkSpace/gists{/gist_id}",
    "starred_url": "https://gitee.com/api/v5/users/liangsWorkSpace/starred{/owner}{/repo}",
    "subscriptions_url": "https://gitee.com/api/v5/users/liangsWorkSpace/subscriptions",
    "organizations_url": "https://gitee.com/api/v5/users/liangsWorkSpace/orgs",
    "repos_url": "https://gitee.com/api/v5/users/liangsWorkSpace/repos",
    "events_url": "https://gitee.com/api/v5/users/liangsWorkSpace/events{/privacy}",
    "received_events_url": "https://gitee.com/api/v5/users/liangsWorkSpace/received_events",
    "type": "User"
  }
]);
const isNoPortrait = (avatarUrl) => avatarUrl.includes('no_portrait.png');
const getRandomColor = () => {
  // Generate a random color in hex format
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// axios.get('https://gitee.com/api/v5/user/followers?access_token=257d868d3c3dbc908a97d1c581841507&page=4&per_page=8').then((res) => {
//   userList.value = res.data
// });

const goUser = (item) => {
  window.open(item.html_url, '_blank')
}
</script>

<style lang="scss" scoped>


.align {
}

.avatars {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.avatars li {
  margin-left: -0.4em;
  margin-right: -0.4em;
}

.avatar {
  border: 0.125em solid #fff;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  line-height: 30px;
  &:hover {
    box-shadow: 0 0 10px #ececec;
  }

  img {
    display: inline-block;
    height: 30px;
    width: 30px;
    object-fit: cover;
  }
}

.avatar-text {
  height: 30px;
  width: 30px;
  font-size: 14px;
  color: white;

}

.more {
  background-color: #000000;
  font-size: 13px;

}
</style>
