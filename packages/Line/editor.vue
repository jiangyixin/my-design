<template>
  <div class="editor editor-line">
    <el-form :model="form" label-width="80px">
      <el-form-item prop="color" label="颜色">
        <el-color-picker v-model="form.color"></el-color-picker>
      </el-form-item>
      <el-form-item prop="style" label="样式">
        <el-radio-group v-model="form.style">
          <el-radio label="solid">实线</el-radio>
          <el-radio label="dashed">虚线</el-radio>
          <el-radio label="dotted">点线</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';
import { LineOptions } from './index';

@Component
export default class LineEditor extends Vue {
  name: string = 'LineEditor'
  @PropSync('options', {
    type: Object,
    required: true,
  }) form!: LineOptions
  defaultOptions: LineOptions = {
    color: '#e5e5e5',
    style: 'solid'
  }
  created() {
    this.form = Object.assign(this.defaultOptions, this.form)
  }
}
</script>

<style lang="scss" scoped>
  .editor-line {

  }
</style>
