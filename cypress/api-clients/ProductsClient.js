const { getApiBaseUrl } = require('../utils/env');

function buildHeaders(token) {
  return token ? { Authorization: token } : undefined;
}

class ProductsClient {
  static list(query = {}) {
    return cy.request({
      method: 'GET',
      url: `${getApiBaseUrl()}/produtos`,
      qs: query
    });
  }

  static create(body, token, options = {}) {
    return cy.request({
      method: 'POST',
      url: `${getApiBaseUrl()}/produtos`,
      body,
      headers: buildHeaders(token),
      failOnStatusCode: options.failOnStatusCode ?? false
    });
  }

  static getById(productId, options = {}) {
    return cy.request({
      method: 'GET',
      url: `${getApiBaseUrl()}/produtos/${productId}`,
      failOnStatusCode: options.failOnStatusCode ?? false
    });
  }

  static delete(productId, token, options = {}) {
    return cy.request({
      method: 'DELETE',
      url: `${getApiBaseUrl()}/produtos/${productId}`,
      headers: buildHeaders(token),
      failOnStatusCode: options.failOnStatusCode ?? false
    });
  }
}

module.exports = ProductsClient;
