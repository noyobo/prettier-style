# prettier-style

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
    "*.css": ["prettier-style --output ./", "git add"]
  }
}
```

### 微信小程序配置

`package.json`

```json
{
  // ...
  "lint-staged": {
    "*.js": ["prettier --write", "git add"],
    "*.wxss": ["prettier-style --output ./", "git add"]
  }
}
```

`.stylelintrc`

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "no-descending-specificity": null,
    "selector-type-no-unknown": [
      true,
      {
        "ignoreTypes": [
          "page",
          "view",
          "scroll-view",
          "swiper",
          "swiper",
          "swiper-item",
          "movable-area",
          "cover-view",
          "cover-image",
          "icon",
          "text",
          "rich-text",
          "progress",
          "button",
          "checkbox",
          "form",
          "input",
          "label",
          "picker",
          "picker-view",
          "radio",
          "slider",
          "switch",
          "textarea",
          "navigator",
          "functional-page-navigator",
          "audio",
          "image",
          "video",
          "camera",
          "live-player",
          "live-pusher",
          "map",
          "canvas",
          "open-data",
          "web-view",
          "ad",
          "official-account"
        ]
      }
    ],
    "unit-no-unknown": [
      true,
      {
        "ignoreUnits": ["rpx"]
      }
    ]
  }
}
```
