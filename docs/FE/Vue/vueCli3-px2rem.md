
# vue-cli3创建项目实现px2rem

## 前言

本文主要描述使用 [vue-cli3](https://cli.vuejs.org/zh/guide/) 创建一个新项目，然后使用 [postcss-pxtorem](https://www.npmjs.com/package/postcss-pxtorem) 或者 [postcss-plugin-px2rem](https://www.npmjs.com/package/postcss-plugin-px2rem) 实现在 vue 项目 `px` 自动转换成 `rem` 的操作步骤。

## vue-cli3 创建 vue 项目

使用以下命令创建一个新的 vue 项目

```
$ vue create vue-rem
```

大致项目目录如下

```
.
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.vue
    ├── assets
    │   └── logo.png
    ├── components
    │   └── HelloWorld.vue
    └── main.js
```

## 修改 index.html 文件

修改 `meta` 标签

```html
 // 原内容
 <meta name="viewport" content="width=device-width,initial-scale=1.0">
 // 修改为
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
```

在 `head` 标签里新增代码，用来设置 `rem` 的值

```html
<script>
  (function (window, document) {
    function resize() {
      var ww = window.innerWidth;
      if (ww > window.screen.width) {
        window.requestAnimationFrame(resize);
      }
      else {
        if (ww > 750) ww = 750;
        // 下面代码按照比例为100px = 1rem，此处一定要同pxToRem的转换比例
        document.documentElement.style.fontSize = ww * 100 / 750 + 'px';
      }
    }
    if (document.readyState !== 'loading') {
      resize();
    } else {
      document.addEventListener('DOMContentLoaded', resize);
    }
    window.addEventListener('resize', resize);
  })(window, document);
</script>
```

## 引入 postcss-pxtorem 或者 postcss-plugin-px2rem

2 个插件都能实现 `px` 自动转换成 `rem` 的效果，只是配置语法有差异，后文会讲到这个问题。

```
$ npm install postcss-pxtorem --save-dev
```

或者

```
$ npm install postcss-plugin-px2rem --save-dev
```

## 使用 postcss-pxtorem 或者 postcss-plugin-px2rem

在之前创建的 vue 项目里新增一个文件 `vue.config.js`，在文件中使用以下代码即可实现效果

### 使用 postcss-pxtorem

```js
// vue.config.js
const pxtorem = require("postcss-pxtorem");

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          pxtorem({ // pxtorem 的默认配置
            rootValue: 16,
            unitPrecision: 5,
            propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
            exclude: /node_modules/i
        	})
        ]
      }
    }
  }
};
```

### 使用 postcss-plugin-px2rem 

```js
// vue.config.js
const px2rem = require("postcss-plugin-px2rem");

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({ // postcss-plugin-px2rem 默认配置
            rootValue: 100,
            unitPrecision: 5,
            propWhiteList: [],
            propBlackList: [],
            exclude: false,
            selectorBlackList: [],
            ignoreIdentifier: false,
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
          })
        ]
      }
    }
  }
};
```

## 完整代码

详见仓库 [vue-rem github](https://github.com/clydeqin7/vue-rem)

https://github.com/clydeqin7/vue-rem



