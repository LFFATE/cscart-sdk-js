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

    assert.equal(result.status, 200)
  })

  it('Get for article', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_discussion/')
      .query({object_id: 101, object_type: 'A'})
      .reply(200)

    const result = await api.testimonials.forArticle(101).get();

    assert.equal(result.status, 200)
  })

  it('Get for product with search', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_discussion/')
      .query({
        object_id: 101,
        object_type: 'P',
        params: {
          items_per_page: 10,
          page: 2
        }
      })
      .reply(200)

    const result = await api.testimonials.forProduct(101).limit(10).page(2).get();

    assert.equal(result.status, 200)
  })

  it('Create testimonial with data', async function() {
    nock('https://cscart-sdk.com')
      .post(/^\/api\/4.0\/sra_discussion\//,  {
        object_id: 10,
        object_type: 'P',
        name: 'Guest',
        rating_value: 4,
        message: 'My message'
      })
      .reply(201)

    const result = await api.testimonials.create(10, 'P', 'Guest', 4, 'My message');

    assert.equal(result.status, 201)
  })
});
