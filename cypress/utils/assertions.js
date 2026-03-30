function expectStatus(response, expectedStatus) {
  expect(response.status).to.eq(expectedStatus);
}

function expectMessage(response, expectedMessage) {
  expect(response.body).to.have.property('message', expectedMessage);
}

function expectNonEmptyProperty(subject, propertyName) {
  expect(subject).to.have.property(propertyName);
  expect(subject[propertyName]).to.not.be.empty;
}

module.exports = {
  expectStatus,
  expectMessage,
  expectNonEmptyProperty
};
