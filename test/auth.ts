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

  it('Login failure', async function() {
      const result = await api.auth
        .login('cscart@email.com', 'invalid-password')
        .catch((error: any) => error.response);

        assert.equal(result.status, '404')
  })

});
