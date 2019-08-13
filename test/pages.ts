import 'mocha'
import nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert, expect } from 'chai'


describe('pages', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {
    api = new CsCartApiSdk({
        username: 'lffate@cscart.sdk',
        apiKey: '008005ae5b0f45',
        apiUrl: 'https://cscart-sdk.com/api/4.0/',
        siteUrl: 'https://cscart-sdk.com/',
      });
  });

  it('Get single page', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_pages/1/')
      .reply(200)

    const result = await api.pages.one(1).get();
    assert.equal(result.status, '200')
  })

  it('Get pages', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_pages/')
      .reply(200)

    const result = await api.pages.get();
    assert.equal(result.status, '200')
  })

  it('Get pages by parent', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_pages/')
      .query({
        language:   'en',
        sl:         'en',
        lang_code:  'en',
        parent_id:  1
      })
      .reply(200)

    api.setLanguage('en')

    const result = await api.pages.forParentPage(1).get();
    assert.equal(result.status, '200')
  })

  it('Get pages by parent with sort', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_pages/')
      .query({
        language:   'en',
        sl:         'en',
        lang_code:  'en',
        parent_id:  1,
        sort_by:    'name'
      })
      .reply(200)

    api.setLanguage('en')

    const result = await api.pages.forParentPage(1).orderBy('name').get();
    assert.equal(result.status, '200')
  })

});
