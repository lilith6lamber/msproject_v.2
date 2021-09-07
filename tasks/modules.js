const {
    src,
    dest
} = require('gulp');

const webpack = require('webpack-stream');
const bs = require('browser-sync');

module.exports = function modules() {
    return src('src/js/entry.js')
        .pipe(webpack({
            watch: true,
            mode: 'development',
            entry: {
                common: './src/js/common.js',
                user: './src/js/user.js',
                index: './src/js/index.js',
                catalog: './src/js/catalog.js',
                blog: './src/js/blog.js',
                single: './src/js/single.js',
                map: './src/js/map.js',
            },
            output: {
                filename: '[name].js',
            },
        }))
        .pipe(dest('build/js'))
        .pipe(bs.stream());
}
