class AdminProductsPage {
  visit() {
    cy.visit('/admin/home');
  }

  assertProtectedByLogin() {
    cy.contains('h1, h2', 'Login').should('be.visible');

    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="entrar"]').length > 0) {
        cy.getByTestId('entrar').should('be.visible');
      } else {
        cy.contains('button', 'Entrar').should('be.visible');
      }
    });
  }

  assertAdminMenuVisible() {
    const adminMenuTestIds = [
      'cadastrarProdutos',
      'cadastarProdutos',
      'listarProdutos',
      'cadastrarUsuarios',
      'listarUsuarios',
      'relatorios',
      'cadastrar-produtos',
      'listar-produtos'
    ];

    cy.get('body').then(($body) => {
      const found = adminMenuTestIds.find((testId) =>
        $body.find(`[data-testid="${testId}"]`).length > 0
      );

      expect(found, 'Ao menos um item administrativo deve estar visível').to.exist;

      if (found) {
        cy.getByTestId(found).should('be.visible');
      }
    });
  }

  goToCreateProductPage() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="cadastrarProdutos"]').length > 0) {
        cy.getByTestId('cadastrarProdutos').click();
        return;
      }

      if ($body.find('[data-testid="cadastrar-produtos"]').length > 0) {
        cy.getByTestId('cadastrar-produtos').click();
        return;
      }

      cy.visit('/admin/cadastrarprodutos');
    });
  }

  fillCreateProductForm(product) {
    cy.getByTestId('nome').clear().type(product.nome);
    cy.getByTestId('preco').clear().type(String(product.preco));
    cy.getByTestId('descricao').clear().type(product.descricao);
    cy.getByTestId('quantity').clear().type(String(product.quantidade));
  }

  submitCreateProductForm() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="cadastarProdutos"]').length > 0) {
        cy.getByTestId('cadastarProdutos').click();
        return;
      }

      if ($body.find('[data-testid="cadastrarProdutos"]').length > 0) {
        cy.getByTestId('cadastrarProdutos').click();
        return;
      }

      cy.contains('button', 'Cadastrar').click();
    });
  }

  assertRedirectedToProductsList() {
    cy.url().should('include', '/admin/listarprodutos');
    cy.contains('h1', 'Lista dos Produtos').should('be.visible');
  }

  assertProductInAdminList(productName) {
    cy.contains('td', productName).should('be.visible');
  }

  logout() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="logout"]').length > 0) {
        cy.getByTestId('logout').click();
      } else {
        cy.contains('button, a', 'Logout').click();
      }
    });
  }
}

module.exports = new AdminProductsPage();
