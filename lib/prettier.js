const chalk = require('chalk');
const cssDeclarationSorter = require('css-declaration-sorter');
const fs = require('fs');
const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const gulpStylelint = require('gulp-stylelint');
const path = require('path');
const through2 = require('through2');

const cwd = process.cwd();

function prettier(files, options) {
  options = Object.assign({ output: './', 'skip-lint': false }, options);

  const skipLint = options['skip-lint'];
  /* eslint-disable no-console */
  if (!fs.existsSync(path.join(cwd, '.stylelintrc')) && !skipLint) {
    console.log('');
    console.error(chalk.red('Please add a stylelint configuration file (.stylelintrc) in the root directory'));
    console.info(
      'You will find additional configuration at',
      chalk.blue.underline('https://stylelint.io/user-guide/rules/'),
    );
    console.log('');

    throw new Error('Missing stylelint configured!');
  }

  if (skipLint) {
    console.warn('[prettier-style]:', chalk.yellow('Skip detection style specification!'));
  }

  let stream = gulp.src(files);

  stream = stream
    .pipe(
      through2.obj(function(file, encoding, next) {
        file.base = cwd;
        this.push(file);
        console.info('[prettier-style]:', chalk.green(path.relative(cwd, file.path)));
        next();
      }),
    )
    .pipe(gulpPostcss([cssDeclarationSorter({ order: 'smacss' })]));

  if (!skipLint) {
    stream = stream.pipe(
      gulpStylelint({
        fix: true,
        reporters: [{ formatter: 'string', console: true }],
      }),
    );
  }

  stream.pipe(gulp.dest(options.output));
}

module.exports = prettier;
