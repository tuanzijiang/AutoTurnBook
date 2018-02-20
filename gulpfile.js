var gulp=require('gulp');
var concat=require("gulp-concat");
var cleanCSS=require("gulp-clean-css");
var uglify=require("gulp-uglify");
var rename=require("gulp-rename");


gulp.task('buildCSS',function () {
    gulp.src(['./css/font.css','./css/iconFont.css','./css/autoTurnBook.css'])
        .pipe(concat('autoTurnBook.css'))
        .pipe(cleanCSS())
        .pipe(rename('autoTurnBook.min.css'))
        .pipe(gulp.dest('./build/css/'))
});

gulp.task('buildJS',function () {
   gulp.src(['./js/playBox.js','./js/autoTurnBook.js'])
       .pipe(concat('autoTurnBook.js'))
       .pipe(uglify())
       .pipe(rename("autoTurnBook.min.js"))
       .pipe(gulp.dest("./build/js"))
});

gulp.task('buildFont',function () {
   gulp.src("./font/*.ttf")
       .pipe(gulp.dest("./build/font"))
});

gulp.task('buildMp3',function () {
    gulp.src('./src/*.mp3')
        .pipe(gulp.dest("./build/src/"))
});

gulp.task('buildHtml',function () {
   gulp.src('*.html')
       .pipe(gulp.dest("./build/"))
});

gulp.task("default",['buildCSS','buildJS','buildFont','buildMp3','buildHtml']);

