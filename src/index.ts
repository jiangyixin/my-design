import { VueConstructor } from 'vue/types/vue';
import { InstallationOptions } from 'types';

const components = [
  'Blank',
  // 'Line',
  // 'Shuffle',
  // 'SmartCourseList',
  // 'ArticleOne',
  // 'ArticleTwo',
  // 'Textarea',
  // 'Image',
];

const _installPreview = function(Vue: VueConstructor) {
  for (const name of components) {
    Vue.component(
      `${name}Preview`,
      // 这个 `import` 函数会返回一个 `Promise` 对象。
      () => import(`../packages/${name}/preview.vue`)
    );
  }
};
const _installEditor = function(Vue: VueConstructor) {
  for (const name of components) {
    Vue.component(
      `${name}Editor`,
      // 这个 `import` 函数会返回一个 `Promise` 对象。
      () => import(`../packages/${name}/editor.vue`)
    );
  }
};

const install = function(Vue: VueConstructor, opts: InstallationOptions = {
  preview: true,
  editor: false,
  BTCLASS_URL: 'https://www.btclass.cn',
}) {
  if (opts.preview) {
    _installPreview(Vue)
  }
  if (opts.editor) {
    _installEditor(Vue)
  }
  Vue.prototype.$BT = {
    BTCLASS_URL: opts.BTCLASS_URL,
  };
  Vue.prototype.$request = opts.request;
};

export default {
  version: '1.0.0',
  install,
}
