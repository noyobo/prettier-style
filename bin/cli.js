#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));

const prettier = require('../lib/prettier');
const { _: files, ...options } = argv;

prettier(files, options);
