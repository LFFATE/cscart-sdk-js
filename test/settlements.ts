import 'mocha'
import * as nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert } from 'chai'

describe('settlements', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {

    api = new CsCartApiSdk({
        username: 'lffate@cscart.sdk',
        apiKey: '008005ae5b0f45',
        apiUrl: 'https://cscart-sdk.com/api/4.0/',
        siteUrl: 'https://cscart-sdk.com/',

        userToken: '008005ae5b0f45008005ae5b0f45',
      });
  });

  it('Create settlement', async function() {
    nock('https://cscart-sdk.com')
      .post(/^\/api\/4.0\/sra_settlements\//,  {
        order_id: 1908,
        repay: false,
      })
      .reply(201)

    const result = await api.settlements.create({
      orderId: 1908,
    });

    assert.equal(result.status, '201')
  })
});
