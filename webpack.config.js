const path = require('path')

const UglifyJsPlugin = require(' uglifyjs-webpack-plugin ') // 压缩js

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css

const HappyPack = require('happypack') // 多核
const os = require('os')
// 开辟一个线程池
// 拿到系统CPU的最大核数，happypack 将编译工作灌满所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js | vue)$/,
                use: ['cache-loader', 'babel-loader'],
                include: path.resolve('src'),
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'happypack/loader?id=css'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve("src"),
                use: 'happy/loader?id=js'   //此处将之前配置的babel的一些预设什么的替换为happy/loader。id=js，因为happy也可以打包css,
            }
        ],
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name][hash].css',
                chunkFilename: '[id][hash].css'
            }),
            new HappyPack({
                id: 'js',
                threadPool: happyThreadPool,
                loaders: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            }),
            new HappyPack({
                id: 'css',
                threadPool: happyThreadPool,
                loaders: [
                    'cache-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            })
        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    test: /\.js(\?.*)?$/i,  // 测试匹配文件,
                    include: /src/, // 包含哪些文件
                    excluce: /node_modules/, // 不包含哪些文件

                    // 允许过滤哪些块应该被uglified（默认情况下，所有块都是uglified）。
                    // 返回true以uglify块，否则返回false。
                    chunkFilter: (chunk) => {
                        // `vendor` 模块不压缩
                        if (chunk.name === 'vendor') {
                            return false;
                        }
                        return true;
                    },
                    cache: true,
                    parallel: true,
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
        },
    },
};
