const AuthClient = require('../../../api-clients/AuthClient');
const UsersClient = require('../../../api-clients/UsersClient');
const ProductsClient = require('../../../api-clients/ProductsClient');
const CartsClient = require('../../../api-clients/CartsClient');
const userFactory = require('../../../factories/userFactory');
const { buildProduct } = require('../../../factories/productFactory');
const { buildSingleItemCart } = require('../../../factories/cartFactory');
const { expectStatus, expectMessage } = require('../../../utils/assertions');

describe('API - Carrinhos', () => {
  let cleanupTasks = [];

  afterEach(() => {
    cleanupTasks.slice().reverse().forEach((task) => task());
    cleanupTasks = [];
  });

  it('cria carrinho e cancela compra repondo o estoque do produto', () => {
    const adminUser = userFactory.buildAdmin();
    const clientUser = userFactory.buildClient();
    const product = buildProduct({ quantidade: 25 });
    let adminToken;
    let clientToken;
    let productId;

    UsersClient.create(adminUser).then((createAdminResponse) => {
      expectStatus(createAdminResponse, 201);
      const adminUserId = createAdminResponse.body._id;
      cleanupTasks.push(() => UsersClient.delete(adminUserId, { failOnStatusCode: false }));

      return AuthClient.login(userFactory.buildLoginPayload(adminUser));
    }).then((adminLoginResponse) => {
      expectStatus(adminLoginResponse, 200);
      adminToken = adminLoginResponse.body.authorization;

      return ProductsClient.create(product, adminToken);
    }).then((createProductResponse) => {
      expectStatus(createProductResponse, 201);
      productId = createProductResponse.body._id;
      cleanupTasks.push(() => ProductsClient.delete(productId, adminToken, { failOnStatusCode: false }));

      return UsersClient.create(clientUser);
    }).then((createClientResponse) => {
      expectStatus(createClientResponse, 201);
      const clientUserId = createClientResponse.body._id;
      cleanupTasks.push(() => UsersClient.delete(clientUserId, { failOnStatusCode: false }));

      return AuthClient.login(userFactory.buildLoginPayload(clientUser));
    }).then((clientLoginResponse) => {
      expectStatus(clientLoginResponse, 200);
      clientToken = clientLoginResponse.body.authorization;

      return CartsClient.create(buildSingleItemCart(productId, 2), clientToken);
    }).then((createCartResponse) => {
      expectStatus(createCartResponse, 201);
      expectMessage(createCartResponse, 'Cadastro realizado com sucesso');

      cleanupTasks.push(() => CartsClient.cancelPurchase(clientToken, { failOnStatusCode: false }));

      return ProductsClient.getById(productId);
    }).then((productAfterCartResponse) => {
      expectStatus(productAfterCartResponse, 200);
      expect(productAfterCartResponse.body.quantidade).to.eq(23);

      return CartsClient.cancelPurchase(clientToken);
    }).then((cancelCartResponse) => {
      expectStatus(cancelCartResponse, 200);
      expect(cancelCartResponse.body.message).to.match(/Registro excluído com sucesso|Registro excluido com sucesso/);

      cleanupTasks = cleanupTasks.filter((task, index) => index !== cleanupTasks.length - 1);

      return ProductsClient.getById(productId);
    }).then((productAfterCancelResponse) => {
      expectStatus(productAfterCancelResponse, 200);
      expect(productAfterCancelResponse.body.quantidade).to.eq(25);
    });
  });
});
