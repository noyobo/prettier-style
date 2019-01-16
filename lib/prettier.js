const chalk = require('chalk');
const cssDeclarationSorter = require('css-declaration-sorter');
const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const gulpStylelint = require('gulp-stylelint');
const log = require('fancy-log');
const path = require('path');
const through2 = require('through2');

const dist = path.resolve('./');

function prettier(files, options) {
  options = Object.assign(
    {
      output: './',
    },
    options,
  );
  return gulp
    .src(files)
    .pipe(
      through2.obj(function(file, encoding, next) {
        file.base = dist;
        this.push(file);
        log.info(chalk.blue('prettier-css:'), chalk.green(path.relative(dist, file.path)));
        next();
      }),
    )
    .pipe(gulpPostcss([cssDeclarationSorter({ order: 'smacss' })]))
    .pipe(
      gulpStylelint({
        fix: true,
        reporters: [{ formatter: 'string', console: true }],
      }),
    )
    .pipe(gulp.dest(options.output));
}

module.exports = prettier;
