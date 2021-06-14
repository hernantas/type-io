# The Idea

There're 3 problem we are trying to solve on this package:

## Problem #1: Data Modeling

Eventhough the data in Javascript/JSON can be in any shape and format, we still need the data to match our data model so we can manipulate it safely. Oftentimes, we model our data using classes or schemas.

For example:

Plain:

```ts
{
  id: 1,
  firstName: "Ricky",
  lastName: "Perez",
  money: "5891892202.14"
}
```

Model (Class):

```ts
class User {
  id: number
  firstName: string
  lastName: string
  money: string

  getName(): string {
    return this.firstName + this.lastName
  }
}
```

And then you `fetch` it from API server:

```ts
fetch('/api/users').then((users: User[]) => {
  // here you can use `user.id` and type hinting will work
  // however, its not an class instance
})
```

In above code, you can access `users` by using `users[0].id` or `users[0].firstName` and it is valid in Javascript. However, since its an not class instances rather than plain objects, you cannot call `getName()` method on it.

## Problem #2: Data transformation shape (input/output format)

In addition, we also want to transform our class instances to different form of object format. Eventhough we don't really need to care about data outside our model, we still need the transform our data to be formatted in such a way that compatible with other consumers such as database or client.

For example, when we need to output our model to BSON object when working with MongoDb, it need to be shaped into:

BSON:
```ts
{
  id: Int32("1"),
  firstName: "Ricky",
  lastName: "Perez",
  money: Decimal128("5891892202.14")
}
```

Or when you need it to be string-only value:

String Only:
```ts
{
  id: "1",
  firstName: "Ricky",
  lastName: "Perez",
  money: "5891892202.14"
}
```

## Problem #3: Reusable Data Model

Sometimes we also need our data model need to be as portable as possible so we can reuse it both on front-end and back-end (or in electron client) or anywhere else where we can use our model.

**Hence, this parser/codec based I/O transformer is created.**