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