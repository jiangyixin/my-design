<template>
  <div class="home">
    <bt-design :page="page"></bt-design>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BtDesign from './design/index.vue';
import { Page } from 'types';
import { request } from '@/utils/request';

@Component({
  components: {
    BtDesign,
  },
})
export default class Home extends Vue {
  page: Page = {}
  async created() {
    await this.getPage()
  }
  async getPage() {
    this.page = await request.throughApi<any>('ms-course.page.getPage', { pageId: 18 });
  }
}
</script>
