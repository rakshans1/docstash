import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Visualizer  from 'webpack-visualizer-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

export default {
  debug: true,
  devtool: 'cheap-module-source-map', //source-map
  noInfo: true,
  entry: './src/index.js',
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'static/js/[name].[chunkhash].js'
  },
  plugins: [
    new WebpackMd5Hash(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('static/css/[name].[contenthash].css'),
    new HtmlWebpackPlugin({
      template: 'tools/build.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new Visualizer(),
    new SWPrecacheWebpackPlugin({
      cacheId: 'Docstash',
      filename: 'docstash-sw.js',
      maximumFileSizeToCacheInBytes: 4194304,
      runtimeCaching: [{
          handler: 'cacheFirst',
          urlPattern: /[.]jpg$/,
        }],
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /(\.css|\.sass)$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap'),
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'url',
        query: {
          name: 'static/font/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'static/font/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: 'static/font/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.ico$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /manifest.json$/,
        loader: 'file-loader?name=manifest.json!web-app-manifest-loader'
      }
    ]
  }
};
