# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.9.0](https://github.com/qxb3/mirage-helper/compare/v2.8.0...v2.9.0) (2022-06-09)


### Features

* change the circle char to ⦿ ([5b7f8ec](https://github.com/qxb3/mirage-helper/commit/5b7f8eca00b534f04fe01128d1b06b3883c99481))

## [2.8.0](https://github.com/qxb3/mirage-helper/compare/v2.7.3...v2.8.0) (2022-06-07)


### Features

* **about command:** added author ([c7a0826](https://github.com/qxb3/mirage-helper/commit/c7a08268527cdba3bf2a35dcc43d6a9187b23f2a))
* **autogz command:** see the config you set when you run ?autogz ([816d3a8](https://github.com/qxb3/mirage-helper/commit/816d3a8c71c0c9f882a90ff87fec45fc7bc5382c))
* moved commands: prefix, enable, disable to configuration category ([02b1b25](https://github.com/qxb3/mirage-helper/commit/02b1b2529ef99a2da6d837cb05d0039d7eda812a))

### [2.7.3](https://github.com/qxb3/mirage-helper/compare/v2.7.2...v2.7.3) (2022-06-02)


### Bug Fixes

* **skill command:** fixed the command not calculating ([441695f](https://github.com/qxb3/mirage-helper/commit/441695f77d0194f69450b9b54d53a57dd2cecf6f))

### [2.7.2](https://github.com/qxb3/mirage-helper/compare/v2.7.1...v2.7.2) (2022-06-02)


### Bug Fixes

* **autogz command:** update guild id and name when setting up ([bce413a](https://github.com/qxb3/mirage-helper/commit/bce413a178f11adc44467203cba4b35bd92228e1))
* **release command:** supports other server ([25764ce](https://github.com/qxb3/mirage-helper/commit/25764ce39e851a8afc1bee6f17a62cec2d5adb8c))
* **skill command:** fix not erroring when user args is not valid ([f437498](https://github.com/qxb3/mirage-helper/commit/f437498632f9cdfbc9e68f83e8797f74607dc4cd))

### [2.7.1](https://github.com/qxb3/mirage-helper/compare/v2.7.0...v2.7.1) (2022-06-01)


### Features

* **release command:** remove the optional custom message position and just go for middle at default ([b6bee1c](https://github.com/qxb3/mirage-helper/commit/b6bee1cc80d685189ddc84c85fbb8693291a89f7))
* **utils:** added multiLine ([8a1d580](https://github.com/qxb3/mirage-helper/commit/8a1d5805af093c728f9c31917bff63a6e03c74a5))


### Bug Fixes

* added GuildOnly preconditions to disable and enable commands ([e855b77](https://github.com/qxb3/mirage-helper/commit/e855b77a7a72cfaf019944a2d9d114a435028334))
* fix release command erroring when i send a update without setting it up ([74a2326](https://github.com/qxb3/mirage-helper/commit/74a2326413bb70a342b92ce51e54d9cae7a03986))

## [2.7.0](https://github.com/qxb3/mirage-helper/compare/v2.6.0...v2.7.0) (2022-05-30)


### Features

* added empo stats on equipments and weapons ([f772ec0](https://github.com/qxb3/mirage-helper/commit/f772ec00b282954d8d2fafbc626640b361ae859c))
* added math utils ([d9d3bc0](https://github.com/qxb3/mirage-helper/commit/d9d3bc080ddce0e28acc9ce16955e0f6920ed2cd))
* added user tag on embed ([6d41b7d](https://github.com/qxb3/mirage-helper/commit/6d41b7da42b51d426c4acc0f13314e11e8167521))
* change icons of equipments and enchantments command ([cffe456](https://github.com/qxb3/mirage-helper/commit/cffe45676bbc9fb84e0794bdd6df248df4e6f782))


### Bug Fixes

* **enable/disable commands:** update guildId and guildName when saving to db ([0a4e3a3](https://github.com/qxb3/mirage-helper/commit/0a4e3a3ed2ed1c0ee397c461c71aa5a29070c605))

## [2.6.0](https://github.com/qxb3/mirage-helper/compare/v2.5.0...v2.6.0) (2022-05-29)


### Features

* **constants:** addef success color ([1776cea](https://github.com/qxb3/mirage-helper/commit/1776cea0b2af1f94354172e8897e0959fe15c803))
* disable mention as a prefix ([e704c81](https://github.com/qxb3/mirage-helper/commit/e704c81d69884ee74d423ffe8dcf2fcf5e50cc96))
* disabling autogz if disable ([1d806e5](https://github.com/qxb3/mirage-helper/commit/1d806e583ca0db755068078cf1880b5335fcd29f))
* **GuildSettings:** added toggleable system with cache in place ([554808c](https://github.com/qxb3/mirage-helper/commit/554808cb68a911da5336c424ba056ecc36a64602))
* **help:** added commands alias and reorganize functions ([e5337f6](https://github.com/qxb3/mirage-helper/commit/e5337f60497f88f2eb7f43aac31cf50bed20d32b))
* **stats:** using discord timestamp for uptime ([e30691c](https://github.com/qxb3/mirage-helper/commit/e30691c4d45f8bc459b03484ff105ad94da088d8))
* **ToggleableSystem:** added enable and disable command ([b7973c2](https://github.com/qxb3/mirage-helper/commit/b7973c292f9e9b44cb5b11084113ff09eb3c8742))
* **utils:** added discord timestamp ([421736f](https://github.com/qxb3/mirage-helper/commit/421736f67d129a0d82803091b7bfcb0843a2c7d1))


### Bug Fixes

* **commands:** added required user permissions to enable and disable command ([24513b8](https://github.com/qxb3/mirage-helper/commit/24513b80b43f499ae52675c518bb648f5ecf3c4d))
* **help:** fix autocomplete ([67dcc44](https://github.com/qxb3/mirage-helper/commit/67dcc4450499b7ef875156f241e1a1808f8beee5))
* **preconditions:** removed OwnerOnly ([4fe0973](https://github.com/qxb3/mirage-helper/commit/4fe09731f940cb464ba46fe2b901b4d34c01d224))
* **WikiCommand:** fix noMatch() join function ([30dfb58](https://github.com/qxb3/mirage-helper/commit/30dfb58991d4cb65471fa28c2d805982829bb7ce))

## [2.5.0](https://github.com/qxb3/mirage-helper/compare/v2.4.0...v2.5.0) (2022-05-26)


### Features

* added stats command ([8b10ba3](https://github.com/qxb3/mirage-helper/commit/8b10ba3e63ec8c70852daf4cd069091114d71e59))
* finished up servertime command ([76f33b0](https://github.com/qxb3/mirage-helper/commit/76f33b0eebfb7ff2ad974831a67a4e5f8ea41554))
* **utils:** added countLines func ([4ea9b06](https://github.com/qxb3/mirage-helper/commit/4ea9b06b879b03ee33bf893ae0ead39965fda3b8))

## [2.4.0](https://github.com/qxb3/mirage-helper/compare/v2.3.4...v2.4.0) (2022-05-25)


### Features

* **commands:** added github command ([c18f5cb](https://github.com/qxb3/mirage-helper/commit/c18f5cb19ed0eeefb1f854c607e229f2ebb10b1c))

### [2.3.4](https://github.com/qxb3/mirage-helper/compare/v2.3.3...v2.3.4) (2022-05-25)


### Bug Fixes

* fix autogz crashing ([865a048](https://github.com/qxb3/mirage-helper/commit/865a048bcbc7abff31a5a83d190b2fa6466e3d75))

### [2.3.3](https://github.com/qxb3/mirage-helper/compare/v2.3.2...v2.3.3) (2022-05-23)


### Bug Fixes

* **autogz:** wait half a second before reacting and replying ([1dba6de](https://github.com/qxb3/mirage-helper/commit/1dba6de2e51876d7597ae8d8858c0a4674654c6d))
* **commands/autogz:** Fix not detecting other messages and added more examples ([b145aa7](https://github.com/qxb3/mirage-helper/commit/b145aa707c193c12d4c4cbae483e096a49638eb1))

### [2.3.2](https://github.com/qxb3/mirage-helper/compare/v2.3.1...v2.3.2) (2022-05-23)


### Bug Fixes

* **autogz:** make it work for jpegs ([12ff073](https://github.com/qxb3/mirage-helper/commit/12ff073f4aca976cf440f00f19de87d73fb38556))

### [2.3.1](https://github.com/qxb3/mirage-helper/compare/v2.3.0...v2.3.1) (2022-05-23)


### Bug Fixes

* **autogz:** add user permission ([f7fbe49](https://github.com/qxb3/mirage-helper/commit/f7fbe497c7750e3e4a147a70e8bca573eee83ae6))
* **listeners:** fix command denied handling ([3e0e76d](https://github.com/qxb3/mirage-helper/commit/3e0e76d7d35a3859a9962b83377c09d86c825253))
* **prefix:** degrade user permission to MANAGE_CHANNELS ([81c5d40](https://github.com/qxb3/mirage-helper/commit/81c5d40d287a4008579a0ce0361df3b1bbb85bc2))

## [2.3.0](https://github.com/qxb3/mirage-helper/compare/v2.2.0...v2.3.0) (2022-05-23)


### Features

* added autogz system ([498d059](https://github.com/qxb3/mirage-helper/commit/498d0592ade17f76dcd9717308d22a423845a0c3))
* **ping:** Removing embed and making response normal msg ([40051dd](https://github.com/qxb3/mirage-helper/commit/40051dd15f05790ac5a57308124b45d945083b8f))
* **release:** added setup subcommand ([b646693](https://github.com/qxb3/mirage-helper/commit/b646693d96642981ad4aebc6d3f68c9c1d9b1ad7))

## [2.2.0](https://github.com/qxb3/mirage-helper/compare/v2.1.0...v2.2.0) (2022-05-22)


### Features

* added release command to notify users for the release ([442683d](https://github.com/qxb3/mirage-helper/commit/442683d0de50814537cf3929660dc4ca1b843be0))
* **Calcs:** added thumbnails ([a44dabe](https://github.com/qxb3/mirage-helper/commit/a44dabe764c8b7eaa908f800f97bc9b08ad536fc))
* **MirageCommand:** added maxArgs property ([08342ef](https://github.com/qxb3/mirage-helper/commit/08342ef9841132f508519b72702da18705d3014f))

## [2.1.0](https://github.com/qxb3/mirage-helper/compare/v2.0.0...v2.1.0) (2022-05-22)


### Features

* **.versionrc:** added package.json ([fd43fe9](https://github.com/qxb3/mirage-helper/commit/fd43fe9566dfefebd3c2f1515a4c0179357211ea))
* added .versionrc.json, updater.js ([92e1f19](https://github.com/qxb3/mirage-helper/commit/92e1f19b744508e741c1f6d6abc52d0cf8d32911))
* added OwnerOnly precondition ([27d9943](https://github.com/qxb3/mirage-helper/commit/27d994379c3f99bd25804c19e3c4f2caf20f805b))
* added standard-version scripts ([c6759c2](https://github.com/qxb3/mirage-helper/commit/c6759c26e4113ce482efbd27fd10fb3ae3fe0be7))


### Bug Fixes

* added standard-version ([7f437c4](https://github.com/qxb3/mirage-helper/commit/7f437c4513a709ff4d9c400a9c18c6e013614750))
* **DevOnly:** fix class name ([0109429](https://github.com/qxb3/mirage-helper/commit/01094293222a8ce3406bf028dc536623fb2fd1e3))
* **package.json:** fix standard-version scripts ([52e35e0](https://github.com/qxb3/mirage-helper/commit/52e35e0eed6bf5a79c73329f1f68d980d6ea0eed))
* **prefix:** added preconditions ([27c56b4](https://github.com/qxb3/mirage-helper/commit/27c56b40c0eb713eca2f91576bf8f2b2f7eb5f33))
* update versions ([f62cb6d](https://github.com/qxb3/mirage-helper/commit/f62cb6d2c74d7b6d454453e8fcfdb265db50ba99))
