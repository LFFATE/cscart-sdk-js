import 'mocha'
import * as nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert, expect } from 'chai'
import { endsWith } from 'lodash'

import * as productsMock from './mock/products.json'

describe('products', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {
    api = new CsCartApiSdk({
        username: 'lffate@cscart.sdk',
        apiKey: '008005ae5b0f45',
        apiUrl: 'https://cscart-sdk.com/api/4.0/',
        siteUrl: 'https://cscart-sdk.com/',
      });
  });

  it('Get single product', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_products/505/')
      .reply(200, {product_id: []})

    const result = await api.products.one(505).get();
    expect(result.data).to.have.property('product_id')
  })

  it('Get products', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_products/')
      .query({
        language:   'en',
        sl:         'en',
        lang_code:  'en',
      })
      .reply(200, {products: []})

    api.setLanguage('en')

    const result = await api.products.get();
    expect(result.data).to.have.property('products')
  })

  it('Limit and paginate products', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_products/')
      .query({
        page: 10,
        items_per_page: 5
      })
      .reply(200, {paginated: true})

      const result = await api.products.limit(5).page(10).get();
      expect(result.data).to.have.property('paginated')
  })

  it('Get products by category', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_products/')
      .query({
        filter: 'Y',
        cid: 113
      })
      .reply(200, {filtered: true})

    const result = await api.products.forCategory(113).get();

    assert.equal(result.status, '200')
    expect(result.data).to.have.property('filtered')
  })
});
