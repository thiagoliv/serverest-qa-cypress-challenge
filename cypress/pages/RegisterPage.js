class RegisterPage {
  assertLoaded() {
    cy.contains('h1, h2', 'Cadastro').should('be.visible');
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="cadastrarUsuario"]').length > 0) {
        cy.getByTestId('cadastrarUsuario').should('be.visible');
        return;
      }

      if ($body.find('[data-testid="cadastrar"]').length > 0) {
        cy.getByTestId('cadastrar').should('be.visible');
        return;
      }

      cy.contains('button', 'Cadastrar').should('be.visible');
    });
  }

  typeName(name) {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="nome"]').length > 0) {
        cy.getByTestId('nome').first().clear().type(name);
      } else {
        cy.get('input[name="nome"], input[type="text"]').first().clear().type(name);
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
      if ($body.find('[data-testid="password"]').length > 0) {
        cy.getByTestId('password').first().clear().type(password, { log: false });
        return;
      }

      if ($body.find('[data-testid="senha"]').length > 0) {
        cy.getByTestId('senha').first().clear().type(password, { log: false });
        return;
      }

      cy.get('input[name="password"], input[type="password"]').first().clear().type(password, {
        log: false
      });
    });
  }

  submit() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="cadastrarUsuario"]').length > 0) {
        cy.getByTestId('cadastrarUsuario').click();
        return;
      }

      if ($body.find('[data-testid="cadastrar"]').length > 0) {
        cy.getByTestId('cadastrar').click();
        return;
      }

      cy.contains('button', 'Cadastrar').click();
    });
  }

  fillForm(user) {
    this.typeName(user.nome);
    this.typeEmail(user.email);
    this.typePassword(user.password);
  }
}

module.exports = new RegisterPage();
