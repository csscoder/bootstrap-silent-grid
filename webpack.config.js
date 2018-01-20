const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
const isProduction = NODE_ENV === 'production';

const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReloadHtml = require('reload-html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ip = require('ip');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pagesJSON = require('./_pagesList.json');

const configWebpack = {

  context: path.resolve(__dirname, 'source'),

  entry: {
    app: './js/app.js',
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
    publicPath: '',
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: [
          path.resolve(__dirname, 'source/js'),
          path.resolve(__dirname, 'source/components'),
          path.resolve(__dirname, 'source/svg-sprite'),
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [
          {
            loader: 'babel-loader',
          }
        ],
      },
      {
        test: /\.bundle\.js$/,
        use: [
          {
            loader: 'bundle-loader',
            options: {
              lazy: true,
              name: '[name]'
            }
          },
          { loader: 'babel-loader' },
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
          },
          extractCSS: isProduction,
          transformToRequire: {
            img: 'src',
            div: 'data-src',
          },
        },
      },
      {
        test: /\.pug$/,
        use: [
          'pug-loader?pretty',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [
          path.resolve(__dirname, 'source/svg-sprite'),
        ],
        loader: 'file-loader',
        options: {
          outputPath: 'img/',
          name: '[hash:6].[ext]',
        },
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, 'source/svg-sprite'),
        ],
        use: [
          'svg-sprite-loader',
          'svgo-loader',
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        include: path.resolve('source/fonts'),
        options: {
          outputPath: 'fonts/',
          name: '[hash:6].[ext]',
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'source/copyToRoot'),
        to: path.resolve(__dirname, 'build'),
      },
    ]),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'source/js'),
      path.resolve(__dirname, 'source/vendor'),
      path.resolve(__dirname, 'source/components'),
    ],
    alias: {
      blocks: path.resolve(__dirname, 'source/blocks'),
      img: path.resolve(__dirname, 'source/img'),
      components: path.resolve(__dirname, 'source/components'),
      vendor: path.resolve(__dirname, 'source/vendor'),
      vue$: 'vue/dist/vue.esm.js'
    },
  },
};

// list pages

const moment = require('moment-timezone');
const pkg = require('./package.json');
const timeUpdate = moment().tz(pkg.clientTimeZone).format('DD MMM YYYY, HH:mm');

// build listing page
configWebpack.plugins.push(
  new HtmlWebpackPlugin({
    filename: pagesJSON.pages[0].pageName,
    template: pagesJSON.pages[0].viewFile,
    alwaysWriteToDisk: false,
    inject: false,
    data: require('./package.json'),
    timeUpdate,
    listPages: pagesJSON.pages,
  }));

for (let i = 1; i < pagesJSON.pages.length; i += 1) {
  configWebpack.plugins.push(
    new HtmlWebpackPlugin({
      filename: pagesJSON.pages[i].pageName,
      template: pagesJSON.pages[i].viewFile,
      alwaysWriteToDisk: false,
      hash: isProduction,
      isProduction,
    }));
}

if (isDevelopment) {
  // add new plugins to build process

  const addPlugins = new Set();
  addPlugins.add(new webpack.HotModuleReplacementPlugin());
  addPlugins.add(new ReloadHtml());
  configWebpack.plugins.push(...addPlugins);

  configWebpack.devtool = '#cheap-module-eval-source-map';
  configWebpack.watch = true;
  configWebpack.watchOptions = {
    aggregateTimeout: 100,
    ignored: /node_modules/,
    poll: 100,
  };

  configWebpack.devServer = {
    hot: true,
    inline: true,
    overlay: false,
    quiet: false,
    contentBase: path.join(__dirname, 'build'),
    port: 8000,
    historyApiFallback: false,
    open: true,
    openPage: 'list.html',
    stats: 'errors-only',
    clientLogLevel: 'error',
    host: ip.address(),
    watchContentBase: true,
  };

  const addRules = new Set();
  addRules.add({
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      'css-loader?sourceMap=true',
      'postcss-loader?sourceMap=inline',
      'sass-loader?sourceMap',
      'import-glob-loader'
    ],
  });
  configWebpack.module.rules.push(...addRules);
}

if (isProduction) {

  const addRules = new Set();

  addRules.add({
    test: /\.scss$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        'css-loader',
        'postcss-loader',
        'sass-loader',
        'import-glob-loader'
      ],
      publicPath: '../',
    }),
  });
  configWebpack.module.rules.push(...addRules);

  const addPlugins = new Set();
  addPlugins.add(new WebpackCleanupPlugin());
  addPlugins.add(new UglifyJSPlugin({
    compress: {
      drop_console: true,
      warnings: false,
    },
  }));
  addPlugins.add(new ExtractTextPlugin({
    filename: 'css/style.css',
  }));
  // addPlugins.add(new BundleAnalyzerPlugin());
  configWebpack.plugins.push(...addPlugins);
}

module.exports = configWebpack;
