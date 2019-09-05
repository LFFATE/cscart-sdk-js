import 'mocha'
import nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert, expect } from 'chai'
import { endsWith } from 'lodash'

// import * as productsMock from './mock/products.json'

describe('categories', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {

    api = new CsCartApiSdk({
        username: 'lffate@cscart.sdk',
        apiKey: '008005ae5b0f45',
        apiUrl: 'https://cscart-sdk.com/api/4.0/',
        siteUrl: 'https://cscart-sdk.com/',
      });
  });

  it('Get single category', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_categories/505/')
      .reply(200, {category_id: 505})

    const result = await api.categories.one(505).get();

    assert.equal(result.status, '200')
    expect(result.data).to.have.property('category_id')
  })

  it('Get products by category', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_categories/1/')
      .query({
        get_subcategories: 'Y',
        subcategories: 'Y',
      })
      .reply(200, {subcategories: []})

    const result = await api.categories.one(1).withSubcategories().get();

    assert.equal(result.status, '200')
    expect(result.data).to.have.property('subcategories')
  })
});
