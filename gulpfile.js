'use strict';

let del = require('del');
let gulp = require('gulp');
let rollup = require('gulp-rollup');
let babel = require('gulp-babel');

const src = './src';
const dist = './dist';
const es6Path = [
	src + '/Parser.js',
	src + '/Tokenizer.js'
];
const distJsPath = dist;

gulp.task('default', [
	'clean',
	'es6',
	'es6:watch'
]);

// Delete the dist directory
gulp.task('clean', function(){
	return del([dist + '/*']);
});

gulp.task('es6', function(){
	gulp.src(src + '/Parser.js')
		.pipe(rollup({
			format: 'cjs'
		}))
		.pipe(babel())
		.pipe(gulp.dest(distJsPath + '/cjs'));

	gulp.src(es6Path)
		.pipe(rollup({
			format: 'iife',
			moduleName: 'JsonParser'
		 }))
		.pipe(babel())
		.pipe(gulp.dest(distJsPath))
});

gulp.task('es6:watch', function () {
	gulp.watch(src + '/**/*.js', ['es6']);
});
