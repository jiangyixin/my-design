import Vue from 'vue';
const JsBridge = {
  BTCLASS_URL: Vue.prototype.$BT.BTCLASS_URL,
  hasBridge: false,
  device: '',
  regHandlers: [],
  init: function(callback) {
    if (this.device === 'ios') {
      if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      const WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe);
      }, 0);
    }
  },

  isExist: function() {
    const _this = this;
    const u = navigator.userAgent;
    if (u.toLowerCase().match(/MicroMessenger/i) === 'micromessenger') {
      _this.device = 'wx';
    } else {
      _this.device = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 'ios' : 'android';
    }
    if (_this.device === 'ios') {
      _this.init(function(bridge) {
        bridge.callHandler('getRegisteredHandlers', '', function(resp) {
          _this.hasBridge = true;
          _this.regHandlers = resp;
        });
      });
    } else if (_this.device === 'android') {
      if (window.AndroidJS) {
        _this.hasBridge = true;
        _this.regHandlers = Object.keys(window.AndroidJS);
      }
    }
  },

  registerHandler: function(name, fun) {
    const _this = this;
    if (_this.device === 'ios') {
      _this.init(function(bridge) {
        bridge.registerHandler(name, fun);
      });
    } else if (_this.device === 'android') {
      JsBridge[name] = fun;
    }
  },

  callHandler: function(name, data, fun) {
    const _this = this;
    if (_this.device === 'ios') {
      _this.init(function(bridge) {
        bridge.callHandler(name, data, fun);
      });
    } else if (_this.device === 'android') {
      window.AndroidJS && window.AndroidJS[name] && window.AndroidJS[name](JSON.stringify(data));
    }
  },

  _linkDict: function(target, params) {
    let links = {};
    switch (target) {
      case 'link':
        links = {
          sierra: params.url,
          web: params.url
        };
        break;
      case 'course':
        links = {
          sierra: `sierra://v1/course/normal/${params.courseId}`,
          web: `${this.BTCLASS_URL}/course/${params.courseId}`
        };
        break;
      case 'openCourse':
        links = {
          sierra: `sierra://v1/course/open/${params.courseId}`,
          web: `${this.BTCLASS_URL}/open/course/${params.courseId}`
        };
        break;
      case 'courseCategory':
        links = {
          sierra: `sierra://v1/course/normal/category/${params.categoryId}`,
          web: `${this.BTCLASS_URL}/course/explore` // TODO: need to change 无直接分类地址
        };
        break;
      case 'courseLesson':
        links = {
          sierra: `sierra://v1/course/normal/${params.courseId}/lesson/${params.lessonId}`,
          web: `${this.BTCLASS_URL}/course/${params.courseId}/learn#lesson/${params.lessonId}`
        };
        break;
      case 'openCourseLesson':
        links = {
          sierra: `sierra://v1/course/open/${params.courseId}/lesson/${
            params.lessonId
          }`,
          web: `${this.BTCLASS_URL}/open/course/${params.courseId}` // TODO: need to change 无唯一课时地址
        };
        break;
      case 'openCourseList':
        links = {
          sierra: `sierra://v1/course/open/category/0`, // 目前categoryId没用
          web: `${this.BTCLASS_URL}/open/course/explore`
        };
    }
    return links;
  },

  getLink: function({ target, params }) {
    if (this.hasBridge) {
      return this._linkDict(target, params)['sierra'];
    } else {
      return this._linkDict(target, params)['web'];
    }
  },
};

window.JsBridge = JsBridge;
JsBridge.isExist();

export default JsBridge;
