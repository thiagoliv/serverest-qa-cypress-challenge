const { getApiBaseUrl } = require('../utils/env');

function buildHeaders(token) {
  return token ? { Authorization: token } : undefined;
}

class CartsClient {
  static list(query = {}) {
    return cy.request({
      method: 'GET',
      url: `${getApiBaseUrl()}/carrinhos`,
      qs: query
    });
  }

  static create(body, token, options = {}) {
    return cy.request({
      method: 'POST',
      url: `${getApiBaseUrl()}/carrinhos`,
      body,
      headers: buildHeaders(token),
      failOnStatusCode: options.failOnStatusCode ?? false
    });
  }

  static cancelPurchase(token, options = {}) {
    return cy.request({
      method: 'DELETE',
      url: `${getApiBaseUrl()}/carrinhos/cancelar-compra`,
      headers: buildHeaders(token),
      failOnStatusCode: options.failOnStatusCode ?? false
    });
  }
}

module.exports = CartsClient;
