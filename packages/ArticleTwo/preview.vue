<!--suppress CssInvalidPseudoSelector -->
<template>
  <div class="preview preview-article-two">
    <div v-if="title" class="preview-header">
      <h3 class="title c-363636">{{ title }}</h3>
      <span v-if="isMore" class="more-link">查看更多>></span>
    </div>
    <swiper class="swipe" :options="swiperOptions">
      <swiper-slide v-for="article in articles" class="" :key="article.id">
        <div @click="jump(article)" class="card" :style="{ backgroundImage: 'url('+ article.originalThumb +')' }">
          <div class="card-header">
            <div class="title">{{ article.title }}</div>
          </div>
          <div class="card-footer">
            <div class="user">
              <template v-if="article.user">
                <div class="avatar"><img :src="article.user.smallAvatar"/></div>
                <div class="name">{{ article.user.nickname }}</div>
              </template>
            </div>
            <div class="hits">已有{{ article.hits|hitsFilters }}人阅读</div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject, InjectReactive, Watch } from 'vue-property-decorator';
import { ArticleOptions, Article } from './index';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

@Component({
  components: {
    swiper,
    swiperSlide,
  },
  filters: {
    hitsFilters(hits: number): number|string {
      if (hits >= 1000) {
        return '1000+';
      }
      return hits || 0;
    }
  }
})
export default class ArticleTwoPreview extends Vue {
  @InjectReactive('page') page
  @Prop({
    type: Object,
    required: true,
  }) options!: ArticleOptions
  swiperOptions: object = {
    lazy: true,
    slidesPerView: 1.2,
    spaceBetween: this.spaceBetween,
    freeMode: true,
  };
  get spaceBetween() {
    const length = this.articles.length;
    if (length <= 1) {
      return 0;
    }
    return (20 * (length + 1)) / (length - 1)
  }
  get title(): string {
    return this.options.title || '';
  }
  get isMore(): number {
    return this.options.isMore || 0;
  }
  get articles(): Article[] {
    return this.options.articles;
  }
  jump(article) {}
}
</script>

<style lang="scss" scoped>
.preview-article-two {
  padding: 5px 0;
  .preview-header {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 8px;
    }
    .more-link {
      font-size: 10px;
      color: #BBBBBB;
      min-width: 70px;
      text-align: right;
    }
  }
  .swipe {
    ::v-deep {
      .swiper-slide {
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        transition: 300ms;
        margin-right: 20px!important;
        &:first-child {
          margin-left: 20px!important;
        }
        &:last-child {
          margin-right: 20px!important;
        }
      }
      .swiper-slide:not(.swiper-slide-active) {
        /*transform: scale(1, .8);*/
      }
    }
  }
  .card {
    position: relative;
    width: 303px;
    height: 342px;
    background: rgba(216,216,216,1);
    background-position: center;
    background-size: cover;
    border-radius: 8px;
    overflow: hidden;
    box-sizing: border-box;
    .card-header {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 96px;
      padding: 12px;
      background: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
      color: #fff;
      .title {
        font-size: 16px;
        line-height:22px;
      }
    }
    .card-footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 96px;
      padding: 12px;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      color: #fff;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .user {
        .avatar {
          display: inline-block;
          width: 22px;
          height: 22px;
          overflow: hidden;
          border-radius: 50%;
          margin-right: 6px;
          vertical-align: middle;
          img {
            width: 100%;
          }
        }
        .name {
          display: inline-block;
          font-size: 14px;
          line-height: 20px;
        }
      }
      .hits {
        font-size: 10px;
        line-height: 14px;
      }
    }
  }
}
</style>
