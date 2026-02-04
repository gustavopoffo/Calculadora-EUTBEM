# Simulador de Consórcio (API)

API serverless para simulação de consórcio. Hospedada na Vercel e usada como ferramenta HTTP por agente no n8n.

## Deploy na Vercel

1. **Instale o Vercel CLI** (se ainda não tiver):
   ```bash
   npm i -g vercel
   ```

2. **Faça login e deploy** na pasta do projeto:
   ```bash
   cd c:\Simulador
   vercel
   ```
   Siga as perguntas (link com projeto existente ou novo). Na primeira vez use `vercel --prod` para produção.

3. **Ou conecte pelo GitHub:**
   - No [dashboard da Vercel](https://vercel.com/dashboard), **Add New** → **Project**
   - Importe o repositório deste projeto
   - Root Directory: `./` (deixe em branco)
   - Deploy

## Endpoint

Após o deploy, a URL será algo como:
`https://seu-projeto.vercel.app/api/simulador`

### Uso

**GET**
```
GET https://seu-projeto.vercel.app/api/simulador?valor=50000&tipo=auto
```

**POST** (body JSON)
```json
{
  "valor": 50000,
  "tipo": "auto"
}
```

- `valor` (obrigatório): número, valor do crédito em reais
- `tipo` (opcional): `"auto"`, `"imovel"` ou `"casa"`

### Resposta

- Sucesso: `{ "message": "SIMULAÇÃO PRONTA: ..." }`
- Erro: `{ "error": "..." }`

## Estrutura do projeto

```
Simulador/
├── api/
│   └── simulador.js   ← função serverless (endpoint /api/simulador)
├── package.json
├── .gitignore
└── README.md
```

A pasta `api/` é obrigatória para a Vercel expor a função como HTTP.
