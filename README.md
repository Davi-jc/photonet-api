# PhotoNet API

API REST desenvolvida como Trabalho Final da disciplina de **Cloud Computing** do curso de Bacharelado em Sistemas de Informação — **UNIDAVI**.

O tema deste projeto é **Infraestrutura para uma Rede Social de Fotos**. A API simula o backend de uma rede social onde usuários publicam fotografias, com metadados realistas como categoria, curtidas, tags e resolução.

---

## Pré-requisitos

### Sem container (execução local)
- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (incluído com o Node.js)

### Com container
- [Docker](https://www.docker.com/) instalado e em execução

---

## Estrutura de Diretórios

```
photonet-api/
├── api/
│   ├── app.js              # Código-fonte da API (Express)
│   ├── data/
│   │   └── photos.json     # Dados simulados (12 registros)
│   └── tests/
│       └── test_api.test.js # Testes unitários (Jest + Supertest)
├── .github/
│   └── workflows/
│       └── ci.yml          # Pipeline de CI com GitHub Actions
├── .eslintrc.json          # Configuração do ESLint
├── package.json
└── README.md
```

---

## Execução Local (sem container)

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/photonet-api.git
cd photonet-api

# 2. Instale as dependências
npm install

# 3. Inicie a API
npm start
```

A API estará disponível em: `http://localhost:3000`

---

## Execução com Docker

```bash
# 1. Build da imagem
docker build -t photonet-api .

# 2. Execute o container
docker run -p 3000:3000 photonet-api
```

A API estará disponível em: `http://localhost:3000`

---

## Endpoints

| Método | Rota           | Descrição                              |
|--------|----------------|----------------------------------------|
| GET    | `/status`      | Health check da aplicação              |
| GET    | `/photos`      | Lista todas as fotos (12 registros)    |
| GET    | `/photos/:id`  | Retorna uma foto pelo ID               |

### Exemplos de resposta

**GET /status**
```json
{
  "nome": "PhotoNet API",
  "versao": "1.0.0",
  "status": "online",
  "timestamp": "2026-06-22T10:00:00.000Z"
}
```

**GET /photos/1**
```json
{
  "id": 1,
  "usuario": "ana_fotografa",
  "titulo": "Pôr do sol na Lagoa da Conceição",
  "categoria": "paisagem",
  "curtidas": 312,
  "tags": ["pordosol", "florianopolis"],
  "publicada_em": "2026-05-10T18:32:00Z"
}
```

**GET /photos/99999** → HTTP 404
```json
{ "erro": "Foto com id 99999 não encontrada." }
```

---

## Testes Unitários

```bash
# Executa os testes com relatório de cobertura
npm test
```

Os 5 testes cobrem:
1. `GET /photos` retorna HTTP 200
2. `GET /photos` retorna JSON com campos obrigatórios em cada registro
3. `GET /photos/:id` retorna HTTP 404 para ID inexistente
4. `GET /photos/:id` retorna o registro correto para ID válido *(autoria própria)*
5. `GET /status` retorna status `online` com campos `nome` e `versao`

---

## Análise Estática (Lint)

```bash
npm run lint
```

Utiliza ESLint com regras de boas práticas para Node.js.

---

## Pipeline de CI

O arquivo `.github/workflows/ci.yml` configura o pipeline de Integração Contínua com GitHub Actions, que é acionado automaticamente a cada `push` ou `pull request` na branch `main`.

**Etapas do pipeline:**
1. Checkout do código
2. Configuração do Node.js (testado nas versões 18.x e 20.x)
3. Instalação de dependências
4. Análise estática com ESLint
5. Execução dos testes com cobertura
6. Upload do relatório de cobertura como artefato

---

## Tecnologias Utilizadas

- **Node.js** + **Express** — servidor HTTP da API
- **Jest** + **Supertest** — testes unitários
- **ESLint** — análise estática de código
- **GitHub Actions** — pipeline de CI
