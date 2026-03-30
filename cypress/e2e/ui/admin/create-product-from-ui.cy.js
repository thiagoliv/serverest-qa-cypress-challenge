const AuthClient = require('../../../api-clients/AuthClient');
const UsersClient = require('../../../api-clients/UsersClient');
const ProductsClient = require('../../../api-clients/ProductsClient');
const userFactory = require('../../../factories/userFactory');
const { buildProduct } = require('../../../factories/productFactory');
const LoginPage = require('../../../pages/LoginPage');
const AdminProductsPage = require('../../../pages/AdminProductsPage');

describe('UI - Admin cadastra produto e valida na listagem', () => {
  let adminUserId;
  let adminToken;
  let createdProductId;
  let createdProductName;

  afterEach(() => {
    return cy
      .then(() => {
        if (!adminToken || !createdProductName || createdProductId) {
          return;
        }

        return ProductsClient.list({ nome: createdProductName }).then((listResponse) => {
          const product = (listResponse.body.produtos || []).find(
            (item) => item.nome === createdProductName
          );

          if (product) {
            createdProductId = product._id;
          }
        });
      })
      .then(() => {
        if (!createdProductId || !adminToken) {
          return;
        }

        return ProductsClient.delete(createdProductId, adminToken, {
          failOnStatusCode: false
        });
      })
      .then(() => {
        if (!adminUserId) {
          return;
        }

        return UsersClient.delete(adminUserId, { failOnStatusCode: false });
      })
      .then(() => {
        adminUserId = null;
        adminToken = null;
        createdProductId = null;
        createdProductName = null;
      });
  });

  it('usuario admin logado cadastra produto e valida na lista de produtos', () => {
    const adminUser = userFactory.buildAdmin();
    const product = buildProduct();

    createdProductName = product.nome;

    UsersClient.create(adminUser)
      .then((adminCreateResponse) => {
        expect(adminCreateResponse.status).to.eq(201);
        adminUserId = adminCreateResponse.body._id;

        return AuthClient.login(userFactory.buildLoginPayload(adminUser));
      })
      .then((adminLoginResponse) => {
        expect(adminLoginResponse.status).to.eq(200);
        adminToken = adminLoginResponse.body.authorization;

        LoginPage.visit();
        LoginPage.fillCredentials(adminUser.email, adminUser.password);
        LoginPage.submit();

        cy.url().should('include', '/admin/home');
        AdminProductsPage.assertAdminMenuVisible();

        AdminProductsPage.goToCreateProductPage();
        cy.url().should('include', '/admin/cadastrarprodutos');

        AdminProductsPage.fillCreateProductForm(product);
        AdminProductsPage.submitCreateProductForm();

        AdminProductsPage.assertRedirectedToProductsList();
        AdminProductsPage.assertProductInAdminList(product.nome);

        return ProductsClient.list({ nome: product.nome });
      })
      .then((listResponse) => {
        const product = (listResponse.body.produtos || []).find(
          (item) => item.nome === createdProductName
        );

        expect(product, 'Produto cadastrado deve existir na API').to.exist;
        createdProductId = product._id;
      });
  });
});
