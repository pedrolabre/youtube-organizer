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
git clone https://github.com/seu-usuario/youtube-organizer.git

# Entre na pasta
cd youtube-organizer

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev
```

A aplicação abrirá em http://localhost:4000

### 3. Configurar API Key
Abra a aplicação

Clique no ícone de Configurações (⚙️) no canto superior direito

Cole sua API Key na aba "API Key"

Pronto! O sistema já pode buscar dados dos vídeos.

## 📖 Como Funciona
### Adicionar Vídeos
Basta colar o link no botão "Adicionar Vídeo" (aceita links curtos youtu.be ou longos). O sistema preenche automaticamente:

- Título e Canal

- Thumbnail em alta resolução

- Estatísticas (Views) e Duração

### Organização Avançada
- **Mover/Copiar:** Use o menu do vídeo ou selecione vários para mover entre categorias.

- **Favoritos:** Clique no ❤️ no card do vídeo para adicioná-lo à lista de Favoritos.

- **Status:** Marque como "Visto" clicando no ícone de olho ou no botão de status.

### Backup e Dados
Vá em Configurações > Dados para:

- **Exportar Tudo:** Gera um arquivo .json com todo o seu banco de dados.

- **Importar:** Restaura seus dados (com opção de mesclar com os atuais ou substituir).

## 🛠 Stack Tecnológica
O projeto foi construído utilizando conceitos modernos de React e arquitetura limpa:

**React 18 -** Biblioteca UI com Hooks personalizados

**Vite -** Build tool ultrarrápida

**Tailwind CSS -** Estilização responsiva e Dark Mode

**Lucide React -** Ícones vetoriais leves

**Context API -** Gerenciamento de estado global (App, Theme, Toast)

**Custom Hooks -** Lógica encapsulada (useVideos, useYouTubeAPI, useLocalStorage)

## 📁 Estrutura do Projeto
A estrutura segue uma organização por domínios/funcionalidades:
```Bash
youtube-organizer/
src/
├── main.jsx                  # Ponto de entrada (Entry Point)
├── App.jsx                   # "Router" manual e Orquestrador de Layout
├── components/
│   ├── Category/             # Entidade: Categoria
│   │   ├── CategoryActions.jsx   # Barra de título e botão "Voltar"
│   │   ├── CategoryCard.jsx      # Card simples da categoria
│   │   ├── CategoryCardView.jsx  # Visualização expandida com preview
│   │   ├── CategoryForm.jsx      # Modal de Criar/Editar categoria
│   │   ├── CategoryGrid.jsx      # Container para o layout em Grid
│   │   ├── CategoryList.jsx      # Container para o layout em Lista
│   │   ├── CategoryMenu.jsx      # Dropdown (Editar/Excluir)
│   │   └── CategoryPage.jsx      # Página interna da categoria
│   ├── Dashboard/            # Tela Inicial
│   │   ├── CategoryDisplay.jsx   # Switcher de visualização (Card/List/Grid)
│   │   ├── DashboardView.jsx     # Container principal da Home
│   │   ├── QuickActions.jsx      # Botões grandes de ação rápida
│   │   ├── FavoritesView.jsx     # Página de Favoritos
│   │   ├── WatchedView.jsx       # Página de Histórico (Vistos)
│   │   └── UnwatchedView.jsx     # Página "Para Assistir"
│   ├── Layout/               # Estrutura Global
│   │   ├── Header.jsx            # Barra de navegação superior
│   │   ├── Container.jsx         # Wrapper para centralizar conteúdo
│   │   └── BackButton.jsx        # Botão de voltar reutilizável
│   ├── Modals/               # Lógica de Negócio (Popups)
│   │   ├── DeleteConfirmModal.jsx # Confirmação destrutiva
│   │   ├── MoveCopyModal.jsx     # Interface de mover/copiar vídeos
│   │   └── VideoDetailsModal.jsx # Modal com info completa do vídeo
│   ├── Settings/             # Painel de Configurações
│   │   ├── ApiKeyForm.jsx        # Input e validação da Chave API
│   │   ├── ExportData.jsx        # Botões para baixar o backup JSON
│   │   ├── ImportData.jsx        # Upload e parse do backup
│   │   ├── ManageCategories.jsx  # CRUD rápido de categorias
│   │   ├── SettingsModal.jsx     # Container das abas de config
│   │   └── ThemeToggle.jsx       # Seletor visual Claro/Escuro
│   ├── UI/                   # Design System (Componentes Puros)
│   │   ├── Button.jsx            # Botão base com variantes
│   │   ├── ConfirmModal.jsx      # Modal base de confirmação
│   │   ├── Dropdown.jsx          # Menu flutuante genérico
│   │   ├── Input.jsx             # Campo de texto com label/erro
│   │   ├── Modal.jsx             # Estrutura base (Overlay + Content)
│   │   ├── SearchBar.jsx         # Input de busca com debounce
│   │   ├── SortSelect.jsx        # Select nativo estilizado
│   │   ├── Spinner.jsx           # Indicador de carregamento
│   │   ├── Toast.jsx             # Notificação flutuante (Alertas)
│   │   └── ViewToggle.jsx        # Botões de troca de layout
│   └── Video/                # Entidade: Vídeo
│       ├── VideoActions.jsx      # Menu de contexto (3 pontinhos)
│       ├── VideoBulkActions.jsx  # Barra flutuante de seleção múltipla
│       ├── VideoCard.jsx         # Card principal do vídeo
│       ├── VideoCheckbox.jsx     # Componente de check customizado
│       ├── VideoForm.jsx         # Formulário de adicionar vídeo
│       ├── VideoList.jsx         # Lista vertical de vídeos
│       ├── VideoPreview.jsx      # Tooltip com detalhes ao passar o mouse
│       └── VideoStatusBadge.jsx  # Etiqueta interativa "Visto"
├── constants/                # Valores Constantes
│   ├── apiConfig.js          # Configs e endpoints do YouTube
│   ├── sortOptions.js        # Lista de opções de ordenação
│   ├── storageKeys.js        # Chaves usadas no LocalStorage
│   └── viewModes.js          # Enums (GRID, LIST, CARD)
├── context/                  # Gestão de Estado Global (Store)
│   ├── AppContext.jsx            # Estado principal (Vídeos/Categorias)
│   ├── ThemeContext.jsx          # Estado do Tema (Dark/Light)
│   └── ToastContext.jsx          # Estado das Notificações
├── hooks/                    # Custom Hooks (Lógica Isolada)
│   ├── useCategories.js          # Lógica CRUD de categorias
│   ├── useCategorySort.js        # Algoritmo de ordenar categorias
│   ├── useLocalStorage.js        # Persistência de dados no navegador
│   ├── useSearch.js              # Lógica de filtro de busca
│   ├── useSelection.js           # Gestão de IDs selecionados
│   ├── useSort.js                # Algoritmo de ordenar vídeos
│   ├── useTheme.js               # Manipulação de classes CSS do tema
│   ├── useToast.js               # Disparador de eventos de toast
│   ├── useVideos.js              # Lógica CRUD de vídeos
│   └── useYouTubeAPI.js          # Comunicação com a API externa
├── services/                 # Serviços Externos
│   ├── exportImport.js           # Gerador/Leitor de arquivos JSON
│   ├── storage.js                # Wrapper seguro do localStorage
│   └── youtubeAPI.js             # Chamadas HTTP puras
└── utils/                    # Funções Utilitárias
    ├── dateFormatter.js          # Formatação de datas (pt-BR)
    ├── durationFormatter.js      # Conversor de tempo ISO 8601
    ├── generateId.js             # Criador de IDs únicos
    ├── sortFunctions.js          # Comparadores para o método .sort()
    ├── validators.js             # Regras de validação de formulário
    ├── videoParser.js            # Extrator de ID via Regex
    └── viewsFormatter.js         # Formatador numérico (1K, 1M)
```

## 🔧 Scripts Disponíveis
```Bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build gerada
npm run preview

# Deploy no GitHub Pages
npm run deploy
```

## 📝 Limites da API
A YouTube Data API (free tier) oferece uma cota generosa de 10.000 unidades/dia.

Adicionar 1 vídeo consome aproximadamente 1 unidade.

Isso permite gerenciar milhares de vídeos diariamente sem custos.

## 🤝 Contribuindo
Contribuições são bem-vindas!

Faça um Fork do projeto

Crie uma Branch para sua Feature (git checkout -b feature/NovaFeature)

Faça o Commit (git commit -m 'Add: Nova Feature')

Faça o Push (git push origin feature/NovaFeature)

Abra um Pull Request

## 📄 Licença
Este projeto está sob a licença MIT.

Feito com ❤️ para organizar seus vídeos favoritos!