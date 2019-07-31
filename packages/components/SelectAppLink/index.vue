<template>
  <el-dialog :visible.sync="syncVisible" width="80%">
    <el-form class="form">
      <el-select v-model="form.target" :value="form.target" class="type">
        <el-option v-for="item of urlItems" :key="item.target" :label="item.name" :value="item.target"></el-option>
      </el-select>
      <div class="info">
        <template v-if="form.target === 'link'">
          <el-input v-model="form.url" placeholder="请输入外部链接"></el-input>
        </template>
        <template v-if="form.target === 'course'">
          <select-courses v-model="form.courseId" style="width: 100%;"></select-courses>
        </template>
        <template v-if="form.target === 'openCourse'">
          <select-open-courses v-model="form.courseId" style="width: 100%;"></select-open-courses>
        </template>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="syncVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Watch } from 'vue-property-decorator';
import SelectCourses from '../../components/Selects/courses.vue';
import SelectOpenCourses from '../../components/Selects/open-courses.vue';
type JumpUrl = {
  target?: string
  params?: {
    url?: string
    courseId?: number
    lessonId?: number
  };
}
type Form = {
  target?: string
  url?: string
  courseId?: number | string
}
@Component({
  components: { SelectCourses, SelectOpenCourses },
})
export default class SelectAppLink extends Vue {
  @PropSync('visible', { type: Boolean }) syncVisible!: boolean
  @Prop({ type: Object }) jumpUrl!: JumpUrl
  form: Form = { target: 'link', url: '', courseId: '' };
  urlItems: object[] = [
    { target: 'link', name: '外部链接' },
    { target: 'course', name: '普通课' },
    { target: 'openCourse', name: '公开课' },
  ];
  @Watch('jumpUrl', { immediate: true })
  onJumpUrlChange(val: JumpUrl) {
    this.form.target = val.target;
    this.form.url = val.params && val.params.url || '';
    this.form.courseId = val.params && val.params.courseId || '';
  }

  async submit() {
    const jumpUrl: JumpUrl = { target: '', params: {} };
    switch (this.form.target) {
      case 'link':
        jumpUrl.target = 'link';
        jumpUrl.params!.url = this.form.url;
        break;
      case 'course':
        jumpUrl.target = 'course';
        jumpUrl.params!.courseId = this.form.courseId as number;
        break;
      case 'openCourse':
        jumpUrl.target = 'openCourse';
        jumpUrl.params!.courseId = this.form.courseId as number;
        break;
    }
    console.log('submit:', jumpUrl);
    this.$emit('success', jumpUrl);
    this.syncVisible = false;
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  .type {
    margin-right: 15px;
  }
  .info {
    flex: 1;
  }
}
</style>
