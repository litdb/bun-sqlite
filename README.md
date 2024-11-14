# bun-sqlite

litdb driver for [bun:sqlite](https://bun.sh/docs/api/sqlite)

## Install

```sh
bun install @litdb/bun-sqlite
```

## Usage

**db.ts**

```ts
import { connect } from "@litdb/bun-sqlite"

export const connection = connect("app.db")
export const { $, async, sync } = connection
```

**app.ts**

```ts
import { $, db } from "./db"
import { Contact } from "./models"

db.dropTable(Contact)
db.createTable(Contact)
db.insertAll([
    new Contact({ name:"John Doe", email:"john@mail.org" }),
    new Contact({ name:"Jane Doe", email:"jane@mail.org" }),
])

const janeEmail = 'jane@mail.org'
const jane = db.one<Contact>($.from(Contact).where(c => $`${c.email} = ${janeEmail}`))!

// Insert examples
const {lastInsertRowid:bobId} = db.insert(new Contact({ name:"Bob", email:"bob@mail.org"}))
const {lastInsertRowid} = db.exec`INSERT INTO Contact(name,email) VALUES('Jo','jo@doe.org')`
const name = 'Alice', email = 'alice@mail.org'
db.exec`INSERT INTO Contact(name,email) VALUES (${name}, ${email})`

// Typed SQL fragment with named param example
const hasId = <Table extends { id:number }>(id:number|bigint) =>
    (x:Table) => $.sql($`${x.id} = $id`, { id })

const contacts = db.all($.from(Contact).into(Contact))                // => Contact[]
const bob = db.one($.from(Contact).where(hasId(bobId)).into(Contact)) // => Contact    
const contactsCount = db.value($.from(Contact).select`COUNT(*)`)      // => number
const emails = db.column($.from(Contact).select(c => $`${c.email}`))  // => string[]
const contactsArray = db.arrays($.from(Contact))                      // => any[][]
const bobArray = db.array($.from(Contact).where(hasId(bobId)))        // => any[]

// Update examples
jane.email = 'jane@doe.org'
db.update(jane)                           // Update all properties
db.update(jane, { onlyProps:['email'] })  // Update only email
db.exec($.update(Contact).set({ email:jane.email }).where(hasId(jane.id))) // query builder

// Delete examples
db.delete(jane)
db.exec($.deleteFrom(Contact).where(hasId(jane.id))) // query builder
```

Website: https://litdb.dev