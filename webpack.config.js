var path = require('path');

var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

var rootAssetPath = './dotify/static'

module.exports = {
  context: __dirname,
  entry: {
    main_js: [
      rootAssetPath + '/js/main.js'
    ],
    info_js: [
      rootAssetPath + '/js/info.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'build', 'public'),
    publicPath: 'http://localhost:2992/assets/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  devServer: {
    inline: true,
    port: 2992,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
         }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
    ]
  },
  plugins: [
    new ManifestRevisionPlugin(path.join(__dirname, 'build', 'manifest.json'), {
      rootAssetPath: rootAssetPath,
      ignorePaths: ['/js']
    })
  ]
}
