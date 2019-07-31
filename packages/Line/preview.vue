<template>
  <div class="preview preview-line">
    <div class="line" :style="lineStyle"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { LineOptions } from './index';

@Component
export default class LinePreview extends Vue {
  name: string = 'LinePreview'
  @Prop({
    type: Object,
    required: true,
  }) options!: LineOptions
  get lineStyle() {
    const options = this.options
    return {
      borderTopColor: options.color,
      borderTopStyle: options.style
    }
  }
}
</script>

<style lang="scss" scoped>
  .preview-line {
    padding: 20px 0;
    .line {
      height: 0;
      margin: 0;
      border-top-width: 1px;
    }
  }
</style>
