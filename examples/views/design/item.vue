<template>
  <div
    v-if="syncItem.componentName"
    class="design-item"
    :class="{ drag: dragging }"
  >
    <div class="item-preview">
      <component
        :is="syncItem.componentName + 'Preview'"
        :options="syncItem.options"
      ></component>
      <i slot="header" @mousedown="delItem" @click="delItem" class="btn-del el-icon-circle-close"></i>
    </div>
    <div slot="footer" class="item-edit">
      <component
        :is="syncItem.componentName + 'Editor'"
        :options.sync="syncItem.options"
        @onOptionsChange="onOptionsChange"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator';
import { Design } from 'types';

@Component({
  components: {}
})
export default class DesignItem extends Vue {
  @Prop({ type: Number }) index!: number
  @PropSync('item', { type: Object }) syncItem!: Design
  @Prop({ type: Boolean }) dragging!: boolean
  onOptionsChange(options: object) {
    this.syncItem.options = options
  }
  delItem() {
    this.$confirm('确定删除当前组件？').then(() => {
      this.$emit('onItemDelete', this.index)
    })
  }
}
</script>

<style lang="scss" scoped>
.design-item {
  position: relative;
  margin: 1px 0;
  .item-edit {
    display: none;
    position: absolute;
    left: 100%;
    top: 0;
    padding: 15px;
    min-height: 28px;
    background: #f8f8f8;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
    width: 420px;
    margin-left: 20px;
    font-size: 12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    &:before, &:after {
      right: 100%;
      top: 20px;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }
    &:before {
      border-color: transparent #e5e5e5 transparent transparent;
      border-width: 7px;
      margin-top: -7px;
    }
    &:after {
      border-color: transparent #f8f8f8 transparent transparent;
      border-width: 6px;
      margin-top: -6px;
    }
  }
  &.active {
    .item-preview {
      outline: 1px dotted #38f;
    }
    .item-edit {
      display: block;
    }
  }
  .item-preview {
    /*cursor: pointer;*/
    .btn-del {
      display: none;
      cursor: pointer;
      position: absolute;
      font-size: 24px;
      top: -12px;
      right: -12px;
      background-color: #fff;
      border-radius: 50%;
      color: #9E9E9E;
      &:hover {
        display: block;
        background-color: #333;
        color: #fff;
      }
    }
    &:hover {
      /*transition-delay: 200ms;*/
      outline: 1px solid #38f;
      .btn-del {
        display: block;
      }
    }
  }
  &.drag,
  &.ghost {
    .item-preview {
      outline: none;
      .btn-del {
        display: none;
      }
    }
  }
  &.chosen {
    cursor: move;
    /*overflow: hidden;*/
    background-color: #fff;
    .item-preview:hover {
      outline: none;
      .btn-del {
        display: none;
      }
    }
  }
}
</style>
