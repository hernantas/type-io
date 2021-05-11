# type-io

Typescript decorator-based encoding/decoding transformation for I/O

**`type-io` is still in beta. Expect bugs!**

## Documentation

- [The Idea](docs/pages/01-the-idea.md)
- [Getting Started](docs/pages/02-getting-started.md)
  - [Installation](docs/pages/02-getting-started.md#installation)
  - [Basic Usage](docs/pages/02-getting-started.md#basic-usage)
- [Data Model](docs/pages/03-data-model.md)
- [Parsing](docs/pages/04-parsing.md)
- [Codec](docs/pages/05-codec.md)
- [Target Type](docs/pages/06-target-type.md)
- [`TargetTypes` utility](docs/pages/07-util.md)

## Packages

This project is designed to be as portable as possible so model should be able to be defined on both client (web) or server (node)

However, `Parser` is not as portable since some parser require to be run on specific environment. So, there are multiple package that can be used depend on usage.

- [@type-io/cores](packages/type-io-core/README.md): Used to define our data model. This package can be run on both front-end and back-end.
- [@type-io/node](packages/type-io-node/README.md): Add support for Node data type such as `Buffer`. This can only be run on Node
- [@type-io/bson](packages/type-io-bson/README.md): Add support for Bson data type such as `Decimal128`, `Int32` and more. This can be run on both front-end and back-end

## To Do

- Circular type: Currently not supported
- `@type-io/mongo`: Used to transform object from/to MongoDb object.