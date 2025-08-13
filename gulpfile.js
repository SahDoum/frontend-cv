var path = require('path');

const webpack = require('webpack-stream');
const { VueLoaderPlugin } = require('vue-loader');

const gulp = require('gulp');
//const sass = require('gulp-sass');
const del = require('del');

const sass = require('gulp-sass')(require('sass'));

gulp.task('styles', () => {
    return gulp.src('sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', () => {
    return del([
        'dist/main.css',
        'dist/bundle.js',
    ]);
});


gulp.task('build-js', function() {
  return gulp.src('js/index.js')
    .pipe(webpack({
      mode: 'production', // or 'development' if needed
      entry: './js/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader',
            ]
          }
        ],
      },
      plugins: [
        new VueLoaderPlugin(),
      ],
      resolve: {
        alias: {
          vue: "vue/dist/vue.esm-browser.js",
        },
      },
    }))
    .pipe(gulp.dest('dist'));
});



gulp.task('default', gulp.series(['clean', 'styles', 'build-js']));
gulp.task('watch', () => {
    gulp.watch(['sass/*.scss', 'js/**.js'], (done) => {
        gulp.series(['default'])(done);
    });
});
