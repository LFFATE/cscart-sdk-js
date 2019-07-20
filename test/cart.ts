import 'mocha'
import * as nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert } from 'chai'

describe('cart', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_cart_content\/$/)
      .reply(200)

    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_cart_content\//)
      .query({calculate_shipping: 'A'})
      .reply(200)

    nock('https://cscart-sdk.com')
      .post(/^\/api\/4.0\/sra_cart_content\//,  {
        products: {
          4: {
            product_id: 4,
            amount: /\d+/
          }
        }
      })
      .reply(201)

    nock('https://cscart-sdk.com')
      .post(/^\/api\/4.0\/sra_cart_content\//,  {
        products: {
          4: {
            product_id: 4,
            amount: 1
          },
          5: {
            product_id: 5,
            amount: 1
          },
          49: {
            product_id: 49,
            amount: 5
          }
        }
      })
      .reply(201)

    nock('https://cscart-sdk.com')
      .delete(/^\/api\/4.0\/sra_cart_content\/\d+/)
      .reply(204)

    api = new CsCartApiSdk({
        username: 'lffate@cscart.sdk',
        apiKey: '008005ae5b0f45',
        apiUrl: 'https://cscart-sdk.com/api/4.0/',
        siteUrl: 'https://cscart-sdk.com/',

        userToken: '008005ae5b0f45008005ae5b0f45',
      });
  });

  it('Get cart', async function() {
    const result = await api.cart.get();
    assert.equal(result.status, '200')
  })

  it('Get cart with shippings', async function() {
    const result = await api.cart.withShippings().get();
    assert.equal(result.status, '200')
  })

  it('Get cart with selected shippings', async function() {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_cart_content\//)
      .query({
        calculate_shipping: 'A',
        shipping_ids: [1]
      })
      .reply(200)

    const result = await api.cart.withShippings([1]).get();
    assert.equal(result.status, '200')
  })

  it('Add to cart', async function() {
    const result = await api.cart.add({
      product_id: 4,
      amount: 1,
    });

    assert.equal(result.status, '201')
  })

  it('Remove from cart', async function() {
    const result = await api.cart.one(145642).delete();

    assert.equal(result.status, '204')
  })

  it('Batch add to cart', async function() {
    const result = await api.cart.add([
      {
        product_id: 4,
        amount: 1,
      },
      {
        product_id: 5,
        amount: 1,
      },
      {
        product_id: 49,
        amount: 5,
      },
    ]);

    assert.equal(result.status, '201')
  })

  it('Save user data', async function() {
    nock('https://cscart-sdk.com')
      .put(/^\/api\/4.0\/sra_cart_content\//,  {
        user_data: {
          firstname: 'Mikhail',
          email: 'new-email@example.com',
        }
      })
      .reply(201)

    const result = await api.cart.saveUserData({
      firstname: 'Mikhail',
      email: 'new-email@example.com'
    });

    assert.equal(result.status, '201')
  })
});
