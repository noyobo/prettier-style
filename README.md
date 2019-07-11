# prettier-style

[![Greenkeeper badge](https://badges.greenkeeper.io/noyobo/prettier-style.svg)](https://greenkeeper.io/)

[![npm version](http://img.shields.io/npm/v/prettier-style.svg)](https://www.npmjs.org/package/prettier-style)
[![npm download](http://img.shields.io/npm/dm/prettier-style.svg)](https://www.npmjs.org/package/prettier-style)
[![npm engines](http://img.shields.io/node/v/prettier-style.svg)](https://www.npmjs.org/package/prettier-style)
[![build status](http://img.shields.io/travis/noyobo/prettier-style.svg)](https://travis-ci.org/noyobo/prettier-style)
[![Coverage Status](https://img.shields.io/coveralls/noyobo/prettier-style.svg)](https://coveralls.io/r/noyobo/prettier-style)
[![npm dependencise](https://david-dm.org/noyobo/prettier-style.svg)](https://david-dm.org/noyobo/prettier-style)

prettier-style is a fool-like formatted styles tool, Support for any style of text content.

## Features

- Automatic sorting css declaration. use css-declaration-sorter. _[css-declaration-sorter](https://www.npmjs.com/package/css-declaration-sorter)_
- Detection style specification. Use stylelint. _[stylelint](https://www.npmjs.com/package/stylelint)_
- Automatic repair style by stylelint rules.

## Quick Start

Once you have [configured stylelint](http://stylelint.io/user-guide/configuration/) (e.g. you have a .stylelintrc file), start with the following code. You will find additional configuration [options](https://www.npmjs.com/package/gulp-stylelint#options) below.

```bash
npm install prettier-style -D
prettier-style ./*.css  --output=./
```

## Options

- `output` Output file folder path after formatting.
- `skip-lint` Skip detection style specification.

## Example

#### Input

```css
body {
  width: 100rpx;
  margin-left: 48rpx;
  border-radius: 16rpx;
  height: 100rpx;
  background-color: #fff;
  position: relative;
  box-shadow: 0 0 48rpx rgba(47, 53, 66, 0.2);
  margin-right: 48rpx;
}
```

#### Output

```css
body {
  position: relative;
  width: 100rpx;
  height: 100rpx;
  margin-right: 48rpx;
  margin-left: 48rpx;
  border-radius: 16rpx;
  background-color: #fff;
  box-shadow: 0 0 48rpx rgba(47, 53, 66, 0.2);
}
```

## Recommended ways

### use [lint-staged](https://www.npmjs.com/package/lint-staged)

```json
{
  "lint-staged": {
    "*.js": ["prettier --write", "git add"],
    "*.css": ["prettier-style", "git add"]
  }
}
```
