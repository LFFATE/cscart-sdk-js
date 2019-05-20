import 'mocha'
import * as nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert } from 'chai'
import { endsWith } from 'lodash'

import * as productsMock from './mock/products.json'

describe('products', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_products\//)
      .reply(200, productsMock)

    api = new CsCartApiSdk({
        username: 'lffate@cscart.sdk',
        apiKey: '008005ae5b0f45',
        apiUrl: 'https://cscart-sdk.com/api/4.0/',
        siteUrl: 'https://cscart-sdk.com/',
      });
  });

  it('Get single product', function() {
    api.getClient().interceptors.request.use((conf) => {
      assert(endsWith(conf.url, '/505/'))

      return conf
    });
    api.products.one(505).get().then((response: any) => {
    })
  })

  it('Set language', function() {
    api.setLanguage('en')
    api.getClient().interceptors.request.use((conf) => {
      assert.equal(
        conf.params.language,
        'en'
      )

      return conf
    });
    api.products.get()
  })

  it('Get products', function() {
    api.setLanguage('en')
    api.getClient().interceptors.request.use((conf) => {
      assert.equal(
        conf.params.language,
        'en'
      )

      return conf
    });
    api.products.get().then((response: any) => {
      assert.property(response.data, 'products')
    })
  })

  it('Limit and paginate products', function() {
    api.getClient().interceptors.request.use((conf) => {
      assert.equal(conf.params.items_per_page, 5)
      assert.equal(conf.params.page, 10)

      return conf
    });
    api.products.limit(5).page(10).get().then((response: any) => {
    })
  })
});
