import 'mocha'
import nock from 'nock'
import CsCartApiSdk from '../src/index'
import { assert } from 'chai'

describe('vendors', function() {
  let api: CsCartApiSdk;

  beforeEach(() => {

    api = new CsCartApiSdk({
      username: 'lffate@cscart.sdk',
      apiKey: '008005ae5b0f45',
      apiUrl: 'https://cscart-sdk.com/api/4.0/',
      siteUrl: 'https://cscart-sdk.com/',
    });
  });

  it('Get list', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_vendors/')
      .reply(200)

    const result = await api.vendors.get();

    assert.equal(result.status, 200)
  })

  it('Get list with search', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_vendors/')
      .query({
        items_per_page: 10,
        page: 2
      })
      .reply(200)

    const result = await api.vendors.limit(10).page(2).get();

    assert.equal(result.status, 200)
  })

  it('Get single vendor', async function() {
    nock('https://cscart-sdk.com')
      .get('/api/4.0/sra_vendors/200/')
      .reply(200)

    const result = await api.vendors.one(200).get();

    assert.equal(result.status, 200)
  })

  it('Get form', async function() {
    nock('https://cscart-sdk.com')
      .get(/^\/api\/4.0\/sra_vendor_registration\//)
      .reply(200)

    const result = await api.vendors.getForm();

    assert.equal(result.status, 200)
  })

  it('Create order', async function() {
    nock('https://cscart-sdk.com')
      .post(/^\/api\/4.0\/sra_vendor_registration\//,  {
        company: "Test company",
        plan_id: "1",
        email: "test@example.com",
        admin_firstname: "firstname",
        admin_lastname: "lastname"
      })
      .reply(201)

    const result = await api.vendors.create({
      company: "Test company",
      plan_id: "1",
      email: "test@example.com",
      admin_firstname: "firstname",
      admin_lastname: "lastname"
    });

    assert.equal(result.status, 201)
  })
});
