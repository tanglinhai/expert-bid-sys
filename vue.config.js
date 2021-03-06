﻿const webpack = require('webpack');
const path = require('path');
//process.env.NODE_ENV = 'production';
const debug = process.env.NODE_ENV !== 'production';
const optimizeCss = require('optimize-css-assets-webpack-plugin')
const uglifyjsPlugin = require('uglifyjs-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
 // 基本路径
 publicPath: '/',
 // 输出文件目录

 outputDir: 'dist',

 // eslint-loader 是否在保存的时候检查

 lintOnSave: false,

 // use the full build with in-browser compiler?

 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only

 //compiler: false,

 // webpack配置

 // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md

 chainWebpack: () => config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
    }
  },

 configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
    //config.devtool = 'source-map'
    if (debug) { // 开发环境配置
      
      
    } else { // 生产环境配置

    }
    /*if(BundleAnalyzerPlugin)
    config.plugins = [
      new BundleAnalyzerPlugin()
    ];*/
    config.externals= {
      'vue': 'Vue',
      "vue-router": "VueRouter",
      "vuex": "Vuex",
      //"mockjs": "Mock",
       'jquery': 'jQuery'
    }
    config.watch = false;
    config.watchOptions= {
      ignored: [/node_modules/,/dist/,/docs/,/src\/assets\/img/]
    }

    /*config.module= {
      rules:[
        {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        },
        { test: /\.scss$/,
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              } 
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true } 
            }
          ]
        },
        { test: /\.css$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              } 
            },
            { loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
      ]
    }
*/

    
  },

 // vue-loader 配置项

 // https://vue-loader.vuejs.org/en/options.html

 //vueLoader: {},

 // 生产环境是否生成 sourceMap 文件

 productionSourceMap: true,

 // css相关配置

 css: {

  // 是否使用css分离插件 ExtractTextPlugin

  extract: !debug,

  // 开启 CSS source maps?

  sourceMap: !debug,

  // css预设器配置项

  loaderOptions: {},

  // 启用 CSS modules for all css / pre-processor files.

  modules: false

 },

 // use thread-loader for babel & TS in production build

 // enabled by default if the machine has more than 1 cores

 parallel: require('os').cpus().length > 1,

 // 是否启用dll

 // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode

 //dll: false,

 // PWA 插件相关配置

 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

 pwa: {},


 


 // webpack-dev-server 相关配置
 devServer: {

  open: process.platform === '365trade',

  host: '0.0.0.0',

  port: 7000,

  https: false,

  proxy: {
      '/elementuiUpload': {
          target: 'https://jsonplaceholder.typicode.com/posts/',
          changeOrigin: true,
          ws: true
      }
  },

  before: app => {},

  open: false, //配置自动启动浏览器

  hot: true,
  hotOnly: true,
  watchOptions: {
    ignored: [/node_modules/,/dist/,/docs/,/src\/assets\/img/]
  }

 },

 // 第三方插件配置
 pluginOptions: {

  

 }

}