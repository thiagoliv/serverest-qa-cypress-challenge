const AuthClient = require('../../../api-clients/AuthClient');
const UsersClient = require('../../../api-clients/UsersClient');
const ProductsClient = require('../../../api-clients/ProductsClient');
const userFactory = require('../../../factories/userFactory');
const { buildProduct } = require('../../../factories/productFactory');
const { expectStatus, expectMessage } = require('../../../utils/assertions');

describe('API - Produtos administrativos', () => {
  let cleanupTasks = [];

  afterEach(() => {
    cleanupTasks.slice().reverse().forEach((task) => task());
    cleanupTasks = [];
  });

  it('permite que um administrador cadastre um produto com sucesso', () => {
    const adminUser = userFactory.buildAdmin();
    const product = buildProduct();
    let adminToken;

    UsersClient.create(adminUser).then((createAdminResponse) => {
      expectStatus(createAdminResponse, 201);
      const adminUserId = createAdminResponse.body._id;
      cleanupTasks.push(() => UsersClient.delete(adminUserId, { failOnStatusCode: false }));

      return AuthClient.login(userFactory.buildLoginPayload(adminUser));
    }).then((loginResponse) => {
      expectStatus(loginResponse, 200);
      adminToken = loginResponse.body.authorization;

      return ProductsClient.create(product, adminToken);
    }).then((createProductResponse) => {
      expectStatus(createProductResponse, 201);
      expectMessage(createProductResponse, 'Cadastro realizado com sucesso');

      const productId = createProductResponse.body._id;
      cleanupTasks.push(() => ProductsClient.delete(productId, adminToken, { failOnStatusCode: false }));

      return ProductsClient.getById(productId);
    }).then((getProductResponse) => {
      expectStatus(getProductResponse, 200);
      expect(getProductResponse.body.nome).to.eq(product.nome);
      expect(getProductResponse.body.descricao).to.eq(product.descricao);
    });
  });

  it('retorna 403 quando um cliente tenta cadastrar produto', () => {
    const clientUser = userFactory.buildClient();
    const product = buildProduct();

    UsersClient.create(clientUser).then((createClientResponse) => {
      expectStatus(createClientResponse, 201);
      const clientUserId = createClientResponse.body._id;
      cleanupTasks.push(() => UsersClient.delete(clientUserId, { failOnStatusCode: false }));

      return AuthClient.login(userFactory.buildLoginPayload(clientUser));
    }).then((loginResponse) => {
      expectStatus(loginResponse, 200);

      return ProductsClient.create(product, loginResponse.body.authorization, {
        failOnStatusCode: false
      });
    }).then((createProductResponse) => {
      expectStatus(createProductResponse, 403);
      expectMessage(createProductResponse, 'Rota exclusiva para administradores');
    });
  });
});
