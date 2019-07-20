import 'mocha'
import * as nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert } from 'chai'

describe('profile', function() {
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

  it('Get profile', async function() {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_profile\//)
      .reply(200)

    const result = await api.profile.get();
    assert.equal(result.status, '200')
  })

  it('Get profile register form', async function() {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_profile_fields\//)
      .query({
        location: 'profile',
        action: 'add',
      })
      .reply(200)

    const result = await api.profile.form().forAddProfile().get();
    assert.equal(result.status, '200')
  })

  it('Get profile update form', async function() {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_profile_fields\//)
      .query({
        location: 'profile',
        action: 'update',
      })
      .reply(200)

    const result = await api.profile.form().forUpdateProfile().get();
    assert.equal(result.status, '200')
  })

  it('Get checkout register form', async function() {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_profile_fields\//)
      .query({
        location: 'checkout',
        action: 'add',
      })
      .reply(200)

    const result = await api.profile.form().forAddOrder().get();
    assert.equal(result.status, '200')
  })

  it('Get checkout update form', async function() {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_profile_fields\//)
      .query({
        location: 'checkout',
        action: 'update',
      })
      .reply(200)

    const result = await api.profile.form().forUpdateOrder().get();
    assert.equal(result.status, '200')
  })

  it('Create profile', async function() {
    nock('https://cscart-sdk.com')
      .post(/^\/api\/4.0\/sra_profile\//,  {
        email: "cscart@demo.com",
        password1: "12345",
        password2: "12345"
      })
      .reply(201)

    const result = await api.profile.create({
      email: "cscart@demo.com",
      password1: "12345",
      password2: "12345"
    });

    assert.equal(result.status, '201')
  })
});
