import 'mocha'
import * as nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert } from 'chai'
import { endsWith } from 'lodash'

// import * as productsMock from './mock/products.json'

describe('products', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_categories\//)
      .reply(200)

    api = new CsCartApiSdk({
        username: 'lffate@cscart.sdk',
        apiKey: '008005ae5b0f45',
        apiUrl: 'https://cscart-sdk.com/api/4.0/',
        siteUrl: 'https://cscart-sdk.com/',
      });
  });

  it('Get single category', function() {
    api.getClient().interceptors.request.use((conf) => {
      assert(endsWith(conf.url, '/505/'))

      return conf
    });
    api.categories.one(505).get().then((response: any) => {
    })
  })

});
