import 'mocha'
import nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert } from 'chai'

describe('settings', function() {
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

  it('Get settings', async function() {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_storefront_information\//)
      .reply(200)

    const result = await api.settings.get();
    assert.equal(result.status, '200')
  })
});
