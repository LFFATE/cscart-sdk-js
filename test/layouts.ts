import 'mocha'
import nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert } from 'chai'
import { startsWith } from 'lodash'

describe('layouts', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_bm_layouts\//)
      .reply(200)

    api = new CsCartApiSdk({
        username: 'lffate@cscart.sdk',
        apiKey: '008005ae5b0f45',
        apiUrl: 'https://cscart-sdk.com/api/4.0/',
        siteUrl: 'https://cscart-sdk.com/',
      });
  });

  it('Get layouts', function() {
    api.getClient().interceptors.request.use((conf) => {
      assert(startsWith(conf.url, 'https://cscart-sdk.com/api/4.0/sra_bm_layouts'))

      return conf
    });
    api.layouts.get().then((response: any) => {
    })
  })

  it('Get single layout', function() {
    api.getClient().interceptors.request.use((conf) => {
      assert(startsWith(conf.url, 'https://cscart-sdk.com/api/4.0/sra_bm_layouts/3/'))

      return conf
    });
    api.layouts.one(3).get().then((response: any) => {
    })
  })

  it('Get location', function() {
    api.getClient().interceptors.request.use((conf) => {
      assert(startsWith(conf.url, 'https://cscart-sdk.com/api/4.0/sra_bm_layouts/3/sra_bm_locations/index.index/'))

      return conf
    });
    api.layouts.one(3).forLocation('index.index').get().then((response: any) => {
    })
  })

  it('Get blocks for location', function() {
    api.getClient().interceptors.request.use((conf) => {
      assert(startsWith(conf.url, 'https://cscart-sdk.com/api/4.0/sra_bm_layouts/3/sra_bm_locations/index.index/sra_bm_blocks/'))

      return conf
    });
    api.layouts.one(3).forLocation('index.index').withBlocks().get().then((response: any) => {
    })
  })
});
