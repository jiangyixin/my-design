<template>
  <div class="article">
    <div class="arrow-group">
      <i @click="toTop(index)" class="el-icon-top" :class="{ disabled: index === 0 }"></i>
      <i @click="toBottom(index)" class="el-icon-bottom" :class="{ disabled: index === articleCount - 1 }"></i>
    </div>
    <el-select
      v-model="article.id"
      filterable
      remote
      reserve-keyword
      :remote-method="sSearchArticles"
      :loading="loading"
      @change="selectOneArticle"
      placeholder="选择资讯"
      class="select"
    >
      <el-option
        v-for="(sArticle, index) in sOriginArticles"
        :key="index"
        :label="originArticles[sArticle.id].title"
        :value="sArticle.id">
      </el-option>
    </el-select>
    <div class="btn-del">
      <i @click.stop="delArticle(index)" class="el-icon-delete" title="删除资讯"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject, Watch, InjectReactive } from 'vue-property-decorator';
import { Article, IdArticles } from '../index';

@Component
export default class ArticleSelect extends Vue {
  @Inject() toTop!: Function
  @Inject() toBottom!: Function
  @Inject() selectArticle!: Function
  @Inject() delArticle!: Function
  @Inject('searchArticles') searchArticles!: Function
  @Prop({ type: Object }) article!: Article
  @Prop({ type: Number }) index!: number
  @InjectReactive('articleCount') articleCount!: number
  @InjectReactive('loading') loading!: boolean
  @InjectReactive('originArticles') originArticles!: IdArticles
  sOriginArticles: IdArticles = {};
  selectOneArticle(val) {
    this.selectArticle(val, this.index)
  }
  async sSearchArticles(key) {
    this.sOriginArticles = await this.searchArticles(key)
  }
}
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  .arrow-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
  .select {
    flex: 1;
  }
  .btn-del {
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
</style>
