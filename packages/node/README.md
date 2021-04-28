# @type-io/node

Add Node.js class support to [type-io](/README.md)

## Installation

Node:

```
npm install @type-io/node
```

Yarn:

```
yarn add @type-io/node
```

## Built-In

### `NodeParser`

Extends `PlainParser` functionality to also support Node.js class such as `Buffer`

Supported type:

| Instanced Type | Input type                                   | Output Type | Specified Type |
|----------------|----------------------------------------------|-------------|----------------|
| Buffer         | Buffer, String, Binary, UInt8Array, Number[] | Buffer      |                |