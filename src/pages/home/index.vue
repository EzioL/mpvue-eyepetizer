<template>
  <div>
    <loading v-show="isLoading">数据加载中</loading>

    <div class="article-list">
      <block>
        <div class="article" v-for="(article, index) in articles">

          <!--<img v-bind:src="article.covers[0].url" class="slide-image"/>-->

          <div class="article-image"
               :style="{'background-image':'url('+article.covers[0].url+')'}"></div>

          <video class="article-image"
            v-bind:src="article.videos[0].url"> </video>


          <p class="article-title">{{article.title}}</p>

          <div class="article-snippet">{{article.snippet}}</div>


          <div style="background-color: black;height: 1px"></div>

        </div>
      </block>
    </div>


    <!--加载更多-->
    <div class="load-more" v-show="isLoadMore">
      <p class="load-more-toast"> {{loadMoreText}}</p>
    </div>

  </div>
</template>

<script>
  import request from '@/utils/request'
  import article from '@/components/article'

  export default {
    components: {
      article
    },

    data() {
      return {
        url: "https://api.qingmang.me/v2/article.list?token=c400a7e21688496ca3e7f17c6b0d1846&category_id=p476",
        nextUrl: "https://api.qingmang.me/v2/article.list?token=c400a7e21688496ca3e7f17c6b0d1846&category_id=p476",
        isLoading: true,
        hasMore: true,
        articles: [],
        isLoadMore: false,
        loadMoreText: "加载更多...",
      }
    }, created() {
      this.getData(this.url);

    }, onReachBottom() {
      // 页面上拉触底事件的处理函数
      console.log("onReachBottom  加载更多");
      this.isLoadMore = true;
      if (this.hasMore) {
        this.getData(this.nextUrl);
      } else {
        this.loadMoreText = "已经到底了";
      }

    }, methods: {
      getData: function (url) {
        request.get(url).then(data => {
          this.isLoading = false;
          this.isLoadMore = false;
          this.hasMore = data.hasMore;
          this.nextUrl = data.nextUrl;
          for (let i = 0; i < data.articles.length; i++) {
            this.articles.push(data.articles[i]);
          }

          console.log(this.articles.length)

        });
      }
    }

  }
</script>

<style>
  .article-list {

  }

  .article {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 0.75em;
    margin-bottom: 0.75em;
  }


  .article-image {
    /*position: absolute;*/
    width: 100%;
    height: 220px;
    z-index: 4;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    color: white;
    border-radius: 4px;
    background-repeat: no-repeat;
  }

  .article-title {
    margin-top: 0.75em;
    font-size: 16px;
  }

  .article-snippet {
    margin-top: 8px;
    font-size: 13px;
    color: #666666;
    /*line-height: 28px;*/
  }

  .load-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5em;
    background: #fff;

  }

  .load-more-toast {
    font-size: 0.625em;
    color: #aaa;
  }
</style>
