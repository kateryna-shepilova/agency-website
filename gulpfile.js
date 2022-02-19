const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fileInclude = require('gulp-file-include');
const groupMedia = require('gulp-group-css-media-queries');
const sourceMaps = require('gulp-sourcemaps');
const del = require('del');

function browsersync() {
	browserSync.init({
		server: { baseDir: './build/' },
		notify: false,
		online: true
	})
}

function scripts() {
	return src('./src/js/app.js')
		.pipe(dest('./build/js/'))
		.pipe(browserSync.stream())
}

function scriptsBuild() {
	return src('./src/js/app.js')
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(dest('./build/js/'))
}

function styles() {
	return src('./src/scss/**/*.scss')
		.pipe(sourceMaps.init())
		.pipe(sass())
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
		.pipe(sourceMaps.write())
		.pipe(dest('./build/css/'))
		.pipe(browserSync.stream())
}

function stylesBuild() {
	return src('./src/scss/**/*.scss')
		.pipe(sass())
		.pipe(groupMedia())
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
		.pipe(cleancss(({ level: { 1: { specialComments: 0 } } /*, format: 'beautify'*/ })))
		.pipe(dest('./build/css/'))
}

function imgToBuild() {
	return src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.jpeg', './src/img/**/*.svg'])
		.pipe(dest('./build/img/'))
}

function imageMin() {
	src('./src/img/**/*.svg')
		.pipe(dest('./build/img'))
	return src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.jpeg'])
		.pipe(imagemin())
		.pipe(dest('./build/img/'))
}

function htmlInclude() {
	return src(['./src/**/*.html'])
		.pipe(fileInclude())
		.pipe(dest('./build/'))
		.pipe(browserSync.stream());
}

function fonts() {
	src('./src/fonts/**/*')
		.pipe(ttf2woff())
		.pipe(dest('./build/fonts/'));

	return src('src/fonts/**/*')
		.pipe(ttf2woff2())
		.pipe(dest('build/fonts/'))
}

function clean() {
	return del('./build/**/*', { force: true })
}

function startwatch() {
	browsersync();
	watch('./src/scss/**/*.scss', styles);
	watch('./src/img/**/*.jpg', imgToBuild);
	watch('./src/img/**/*.png', imgToBuild);
	watch('./src/img/**/*.jpeg', imgToBuild);
	watch('./src/img/**/*.svg', imgToBuild);
	watch('./src/fonts/**/*.ttf', fonts);
	watch('./src/js/**/*.js', scripts);
	watch('./src/**/*.html', htmlInclude);
}

exports.browsersync = browsersync;
exports.startwatch = startwatch;
exports.scripts = scripts;
exports.styles = styles;
exports.stylesBuild = stylesBuild;
exports.fonts = fonts;
exports.imgToBuild = imgToBuild;
exports.imageMin = imageMin;
exports.htmlInclude = htmlInclude;

exports.default = series(clean, parallel(htmlInclude, styles, scripts, fonts, imgToBuild), startwatch, browsersync);
exports.build = series(clean, parallel(htmlInclude, stylesBuild, scriptsBuild, fonts), imageMin);

