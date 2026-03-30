const { uniqueProductName } = require('../utils/dataGenerator');

function buildProduct(overrides = {}) {
  return {
    nome: uniqueProductName(),
    preco: 150,
    descricao: 'Produto criado para automacao',
    quantidade: 25,
    ...overrides
  };
}

module.exports = {
  buildProduct
};
