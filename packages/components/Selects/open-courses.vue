<template>
  <el-select
    class="remote-select"
    v-model="selected"
    :multiple="multiple"
    filterable
    remote
    reserve-keyword
    :multiple-limit="9"
    placeholder="输入关键字搜索"
    :remote-method="searchCourses"
    :loading="isLoadingCourses">
    <el-option
      v-for="item in courses"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
@Component({})
export default class SelectOpenCourses extends Vue {
  @Prop({ type: [String, Number, Array], required: true }) value!: string | number | number[] | string[];
  @Prop({ type: Boolean, default: false }) multiple!: boolean
  selected!: string | number | number[] | string[];
  courses:Array<any> = [];
  isLoadingCourses = false;
  lastCourseSearchQuery:String|undefined = undefined;
  @Watch('value', { immediate: true })
  onValueChange(val) {
    this.selected = val;
  }
  @Watch('selected')
  onSelectedChange(val) {
    console.log('onSelectedChange:', val);
    this.$emit('input', val);
  }
  searchCourses(query) {
    // 搜索文字没变
    if (this.lastCourseSearchQuery === query) {
      return false;
    }
    this.isLoadingCourses = true;
    // todo: 修改地址
    this.$request.throughApi('ms-course.getOpenCourses', {
      courseName: query,
    }).then(res => {
      this.lastCourseSearchQuery = query;
      this.courses = res.rows.map(data => {
        return {
          label: data.title,
          value: data.id,
        }
      });
    }).finally(() => {
      this.isLoadingCourses = false;
    });
  }
}
</script>

<style lang="scss" scoped>

</style>
