import 'mocha'
import nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert, } from 'chai'


describe('notificatons', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {
    api = new CsCartApiSdk({
        username: 'lffate@cscart.sdk',
        apiKey: '008005ae5b0f45',
        apiUrl: 'https://cscart-sdk.com/api/4.0/',
        siteUrl: 'https://cscart-sdk.com/',
      });
  });

  it('Get notifications', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_unviewed_notifications/')
      .reply(200)

    const result = await api.notifications.get();
    assert.equal(result.status, 200)
  })

  it('should mark notifications as viewed', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_unviewed_notifications/mark_as_viewed')
      .query({
        time: '2020-01-22 16:16:23'
      })
      .reply(200)

    const result = await api.notifications.markAsViewed('2020-01-22 16:16:23');
    assert.equal(result.status, 200)
  })
});
