<template>
  <div class="editor editor-image">
    <el-form :model="form" label-width="80px">
      <el-form-item prop="title" label="标题">
        <el-input
          v-model="form.title"
          placeholder="模块标题"
        ></el-input>
      </el-form-item>
      <el-form-item prop="picture" label="图片">
        <div class="select-image" @click="selectImage(form.picture)"><img :src="form.picture"/></div>
      </el-form-item>
      <el-form-item prop="jumpUrl" label="跳转链接">
        <el-input
          readonly=""
          :value="JSON.stringify(form.jumpUrl)"
          placeholder="跳转链接"
          suffix-icon="el-icon-link"
          @click.native="selectJumpUrl(form.jumpUrl)"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="margin" label="两边留白">
        <el-input-number v-model="form.margin" :min="0" :max="40" label="两边留白"></el-input-number>
      </el-form-item>
      <el-form-item prop="borderRadius" label="圆角">
        <el-input-number v-model="form.borderRadius" :min="0" :max="40" label="圆角"></el-input-number>
      </el-form-item>
    </el-form>
    <cropper
      :visible.sync="visibleCropper"
      v-bind="cropperOptions"
      @success="editPicture"
    ></cropper>
    <select-app-link
      :visible.sync="visibleSelectAppLink"
      v-bind="selectOptions"
      @success="editJumpUrl"
    ></select-app-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';
import { ImageOptions, JumpUrl } from './index';
import Cropper from '../components/Cropper/index.vue';
import SelectAppLink from '../components/SelectAppLink/index.vue';
import { CropperOptions } from 'types';
type SelectOptions = { jumpUrl?: JumpUrl };
@Component({
  components: {
    Cropper,
    SelectAppLink,
  }
})
export default class ImageEditor extends Vue {
  @PropSync('options', {
    type: Object,
    required: true,
  }) form !: ImageOptions
  defaultOptions: ImageOptions = {
    title: '我是图片',
    picture: '',
    jumpUrl: {},
    margin: 20,
    borderRadius: 0,
  }
  visibleCropper: boolean = false;
  cropperOptions: CropperOptions = {
    img: '',
    fixed: false,
  };
  visibleSelectAppLink: boolean = false;
  selectOptions: SelectOptions = { jumpUrl: {} }
  created() {
    this.form = Object.assign(this.defaultOptions, this.form)
  }
  selectImage(picture) {
    this.cropperOptions.img = picture;
    this.visibleCropper = true;
  }
  editPicture(img) {
    this.form.picture = img;
  }
  selectJumpUrl(jumpUrl) {
    this.selectOptions.jumpUrl = jumpUrl;
    this.visibleSelectAppLink = true;
  }
  editJumpUrl(jumpUrl) {
    this.form.jumpUrl = jumpUrl;
  }
}
</script>

<style lang="scss" scoped>
.editor-image {
  .select-image {
    width: 200px;
    cursor: pointer;
    img {
      max-width: 100%;
    }
  }
}
</style>
