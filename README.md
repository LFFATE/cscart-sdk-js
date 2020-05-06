[![Travis (.org)](https://img.shields.io/travis/LFFATE/cscart-sdk-js.svg?style=flat-square)](https://travis-ci.org/LFFATE/cscart-sdk-js)
[![npm](https://img.shields.io/npm/dm/cscart-sdk.svg?style=flat-square)](https://www.npmjs.com/package/cscart-sdk)
![Codecov](https://img.shields.io/codecov/c/gh/LFFATE/cscart-sdk-js.svg?style=flat-square)

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
||forCategory(number)|Get products only for the category|`api.products.forCategory(114)`|
||withFilters()|Adds to response filters array|`api.products.withFilters()`|
||vendorProducts(productId: number)|Get products by master product id|`api.products.vendorProducts(134)`|
||forOptions([{ optionId: number, value: any }])|Get product with selected options|`api.products.forOptions([{ optionId: 17, value: 7 }])`|
|layouts||Layouts and blocks|`api.layouts`|
||get()|get layouts list|`api.layouts.get()`|
||one(number)|get single layout|`api.layouts.one(1).get()`|
||forLocation(string)|get layout for dispatch|`api.layouts.one(3).forLocation('index.index')`|
||withBlocks()|get blocks for a found layout|`api.layouts.one(3).forLocation('index.index').withBlocks()`|
|categories||Categories|`api.categories`|
||get()|get categories|`api.categories.get()`|
||one(number)|get single category|`api.categories.one(50)`|
|auth||Auth tokens|`api.auth`|
||login(email: string, password: string)|Try to login with email and password|`api.auth.login('user@email.com', 'password').then((response: any) => console.log(response.token))`|
||loginWithEkey(ekey: string)|Try to login with ekey|`api.auth.loginWithEkey('dfkrto4313fd...').then((response: any) => console.log(response.token))`|
||socialLogin(provider: 'google', tokenId: string, clientId: string)|Verify auth for social|`api.auth.socialLogin('google', 'avfgjgjnf...', '10948fhrDs1').then((response: any) => console.log(response.token))`|
||restorePassword(email: string)|Get email with password restore link|`api.auth.restorePassword('user@email.com').then((response: any) => console.log(response))`|
|cart||Cart|`api.cart`|
||get()|Get cart content|`api.cart.get()`|
||withShippings(ids?: Array\<number\>)|response will contains shippings info. Ids - chosen_shipping|`api.cart.withShippings([4, 5]).get()`|
||add(Array\<any\>)|add products to cart|`api.cart.add([{product_id: 5, amount: 1}])`|
||`saveUserData(<any>)`|Save user info at cart|`api.cart.saveUserData({ firstname: 'John', s_city: 'Moscow'})`|
|wishlist||Wishlist|`api.wishlist`|
||get()|Get wishlist content|`api.wishlist.get()`|
||add(Array\<any\>)|add products to wishlist|`api.wishlist.add([{product_id: 5}, {product_id: 18}])`|
||add(\<any\>)|add products to wishlist|`api.wishlist.add({product_id: 5})`|
|profile||Profile|`api.profile`|
||get()|Get profile for current user|`api.profile.get()`|
||form()|Get form fields for...|`api.profile.form()...`|
||forAddProfile()|Get form fields for registration|`api.profile.form().forAddProfile().get()`|
||forUpdateProfile()|Get form fields for update profile|`api.profile.form().forUpdateProfile().get()`|
||forAddOrder()|Get form fields for checkout|`api.profile.form().forAddOrder().get()`|
||forUpdateOrder()|-|`api.profile.form().forUpdateOrder().get()`|
||create()|Create profile|`api.profile.create({ email: email@email.com", password1: "12345", password2: "12345" })`|
|settlements||Settlement|`api.settlements`|
||`create({ orderId: number, repay?: boolean, ...data})`|create request to create settlement|`api.settlements.create({ orderId: 101 })`|
|pages||Pages|`api.pages`|
||get()|get pages list|`api.pages.get()`|
||one(number)|get single page by id|`api.pages.one(1).get()`|
||limit(number)|Limit pages count on request result| `api.pages.limit(50).get()`|
||orderBy(string)|Sort pages by |`api.pages.orderBy('product')`|
||asc()|Sort by increasing|`api.pages.orderBy('price').asc()`|
||desc()|Sort by decreasing|`api.pages.orderBy('price').desc()`|
||forParentPage(number)|Get pages only for the parent page|`api.pages.forParentPage(114)`|
|Settings|Storefron information|`api.settings`|
||`get()`|Get settings for the store|`api.settings.get()`|
|testimonials||Testimonials|`api.testimonials`|
||`forProduct(number)`|Get testimonials for a product|`api.testimonials.forProduct(101).get()`|
||`forCategory(number)`|Get testimonials for a category|`api.testimonials.forCategory(101).get()`|
||`forArticle(number)`|Get testimonials for an article|`api.testimonials.forArticle(101).get()`|
||`forOrder(number)`|Get testimonials for an order|`api.testimonials.forOrder(101).get()`|
||`forStorefront(number)`|Get testimonials for a storefront|`api.testimonials.forStorefront(101).get()`|
||`forVendor(number)`|Get testimonials for a vendor|`api.testimonials.forVendor(101).get()`|
|vendors||Vendors|`api.vendors`|
||get()|get vendors list|`api.vendors.get()`|
||one(number)|get single vendor by id|`api.vendors.one(1).get()`|
||limit(number)|Limit vendors count on request result| `api.vendors.limit(50).get()`|
||orderBy(string)|Sort vendors by |`api.vendors.orderBy('name')`|
||asc()|Sort by increasing|`api.vendors.orderBy('name').asc()`|
||desc()|Sort by decreasing|`api.vendors.orderBy('name').desc()`|
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
