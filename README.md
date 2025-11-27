# 📺 YouTube Organizer

> Organize seus vídeos favoritos do YouTube em categorias personalizadas

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 📁 **Categorias Ilimitadas** - Crie quantas categorias quiser
- 🎬 **Informações Automáticas** - Busca título, thumbnail, views, duração via YouTube API
- 🔍 **Busca e Filtros** - Encontre vídeos rapidamente por título ou canal
- ✅ **Marcar como Visto** - Acompanhe o que já assistiu
- 📤 **Export/Import** - Faça backup dos seus dados
- 🌓 **Tema Claro/Escuro** - Escolha sua preferência
- 💾 **100% Local** - Seus dados, seu controle (LocalStorage)
- 🆓 **Totalmente Gratuito** - Sem servidor, sem custos

## 🚀 Como Usar

### 1. Obter API Key do YouTube

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative a **YouTube Data API v3**
4. Vá em **Credenciais** → **Criar credenciais** → **Chave de API**
5. Copie a chave gerada

### 2. Instalar e Rodar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/youtube-organizer.git

# Entre na pasta
cd youtube-organizer

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev
```

A aplicação abrirá em `http://localhost:3000`

### 3. Configurar API Key

1. Abra a aplicação
2. Clique em **Configurações** (⚙️)
3. Cole sua **API Key** do YouTube
4. Pronto! Agora você pode adicionar vídeos

## 📖 Como Funciona

### Adicionar Vídeos

1. Cole o link do YouTube (formatos aceitos):
   - `https://www.youtube.com/watch?v=VIDEO_ID`
   - `https://youtu.be/VIDEO_ID`
   - Ou apenas o `VIDEO_ID`

2. A aplicação busca automaticamente:
   - Título
   - Canal
   - Thumbnail
   - Visualizações
   - Duração
   - Data de publicação

### Organizar

- **Categorias**: Crie quantas quiser (Tutoriais, Música, Receitas, etc.)
- **Múltiplas categorias**: Um vídeo pode estar em várias categorias
- **Busca**: Filtre por título ou canal
- **Ordenação**: Por data, título, views, duração

### Backup

- **Exportar Tudo**: JSON com todos os dados
- **Exportar Categoria**: JSON de uma categoria específica
- **Importar**: Restaure seus dados a qualquer momento

## 🛠 Stack Tecnológica

- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **YouTube Data API v3** - Buscar informações
- **LocalStorage** - Armazenamento local

## 📁 Estrutura do Projeto

```
youtube-organizer/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/      # Componentes React
│   ├── hooks/           # Custom hooks
│   ├── services/        # YouTube API, Storage
│   ├── utils/           # Funções utilitárias
│   ├── constants/       # Constantes
│   ├── context/         # React Context
│   ├── styles/          # CSS global
│   ├── App.jsx          # Componente raiz
│   └── main.jsx         # Entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Deploy no GitHub Pages
npm run deploy
```

## 🌐 Deploy

### GitHub Pages

1. No `vite.config.js`, altere:
   ```js
   base: '/nome-do-seu-repositorio/'
   ```

2. Execute:
   ```bash
   npm run deploy
   ```

3. Acesse: `https://seu-usuario.github.io/nome-do-repositorio`

### Netlify / Vercel

1. Conecte seu repositório
2. Configure:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
3. Deploy automático a cada commit!

## 📝 Limites da API

A YouTube Data API (free tier) tem limite de:
- **10.000 requisições/dia**
- Cada vídeo adicionado = 1 requisição
- Suficiente para adicionar ~10.000 vídeos por dia

## 🤝 Contribuindo

Pull requests são bem-vindos! Para mudanças grandes, abra uma issue primeiro.

## 📄 Licença

[MIT](LICENSE)

## 🙏 Agradecimentos

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [YouTube Data API](https://developers.google.com/youtube/v3)

---

**Feito com ❤️ para organizar seus vídeos favoritos!**