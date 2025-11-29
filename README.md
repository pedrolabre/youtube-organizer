# 📺 YouTube Organizer

> Organize seus vídeos favoritos do YouTube em categorias personalizadas

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## ✨ Features

- 📁 **Categorias Ilimitadas** - Crie e gerencie quantas categorias quiser
- 🎬 **Metadados Automáticos** - Busca título, canal, thumbnail, views e duração via YouTube API
- ❤️ **Favoritos** - Marque vídeos especiais para acesso rápido em uma aba dedicada
- 👁️ **Controle de Visualização** - Filtre rapidamente por vídeos **Assistidos** e **Para Assistir**
- ⚡ **Ações em Massa** - Selecione múltiplos vídeos para Mover, Copiar ou Excluir de uma vez
- 🔍 **Busca e Ordenação** - Encontre vídeos por título/canal e ordene por data, views ou duração
- 📤 **Export/Import** - Faça backup completo ou de categorias específicas (JSON)
- 🌓 **Tema Claro/Escuro** - Interface adaptável à sua preferência
- 💾 **100% Local** - Seus dados ficam apenas no seu navegador (LocalStorage)

## 🚀 Como Usar

### 1. Obter API Key do YouTube

Para que o aplicativo busque os dados dos vídeos, você precisa de uma chave gratuita:

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative a **YouTube Data API v3**
4. Vá em **Credenciais** → **Criar credenciais** → **Chave de API**
5. Copie a chave gerada

### 2. Instalar e Rodar

```bash
# Clone o repositório
git clone [https://github.com/seu-usuario/youtube-organizer.git](https://github.com/seu-usuario/youtube-organizer.git)

# Entre na pasta
cd youtube-organizer

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev

A aplicação abrirá em http://localhost:3000

3. Configurar API Key
Abra a aplicação

Clique no ícone de Configurações (⚙️) no canto superior direito

Cole sua API Key na aba "API Key"

Pronto! O sistema já pode buscar dados dos vídeos.

📖 Como Funciona
Adicionar Vídeos
Basta colar o link no botão "Adicionar Vídeo" (aceita links curtos youtu.be ou longos). O sistema preenche automaticamente:

Título e Canal

Thumbnail em alta resolução

Estatísticas (Views) e Duração

Organização Avançada
Mover/Copiar: Use o menu do vídeo ou selecione vários para mover entre categorias.

Favoritos: Clique no ❤️ no card do vídeo para adicioná-lo à lista de Favoritos.

Status: Marque como "Visto" clicando no ícone de olho ou no botão de status.

Backup e Dados
Vá em Configurações > Dados para:

Exportar Tudo: Gera um arquivo .json com todo o seu banco de dados.

Importar: Restaura seus dados (com opção de mesclar com os atuais ou substituir).

🛠 Stack Tecnológica
O projeto foi construído utilizando conceitos modernos de React e arquitetura limpa:

React 18 - Biblioteca UI com Hooks personalizados

Vite - Build tool ultrarrápida

Tailwind CSS - Estilização responsiva e Dark Mode

Lucide React - Ícones vetoriais leves

Context API - Gerenciamento de estado global (App, Theme, Toast)

Custom Hooks - Lógica encapsulada (useVideos, useYouTubeAPI, useLocalStorage)

📁 Estrutura do Projeto
A estrutura segue uma organização por domínios/funcionalidades:
youtube-organizer/
├── src/
│   ├── components/
│   │   ├── Category/    # Cards, Listas e Ações de Categorias
│   │   ├── Dashboard/   # Views principais (Home, Favoritos, Assistidos)
│   │   ├── Layout/      # Header, Container
│   │   ├── Modals/      # Modais de confirmação e formulários
│   │   ├── Settings/    # Configurações, API Key, Import/Export
│   │   ├── UI/          # Componentes base (Button, Input, Modal)
│   │   └── Video/       # Cards de Vídeo e Ações
│   ├── context/         # Estados Globais
│   ├── hooks/           # Lógica reutilizável
│   ├── services/        # Integração com API e Storage
│   └── utils/           # Formatadores e Validadores
└── ...

🔧 Scripts Disponíveis
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build gerada
npm run preview

# Deploy no GitHub Pages
npm run deploy

📝 Limites da API
A YouTube Data API (free tier) oferece uma cota generosa de 10.000 unidades/dia.

Adicionar 1 vídeo consome aproximadamente 1 unidade.

Isso permite gerenciar milhares de vídeos diariamente sem custos.

🤝 Contribuindo
Contribuições são bem-vindas!

Faça um Fork do projeto

Crie uma Branch para sua Feature (git checkout -b feature/NovaFeature)

Faça o Commit (git commit -m 'Add: Nova Feature')

Faça o Push (git push origin feature/NovaFeature)

Abra um Pull Request

📄 Licença
Este projeto está sob a licença MIT.

Feito com ❤️ para organizar seus vídeos favoritos!


### O que mudou e por que (para seu aprendizado):

1.  **Features:** Adicionei "Favoritos", "Ações em Massa" e "Controle de Visualização (Assistidos/Não Assistidos)" porque vi no seu código os componentes `FavoritesView.jsx`, `VideoBulkActions.jsx` e `WatchedView.jsx`. Isso valoriza muito o seu projeto, pois mostra que ele é mais completo do que um simples CRUD.
2.  **Estrutura de Pastas:** Atualizei a árvore de diretórios. No README antigo estava genérica (`src/components`), mas no seu código final você organizou tudo muito bem em subpastas (`Category`, `Dashboard`, `Video`, etc.). Isso demonstra maturidade na organização do projeto React.
3.  **Contexto Técnico:** Adicionei menção à `Context API` e `Custom Hooks` na seção de