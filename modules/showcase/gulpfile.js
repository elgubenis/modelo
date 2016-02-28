"use strict";

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const hbsfy = require('hbsfy').configure({
  compiler: 'Handlebars'
});
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const del = require('del');
const sass = require('gulp-sass');

// Bundle files with browserify
gulp.task('browserify', () => {
  let bundler = browserify({
    entries: './src/index.js',
    debug: true,
    transform: [babelify, hbsfy],
    paths: ['./src'],
    extensions: ['hbs', 'js'],
  });

  bundler = watchify(bundler);

  const rebundle = () => {
    return bundler.bundle()
      .on('error', $.util.log)
      .on('end', reload)
      .pipe(source('./src/index.js'))
      .pipe(buffer())
        .on('error', $.util.log)
      .pipe(gulp.dest('./server'));
  };

  bundler.on('update', rebundle);
  rebundle();
});

// Compile sass into css
gulp.task('sass', () => {
  gulp.src('./src/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./server/src'));
})

// Clean output directory and cache
gulp.task('clean', (cb) => {
  del(['server/src', 'dist']).then(() => {
    $.cache.clearAll(cb);
  });
});

// Run development server environment
gulp.task('serve', ['browserify', 'sass'], () => {
  const instance = browserSync({
    notify: false,
    port: 9000,
    ui: {
      port: 9001,
    },
    server: {
      baseDir: ['server', 'node_modules', 'test'],
    },
  });

  gulp.watch(['test/**/*.js', 'server/src/**/*.css','server/index.html']).on('change', reload);
});

gulp.watch(['src/**/*.scss',], ['sass']);

// Build distribution
gulp.task('build', function() {
  console.log('start building dist/');

  // CSS
  gulp.src('./src/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe($.rename('style.min.css'))
    .pipe(gulp.dest('dist'));

  // JS
  gulp.src('server/src/index.js')
    .pipe($.rename('index.min.js'))
    .pipe(gulp.dest('dist'));
});

// Start developing the module
gulp.task('default', ['clean'], () => {
  gulp.start('serve');
});
