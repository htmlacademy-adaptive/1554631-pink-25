import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlMin  from 'gulp-htmlmin';
import rename from 'gulp-rename';
import csso from 'postcss-csso';
import terser from "gulp-terser-js";
import squoosh from "gulp-squoosh";
import svgo from "gulp-svgo"
import svgstore from "gulp-svgstore"
import del from "del"

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Html

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlMin({
      collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
}

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(terser())
    .pipe(gulp.dest("build/js"))
}

// ImagesOptimaze

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"))
}

// Copy Images

const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(gulp.dest("build/img"))
}

// WebP

const WebP = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest("build/img"))
}

// Svg

const svg = () => {
  return gulp.src(["source/img/**/*.svg", "!source/img/icons-sprite/*.svg", "!source/img/sprite.svg"])
    .pipe(svgo())
    .pipe(gulp.dest("build/img"))
}

const sprite = () => {
  return gulp.src("source/img/icons-sprite/*.svg")
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite2.svg"))
    .pipe(gulp.dest("build/img"))
}

// Copy

const copy = (done) => {
  gulp.src(["source/fonts/*.{woff2,woff}", "source/*.ico", "source/*.webmanifest", "source/img/sprite.svg"
], {
    base: "source"
})
  .pipe(gulp.dest("build"))
done()
}

// Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}

// Build

export const build = gulp.series(
  clean,
  copy,
    optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    WebP
  ),
);

// Defoult

export default gulp.series(
  clean,
  copy,
    copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    WebP
  ),
  gulp.series(
    server,
    watcher
  )
);
