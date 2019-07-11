#!/usr/bin/env node

const parseArgs = require('minimist');

const argv = parseArgs(process.argv.slice(2), {
  boolean: ['skip-lint'],
  default: {
    output: './',
  },
  alias: {
    s: 'skip-lint',
    o: 'output',
    v: 'version',
    h: 'help',
  },
});

const prettier = require('../lib/prettier');
const { _: files, ...options } = argv;

if (argv.help) {
  help();
}
if (argv.version) {
  console.log(require('../package.json').version);
  process.exit(0);
}
prettier(files, options);

function help() {
  console.log(`
Usage: prettier-style [options] <files>

Options:
  -v, --version          Output the version number
  -o, --output           Formated files dest folder path
  -k, --skip-lint        Skip stylelint
  -h, --help             Output usage information

Example:
  prettier-style -s ./src/**/*.css
`);
  process.exit(0);
}
