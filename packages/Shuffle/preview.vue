<template>
  <div class="preview preview-shuffle">
    <div v-if="title" class="preview-header">
      <h3 class="title c-363636">{{ title }}</h3>
    </div>
    <swiper class="swipe" :options="swiperOptions">
      <swiper-slide v-for="(shuffle, index) in pictureList" class="item" :key="index">
        <a @click="jump(shuffle.jumpUrl)">
          <img :src="shuffle.picture" class="swiper-lazy" />
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { ShuffleOptions, Shuffle } from './index';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import JsBridge from '@/utils/js-bridge';

@Component({
  components: {
    swiper,
    swiperSlide,
  }
})
export default class ShufflePreview extends Vue {
  swiperOptions: object = {
    lazy: true,
    slidesPerView: 1.1,
    spaceBetween: 10,
    centeredSlides: true,
  };
  @Prop({
    type: Object,
    required: true,
  }) options!: ShuffleOptions
  get title(): string {
    return this.options.title || '';
  }
  get pictureList(): Shuffle[] {
    return this.options.pictureList || [];
  }
  jump(jumpUrl) {
    const url = JsBridge.getLink(jumpUrl);
    window.open(url, '_blank');
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/index";
.preview-shuffle {
  padding: 5px 0;
  .preview-header {
    padding: 0 20px;
    .title {
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 8px;
    }
  }
  .swipe {
    .item {
      width: 336px;
      height: 146px;
      background: rgba(216,216,216,1);
      box-shadow: 0 14px 10px -9px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
      img {
        max-width: 100%;
      }
    }
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
      }
      .swiper-slide:not(.swiper-slide-active) {
        transform: scale(1, .8);
      }
    }
  }
}
</style>
