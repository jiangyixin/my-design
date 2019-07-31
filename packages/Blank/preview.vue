<template>
  <div class="preview preview-blank" :style="blankStyle"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { BlankOptions } from './index';

@Component
export default class BlankPreview extends Vue {
  name: string = 'BlankPreview'
  @Prop({
    type: Object,
    required: true,
  }) options!: BlankOptions
  get blankStyle() {
    const options = this.options
    return {
      height: options.height + 'px',
    }
  }
}
</script>

<style lang="scss" scoped></style>
