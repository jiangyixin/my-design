<template>
  <div class="editor editor-blank">
    <el-form :model="form" label-width="80px">
      <el-form-item prop="height" label="高度">
        <el-slider
          v-model="form.height"
          :min="10"
          :max="100"
          show-input>
        </el-slider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';
import { BlankOptions } from './index';

@Component
export default class BlankEditor extends Vue {
  @PropSync('options', {
    type: Object,
    required: true,
  }) form !: BlankOptions
  defaultOptions: BlankOptions = {
    height: 20
  }
  created() {
    this.form = Object.assign(this.defaultOptions, this.form)
  }
}
</script>

<style lang="scss" scoped>

</style>
