#!/bin/bash

# Script para deploy no Vercel

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniciando deploy no Vercel...${NC}"

# Verificar se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Instalando Vercel CLI...${NC}"
    npm install -g vercel
fi

# Deploy do frontend
echo -e "${YELLOW}Deploy do frontend...${NC}"
cd frontend
vercel --prod

# Deploy do admin
echo -e "${YELLOW}Deploy do admin...${NC}"
cd ../admin
vercel --prod

echo -e "${GREEN}Deploy concluído!${NC}"
echo -e "${YELLOW}Lembre-se de configurar as variáveis de ambiente no Vercel:${NC}"
echo -e "VITE_API_URL=https://seu-backend.onrender.com" 