/**
 * Created by Administrator on 2017/4/6 0006.
 */

//**************1.browser-sync*********************
//1.通过 require 引入 gulp
var gulp = require("gulp");
//2.通过require引入 browsersync
var browserSync = require('browser-sync').create();
// Static server
gulp.task('browser-sync', function () {
	var files = [
		'**/*.html',
		'**/**/*.css',
		'**/**/*.js'
	];
	browserSync.init({
		files: files,
		port: 3000,
		server: {
			baseDir: ['./public','./']
		}
	})
});
//**************2.gulp-htmlmin*********************
var htmlmin = require("gulp-htmlmin");
gulp.task("html", function () {
	var options = {
		// removeComments: true,//清除HTML注释
		collapseWhitespace: true,//压缩HTML
		// collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
		// removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
		// removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
		// removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
		// minifyJS: true,//压缩页面JS
		// minifyCSS: true//压缩页面CSS
	};
	
	gulp.src(['public/**/*.html', 'public/**/*.htm'])
		.pipe(htmlmin(options))
		.pipe(gulp.dest("dist"))
});

//*****************3.gulp-imagemin******************
var imagemin = require("gulp-imagemin");
gulp.task("imagemin", function () {
	gulp.src('public/**/*.{jpg,png,gif,ico}')
		.pipe(imagemin())
		.pipe(gulp.dest('dist'))
	
});
//******************4.gulp-minify-css*****************
cssmin = require('gulp-minify-css');
//确保已本地安装gulp-make-css-url-version [cnpm install gulp-make-css-url-version --save-dev]
cssver = require('gulp-make-css-url-version');

gulp.task('Cssmin', function () {
	gulp.src('public/css/*.css')
		.pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'));
});
//****************5.gulp-uglify*******************
uglify = require('gulp-uglify');

gulp.task('jsmin', function () {
	//压缩src/js目录下的所有js文件
	//除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
	gulp.src(['public/js/*.js', '!public/js/**/{test1,test2}.js'])
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});


//***************6.gulp-less********************
less = require('gulp-less'),
	livereload = require('gulp-livereload');

gulp.task('less', function () {
	gulp.src('public/less/*.less')
		.pipe(less())//编译less
		.pipe(gulp.dest('public/css'))// 生成目录
		.pipe(livereload());// 编译重新加载
});

//特别注意：若编译less的时候，同时执行其他操作，有可能引起页面刷新，而不是将样式植入页面
//例如下面任务同时生成sourcemap：
//var sourcemaps = require('gulp-sourcemaps');
//gulp.task('less', function () {
//    gulp.public(['public/less/*.less'])
//        .pipe(sourcemaps.init())
//        .pipe(less())
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('public/css'))
//        .pipe(livereload());
//});

gulp.task('watch', function () {
	livereload.listen();//监听，重新加载
	gulp.watch('public/less/**/*.less', ['less', 'browser-sync']);
});

//***************7.gulp-connect********************
var connect = require('gulp-connect'); //包含服务器插件1
gulp.task('server', function () {
	connect.server({
		root: 'dist',//服务器的根目录
		livereload: true //启用实时刷新的功能
	});
});


gulp.task('default', ['browser-sync', 'html', 'imagemin', 'Cssmin', 'less', 'jsmin','server']); //定义默认任务