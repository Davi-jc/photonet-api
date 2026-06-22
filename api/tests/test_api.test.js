const request = require('supertest');
const app = require('../app');

// ──────────────────────────────────────────────────────────────────────────────
// Testes unitários — PhotoNet API
// Utiliza supertest para realizar requisições HTTP ao app Express sem precisar
// subir um servidor real, o que torna os testes mais rápidos e isolados.
// ──────────────────────────────────────────────────────────────────────────────

describe('GET /photos', () => {
  // TESTE 1 (obrigatório)
  // Verifica se a rota principal retorna HTTP 200
  it('deve retornar status HTTP 200', async () => {
    const res = await request(app).get('/photos');
    expect(res.statusCode).toBe(200);
  });

  // TESTE 2 (obrigatório)
  // Verifica se a estrutura do JSON retornado contém os campos obrigatórios
  // em cada item: id, usuario, titulo, categoria, curtidas, publicada_em
  it('deve retornar JSON com campos obrigatórios em cada foto', async () => {
    const res = await request(app).get('/photos');
    expect(res.body).toHaveProperty('total');
    expect(res.body).toHaveProperty('dados');
    expect(Array.isArray(res.body.dados)).toBe(true);

    const camposObrigatorios = ['id', 'usuario', 'titulo', 'categoria', 'curtidas', 'publicada_em'];
    res.body.dados.forEach((foto) => {
      camposObrigatorios.forEach((campo) => {
        expect(foto).toHaveProperty(campo);
      });
    });
  });
});

describe('GET /photos/:id', () => {
  // TESTE 3 (obrigatório)
  // Verifica se um id inexistente retorna HTTP 404
  it('deve retornar HTTP 404 para um id que não existe', async () => {
    const res = await request(app).get('/photos/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });

  // TESTE 4 (autoria própria — justificativa no relatório)
  // Verifica se a rota retorna corretamente um registro válido pelo id,
  // garantindo que os dados retornados correspondem ao id solicitado.
  // Esse teste é importante porque valida a lógica de busca por id,
  // não apenas que a rota existe — um teste de integração pontual.
  it('deve retornar a foto correta ao buscar por id válido', async () => {
    const res = await request(app).get('/photos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('usuario');
    expect(res.body).toHaveProperty('titulo');
    expect(typeof res.body.curtidas).toBe('number');
  });
});

describe('GET /status', () => {
  // Teste extra: garante que o endpoint de health check responde corretamente
  it('deve retornar status online com campos nome, versao e status', async () => {
    const res = await request(app).get('/status');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nome');
    expect(res.body).toHaveProperty('versao');
    expect(res.body.status).toBe('online');
  });
});
