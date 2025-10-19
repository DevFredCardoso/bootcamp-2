# Usa imagem base com Playwright e Chromium
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

WORKDIR /app

# Instala dependências do Node
COPY package*.json ./
RUN npm ci --silent

# Copia o projeto
COPY . .

# Gera o build da extensão
RUN npm run build

# Executa os testes
CMD ["npm", "run", "test:e2e"]
