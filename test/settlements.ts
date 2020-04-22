import 'mocha'
import nock from 'nock'
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

    assert.equal(result.status, 201)
  })

  it('get payment form', async function() {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_order_payment\/10/)
      .reply(200)

    const result = await api.settlements.getForm(10);

    assert.equal(result.status, 200)
  })

  it('hook url', async function() {
    nock('https://backend.com/')
      .get('/requesting-hook-url')
      .reply(200)

    const result = await api.settlements.hookUrl('https://backend.com/requesting-hook-url');

    assert.equal(result.status, 200)
  })
});
