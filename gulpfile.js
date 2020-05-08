const gulp = require('gulp');
const rigger = require('gulp-rigger');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
const smartgrid = require('smart-grid');

const jsFiles = [
    'src/js/script.js',
    'src/js/slider.js',
    'src/js/cart.js',
    'src/js/script-m.js',
];

function html() {
    return gulp.src(['src/index.html', 'src/product-page.html'])
                .pipe(rigger())
                .pipe(gulp.dest('build'))
                .pipe(browserSync.stream());
}

function styles() {
    return gulp.src('src/styles/main.scss')
                .pipe(sass({
                    includePaths: require('node-normalize-scss').includePaths
                }))
                .pipe(concat('styles.css'))
                .pipe(gcmq())
                .pipe(autoprefixer({
                    overrideBrowserslist: ['> 0.1%'],
                    cascade: false
                }))
                .pipe(cleanCSS({
                    level: 2
                }))
                .pipe(gulp.dest('build/css'))
                .pipe(browserSync.stream());
}

function editorStyles() {
    return gulp.src('src/styles/editor.scss')
                .pipe(sass({
                    includePaths: require('node-normalize-scss').includePaths
                }))
                .pipe(concat('editor.css'))
                .pipe(gcmq())
                .pipe(autoprefixer({
                    overrideBrowserslist: ['> 0.1%'],
                    cascade: false
                }))
                .pipe(cleanCSS({
                    level: 2
                }))
                .pipe(gulp.dest('build/css'))
                .pipe(browserSync.stream());
}

function script() {
    return gulp.src(jsFiles)
                // .pipe(concat('script.js'))
                .pipe(babel({
                    presets: ['@babel/env']
                }))
                // .pipe(uglify({
                //     toplevel: true
                // }))
                .pipe(gulp.dest('build/js'))
                .pipe(browserSync.stream());
}

function images() {
    return gulp.src('src/images/*')
                .pipe(imagemin())
                .pipe(gulp.dest('build/images'))
}

function fonts() {
    return gulp.src('src/fonts/**/*')
                .pipe(gulp.dest('build/fonts'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch('src/styles/**/*.scss', styles);
    gulp.watch('src/styles/editor.scss', editorStyles);
    gulp.watch('src/js/**/*.js', script);
    gulp.watch('src/**/*.html', html);
}

function clean() {
    return del(['build/*']);
}

function grid(done) {
    smartgrid('./src/styles', {
        outputStyle: 'scss', /* less || scss || sass || styl */
        columns: 12, /* number of grid columns */
        offset: '30px', /* gutter width px || % || rem */
        mobileFirst: true, /* mobileFirst ? 'min-width' : 'max-width' */
        container: {
            minWidth: '320px', /* max-width оn very large screen */
            fields: '80px' /* side fields */
        },
        breakPoints: {
            sm: {
                width: '768px',
                fields: '24px',
                offset: '24px'
            },
            md: {
                width: '1024px',
                fields: '24px',
                offset: '24px'
            },
            lg: {
                width: '1440px',
                fields: '48px',
                offset: '48px'
            },
            xlg: {
                width: '1920px',
                fields: '96px',
                offset: '96px'
            },
            /* 
            We can create any quantity of break points.
    
            some_name: {
                width: 'Npx',
                fields: 'N(px|%|rem)',
                offset: 'N(px|%|rem)'
            }
            */
        }
    });
    done();
}

gulp.task('html', html);
gulp.task('styles', styles);
gulp.task('editorStyles', editorStyles);
gulp.task('script', script);
gulp.task('images', images);
gulp.task('fonts', fonts);
gulp.task('watch', watch);
gulp.task('grid', grid);

gulp.task('build', gulp.series(clean,
                        gulp.parallel(html, styles, editorStyles, script, images, fonts)
                    ));

gulp.task('dev', gulp.series('build', 'watch'));
