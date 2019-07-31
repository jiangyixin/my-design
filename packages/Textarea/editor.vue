<template>
  <div class="editor editor-textarea">
    <el-form :model="form" label-width="80px">
      <el-form-item prop="content" label="文本">
        <el-input
          v-model="form.content"
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item prop="jumpUrl" label="链接">
        <el-input
          v-model="form.jumpUrl"
          placeholder="跳转链接"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';
import { TextareaOptions } from './index';

@Component
export default class TextareaEditor extends Vue {
  @PropSync('options', {
    type: Object,
    required: true,
  }) form !: TextareaEditor
  defaultOptions: TextareaOptions = {
    content: '这是文本框',
    jumpUrl: '',
  }
  created() {
    this.form = Object.assign(this.defaultOptions, this.form)
  }
}
</script>

<style lang="scss" scoped>

</style>
