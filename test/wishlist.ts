import 'mocha'
import * as nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert } from 'chai'

describe('wishlist', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_wish_list\/$/)
      .reply(200)

    nock('https://cscart-sdk.com')
      .delete(/^\/api\/4.0\/sra_wish_list\/192/)
      .reply(204)

    nock('https://cscart-sdk.com')
      .post(/^\/api\/4.0\/sra_wish_list\//,  {
        products: {
          4: {
            product_id: 4,
            amount: /\d+/
          },
        }
      })
      .reply(201)

    nock('https://cscart-sdk.com')
      .post(/^\/api\/4.0\/sra_wish_list\//,  {
        products: {
          4: {
            product_id: 4,
            amount: /\d+/
          },
          5: {
            product_id: 5,
            amount: /\d+/
          },
          6: {
            product_id: 6,
            amount: /\d+/
          }
        }
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

  it('Get wishlist', async function() {
    const result = await api.wishlist.get();
    assert.equal(result.status, '200')
  })

  it('Add to wishlist', async function() {
    const result = await api.wishlist.add({
      product_id: 4,
    });

    assert.equal(result.status, '201')
  })

  it('Remove from wishlist', async function() {
    const result = await api.wishlist.one(192).remove();

    assert.equal(result.status, '204')
  })

  it('Batch add to wishlist', async function() {
    const result = await api.wishlist.add([
      {
        product_id: 4,
      },
      {
        product_id: 5,
      },
      {
        product_id: 6,
      },
    ]);

    assert.equal(result.status, '201')
  })
});
