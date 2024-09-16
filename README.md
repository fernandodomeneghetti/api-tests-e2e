# Aula: Testes End-to-End com Cypress para uma API RESTful

## Objetivo

Nesta aula, vamos aprender a criar testes end-to-end (E2E) utilizando Cypress para uma API RESTful.

### Pré-requisitos
- Node.js instalado
- Cypress instalado (npm install cypress --save-dev)
- Conhecimento básico de JavaScript e APIs RESTful

### Passo a Passo
#### 1. Configuração do Projeto
Inicialize um projeto Node.js:

```
npm init -y
````

Instale o Cypress:

```
npm install cypress --save-dev
```

Abra o Cypress:

```
npx cypress open
```

#### 2. Estrutura do Projeto
A estrutura do projeto deve ser algo como:

```
/integration
    /api
      delete_user_spec.js
```

#### 3. Escrevendo o Teste
Vamos criar um arquivo de teste para o endpoint de deleção de usuários.

```
Arquivo: cypress/e2e/api/delete_user_spec.js
```

```javascript
describe('API Test - Delete User', () => {
  const baseUrl = 'http://localhost:3000/api'; // Substitua pela URL da sua API

  it('Deve deletar um usuário existente', () => {
    const userId = 1; // Substitua pelo ID do usuário que deseja deletar

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/usuario/${userId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('Deve retornar 404 para usuário não encontrado', () => {
    const userId = 9999; // ID de um usuário que não existe

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/usuario/${userId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('description', 'Usuário não encontrado');
    });
  });
});
```

#### 4. Executando o Teste
Para executar o teste, você pode usar o Cypress Test Runner ou rodar via linha de comando:

```
npx cypress run
```

### Explicação do Código
Base URL: Definimos a URL base da API.

#### Teste de Deleção de Usuário Existente:
Enviamos uma requisição DELETE para o endpoint /usuarios/{id}.
Verificamos se o status da resposta é 204.

#### Teste de Usuário Não Encontrado:
Enviamos uma requisição DELETE para um ID de usuário que não existe.
Verificamos se o status da resposta é 404 e se a mensagem de erro está correta.

### Conclusão
Nesta aula, aprendemos a configurar o Cypress e escrever testes end-to-end para uma API RESTful. Testamos alguns endpoints de usuários, verificando tanto o sucesso quanto o erro de usuário não encontrado.