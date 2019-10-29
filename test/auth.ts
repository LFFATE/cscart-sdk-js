import 'mocha'
import nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert } from 'chai'

describe('auth_tokens', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {
    nock('https://cscart-sdk.com')
      .post(/^\/api\/4.0\/auth_tokens\//, { email: 'cscart@email.com', password: 'invalid-password' })
      .reply(404)

    nock('https://cscart-sdk.com')
      .post(/^\/api\/4.0\/auth_tokens\//, { email: 'cscart@email.com', password: 'valid-password' })
      .reply(201)

    api = new CsCartApiSdk({
        username: 'lffate@cscart.sdk',
        apiKey: '008005ae5b0f45',
        apiUrl: 'https://cscart-sdk.com/api/4.0/',
        siteUrl: 'https://cscart-sdk.com/',
      });
  });

  it('Login success', async function() {
    const result = await api.auth.login('cscart@email.com', 'valid-password');
    assert.equal(result.status, '201')
  })

  it('Social login request', async function() {
    nock('https://cscart-sdk.com')
      .post('/api/4.0/sra_social_auth/',
      {
        provider: 'google',
        token_id: 'ffdflasrovmd3123asd',
        client_id: '130904857tRQwf',
      })
      .reply(200)

    const result = await api.auth.socialLogin('google', 'ffdflasrovmd3123asd', '130904857tRQwf');
    assert.equal(result.status, '200')
  })

  it('Login failure', async function() {
    const result = await api.auth
      .login('cscart@email.com', 'invalid-password')
      .catch((error: any) => error.response);

      assert.equal(result.status, '404')
  })
});
