const DEFAULT_FRONTEND_URL = 'https://front.serverest.dev';
const DEFAULT_API_URL = 'https://serverest.dev';

function getFrontendBaseUrl() {
  return Cypress.config('baseUrl') || DEFAULT_FRONTEND_URL;
}

function getApiBaseUrl() {
  return Cypress.env('apiUrl') || DEFAULT_API_URL;
}

module.exports = {
  getFrontendBaseUrl,
  getApiBaseUrl
};
