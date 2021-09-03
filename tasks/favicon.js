const {
    src,
    dest
} = require('gulp');
const bs = require('browser-sync');

module.exports = function favicon() {
    return src('src/favicon/**.*')
        .pipe(dest('build/favicon'))
        .pipe(bs.stream())
}