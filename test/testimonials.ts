import 'mocha'
import nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert, expect } from 'chai'

describe('testimonials', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {

    api = new CsCartApiSdk({
      username: 'lffate@cscart.sdk',
      apiKey: '008005ae5b0f45',
      apiUrl: 'https://cscart-sdk.com/api/4.0/',
      siteUrl: 'https://cscart-sdk.com/',
    });
  });

  it('Get for product', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_discussion/')
      .query({object_id: 101, object_type: 'P'})
      .reply(200)

    const result = await api.testimonials.forProduct(101).get();

    assert.equal(result.status, '200')
  })

  // it('Get products by category', async function() {
  //   nock('https://cscart-sdk.com')
  //     .get('/api/4.0/sra_testimonials/1/')
  //     .query({
  //       get_subtestimonials: 'Y'
  //     })
  //     .reply(200, {subtestimonials: []})

  //   const result = await api.testimonials.one(1).withSubtestimonials().get();

  //   assert.equal(result.status, '200')
  //   expect(result.data).to.have.property('subtestimonials')
  // })
});
