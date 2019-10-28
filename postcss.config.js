module.exports = {
    plugins: {
        'postcss-url': {},
        'postcss-import': {},
        'postcss-preset-env': {},
        'postcss-viewport-units': {},
        'postcss-aspect-ratio-mini': {},
        'postcss-px-to-viewport': { // https://www.npmjs.com/package/postcss-px-to-viewport
            unitToConvert: 'px', // 转换单位
            viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            unitPrecision: 5, // 保留的小数位数
            propList: ['*'], // 能转换为vw的属性列表
            viewportUnit: 'vw', // 转换后的单位
            fontViewportUnit: 'vw', // 字体使用的单位
            exclude: [/node_modules/], // 忽略转换的目录
            selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false // 允许在媒体查询中转换`px`
        },
        'cssnano': {
            preset: 'advanced',
            autoprefixer: false, // 关闭 cssnano 中的autoprefixer， 并去掉默认的 autoprefixer 配置
            'postcss-zindex': false
        },
    }
}

// postcss-aspect-ratio-mini  固定元素宽高比。
// postcss-px-to-viewport     px 转换 vw。
// postcss-preset-env         支持现代 CSS 语法
// postcss-viewport-units     为 CSS 属性添加 content，配合viewport-units-buggyfill 库适配 vw/vh/vmin/vmax。
// cssnano                    压缩和清理CSS代码。
// cssnano-preset-advanced    cssnano 配置
// postcss-import             解决 @import 引入路径问题。
// postcss-url                处理文件，比如图片文件、字体文件等引用路径的处理，vue-loader 已具有类似的功能，只需要配置中将vue-loader配置进去。
