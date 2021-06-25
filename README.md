# type-io

Typescript decorator-based encoding/decoding transformation for I/O

**`type-io` is still in beta. Expect bugs!**

## Documentation

- [The Idea](docs/pages/01-the-idea.md)
- [Getting Started](docs/pages/02-getting-started.md)
  - [Installation](docs/pages/02-getting-started.md#installation)
  - [Basic Usage](docs/pages/02-getting-started.md#basic-usage)
- [Codec](docs/pages/03-codec.md)
- [Target Type](docs/pages/04-target-type.md)
- [Data Model](docs/pages/05-data-model.md)
- [Parser](docs/pages/06-parser.md)

## Packages

This project is designed to be as portable as possible so model should be able to be defined on both client (web) or server (node)

However, `Parser` is not as portable since some parser require to be run on specific environment. So, there are multiple package that can be used depend on usage.

- [@type-io/cores](packages/type-io-core/README.md): Used to define our data model. This package can be run on both front-end and back-end.
- [@type-io/node](packages/type-io-node/README.md): Add support for Node data type such as `Buffer`. This can only be run on Node
- [@type-io/bson](packages/type-io-bson/README.md): Add support for Bson data type such as `Decimal128`, `Int32` and more. This can be run on both front-end and back-end
- [@type-io/mongo](packages/type-io-mongo/README.md): Add support for MongoDb data type such as `Decimal128`, `Int32` and more. In addition, `@MongoId` decorator let you map `_id` (`ObjectId`) to `id` (`string`)

## To Do

- Circular type: Currently not supported