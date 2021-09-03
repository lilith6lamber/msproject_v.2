const plugins = ['node_modules/vanilla-lazyload/dist/lazyload.js',
	'node_modules/tiny-slider/dist/tiny-slider.js',
	'node_modules/wow.js/dist/wow.js',
	'node_modules/mixitup/dist/mixitup.js',
	'node_modules/validator/validator.js',
	'node_modules/custom-select/build/custom-select.min.js',
	'node_modules/sweetalert2/dist/sweetalert2.all.min.js',
	'node_modules/baguettebox.js/dist/baguetteBox.js',
	'src/plugins/leaflet/leaflet.js',
	'node_modules/leaflet.tilelayer.colorfilter/src/leaflet-tilelayer-colorfilter.js',
	'src/plugins/leaflet-fullscreen/Control.FullScreen.js',
	'src/plugins/leaflet-locate/L.Control.Locate.min.js',
	'src/plugins/leaflet-markers/leaflet.markercluster.js'
];
const {
	src,
	dest
} = require('gulp');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const chalk = require('chalk');

module.exports = function libs_js(done) {
	if (plugins.length > 0)
		return src(plugins)
			.pipe(map.init())
			.pipe(uglify())
			.pipe(concat('libs.min.js'))
			.pipe(map.write('../sourcemaps'))
			.pipe(dest('build/js/'))
	else {
		return done(console.log(chalk.redBright('No added JS plugins')));
	}
}