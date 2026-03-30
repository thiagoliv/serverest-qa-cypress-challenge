function buildUniqueSuffix() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function uniqueEmail(prefix = 'qa') {
  return `${prefix}+${buildUniqueSuffix()}@qa.com.br`;
}

function uniqueProductName(prefix = 'Produto QA') {
  return `${prefix} ${buildUniqueSuffix()}`;
}

function uniquePersonName(prefix = 'Usuario QA') {
  return `${prefix} ${buildUniqueSuffix()}`;
}

module.exports = {
  buildUniqueSuffix,
  uniqueEmail,
  uniqueProductName,
  uniquePersonName
};
