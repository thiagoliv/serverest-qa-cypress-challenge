const UsersClient = require('../../../api-clients/UsersClient');
const userFactory = require('../../../factories/userFactory');
const LoginPage = require('../../../pages/LoginPage');
const RegisterPage = require('../../../pages/RegisterPage');
const ProductsListPage = require('../../../pages/ProductsListPage');

describe('UI - Cadastro e login', () => {
  let createdUserEmail;

  afterEach(() => {
    if (!createdUserEmail) {
      return;
    }

    return UsersClient.list({ email: createdUserEmail }).then((listResponse) => {
      const user = (listResponse.body.usuarios || []).find((item) => item.email === createdUserEmail);

      if (!user) {
        createdUserEmail = null;
        return;
      }

      return UsersClient.delete(user._id, { failOnStatusCode: false }).then(() => {
        createdUserEmail = null;
      });
    });
  });

  it('cadastra cliente via UI e autentica com sucesso', () => {
    const user = userFactory.buildClient();
    createdUserEmail = user.email;

    cy.intercept('POST', '**/usuarios').as('registerUser');

    LoginPage.visit();
    LoginPage.goToRegister();

    RegisterPage.assertLoaded();
    RegisterPage.fillForm(user);
    RegisterPage.submit();

    cy.wait('@registerUser').then(({ response }) => {
      expect(response?.statusCode).to.eq(201);
    });

    cy.visit('/');
    LoginPage.fillCredentials(user.email, user.password);
    LoginPage.submit();

    cy.url().should('include', '/home');
    ProductsListPage.assertCustomerHomeVisible();
    ProductsListPage.logout();
    LoginPage.assertLoaded();
  });
});
