let gulp        = require('gulp');
let source      = require('vinyl-source-stream');
let browserify  = require('browserify');
let babelify    = require("babelify");

gulp.task('make:game', function(){
  return browserify({
    entries: [
      'track.js'
    ]
  })
  .transform(babelify, {
    global: true,                                     
    ignore: [/\/node_modules\/(?!@vizuaalog\/)/],  
    presets: ["@babel/preset-env"]
  })
  .bundle()
  .pipe(source('track.js'))
  .pipe(gulp.dest('../public/javascripts/'));
});
