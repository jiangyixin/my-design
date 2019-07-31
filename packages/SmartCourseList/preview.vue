<template>
  <div class="module-container">
    <div class="module-header">
      <span class="module-title">
        <span class="module-main-title" v-if="options.title">{{ options.title }}</span>
        <br v-if="options.title && options.subTitle"/>
        <span class="module-sub-title" v-if="options.subTitle">{{ options.subTitle }}</span>
      </span>
      <span class="more-link" v-if="options.isMore">查看更多>></span>
    </div>
    <div class="module-content" :class="{ 'single-row': options.showType === 'single', 'double-row': options.showType === 'double' }">
      <div v-for="course in courseList" :key="course.id" class="course-card">
        <img :src="course.picture" class="course-picture">
        <p class="course-title">
          {{ course.title }}
        </p>
        <span class="course-info">
          <span class="course-price">
            <span class="final-price-wrap">
              <img v-if="course.vipIcon" :src="course.vipIcon" class="vip-icon">
              <span class="final-price"><span v-if="course.priceUnit === 'cash'" class="cash-unit">¥</span>{{ course.finalPrice }}<span v-if="course.priceUnit === 'coin'" class="coin-unit">B豆</span></span>
            </span>
            <span class="origin-price" v-if="course.originPrice !== course.finalPrice">
              <span v-if="course.priceUnit === 'cash'">¥</span>{{ course.originPrice }}<span v-if="course.priceUnit === 'coin'">B豆</span>
            </span>
          </span>
          <span v-if="course.studentNum" class="student-num">
            {{ course.studentNum }}人在学
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { SmartCourseListOption } from './index';

@Component
export default class SmartCourseListPreview extends Vue {
  @Prop({
    type: Object,
    required: true,
  }) options!: SmartCourseListOption;

  courseList:Array<any> = [];

  // 获取模块数据
  @Watch('options', { immediate: true, deep: true })
  async fetchData() {
    if (this.options.type === 'manual') { // 固定课程
      this.courseList = await this.searchCoursesByCourseIds(this.options.courseIds);
    }
  }

  // 根据课程ids获取课程列表
  async searchCoursesByCourseIds(courseIds) {
    courseIds = [...new Set(courseIds)]; // 去重

    if (!courseIds.length) {
      return [];
    }

    const { rows: courses } = await this.$request.throughApi('ms-course.getCourses', {
      ids: courseIds.join(','),
      limit: courseIds.length,
    });
    return this.handleCoursesInfo(courses);
  }

  // 处理课程数据，便于展示
  handleCoursesInfo(courses = []) {
    return courses.map((course:any) => {
      // 课程价格
      let originPrice = course.originPrice;
      let finalPrice = course.originPrice;
      if (course.buyingInfo) { // 有学员信息
        finalPrice = course.buyingInfo.finalPrice;
        if (course.subjectType !== 0) { // 专题或组合课程
          finalPrice = course.buyingInfo.finalIntervalPrice[0];
          originPrice = course.buyingInfo.originIntervalPrice[0];
        }
      }

      // 会员icon
      const vipIcon = course.joinVipDiscount &&
        course.studentInfo &&
        course.studentInfo.userVip &&
        course.studentInfo.userVip.levelInfo &&
        course.studentInfo.userVip.levelInfo.icon;

      // 在学学员数
      const studentNum = course.studentNum > 999 ? '999+' : course.studentNum;

      return {
        title: course.title,
        picture: course.largePicture,
        originPrice,
        finalPrice,
        vipIcon,
        studentNum,
        priceUnit: course.maxRate ? 'coin' : 'cash',
      }
    });
  }
}
</script>

<!--// todo: 改颜色-->
<style lang="scss" scoped>
  * {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .module-container {
    padding: 0 20px;

    .module-header {
      width: 100%;
      overflow: hidden;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .module-main-title {
        font-size: 18px;
        color: #363636;
      }
      .module-sub-title {
        font-size: 10px;
        color: #8E8E93;
      }
      .more-link {
        font-size: 10px;
        color: #BBBBBB;
        float: right;
      }
    }

    .module-content {
      margin-top: 8px;
    }

    .course-picture {
      width: 100%;
      border-radius: 8px;
    }

    .course-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .final-price-wrap {
        color: #FF6262;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        display: flex;
        align-items: center;

        .vip-icon {
          width: 20px;
          padding: 2px;
        }

        .coin-unit {
          font-size: 12px;
        }
      }

      .origin-price {
        text-decoration: line-through;
        color: #8E8E93;
      }

      .student-num {
        color: #8E8E93;
        font-size: 10px;
      }
    }

    .single-row {
      .course-card {
        margin-bottom: 15px;
      }
      .course-title {
        color: #363636;
        font-size: 14px;
        margin: 8px 0 3px 0;
      }
      .course-price {
        display: flex;
        align-items: center;

        .origin-price {
          margin-left: 6px;
          font-size: 12px;
        }
      }
    }

    .double-row {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .course-card {
        width: 48%;
        margin-bottom: 25px;
      }
      .course-title {
        color: #363636;
        font-size: 14px;
        margin: 5px 0 1px 0;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .course-info {
        align-items: start;

        .course-price {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          .origin-price {
            margin-left: 6px;
            font-size: 12px;
          }
        }
        .student-num {
          align-self: end;
          line-height: 28px;
        }
      }
    }
  }

</style>
