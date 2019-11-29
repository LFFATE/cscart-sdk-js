import 'mocha'
import nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert } from 'chai'
import { startsWith } from 'lodash'

describe('layouts', function() {
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

  it('should get layouts', async () => {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_ext_bm_layouts/')
      .reply(200)

    const result = await api.layouts.get();
    assert.equal(result.status, '200')
  })

  it('should get single layout', async () => {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_ext_bm_layouts/spalayout/')
      .reply(200)

    const result = await api.layouts.one('spalayout').get();
    assert.equal(result.status, '200')
  })

  it('should get location', async () => {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_ext_bm_layouts/spalayout/sra_ext_bm_locations/index.index/')
      .reply(200)

    const result = await api.layouts.one('spalayout').forLocation('index.index').get();
    assert.equal(result.status, '200')
  })

  it('should get blocks location', async () => {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_ext_bm_layouts/spalayout/sra_ext_bm_locations/index.index/sra_ext_bm_blocks/')
      .reply(200)

    const result = await api.layouts.one('spalayout').forLocation('index.index').withBlocks().get();
    assert.equal(result.status, '200')
  })

  it('should get blocks for location with slug', async () => {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_ext_bm_layouts/spalayout/sra_ext_bm_locations/products.view/sra_ext_bm_blocks/100g-pants')
      .reply(200)

    const result = await api.layouts.one('spalayout').forLocation('products.view').withBlocks().withSlug('100g-pants').get();
    assert.equal(result.status, '200')
  })
});
