const {
    src,
    dest
} = require('gulp');
const bs = require('browser-sync');

module.exports = function database() {
    return src('src/data/**.json')
        .pipe(dest('build/data'))
        .pipe(bs.stream())
}