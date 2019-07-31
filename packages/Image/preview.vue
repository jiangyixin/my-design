<template>
  <div class="preview preview-image">
    <div v-if="title" class="preview-header">
      <h3 class="title c-363636">{{ title }}</h3>
    </div>
    <div class="image-container" :style="imageStyle">
      <img @click="jump" class="image" :src="options.picture" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ImageOptions, JumpUrl } from './index';
import JsBridge from '@/utils/js-bridge';

@Component
export default class ImagePreview extends Vue {
  @Prop({
    type: Object,
    required: true,
  }) options!: ImageOptions
  get title(): string {
    return this.options.title || '';
  }
  get jumpUrl(): JumpUrl {
    return this.options.jumpUrl || {};
  }
  get imageStyle() {
    const options = this.options
    return {
      marginLeft: options.margin + 'px',
      marginRight: options.margin + 'px',
      borderRadius: options.borderRadius + 'px',
    }
  }
  jump() {
    const url = JsBridge.getLink(this.jumpUrl);
    console.log('url:', url)
    window.open(url, '_blank');
  }
}
</script>

<style lang="scss" scoped>
.preview-image {
  padding: 5px 0;
  .preview-header {
    padding: 0 20px;
    .title {
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 8px;
    }
  }
  .image-container {
    overflow: hidden;
    line-height: 0;
    text-align: center;
    .image {
      max-width: 100%;
    }
  }
}
</style>
