var path = require('path');

var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

var rootAssetPath = './dotify/static'

module.exports = {
    entry: {
        main_js: [
            rootAssetPath + '/js/main.js'
        ],
        info_js: [
            rootAssetPath + '/js/info.js'
        ]
    },
    output: {
        path: './build/public',
        publicPath: 'http://localhost:3333/assets/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    devServer: {
        inline: true,
        port: 3333,
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
                loader: "style!css!less"
            },
        ]
    },
    plugins: [
        new ManifestRevisionPlugin(path.join('build', 'manifest.json'), {
            rootAssetPath: rootAssetPath
        })
    ]
}
