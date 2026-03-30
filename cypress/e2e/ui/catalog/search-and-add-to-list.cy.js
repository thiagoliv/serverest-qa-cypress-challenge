const AuthClient = require('../../../api-clients/AuthClient');
const UsersClient = require('../../../api-clients/UsersClient');
const ProductsClient = require('../../../api-clients/ProductsClient');
const userFactory = require('../../../factories/userFactory');
const { buildProduct } = require('../../../factories/productFactory');
const LoginPage = require('../../../pages/LoginPage');
const ProductsListPage = require('../../../pages/ProductsListPage');

describe('UI - Cliente pesquisa e adiciona produto na lista', () => {
  let userIds = [];
  let adminToken;
  let createdProductId;

  afterEach(() => {
    return cy
      .then(() => {
        if (!createdProductId || !adminToken) {
          return;
        }

        return ProductsClient.delete(createdProductId, adminToken, {
          failOnStatusCode: false
        });
      })
      .then(() => {
        if (!userIds.length) {
          return;
        }

        return cy.wrap([...userIds].reverse()).each((userId) => {
          UsersClient.delete(userId, { failOnStatusCode: false });
        });
      })
      .then(() => {
        userIds = [];
        adminToken = null;
        createdProductId = null;
      });
  });

  it('usuario cliente loga, pesquisa produto e adiciona a lista de compras', () => {
    const adminUser = userFactory.buildAdmin();
    const clientUser = userFactory.buildClient();
    const product = buildProduct();

    UsersClient.create(adminUser)
      .then((adminCreateResponse) => {
        expect(adminCreateResponse.status).to.eq(201);
        userIds.push(adminCreateResponse.body._id);

        return AuthClient.login(userFactory.buildLoginPayload(adminUser));
      })
      .then((adminLoginResponse) => {
        expect(adminLoginResponse.status).to.eq(200);
        adminToken = adminLoginResponse.body.authorization;

        return ProductsClient.create(product, adminToken);
      })
      .then((createProductResponse) => {
        expect(createProductResponse.status).to.eq(201);
        createdProductId = createProductResponse.body._id;

        return UsersClient.create(clientUser);
      })
      .then((clientCreateResponse) => {
        expect(clientCreateResponse.status).to.eq(201);
        userIds.push(clientCreateResponse.body._id);

        LoginPage.visit();
        LoginPage.fillCredentials(clientUser.email, clientUser.password);
        LoginPage.submit();

        ProductsListPage.assertCustomerHomeVisible();
        ProductsListPage.searchProduct(product.nome);

        cy.contains(product.nome).should('be.visible');

        ProductsListPage.addFirstResultToShoppingList();
        ProductsListPage.assertRedirectedToShoppingList();
        ProductsListPage.assertProductInShoppingList(product.nome);
      });
  });
});
