# Guia de Deploy para o Projeto Food Delivery

Este guia fornece instruções detalhadas para fazer o deploy do backend no Render e do frontend/admin no Vercel.

## Estrutura do Projeto

```
food_del/
├── admin/         # Aplicação de administração (Vercel)
├── backend/       # Servidor backend (Render)
└── frontend/      # Aplicação frontend (Vercel)
```

## Deploy do Backend no Render

### Passo 1: Criar uma conta no Render

1. Acesse [render.com](https://render.com)
2. Crie uma conta ou faça login

### Passo 2: Criar um novo Web Service

1. No dashboard do Render, clique em "New" e selecione "Web Service"
2. Conecte seu repositório GitHub

### Passo 3: Configurar o serviço

1. **Nome**: `food-delivery-backend`
2. **Root Directory**: `backend`
3. **Environment**: `Node`
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`

### Passo 4: Configurar variáveis de ambiente

Adicione as seguintes variáveis de ambiente:

- `MONGODB_URI`: `mongodb+srv://cgrsobral:0WHeOvoR21sAIwJo@cluster0.tccjxvn.mongodb.net/food_delivery`
- `JWT_SECRET`: `random#secret`
- `NODE_ENV`: `production`
- `FRONTEND_URL`: `https://frontend-five-amber-71.vercel.app`
- `ADMIN_URL`: `https://admin-black-rho.vercel.app`

### Passo 5: Deploy

1. Clique em "Create Web Service"
2. Aguarde o deploy ser concluído
3. Anote a URL do seu backend (ex: `https://food-delivery-backend.onrender.com`)

## Deploy do Frontend no Vercel

### Passo 1: Criar uma conta no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Crie uma conta ou faça login

### Passo 2: Importar o repositório

1. Clique em "Add New" e selecione "Project"
2. Conecte seu repositório GitHub
3. Selecione o repositório do projeto

### Passo 3: Configurar o projeto

1. **Framework Preset**: `Vite`
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### Passo 4: Configurar variáveis de ambiente

Adicione a seguinte variável de ambiente:

- `VITE_API_URL`: URL do seu backend no Render (ex: `https://food-delivery-backend.onrender.com`)

### Passo 5: Deploy

1. Clique em "Deploy"
2. Aguarde o deploy ser concluído
3. Anote a URL do seu frontend (ex: `https://frontend-five-amber-71.vercel.app`)

## Deploy do Admin no Vercel

### Passo 1: Importar o repositório

1. Clique em "Add New" e selecione "Project"
2. Conecte seu repositório GitHub (se ainda não estiver conectado)
3. Selecione o repositório do projeto

### Passo 2: Configurar o projeto

1. **Framework Preset**: `Vite` (ou o framework usado no admin)
2. **Root Directory**: `admin`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### Passo 3: Configurar variáveis de ambiente

Adicione a seguinte variável de ambiente:

- `VITE_API_URL`: URL do seu backend no Render (ex: `https://food-delivery-backend.onrender.com`)

### Passo 4: Deploy

1. Clique em "Deploy"
2. Aguarde o deploy ser concluído
3. Anote a URL do seu admin (ex: `https://admin-black-rho.vercel.app`)

## Deploy Automático com o Script

Para facilitar o deploy, você pode usar o script `vercel-deploy.sh`:

1. Abra o terminal
2. Navegue até a pasta do projeto
3. Execute o script:
   ```bash
   ./vercel-deploy.sh
   ```
4. Siga as instruções na tela

## Verificação do Deploy

Após o deploy, verifique se tudo está funcionando corretamente:

1. Acesse o frontend: [https://frontend-five-amber-71.vercel.app/](https://frontend-five-amber-71.vercel.app/)
2. Acesse o admin: [https://admin-black-rho.vercel.app/](https://admin-black-rho.vercel.app/)
3. Verifique se as aplicações conseguem se comunicar com o backend
4. Verifique se não há erros CORS no console do navegador

## Troubleshooting

### Problemas com CORS

Se você encontrar problemas com CORS:

1. Verifique se as URLs do frontend e admin estão corretamente configuradas no backend
2. Verifique se a variável `VITE_API_URL` está configurada corretamente no frontend e admin
3. Verifique os logs do backend no Render para identificar problemas

### Problemas de Conexão com o MongoDB

Se você encontrar problemas de conexão com o MongoDB:

1. Verifique se a string de conexão está correta
2. Verifique se o IP do Render está na lista de IPs permitidos no MongoDB Atlas
3. Verifique os logs do backend no Render para identificar problemas

### Problemas de Build

Se você encontrar problemas de build:

1. Verifique os logs de build no Vercel
2. Verifique se todas as dependências estão instaladas corretamente
3. Verifique se o Node.js está na versão correta 