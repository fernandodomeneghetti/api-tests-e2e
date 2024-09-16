describe('API Test - Get Users', () => {
    const baseUrl = 'http://localhost:3000'; // Substitua pela URL da sua API
  
    it('Deve obter todos os usuários', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/usuario/all`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });
  
    it('Deve obter um usuário por ID', () => {
      const userId = 2; // Substitua pelo ID do usuário que deseja obter
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/usuario/getById/${userId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', userId);
        expect(response.body).to.have.property('nome');
      });
    });
  
    it('Deve retornar 404 para usuário não encontrado', () => {
      const userId = 9999; // ID de um usuário que não existe
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/usuario/getById/${userId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('message', 'Usuário não encontrado');
      });
    });
  });