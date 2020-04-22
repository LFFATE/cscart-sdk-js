var assert = require('assert')
import 'mocha'
import CsCartApiSdk from '../src/index'

describe('CsCartApiSdk', function() {
  describe('can create', function() {
    it('pass config', function() {

      const api = new CsCartApiSdk({
        username: 'john@cscart.sdk',
        apiKey: '008005ae5b0f45',
        apiUrl: 'https://cscart-sdk.com/api/4.0/',
        siteUrl: 'https://cscart-sdk.com/',
      });

      assert.equal(
        api.getConfig().username,
        'john@cscart.sdk'
      );
    });
  });
});
