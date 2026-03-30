class LoginPage {
  visit() {
    cy.visit('/');
  }

  assertLoaded() {
    cy.contains('h1, h2', 'Login').should('be.visible');
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="entrar"]').length > 0) {
        cy.getByTestId('entrar').should('be.visible');
      } else {
        cy.contains('button', 'Entrar').should('be.visible');
      }
    });
  }

  typeEmail(email) {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="email"]').length > 0) {
        cy.getByTestId('email').first().clear().type(email);
      } else {
        cy.get('input[name="email"], input[type="email"]').first().clear().type(email);
      }
    });
  }

  typePassword(password) {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="senha"]').length > 0) {
        cy.getByTestId('senha').first().clear().type(password, { log: false });
        return;
      }

      if ($body.find('[data-testid="password"]').length > 0) {
        cy.getByTestId('password').first().clear().type(password, { log: false });
        return;
      }

      cy.get('input[name="password"], input[type="password"]').first().clear().type(password, {
        log: false
      });
    });
  }

  submit() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="entrar"]').length > 0) {
        cy.getByTestId('entrar').click();
      } else {
        cy.contains('button', 'Entrar').click();
      }
    });
  }

  goToRegister() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="cadastrarUsuarios"]').length > 0) {
        cy.getByTestId('cadastrarUsuarios').click();
      } else {
        cy.contains('a', 'Cadastre-se').click();
      }
    });
  }

  fillCredentials(email, password) {
    this.typeEmail(email);
    this.typePassword(password);
  }
}

module.exports = new LoginPage();
