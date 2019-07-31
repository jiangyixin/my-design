<template>
  <div class="preview preview-textarea">
    <div @click="jump" class="textarea">{{ options.content }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TextareaOptions } from './index';

@Component
export default class TextareaPreview extends Vue {
  @Prop({
    type: Object,
    required: true,
  }) options!: TextareaOptions
  get jumpUrl(): string {
    return this.options.jumpUrl || '';
  }
  jump() {
    if (this.jumpUrl) {
      window.open(this.jumpUrl, '_blank');
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-textarea {
  padding: 5px 20px;
  font-size: 16px;
  font-weight: 400;
  color: #999999;
  line-height: 22px;
}
</style>
