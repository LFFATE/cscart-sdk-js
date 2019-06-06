import 'mocha'
import * as nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert } from 'chai'

describe('orders', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {

    nock('https://cscart-sdk.com')
      .post(/^\/api\/4.0\/sra_orders\//,  {
        products: {
          '123123': {
            product_id: 4,
            cart_id: '123123'
          }
        },
        shipping_ids: [1],
        payment_id: 1
      })
      .reply(201)

    api = new CsCartApiSdk({
        username: 'lffate@cscart.sdk',
        apiKey: '008005ae5b0f45',
        apiUrl: 'https://cscart-sdk.com/api/4.0/',
        siteUrl: 'https://cscart-sdk.com/',

        userToken: '008005ae5b0f45008005ae5b0f45',
      });
  });

  it('Create order', async function() {
    const result = await api.orders.create({
      products: [
        {
          product_id: 4,
          cart_id: '123123'
        }
      ],
      shippingIds: [1],
      paymentId: 1,
    });

    assert.equal(result.status, '201')
  })
});
