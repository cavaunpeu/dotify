module.exports = {
    context: __dirname + '/dotify/static/js',
    entry: './main.js',
    output: {
        path: __dirname + '/dotify',
        publicPath: '/assets/',
        filename: 'index.js'
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
    }
}