function buildSingleItemCart(idProduto, quantidade = 1) {
  return {
    produtos: [
      {
        idProduto,
        quantidade
      }
    ]
  };
}

module.exports = {
  buildSingleItemCart
};
