import { src, dest, watch } from "gulp";
import gulpSass from "gulp-sass";
import * as sass from "sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import browserSync from "browser-sync";
import prettier from "gulp-prettier";

const sassCompiler = gulpSass(sass);
const bs = browserSync.create();

function styles() {
  return src("styles/*.scss")
    .pipe(sassCompiler())
    .pipe(autoprefixer())
    .pipe(prettier({ singleQuote: true }))
    .pipe(cleanCSS())
    .pipe(dest("styles/"))
    .pipe(bs.stream());
}

function serve() {
  bs.init({
    server: "./",
  });
  watch("styles/*.scss", styles);
  watch("*.html").on("change", bs.reload);
}

export { styles, serve as default };
