var path = require('path');

var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

var rootAssetPath = './dotify/assets'

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
    path: path.join(__dirname, 'dotify', 'static', 'js'),
    publicPath: 'http://localhost:2992/static/',
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
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
    ]
  },
  plugins: [
    new ManifestRevisionPlugin(path.join(__dirname, 'dotify', 'static', 'manifest.json'), {
      rootAssetPath: rootAssetPath,
      ignorePaths: ['/js']
    })
  ]
}
