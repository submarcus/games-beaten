## 🎮 Meus Jogos Zerados

Uma aplicação para catalogar e exibir todos os jogos que já zerei.

## 🎯 Sobre o Projeto

Este é meu catálogo pessoal de jogos completados, onde registro todos os jogos que terminei ao longo do tempo. A aplicação permite visualizar informações detalhadas como nota, tempo de jogo, gênero, plataforma e muito mais.

## 🛠️ Tecnologias Utilizadas

-   **React**
-   **TypeScript**
-   **Vite**
-   **Tailwind CSS**
-   **React Icons**
-   **React Router**

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── GameCard/     # Componente do card de jogo
│   ├── Header/       # Cabeçalho com estatísticas
│   └── Home/         # Página principal com filtros
├── assets/
│   └── games.tsx     # Base de dados dos jogos
├── App.tsx          # Componente principal
└── main.tsx         # Ponto de entrada
```

## 🎮 Estrutura dos Dados

Cada jogo possui as seguintes informações:

```typescript
interface Game {
    nota: number; // Nota de 1-10
    nome: string; // Nome do jogo
    data: string; // Data de conclusão
    genero: string[]; // Gêneros do jogo
    tempo: string; // Tempo total jogado
    versao: string; // Plataforma/versão
    cover?: string; // URL da capa
    review?: string; // Link para review
}
```

## 🌟 Funcionalidades Futuras

-   [ ] Sistema de busca por nome
-   [ ] Sistema de tags personalizadas
-   [ ] Gráficos e estatísticas avançadas
-   [ ] Export/import de dados
-   [ ] Modo de lista compacta

## 🤝 Contribuição

Este é um projeto pessoal, mas sugestões e melhorias são sempre bem-vindas!

## 📞 Contato

-   Steam: [maahlune](https://steamcommunity.com/id/maahlune)
-   GitHub: [@maahlune](https://github.com/maahlune)
