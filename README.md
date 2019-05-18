![Travis (.org)](https://img.shields.io/travis/LFFATE/cscart-sdk-js.svg?style=flat-square)

# Description

# Using
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
### Installation
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
