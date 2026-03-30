const { uniqueEmail, uniquePersonName } = require('../utils/dataGenerator');

const DEFAULT_PASSWORD = 'teste123';

function buildClient(overrides = {}) {
  return {
    nome: uniquePersonName('Cliente QA'),
    email: uniqueEmail('cliente.qa'),
    password: DEFAULT_PASSWORD,
    administrador: 'false',
    ...overrides
  };
}

function buildAdmin(overrides = {}) {
  return {
    nome: uniquePersonName('Admin QA'),
    email: uniqueEmail('admin.qa'),
    password: DEFAULT_PASSWORD,
    administrador: 'true',
    ...overrides
  };
}

function buildLoginPayload(user) {
  return {
    email: user.email,
    password: user.password
  };
}

module.exports = {
  DEFAULT_PASSWORD,
  buildClient,
  buildAdmin,
  buildLoginPayload
};
