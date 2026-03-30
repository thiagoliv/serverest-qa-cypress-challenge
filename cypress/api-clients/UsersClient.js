const { getApiBaseUrl } = require('../utils/env');

class UsersClient {
  static list(query = {}) {
    return cy.request({
      method: 'GET',
      url: `${getApiBaseUrl()}/usuarios`,
      qs: query
    });
  }

  static create(body, options = {}) {
    return cy.request({
      method: 'POST',
      url: `${getApiBaseUrl()}/usuarios`,
      body,
      failOnStatusCode: options.failOnStatusCode ?? false
    });
  }

  static delete(userId, options = {}) {
    return cy.request({
      method: 'DELETE',
      url: `${getApiBaseUrl()}/usuarios/${userId}`,
      failOnStatusCode: options.failOnStatusCode ?? false
    });
  }
}

module.exports = UsersClient;
