const { getApiBaseUrl } = require('../utils/env');

class AuthClient {
  static login(body, options = {}) {
    return cy.request({
      method: 'POST',
      url: `${getApiBaseUrl()}/login`,
      body,
      failOnStatusCode: options.failOnStatusCode ?? false
    });
  }
}

module.exports = AuthClient;
