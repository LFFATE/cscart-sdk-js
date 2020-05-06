import 'mocha'
import nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert, expect } from 'chai'

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

  it('Get single product for options', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_products/505/?selected_options%5B7%5D=17')
      .reply(200, {product_id: []})

    const result = await api.products.one(505).forOptions([{ optionId: 7, value: 17 }]).get();
    assert.equal(result.status, 200)
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

  it('Search products', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_products/')
      .query({
        language:   'en',
        sl:         'en',
        lang_code:  'en',
        client:     'spa',
        q: 'shirt',
      })
      .reply(200)

    api.setClientId('spa')
    api.setLanguage('en')

    const result = await api.products.search('shirt').get();
    assert.equal(result.status, 200)
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

    assert.equal(result.status, 200)
    expect(result.data).to.have.property('filtered')
  })

  it('Get products by category with filters', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_products/')
      .query({
        filter: 'Y',
        get_filters: true,
        cid: 113
      })
      .reply(200, {filtered: true})

    const result = await api.products.forCategory(113).withFilters().get();

    assert.equal(result.status, 200)
    expect(result.data).to.have.property('filtered')
  })

  it('Get products by category with applied filters', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_products/')
      .query({
        filter: 'Y',
        get_filters: true,
        features_hash: '1-11_2-21-22-23_3-100-500_4-42-300-USD',
        cid: 113
      })
      .reply(200, {filtered: true})

    const result = await api.products.forCategory(113).withFilters('1-11_2-21-22-23_3-100-500_4-42-300-USD').get();

    assert.equal(result.status, 200)
    expect(result.data).to.have.property('filtered')
  })

  it('should get products by master product id', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_products/')
      .query({
        vendor_products_by_product_id: 134
      })
      .reply(200)

    const result = await api.products.vendorProducts(134).get();

    assert.equal(result.status, 200)
  })
});
