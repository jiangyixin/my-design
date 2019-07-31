<template>
  <el-dialog :visible.sync="syncVisible" width="80%">
    <div class="cropper">
      <vue-cropper
        ref="cropper"
        :img="image"
        v-bind="cropperOptions"
      ></vue-cropper>
    </div>
    <div class="operator">
      <el-button class="btn-upload" type="primary" plain>
        选择图片
        <input @change="selectImage" type="file" class="input-file">
      </el-button>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="syncVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="submitting">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Watch } from 'vue-property-decorator';
import { VueCropper } from 'vue-cropper';

@Component({
  components: {
    VueCropper,
  }
})
export default class Cropper extends Vue {
  @PropSync('visible', { type: Boolean }) syncVisible!: boolean
  @Prop({ type: [String, Blob] }) img?: string | Blob
  @Prop({ type: Object }) options?: object
  image: string|Blob = ''
  file?: File
  cropperOptions: object = {
    outputSize: 1,
    outputType: 'jpg',
    autoCrop: true,
    fixed: true,
    fixedNumber: [336, 146],
    centerBox: true,
    high: false,
  }
  submitting: boolean = false;
  uploadFileToQiniu!: (params: object) => Promise<any>;
  @Watch('options', { immediate: true })
  onOptionsChange(val) {
    Object.assign(this.cropperOptions, val);
  }
  @Watch('img', { immediate: true })
  onImgChange(val) {
    this.image = val
  }
  async selectImage(e) {
    const file = e.target.files[ 0 ];
    // @ts-ignore
    this.image = window.URL.createObjectURL(file);
    this.file = file
  }
  async submit() {
    this.submitting = true;
    // @ts-ignore
    this.$refs.cropper.getCropBlob(async(data: Blob) => {
      const file = new File([data], (this.file && this.file.name) || '轮播图');
      const res = await this.uploadFileToQiniu({ file });
      this.$emit('success', res.url);
      this.submitting = false;
      this.syncVisible = false;
    });
  }
}
</script>

<style lang="scss" scoped>
.cropper {
  height: 400px;
  margin-bottom: 15px;
}
.operator {
  .btn-upload {
    position: relative;
    overflow: hidden;
    .input-file {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}
</style>
