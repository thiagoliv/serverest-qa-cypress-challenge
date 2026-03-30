class ProductsListPage {
  visit() {
    cy.visit('/home');
  }

  assertProtectedByLogin() {
    cy.contains('h1, h2', 'Login').should('be.visible');
  }

  assertCustomerHomeVisible() {
    cy.url().should('include', '/home');

    cy.get('body').then(($body) => {
      const preferredTestIds = ['shopping-cart-button', 'listaProdutos', 'pesquisar', 'botaoPesquisar'];
      const found = preferredTestIds.find((testId) =>
        $body.find(`[data-testid="${testId}"]`).length > 0
      );

      if (found) {
        cy.getByTestId(found).should('be.visible');
      } else {
        cy.contains('h1, h2', /Serverest Store|Produtos/).should('be.visible');
      }
    });

    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="logout"]').length > 0) {
        cy.getByTestId('logout').should('be.visible');
      } else {
        cy.contains('button, a', 'Logout').should('be.visible');
      }
    });
  }

  searchProduct(productName) {
    cy.getByTestId('pesquisar').clear().type(productName);
    cy.getByTestId('botaoPesquisar').click();
  }

  addFirstResultToShoppingList() {
    cy.getByTestId('adicionarNaLista').first().click();
  }

  assertRedirectedToShoppingList() {
    cy.url().should('include', '/minhaListaDeProdutos');
    cy.getByAnyTestId(['shopping-cart-product-name', 'shopping-cart-empty-message']).should('be.visible');
  }

  assertProductInShoppingList(productName) {
    cy.getByTestId('shopping-cart-product-name').should('contain.text', productName);
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

module.exports = new ProductsListPage();
