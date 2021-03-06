<template>
  <div class="editor editor-article-two">
    <el-form :model="form" label-width="80px" label-position="top">
      <el-form-item prop="title" label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <div class="article-container">
        <article-select
          v-for="(article, index) in form.articles"
          :key="index"
          :index="index"
          :article="article"
        ></article-select>
      </div>
      <div class="btn-group">
        <el-button @click="addArticle">添加 {{ articleCount }}/{{ maxArticleCount }}</el-button>
      </div>
      <el-form-item prop="isMore" label="">
        <el-checkbox v-model="form.isMore" :true-label="1" :false-label="0">查看更多功能</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Inject, Provide, ProvideReactive } from 'vue-property-decorator';
import { PageResponse } from 'types';
import { ArticleOptions, Article, IdArticles } from './index';
import ArticleSelect from './editor/article-select.vue';
@Component({
  components: { ArticleSelect },
})
export default class ArticleTwoEditor extends Vue {
  @PropSync('options', {
    type: Object,
    required: true,
  }) form !: ArticleOptions
  defaultOptions: ArticleOptions = {
    title: '',
    isMore: 1,
    articles: [],
  }
  maxArticleCount: number = 5;
  @ProvideReactive()
  originArticles: IdArticles = {}
  @ProvideReactive()
  loading: boolean = false
  @ProvideReactive()
  get articleCount(): number {
    return this.form.articles && this.form.articles.length || 0;
  }
  created() {
    this.form = Object.assign(this.defaultOptions, this.form)
  }
  @Provide('selectArticle')
  selectArticle(id, index) {
    this.$set(this.form.articles, index, Object.assign({}, this.originArticles[id]));
  }
  @Provide('delArticle')
  delArticle(index) {
    this.form.articles.splice(index, 1);
  }
  addArticle() {
    if (this.articleCount >= this.maxArticleCount) {
      return this.$message.error(`最多添加${this.maxArticleCount}个`);
    }
    const article: Article = { title: '', sourceUrl: '', originalThumb: '' };
    this.form.articles.push(article)
  }
  @Provide('searchArticles')
  async searchArticles(key) {
    const originArticles: IdArticles = {};
    if (key !== '') {
      this.loading = true;
      const params = {
        attributes: 'id, title, categoryId, sourceUrl, originalThumb, publishedTime, hits, userId',
        status: 'published',
        title: key,
      };
      const ret = await this.$request.throughApi<PageResponse>('ms-course.article.getArticles', params);
      this.loading = false;
      ret.rows.forEach(article => {
        this.originArticles[article.id] = article;
        originArticles[article.id] = article;
      })
    }
    return originArticles;
  }
  @Provide('toTop')
  toTop(index) {
    if (index === 0) return;
    const list = this.form.articles;
    const pre = list[ index - 1 ];
    const cur = list[ index ];
    this.$set(list, index - 1, cur)
    this.$set(list, index, pre);
  }
  @Provide('toBottom')
  toBottom(index) {
    const list = this.form.articles;
    if (index === list.length - 1) return;
    const next = list[ index + 1 ];
    const cur = list[ index ];
    this.$set(list, index + 1, cur)
    this.$set(list, index, next);
  }
}
</script>

<style lang="scss" scoped>
.editor-article-two {
  .article-container {
    margin-bottom: 15px;
  }
  .btn-group {
    text-align: center;
  }
}
</style>
