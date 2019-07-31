<template>
  <div class="preview preview-article-one">
    <div v-if="title" class="preview-header">
      <h3 class="title c-363636">{{ title }}</h3>
      <span class="more-link">查看更多>></span>
    </div>
    <div class="card-container">
      <div v-for="article of randomArticles" :key="article.id" class="card">
        <div class="info">
          <div class="title">{{ article.title }}</div>
          <div class="time">{{ page.updatedAt|smartTimeFilter }}</div>
        </div>
        <div class="picture" :style="{ backgroundImage: 'url('+ article.originalThumb +')' }"></div>
      </div>
    </div>
    <div v-if="options.isChange" class="operator">
      <button @click="random" class="btn-random">换一换</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject, InjectReactive, Watch } from 'vue-property-decorator';
import { ArticleOptions, Article } from './index';

@Component({
  filters: {
    smartTimeFilter(time: number): string {
      time = Math.floor(time / 1000);
      const curTime = Math.floor(Date.now() / 1000);
      const remain = curTime - time;
      if (remain < 3600) {
        return '刚刚';
      } else if (remain < 86400) {
        return Math.floor(remain / 3600) + '小时前';
      } else if (remain < 604800) {
        return Math.floor(remain / 86400) + '天前';
      } else if (remain < 2592000) {
        return Math.floor(remain / 604800) + '周前';
      } else if (remain < 31536000) {
        return Math.floor(remain / 2592000) + '月前';
      } else {
        return '1年前';
      }
    }
  }
})
export default class ArticleOnePreview extends Vue {
  @InjectReactive('page') page
  @Prop({
    type: Object,
    required: true,
  }) options!: ArticleOptions
  randomArticles: Article[] = [];
  get title(): string {
    return this.options.title || '';
  }
  get showCount(): number {
    return this.options.showCount || 0;
  }
  get articles(): Article[] {
    return this.options.articles;
  }
  @Watch('showCount')
  @Watch('articles', { immediate: true })
  random() {
    const articles: Article[] = [];
    const randomIndexes = this.getRandomIndex(this.articles.length, this.showCount);
    if (!randomIndexes || !this.articles) return [];
    this.articles.forEach((article, index) => {
      if (randomIndexes.includes(index)) {
        articles.push(article);
      }
    })
    this.randomArticles = articles;
  }
  getRandomIndex(arrLength: number, num: number) {
    const data: number[] = [...Array(arrLength).keys()];
    // @ts-ignore
    return Array.apply(null, { length: data.length })
      .map((n, i) => i)
      .map((n, i, all) => {
        const j = i + Math.floor(Math.random() * (all.length - i));
        const v = all[j];
        all[j] = n;
        return v;
      })
      .slice(0, num)
      .map(i => {
        return data[i];
      });
  }
}
</script>

<style lang="scss" scoped>
.preview-article-one {
  padding: 5px 0;
  .preview-header {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 8px;
    }
    .more-link {
      font-size: 10px;
      color: #BBBBBB;
      min-width: 70px;
      text-align: right;
    }
  }
  .card-container {
    padding: 0 20px;
    .card {
      position: relative;
      display: flex;
      height: 80px;
      margin-bottom: 12px;
      .info {
        flex: 1;
        margin-right: 10px;
        .title {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 3;
          color: #363636;
          font-size: 14px;
          line-height: 20px;
        }
        .time {
          position: absolute;
          left: 0;
          bottom: 0;
          font-size: 9px;
          color: #8E8E93;
        }
      }
      .picture {
        flex-shrink: 0;
        width: 141px;
        height: 78px;
        border-radius: 8px;
        background: rgba(216,216,216,1);
        background-position: center;
        background-size: cover;
      }
    }
  }
  .operator {
    margin-top: 20px;
    text-align: center;
    .btn-random {
      color: #D8BF97;
      font-size: 12px;
      padding: 5px;
      border: none;
      outline: none;
      cursor: pointer;
    }
  }
}
</style>
