<template>
  <div class="editor">
    <el-form :model="form" label-width="auto">
      <el-form-item prop="title" label="模块标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item prop="subTitle" label="模块副标题">
        <el-input v-model="form.subTitle"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio v-model="form.showType" label="single">单列</el-radio>
        <el-radio v-model="form.showType" label="double">双列</el-radio>
      </el-form-item>
      <el-form-item>
        <el-radio v-model="form.type" label="category">分类选择</el-radio>
        <el-radio v-model="form.type" label="manual">手动添加</el-radio>
      </el-form-item>
      <template v-if="form.type === 'category'">
        <el-form-item prop="showCount" label="课程数量">
          <el-input-number :min="1" :max="9" v-model="form.showCount"></el-input-number>
        </el-form-item>
        <el-form-item prop="category" label="课程分类">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option
              v-for="item in categorys"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="order" label="排序规则">
          <el-select v-model="form.order" placeholder="请选择">
            <el-option
              v-for="item in sortRules"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <template v-else-if="form.type === 'manual'" >
        <el-form-item prop="courseIds" label="选中课程">
          <el-select
            class="remote-select"
            v-model="form.courseIds"
            multiple
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
        </el-form-item>
      </template>
      <el-form-item>
        <el-checkbox v-model="form.isMore">查看更多</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Inject } from 'vue-property-decorator';
import { SmartCourseListOption } from './index';

const SortDict = [
  {
    label: '销量(由高到低)',
    value: 'sales,DESC'
  },
  {
    label: '时间(创建时间,由新到旧)',
    value: 'createdTime,DESC'
  }
];

@Component
export default class SmartCourseListEditor extends Vue {
  sortRules = SortDict;

  // 实时更新配置
  @PropSync('options', {
    type: Object,
    required: true,
  }) form!: SmartCourseListOption;

  // 默认配置
  defaultOptions: SmartCourseListOption = {
    title: '',
    subTitle: '',
    showCount: 1,
    isMore: true,
    type: 'category',
    showType: 'single'
  };

  @Prop({ type: Number, default: 0 }) categoryId: number = 0;

  created() {
    this.form = Object.assign(this.defaultOptions, this.form);
    this.getCategorys();
  }

  categorys = [{
    label: '全部',
    value: this.categoryId,
  }];
  // 获取所有子分类
  getCategorys() {
    this.$request.throughApi('ms-course.getCategoryTree', {
      parentId: this.categoryId,
      code: 'course'
    })
      .then((res) => {
        res.forEach(data => {
          this.categorys.push({
            label: data.name,
            value: data.id,
          });
        });
      });
  }

  // 搜索课程
  // 可关联课程
  courses:Array<any> = [];
  isLoadingCourses = false;
  lastCourseSearchQuery:String|undefined = undefined;
  searchCourses(query) {
    // 搜索文字没变
    if (this.lastCourseSearchQuery === query) {
      return false;
    }

    this.isLoadingCourses = true;

    // todo: 修改地址
    this.$request.throughApi('ms-course.paidGuide.getCourse', {
      courseName: query,
    }).then(res => {
      this.lastCourseSearchQuery = query;
      this.courses = res.map(data => {
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
  .remote-select {
    width: 100%;
  }
  .price-input {
    width: 100%;
  }
  .line {
    text-align: center;
  }
</style>
