const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Caminho para o arquivo de dados simulados
const DATA_PATH = path.join(__dirname, 'data', 'photos.json');

/**
 * Carrega os dados do arquivo JSON externo.
 * Lança um erro se o arquivo não puder ser lido.
 */
function loadPhotos() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

// ──────────────────────────────────────────────
// GET /status
// Retorna informações de saúde da aplicação
// ──────────────────────────────────────────────
app.get('/status', (req, res) => {
  res.status(200).json({
    nome: 'PhotoNet API',
    versao: '1.0.0',
    status: 'online',
    descricao: 'API REST de rede social de fotos — Trabalho Final Cloud Computing UNIDAVI',
    timestamp: new Date().toISOString(),
  });
});

// ──────────────────────────────────────────────
// GET /photos
// Retorna todos os registros de fotos simulados
// ──────────────────────────────────────────────
app.get('/photos', (req, res) => {
  try {
    const photos = loadPhotos();
    res.status(200).json({
      total: photos.length,
      dados: photos,
    });
  } catch (err) {
    res.status(500).json({
      erro: 'Erro interno ao carregar os dados.',
      detalhe: err.message,
    });
  }
});

// ──────────────────────────────────────────────
// GET /photos/:id
// Retorna uma única foto pelo identificador
// ──────────────────────────────────────────────
app.get('/photos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ erro: 'O parâmetro id deve ser um número inteiro.' });
    }

    const photos = loadPhotos();
    const photo = photos.find((p) => p.id === id);

    if (!photo) {
      return res.status(404).json({ erro: `Foto com id ${id} não encontrada.` });
    }

    res.status(200).json(photo);
  } catch (err) {
    res.status(500).json({
      erro: 'Erro interno ao carregar os dados.',
      detalhe: err.message,
    });
  }
});

// Inicia o servidor apenas quando executado diretamente (não em testes)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`PhotoNet API rodando na porta ${PORT}`);
  });
}

module.exports = app;
