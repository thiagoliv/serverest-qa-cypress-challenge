# serverest-qa-cypress-challenge

Base inicial de automacao para o desafio ServeRest usando Cypress com JavaScript.

## Stack

- Cypress para UI e API
- JavaScript
- Page Object Model para fluxos visuais
- API clients e factories para requests e dados

## Estrutura principal

```text
cypress/
	e2e/
		api/
		ui/
	api-clients/
	factories/
	pages/
	support/
	utils/
```

## Como instalar

```bash
npm install
```

## Como executar

```bash
npm run cy:open
npm run cy:run
npm run test:api
npm run test:ui
```

## Variaveis relevantes

- baseUrl do frontend: https://front.serverest.dev
- apiUrl da API: https://serverest.dev

## Cenarios validados

### API

- Login com credenciais validas e invalidas.
- Gestao de produtos com usuario administrador.
- Fluxos de carrinho (criacao e validacoes principais).

### UI

- Cadastro e login de usuario pela interface.
- Busca de produtos e adicao na lista.
- Criacao de produto pela area administrativa.
- Validacao de rotas protegidas para usuarios nao autenticados.
