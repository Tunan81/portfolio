<template>
  <section class="blog  c-mt-40 c-mb-40" id="comments" v-if="state.commentsList.length>0">
    <ZySectionHeader title="Recent Comments" titleNum="06"/>
    <section class="recent-comments">
      <div class="r-comment-list">
        <div class="r-comment-item" v-for="(item,index) in state.commentsList" :key="index"
             @click="goToPage('/PostDetail/'+item.postId,{title:item.title})">
          <div class="author">
            <img alt="" :src="item.avatar"
                 class="avatar avatar-48 photo" height="48" width="48" loading="lazy" decoding="async">
            <div class="comment-info">
              <div>{{ item.nickname }}</div>
              <time class="font-small">{{ TimeUtils.formatTime(item.createdAt) }}</time>
            </div>
          </div>
          <div class="comment-text">
            <span class="content">{{ item.content }}</span>
            <span class="post font-small line-clamp">发表在「{{ item.title }}」 </span>
          </div>
        </div>
      </div>
    </section>
  </section>

</template>

<script setup>
import {commentsRecent} from "../api/modules/api.comments";
import {reactive} from 'vue'
import {TimeUtils} from "../utils/util.time";
import ZySectionHeader from "./ZySectionHeader.vue";
// import {goToPage} from "../../utils/util.router";

const query = reactive({
  pagination: {
    pageSize: 6
  }
})
let state = reactive({
  commentsList: []
})

const getCommentRecent = () => {
  commentsRecent(query).then(res => {
    let datas = res.data.result
    for (const data of datas) {
      data.createdAt = TimeUtils.formatTime(data.createdAt)
      data.avatar = data.userInfo[0].avatar
      data.nickname = data.userInfo[0].nickname
      data.title = data.postInfo[0].title
      data.postId = data.postInfo[0]._id
    }
    state.commentsList = datas
  })
}

getCommentRecent()

</script>

<style lang="scss" scoped>
.recent-comments {
  padding: 1rem 0;

  .r-comment-list {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;

    .r-comment-item {
      font-size: .8rem;
      width: 33.3%;
      padding: 1rem;
      border-right: 1px solid #eee;
      cursor: pointer;
      margin-bottom: 1rem;

      &:nth-child(3n) {
        border: none;
      }

      &:hover {
        .avatar {
          transform: scale(.9);
        }
      }

      .author {
        display: flex;
        align-items: center;
        gap: 1em;
        flex: none;
        text-transform: capitalize;

        .avatar {
          width: 2.5rem;
          object-fit: cover;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          transition: .5s;
        }

        .font-small {
          font-size: .7rem;
          color: #a09f9f;
        }
      }

      .comment-text {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1em;
        text-align: justify;
        justify-content: space-between;
        word-break: break-all;
        overflow-wrap: anywhere;
        margin-top: .8rem;

        .content {
          height: 87px;
          overflow: hidden;
          font-size: .8rem;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }

        .line-clamp {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          font-size: .8rem;
          color: #b6b5b5;
        }
      }
    }

    @media screen and (max-width: 968px) {
      .r-comment-item {
        width: 100%;
        padding:0;
        border: none;
        margin-bottom: 2rem;
        border-bottom: 1px solid #eee;
        padding-bottom: 1rem;
        .comment-text .content {
          height: auto;
        }
      }
    }
  }
}
</style>
