const plugins = ['node_modules/tiny-slider/dist/tiny-slider.css',
	'node_modules/wow.js/css/libs/animate.css',
	'node_modules/baguettebox.js/dist/baguetteBox.css',
	'src/plugins/leaflet/leaflet.css',
	'src/plugins/leaflet-fullscreen/Control.FullScreen.css',
	'src/plugins/leaflet-locate/L.Control.Locate.css',
	'src/plugins/leaflet-markers/MarkerCluster.Default.css',
	'src/plugins/leaflet-markers/MarkerCluster.css'
];

const {
	src,
	dest
} = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const chalk = require('chalk');
const bs = require('browser-sync');

module.exports = function libs_style(done) {
	if (plugins.length > 0) {
		return src(plugins)
			.pipe(map.init())
			.pipe(sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError))
			.pipe(concat('libs.min.css'))
			.pipe(map.write('../sourcemaps/'))
			.pipe(dest('build/css/'))
			.pipe(bs.stream())
	} else {
		return done(console.log(chalk.redBright('No added CSS/SCSS plugins')));
	}
}