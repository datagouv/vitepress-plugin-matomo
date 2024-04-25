@datagouv/vitepress-plugin-matomo / [Exports](modules.md)

# Matomo Vitepress Plugin

Allows Matomo access tracking on Vitepress. It requires access to Vitepress `router` and was developed on Vitepress `1.0.0-alpha.65`.

This project takes many ideas from [vuepress-plugin-matomo](https://github.com/qdot/vuepress-plugin-matomo) and [vitepress-plugin-google-analytics](https://github.com/ZhongxuYang/vitepress-plugin-google-analytics), but for Vitepress and Matomo.

## Installation

```sh
npm install --save vitepress-plugin-matomo
# or
npm install --save-dev vitepress-plugin-matomo
```

## Usage

```js
// .vitepress/theme/index.ts

import DefaultTheme from "vitepress/theme";
import matomo from "vitepress-plugin-matomo";

export default {
  ...DefaultTheme,
  enhanceApp: (ctx) => {
    matomo({
      router: ctx.router,
      siteID: 123, // Replace with your site id
      trackerUrl: "http***" // Replace with your matomo url
    })
  }
};
```

## Docs

See the [documentation](./docs/modules.md) for details about the parameters.
