<template>
  <el-container>
    <el-aside class="component-container" width="120px">
      <h4 class="title">组件列表</h4>
      <draggable
        class="default-container"
        :list="defaultItems"
        :group="{ name: 'design', pull: 'clone', put: false }"
        :clone="cloneItem"
      >
        <div v-for="item of defaultItems" :key="item.componentName" class="item">
          {{ item.title }}
        </div>
      </draggable>
    </el-aside>
    <el-main>
      <draggable
        :list="pageItems"
        :group="{ name: 'design' }"
        v-bind="dragOptions"
        @start="dragging = true"
        @end="dragging = false"
        @change="onPreviewChange"
        class="preview-container"
      >
        <design-item
          v-for="(item, index) in pageItems"
          :key="index"
          :index="index"
          :item.sync="item"
          :dragging="dragging"
          :class="{ active: index === activeIndex }"
          @click.native="activateDesign(index)"
          @onItemDelete="deleteItem"
        ></design-item>
      </draggable>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, PropSync, ProvideReactive } from 'vue-property-decorator';
import DesignItem from './item.vue';
import { Design, DragMovedEvent, Page } from 'types';
// @ts-ignore
import Draggable from 'vuedraggable';

@Component({
  components: {
    DesignItem,
    Draggable,
  }
})
export default class BtDesign extends Vue {
  @PropSync('page', { type: Object }) syncPage!: Page
  @ProvideReactive('page')
  defaultItems: Design[] = [
    {
      title: '辅助线',
      componentName: 'Line',
      options: {},
    },
    {
      title: '辅助空白',
      componentName: 'Blank',
      options: {},
    },
    {
      title: '轮播图',
      componentName: 'Shuffle',
      options: {},
    },
    {
      title: '智能课程列表',
      componentName: 'SmartCourseList',
      options: {},
    },
    {
      title: '资讯模块1',
      componentName: 'ArticleOne',
      options: {},
    },
    {
      title: '资讯模块2',
      componentName: 'ArticleTwo',
      options: {},
    },
    {
      title: '文本框',
      componentName: 'Textarea',
      options: {},
    },
    {
      title: '图片',
      componentName: 'Image',
      options: {},
    },
  ];
  pageItems: Design[] = [
    {
      title: '图片',
      componentName: 'Image',
      options: {
        title: '我是图片',
        picture: 'https://app-cdn.btclass.cn/tmp/2018/04-23/16224448c6ae342452.jpg',
        jumpUrl: {},
      },
    },
    {
      title: '资讯模块2',
      componentName: 'ArticleTwo',
      options: {
        title: '我是资讯模块2',
        showCount: 2,
        isChange: true,
        articles: [
          { 'id': 169, 'title': '18年CPA是最佳通关机会？全国第二名李彬在知乎live讲座等你！', 'categoryId': 3, 'sourceUrl': '', 'originalThumb': 'https://app-cdn.btclass.cn/tmp/2018/04-23/16224448c6ae342452.jpg', 'publishedTime': 1524471596, hits: 1200, 'userId': 36100, 'user': { nickname: '辉辉', smallAvatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/pSeN0d6Wnofjjicibs1NmMMOwdxXpTw3p5eWKicK9iaAApoGlxldicQBSgR91jXicU63PyTJP5OOuMZFF8BF6POaeM0Q/132' } },
          { 'id': 198, 'title': '只要19.9？中级会计职称刷题班带你掌握90%考点！周日晚0点准时涨价！', 'categoryId': 3, 'sourceUrl': '', 'originalThumb': 'https://app-cdn.btclass.cn/tmp/2018/07-20/195928014014521507.jpg', 'publishedTime': 1532087736 },
          { 'id': 72, 'title': '2016年CPA一次过4科，税务师一次过3科，跟着彬哥学习的体会 | 上班族、双非大学、BT学院老学员', 'categoryId': 1, 'sourceUrl': '', 'originalThumb': '', 'publishedTime': 1482296693 }
        ]
      },
    },
    {
      title: '资讯模块1',
      componentName: 'ArticleOne',
      options: {
        title: '我是资讯模块1',
        showCount: 2,
        isChange: true,
        articles: [
          { 'id': 169, 'title': '18年CPA是最佳通关机会？全国第二名李彬在知乎live讲座等你！', 'categoryId': 3, 'sourceUrl': '', 'originalThumb': 'https://app-cdn.btclass.cn/tmp/2018/04-23/16224448c6ae342452.jpg', 'publishedTime': 1524471596 },
          { 'id': 198, 'title': '只要19.9？中级会计职称刷题班带你掌握90%考点！周日晚0点准时涨价！', 'categoryId': 3, 'sourceUrl': '', 'originalThumb': 'https://app-cdn.btclass.cn/tmp/2018/07-20/195928014014521507.jpg', 'publishedTime': 1532087736 },
          { 'id': 72, 'title': '2016年CPA一次过4科，税务师一次过3科，跟着彬哥学习的体会 | 上班族、双非大学、BT学院老学员', 'categoryId': 1, 'sourceUrl': '', 'originalThumb': '', 'publishedTime': 1482296693 }
        ]
      },
    },
  ]
  activeIndex: number = 0
  dragging: boolean = false
  dragOptions:object = {
    // disabled: false,
    // delay: 1000,
    animation: 100,
    ghostClass: 'ghost',
    chosenClass: 'chosen',
    draggable: '.design-item',
    handle: '.item-preview',
  }
  activateDesign(index: number) {
    this.activeIndex = index
  }
  cloneItem(item: Design) {
    return {
      componentName: item.componentName,
      options: {},
      createdAt: new Date().getTime()
    };
  }
  deleteItem(index: number) {
    this.pageItems.splice(index, 1)
  }
  onPreviewChange({ moved }: { moved: DragMovedEvent }) {
    if (moved) {
      const { oldIndex, newIndex } = moved
      if (this.activeIndex === oldIndex) {
        this.activeIndex = newIndex
      } else if (this.activeIndex < oldIndex && this.activeIndex >= newIndex) {
        this.activeIndex++
      } else if (this.activeIndex > oldIndex && this.activeIndex <= newIndex) {
        this.activeIndex--
      }
    }
  }
  created() {}
}
</script>

<style lang="scss" scoped>
.component-container {
  padding: 8px 0;
  .title {
    margin: 0;
    text-align: center;
  }
}
.default-container {
  .item {
    cursor: move;
    position: relative;
    display: block;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
    text-align: center;
  }
}
.preview-container {
  width: 375px;
  height: 667px;
  border: 1px solid #ccc;
}
</style>
