# @type-io/core

Core package of [type-io](../../README.md). Used for:

- Define data model
- Decoding/encoding from plain Javascript object to class instance and back to plain object if necessary

## Installation

Node:

```
npm install @type-io/core
```

Yarn:

```
yarn add @type-io/core
```

## Built-In

### `PlainParser`

Used to parsing from/to plain object

Supported type:

| Instanced Type | Input type                      | Output Type | Specified Type |
|----------------|---------------------------------|-------------|----------------|
| String         | String, Number, Boolean, & Any* | String      |                |
| Number         | String, Number, Boolean         | Number      |                |
| Boolean        | Any**                           | Boolean     |                |
| Date           | Date, String, Number            | Date        |                |

**Note:

*: Any object will be converted via `String(x)`

**: Any input will be converted via boolean check