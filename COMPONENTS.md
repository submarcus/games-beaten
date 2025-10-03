# Estrutura de Componentes - Games Beaten

## 🏗️ Arquitetura

O projeto foi refatorado para seguir boas práticas de componentização no React, com separação clara de responsabilidades e reutilização de código.

## 📂 Estrutura de Pastas

```
src/
├── components/           # Componentes React reutilizáveis
│   ├── FilterButton/    # Botão de alternância de filtros
│   ├── FilterPanel/     # Painel de filtros laterais
│   ├── GameCard/        # Card individual do jogo
│   ├── GameGrid/        # Grid de cartões de jogos
│   ├── GameModal/       # Modal de detalhes do jogo
│   ├── Header/          # Cabeçalho com estatísticas
│   ├── Home/            # Página principal (container)
│   ├── Layout/          # Layout base da aplicação
│   └── index.ts         # Exports centralizados
├── hooks/               # Hooks customizados
│   ├── useGameFilters.ts  # Lógica de filtros e ordenação
│   ├── useGameModal.ts   # Lógica do modal
│   └── index.ts         # Exports centralizados
├── types/               # Definições de tipos TypeScript
│   └── index.ts         # Interfaces centralizadas
├── utils/               # Funções utilitárias
│   ├── gameUtils.ts     # Utilitários específicos de jogos
│   └── index.ts         # Exports centralizados
└── assets/
    └── games.tsx        # Dados dos jogos
```

## 🧩 Componentes

### Layout
- **Responsabilidade**: Estrutura base da aplicação
- **Props**: `children`

### Header
- **Responsabilidade**: Exibir estatísticas (total de jogos e horas)
- **Props**: `games: Game[]`

### Home (Container)
- **Responsabilidade**: Orquestrar a tela principal
- **Composto por**: FilterButton, FilterPanel, GameGrid, GameModal
- **Props**: `games: Game[]`

### GameCard
- **Responsabilidade**: Exibir informações de um jogo individual
- **Props**: Propriedades do jogo (Game interface)

### GameGrid
- **Responsabilidade**: Renderizar grid de jogos
- **Props**: `games: Game[]`, `onGameClick: (game: Game) => void`

### FilterButton
- **Responsabilidade**: Botão para abrir/fechar painel de filtros
- **Props**: `isOpen: boolean`, `activeFiltersCount: number`, `onClick: () => void`

### FilterPanel
- **Responsabilidade**: Interface de filtros e ordenação
- **Props**: Filtros, opções úniques, handlers

### GameModal
- **Responsabilidade**: Exibir detalhes completos do jogo
- **Props**: `game: Game`, `onClose: () => void`

## 🎣 Hooks Customizados

### useGameFilters
- **Responsabilidade**: Gerenciar estado de filtros e dados filtrados
- **Retorna**: Filtros, jogos filtrados, opções únicas, handlers

### useGameModal
- **Responsabilidade**: Gerenciar estado do modal
- **Retorna**: Game selecionado, funções de abrir/fechar

## 🛠️ Utilitários

### gameUtils.ts
- `parseDate()`: Converte string de data para Date
- `getRatingColor()`: Retorna cor baseada na nota
- `extractHoursFromTimeString()`: Extrai horas de string de tempo
- `calculateTotalHours()`: Calcula total de horas de uma lista de jogos

## 📝 Tipos

### Game
Interface principal representando um jogo

### FilterState
Estado dos filtros aplicados

### SortType
Tipos de ordenação disponíveis

### GameStats
Estatísticas calculadas dos jogos

## ✅ Melhorias Implementadas

1. **Separação de Responsabilidades**: Cada componente tem uma função específica
2. **Reutilização**: Componentes podem ser reutilizados facilmente
3. **Manutenibilidade**: Código organizado e fácil de manter
4. **Performance**: Hooks otimizados com useMemo
5. **TypeScript**: Tipagem forte em todos os componentes
6. **Organização**: Estrutura de pastas clara e lógica
7. **Exports Centralizados**: Imports mais limpos e organizados

## 🚀 Como Usar

```tsx
// Importação simplificada
import { Header, Home, Layout } from "./components";
import { useGameFilters, useGameModal } from "./hooks";
import { getRatingColor } from "./utils";
```

## 📋 Padrões Seguidos

- **Single Responsibility Principle**: Cada componente tem uma responsabilidade
- **Custom Hooks**: Lógica complexa extraída para hooks reutilizáveis
- **TypeScript First**: Tipagem em todos os componentes
- **Barrel Exports**: Exports centralizados para melhor organização
- **Composição**: Componentes compostos por outros menores
- **Separation of Concerns**: UI, lógica e dados separados
