'use strict';

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const globalConfig = require('../../global-config');


// https://webpack.js.org/configuration/
module.exports = {
  mode: 'development',

  entry: [
    '@babel/polyfill',
    path.join(globalConfig.path.www, 'app.js')
  ],

  output: {
    path: globalConfig.path.wwwDist
  },

  devtool: 'cheap-source-map',

  stats: 'errors-warnings',

  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  resolve: {
    modules: [
      globalConfig.path.dashbiModules,
      globalConfig.path.nodeModules,
      'node_modules'
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'Root': globalConfig.path.root,
      'Assets': globalConfig.path.wwwAssets,
      'Components': globalConfig.path.wwwComponents,
      'Fonts': path.join(globalConfig.path.wwwAssets, 'fonts'),
      'Img': path.join(globalConfig.path.wwwAssets, 'img'),
      'Intermediars': globalConfig.path.wwwIntermediars,
      'Stylesheets': path.join(globalConfig.path.wwwAssets, 'stylesheets'),
      'Lib': globalConfig.path.wwwLib
    },
    symlinks: false
  },

  resolveLoader: {
    modules: [
      globalConfig.path.dashbiModules,
      globalConfig.path.nodeModules,
      'node_modules'
    ]
  },

  module: {
    rules: [

      // HTML
      {
        test: /\.html$/,
        loader: 'html-loader'
      },

      // Vue
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  require.resolve('@babel/preset-env'),
                  {
                    targets: {
                      'chrome': '21',
                      'firefox': '28',
                      'ie': '11',
                      'edge': '12',
                      'safari': '6.1',
                      'opera': '12.1',
                      'ios': '7',
                      'samsung':'4',
                      'android': '4.4'
                    },
                    useBuiltIns: 'usage',
                    corejs: 2,
                    modules: 'auto'
                  }
                ]
              ]
            }
          }
        ]
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },

      // LESS
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              noIeCompat: true
            }
          }
        ],
      },

      // SASS
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      // Images
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },

      // Media
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },

      // Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }

    ]
  },

  plugins: [

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'Dashbi',
      template: path.join(globalConfig.path.www, 'index.template.html'),
      favicon: path.join(globalConfig.path.wwwAssets, 'img/favicon.png'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),

    new VueLoaderPlugin()
  ]

};
