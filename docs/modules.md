[@datagouv/vitepress-plugin-matomo](README.md) / Exports

# @datagouv/vitepress-plugin-matomo

A library to add Matomo tracking to vitepress router.

**`Remarks`**

This injects Matomo default script to the page, while handling SSR.
It requires access to Vitepress router to hook into `onAfterRouteChanged` event.

## Table of contents

### Interfaces

- [IParameters](interfaces/IParameters.md)

### Functions

- [default](modules.md#default)

## Functions

### default

▸ **default**(`parameters`): `void`

Load Matomo in your vitepress project.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`IParameters`](interfaces/IParameters.md) |

#### Returns

`void`

**`Remarks`**

This is mostly a generalized version of the basic matomo
tracker code you'd insert in a JS page. However, since vuepress is SSR, it
requires some special workarounds to make sure paq object storage happens
correctly.

#### Defined in

[main.ts:87](https://github.com/datagouv/vitepress-plugin-matomo/blob/9fc9a9dcdcff2ef2c0be43e5f7d87c0edda23308/src/main.ts#L87)
