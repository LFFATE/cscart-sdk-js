[![Travis (.org)](https://img.shields.io/travis/LFFATE/cscart-sdk-js.svg?style=flat-square)](https://travis-ci.org/LFFATE/cscart-sdk-js)
[![npm](https://img.shields.io/npm/dm/cscart-sdk.svg?style=flat-square)](https://www.npmjs.com/package/cscart-sdk)


- [Description](#description)
- [Installation](#installation)
  - [in HTML](#in-html)
  - [TypeScript](#typescript)
- [Using](#using)
  - [Table of entities and possibilities](#table-of-entities-and-possibilities)
    - [Examples](#examples)
# Description

# Installation
## in HTML
Copy `cscart-sdk.js` to your project and add at html:
```html
<script src="cscart-sdk.js"></script>
<script>
  const api = new CsCartApiSdk({
    username: 'USER@EMAIL',
    apiKey: 'APIKEY',
    apiUrl: 'API_URL',
    siteUrl: 'SITE_URL',
  })
</script>
```
## TypeScript
`npm i cscart-sdk`

```javascript
import CsCartApiSdk from 'cscart-sdk'
//
const api = new CsCartApiSdk({
  username: 'USER@EMAIL',
  apiKey: 'APIKEY',
  apiUrl: 'API_URL',
  siteUrl: 'SITE_URL',
})
```
# Using
## Table of entities and possibilities

|Entity|Method|Description|Example|
|---|---|---|---|
|products||Products|`api.products`|
||get()|get products list|`api.products.get()`|
||one(number)|get single product by id|`api.products.one(1).get()`|
||limit(number)|Limit products count on request result| `api.products.limit(50).get()`|
||orderBy(string)|Sort products by |`api.products.orderBy('product')`|
||asc()|Sort by increasing|`api.products.orderBy('price').asc()`|
||desc()|Sort by decreasing|`api.products.orderBy('price').desc()`|
|layouts||Layouts and blocks|`api.layouts`|
||get()|get layouts list|`api.layouts.get()`|
||one(number)|get single layout|`api.layouts.one(1).get()`|
||forLocation(string)|get layout for dispatch|`api.layouts.one(3).forLocation('index.index')`|
||withBlocks()|get blocks for a found layout|`api.layouts.one(3).forLocation('index.index').withBlocks()`|

### Examples
```javascript
// Get all products
api.products.get().then((response) => {
  console.log(response)
})

// Get all products with pagination
api.products.limit(10).page(5).get().then((response) => {
  console.log(response)
})

// get single product where product_id = 150
api.products.one(150).get().then((response) => {
  console.log(response)
})

// get blocks from block manager for the layout
api.layouts.one(3).forLocation('index.index').withBlocks().get().then((r) => console.log(r)).catch((error) => console.log(error.response))
```
