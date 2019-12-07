const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const postcssPresetEnv = require("postcss-preset-env");
const cssImport = require("postcss-import");
const customProperties = require("postcss-custom-properties");
const apply = require("postcss-apply");
const mixins = require("postcss-mixins");
const nested = require("postcss-nested");
const customMedia = require("postcss-custom-media");
const cssnano = require("cssnano");
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const inject = require("gulp-inject-string");
const find = require("gulp-find");
const replace = require("gulp-replace");
const insert = require("gulp-insert");
const prettier = require("gulp-prettier");
const del = require("del");
const fileinclude = require("gulp-file-include");

function docs() {
  return gulp
    .src("./src/html/**/index.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest("./docs/"))
    .pipe(
      notify({
        message: "Your docs are ready ♡"
      })
    );
}

function css() {
  return gulp
    .src("./src/css/**/*.css")
    .pipe(
      postcss([
        cssImport(),
        mixins(),
        customMedia(),
        nested(),
        postcssPresetEnv({
          autoprefixer: { grid: true }
        })
      ])
    )
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest("./dist/css/"))
    .pipe(
      notify({
        message: "Your nakDS CSS is ready ♡"
      })
    )
}

function cssMin() {
  return gulp
  .src("./dist/css/nakDS.css")
  .pipe(rename("nakDS.min.css"))
  .pipe(gulp.dest("./dist/css/"))
  .pipe(gulp.dest("./docs/css/"));
}

// function cssMin() {
//   return gulp
//     .src("./src/css/nakDS.css")
//     .pipe(
//       postcss([
//         cssImport(),
//         mixins(),
//         customMedia(),
//         nested(),
//         postcssPresetEnv({
//           autoprefixer: { grid: true }
//         })
//       ])
//     )

//     .pipe(postcss([cssnano()]))
//     .pipe(gulp.dest("./dist/css/"))
//     .pipe(rename("nakDS.min.css"))
//     .pipe(gulp.dest("./dist/css/"))
//     .pipe(gulp.dest("./docs/css/"))
//     .pipe(
//       notify({
//         message: "Your nakDS CSS is ready ♡"
//       })
//     );
// }

function fonts() {
  return gulp
    .src("./assets/fonts/*.*")
    .pipe(gulp.dest("./dist/assets/fonts/"))
    .pipe(gulp.dest("./docs/assets/fonts/"));
}

function svg() {
  return gulp
    .src("./assets/svg/*.*")
    .pipe(gulp.dest("./dist/assets/svg/"))
    .pipe(gulp.dest("./docs/assets/svg/"));
}

function img() {
  return gulp
    .src("./assets/img/*.*")
    .pipe(gulp.dest("./dist/assets/img/"))
    .pipe(gulp.dest("./docs/assets/img/"));
}

// function watch() {
//   gulp.watch("./src/**/*.css", css, docs);
// }

// function watch() {
//   gulp.watch("./docs/src/**/*.html", docs);
// }

function watch() {
  gulp.watch("./docs/src/**/**/*.html", docsTokens);
}

// function sassMixins() {
//   return gulp
//     .src("./dest/css/**.css")
//     .pipe(replace("❤.nk-", "@mixin nk-"))
//     .pipe(prettier())
//     .pipe(gulp.dest("./dist/scss/mixins/"))
//     .pipe(
//       rename(function(path) {
//         path.extname = ".scss";
//       })
//     )
//     .pipe(gulp.dest("./dist/scss/mixins/"))
//     .pipe(
//       notify({
//         message: "Your Sass mixin is ready ♡ "
//       })
//     );
// }

// function clean() {
//   return del(["./dist/scss/mixins/*.css"]);
// }

const build = gulp.series(
  docs,
  css,
  cssMin,
  fonts,
  img,
  // sassMixins,
  // clean,
  svg
);

exports.docs = docs;
exports.css = css;
exports.cssMin = cssMin;
exports.img = img;
exports.watch = watch;
exports.default = build;
