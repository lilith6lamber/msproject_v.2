const gulp = require('gulp');
const requireDir = require('require-dir');
const tasks = requireDir('./tasks');

exports.libs_style = tasks.libs_style;
exports.favicon = tasks.favicon;
exports.database = tasks.database;
exports.fonts = tasks.fonts;
exports.style = tasks.style;
exports.build_js = tasks.build_js;
exports.libs_js = tasks.libs_js;
exports.dev_js = tasks.dev_js;
exports.html = tasks.html;
exports.php = tasks.php;
exports.rastr = tasks.rastr;
exports.webp = tasks.webp;
exports.ttf = tasks.ttf;
exports.ttf2 = tasks.ttf2;
exports.bs_html = tasks.bs_html;
exports.bs_php = tasks.bs_php;
exports.watch = tasks.watch;
exports.deploy = tasks.deploy;

exports.default = gulp.parallel(
  exports.libs_style,
  exports.favicon,
  exports.database,
  exports.ttf,
  exports.ttf2,
  exports.fonts,
  exports.style,
  exports.libs_js,
  exports.dev_js,
  exports.rastr,
  exports.webp,
  exports.html,
  exports.bs_html,
  exports.watch
)
exports.dev_php = gulp.parallel(
  exports.libs_style,
  exports.favicon,
  exports.ttf,
  exports.ttf2,
  exports.database,
  exports.fonts,
  exports.style,
  exports.libs_js,
  exports.dev_js,
  exports.rastr,
  exports.webp,
  exports.php,
  exports.bs_php,
  exports.watch
)