const AuthClient = require('../../../api-clients/AuthClient');
const UsersClient = require('../../../api-clients/UsersClient');
const userFactory = require('../../../factories/userFactory');
const { expectStatus, expectMessage, expectNonEmptyProperty } = require('../../../utils/assertions');

describe('API - Login', () => {
  let cleanupTasks = [];

  afterEach(() => {
    cleanupTasks.slice().reverse().forEach((task) => task());
    cleanupTasks = [];
  });

  it('cria um usuario cliente e realiza login com sucesso', () => {
    const user = userFactory.buildClient();

    UsersClient.create(user).then((createResponse) => {
      expectStatus(createResponse, 201);
      expectMessage(createResponse, 'Cadastro realizado com sucesso');

      const userId = createResponse.body._id;
      cleanupTasks.push(() => UsersClient.delete(userId, { failOnStatusCode: false }));

      return AuthClient.login(userFactory.buildLoginPayload(user));
    }).then((loginResponse) => {
      expectStatus(loginResponse, 200);
      expectMessage(loginResponse, 'Login realizado com sucesso');
      expectNonEmptyProperty(loginResponse.body, 'authorization');
    });
  });

  it('retorna 401 para credenciais invalidas', () => {
    AuthClient.login({
      email: `naoexiste-${Date.now()}@qa.com.br`,
      password: 'senha-invalida'
    }).then((response) => {
      expectStatus(response, 401);
      expectMessage(response, 'Email e/ou senha inválidos');
    });
  });
});
