const merge = require('merge'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin")


const TARGET = process.env.npm_lifecycle_event 


const PATHS = {
    app: path.join(__dirname, 'src'),
    appHtml: path.join(__dirname, 'src', 'public', 'index.html'),
    build: path.join(__dirname, 'build'),
    buildHtml: path.join(__dirname, 'build', 'index.html')
}



const common = {

    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: ['*', '.json', '.js', '.jsx']
    },
    output: {
        filename: 'bundle.js',
        path: PATHS.build
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: PATHS.app,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                include: PATHS.app,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, 'css-loader']
            },
            {
                test: /\.(png)$/,
                include: PATHS.app,
                use: 'file-loader'
            },
        ]
    },


    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.appHtml,
            inject: true,
            filename: PATHS.buildHtml,
            title: 'Hello'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],

}




if (TARGET == 'dev')
    module.exports = merge(common, {
        watch: true
    })



if (TARGET == 'build')
    module.exports = merge(common, {})



