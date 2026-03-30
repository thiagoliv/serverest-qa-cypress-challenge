const AdminProductsPage = require('../../../pages/AdminProductsPage');
const ProductsListPage = require('../../../pages/ProductsListPage');

describe('UI - Rotas protegidas', () => {
  it('apresenta a interface de login ao acessar a area administrativa sem sessao', () => {
    AdminProductsPage.visit();
    AdminProductsPage.assertProtectedByLogin();
  });

  it('apresenta a interface de login ao acessar a home protegida sem sessao', () => {
    ProductsListPage.visit();
    ProductsListPage.assertProtectedByLogin();
  });
});
