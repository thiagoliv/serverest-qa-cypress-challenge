Cypress.Commands.add('getByTestId', (testId, options = {}) => {
  return cy.get(`[data-testid="${testId}"]`, options);
});

Cypress.Commands.add('getByAnyTestId', (testIds, options = {}) => {
  return cy.get('body').then(($body) => {
    const found = testIds.find((testId) => $body.find(`[data-testid="${testId}"]`).length > 0);
    expect(found, `Nenhum data-testid encontrado entre: ${testIds.join(', ')}`).to.exist;
    return cy.get(`[data-testid="${found}"]`, options);
  });
});
