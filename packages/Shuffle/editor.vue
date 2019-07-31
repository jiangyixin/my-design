<!--suppress ALL -->
<template>
  <div class="editor editor-shuffle">
    <el-form :model="form" label-width="80px" label-position="top">
      <el-form-item prop="title" label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item prop="pictureList" label="轮播图" >
        <div class="shuffle" v-for="(shuffle, index) in form.pictureList" :key="index">
          <div class="arrow-group">
            <i @click="toTop(index)" class="el-icon-top" :class="{ disabled: index === 0 }"></i>
            <i @click="toBottom(index)" class="el-icon-bottom" :class="{ disabled: index === form.pictureList.length - 1 }"></i>
          </div>
          <el-input
            readonly=""
            :value="JSON.stringify(shuffle.jumpUrl)"
            placeholder="跳转链接"
            suffix-icon="el-icon-link"
            @click.native="selectJumpUrl(index, shuffle.jumpUrl)"
          >
            <template slot="prepend">
              <i @click.stop="selectImage(index, shuffle.picture)" :class="[ shuffle.picture ? 'el-icon-edit' : 'el-icon-plus' ]" title="修改图片"></i>
            </template>
            <template slot="append">
              <i @click.stop="delShuffle(index)" class="el-icon-delete" title="删除轮播图"></i>
            </template>
          </el-input>
        </div>
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <el-button @click="addPicture">添加 {{ pictureCount }}/5</el-button>
    </div>
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
import { JumpUrl, Shuffle, ShuffleOptions } from './index';
import Cropper from '../components/Cropper/index.vue';
import SelectAppLink from '../components/SelectAppLink/index.vue';
type CropperOptions = { img?: string };
type SelectOptions = { jumpUrl?: JumpUrl };
@Component({
  components: {
    Cropper,
    SelectAppLink,
  },
})
export default class ShuffleEditor extends Vue {
  @PropSync('options', {
    type: Object,
    required: true,
  }) form !: ShuffleOptions
  editIndex: number = 0
  visibleCropper: boolean = false
  visibleSelectAppLink: boolean = false
  cropperOptions: CropperOptions = { img: '' }
  selectOptions: SelectOptions = { jumpUrl: {} }
  defaultOptions: ShuffleOptions = {
    title: '',
    pictureList: [],
  }
  get pictureCount(): number {
    return this.form.pictureList && this.form.pictureList.length || 0;
  }
  created() {
    this.form = Object.assign(this.defaultOptions, this.form);
  }
  selectImage(index, picture) {
    this.editIndex = index;
    this.cropperOptions.img = picture;
    this.visibleCropper = true;
  }
  delShuffle(index) {
    this.form.pictureList.splice(index, 1);
  }
  addPicture() {
    if (this.pictureCount >= 5) {
      return this.$message.error('最多添加5个');
    }
    const picture: Shuffle = { picture: '', jumpUrl: {} };
    this.form.pictureList.push(picture)
  }
  editPicture(img) {
    this.form.pictureList[ this.editIndex ].picture = img;
  }
  selectJumpUrl(index, jumpUrl) {
    this.editIndex = index;
    this.selectOptions.jumpUrl = jumpUrl;
    this.visibleSelectAppLink = true;
  }
  editJumpUrl(jumpUrl) {
    this.form.pictureList[ this.editIndex ].jumpUrl = jumpUrl;
  }
  toTop(index) {
    if (index === 0) return;
    const list = this.form.pictureList;
    const pre = list[ index - 1 ];
    const cur = list[ index ];
    this.$set(list, index - 1, cur)
    this.$set(list, index, pre);
  }
  toBottom(index) {
    const list = this.form.pictureList;
    if (index === list.length - 1) return;
    const next = list[ index + 1 ];
    const cur = list[ index ];
    this.$set(list, index + 1, cur)
    this.$set(list, index, next);
  }
}
</script>

<style lang="scss" scoped>
.shuffle {
  display: flex;
  .arrow-group {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    i {
      cursor: pointer;
      padding: 5px;
      &:hover {
        color: #01A0EA;
        background-color: #eee;
      }
      &.disabled {
        cursor: default;
        color: gray;
        background-color: inherit;
      }
    }
  }
  ::v-deep {
    .el-input {
      margin-bottom: 5px;
      .el-input__inner {
        height: 50px;
        line-height: 50px;
      }
      .el-input-group__prepend,
      .el-input-group__append {
        padding: 0;
        i {
          cursor: pointer;
          padding: 10px;
          &:hover {
            color: #01A0EA;
            background-color: #eee;
          }
        }
      }
    }
  }
}
.btn-group {
  text-align: center;
}
</style>
