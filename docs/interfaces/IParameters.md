[@conciergerie.dev/vitepress-plugin-matomo](../README.md) / [Exports](../modules.md) / IParameters

# Interface: IParameters

Interface for plugin parameters

## Table of contents

### Properties

- [enableLinkTracking](IParameters.md#enablelinktracking)
- [rememberConsent](IParameters.md#rememberconsent)
- [requireConsent](IParameters.md#requireconsent)
- [router](IParameters.md#router)
- [siteID](IParameters.md#siteid)
- [trackerJsFile](IParameters.md#trackerjsfile)
- [trackerPhpFile](IParameters.md#trackerphpfile)
- [trackerUrl](IParameters.md#trackerurl)

## Properties

### enableLinkTracking

• `Optional` **enableLinkTracking**: `boolean`

Enable/disable link click tracking, defaults to true

**`Default Value`**

true

#### Defined in

main.ts:28

___

### rememberConsent

• `Optional` **rememberConsent**: `boolean`

Remember consent

**`Remarks`**

not working right now

**`Default Value`**

false

#### Defined in

main.ts:37

___

### requireConsent

• `Optional` **requireConsent**: `boolean`

Requires user consent before sending events

**`Remarks`**

not working right now

**`Default Value`**

false

#### Defined in

main.ts:46

___

### router

• **router**: `Router`

Vitepress router component

#### Defined in

main.ts:51

___

### siteID

• **siteID**: `number`

Matomo numeric site ID of the site you want to track

#### Defined in

main.ts:56

___

### trackerJsFile

• `Optional` **trackerJsFile**: `string`

Name of the js file to call on the matomo server

**`Default Value`**

"piwik.js"

#### Defined in

main.ts:62

___

### trackerPhpFile

• `Optional` **trackerPhpFile**: `string`

Name of the php file to call on the matomo server

**`Default Value`**

"piwik.php"

#### Defined in

main.ts:68

___

### trackerUrl

• **trackerUrl**: `string`

URL where the piwik.php/piwik.js files can be found

#### Defined in

main.ts:73
