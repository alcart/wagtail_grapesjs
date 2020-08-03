const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = function (env, argv) {

    let basePath = path.resolve(__dirname, 'static_src/');

    let common = {
        mode: argv.production ? 'production' : 'development',
        watch: !!argv.watch,
        devtool: argv.production ? '' : 'inline-source-map'
    };

    let jsConfigs = {
        ...common,
        entry: {
            'bootstrap': path.resolve(basePath, 'js/bootstrap.js'),
            'editor': path.resolve(basePath, 'js/editor.js'),
        },

        output: {
            path: path.resolve(__dirname, './static/js'),
            filename: '[name].js',
            chunkFilename: '[name].bundle.js',
            libraryTarget: 'this',
            publicPath: '/static/js/',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-syntax-dynamic-import'
                            ]
                        }
                    }
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader},
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS, using Node Sass by default
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new CleanWebpackPlugin({})
        ],
    };

    let sassConfig = {
        ...common,

        entry: {
            'main': path.resolve(basePath, 'scss/styles.scss'),
        },

        output: {
            path: path.resolve(__dirname, 'static/css/'),
            publicPath: '/static/css',
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader:
                            MiniCssExtractPlugin.loader
                        },
                        "css-loader", // translates CSS into CommonJS
                        { loader: 'resolve-url-loader', options: { sourceMap: !argv.production } },
                        {
                            loader: "sass-loader",
                        } // compiles Sass to CSS, using Node Sass by default,
                    ]
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)(\??\#?v=[.0-9]+)?$/,
                    loader: 'file-loader?name=/fonts/[name].[ext]',
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new CleanWebpackPlugin()
        ]
    };


    return [jsConfigs, sassConfig]
};