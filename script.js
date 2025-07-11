import { games } from "./assets/games.js";

document.addEventListener("DOMContentLoaded", () => {
    // Configurar ordenação padrão por data mais recente
    window.sortColumn = 2; // Coluna de data
    window.sortDirection = "desc"; // Ordem decrescente (mais recente primeiro)

    const tableBody = document.getElementById("games-list");
    const totalGamesElement = document.getElementById("total-games");
    const avgNoteElement = document.getElementById("avg-note");
    const totalTimeElement = document.getElementById("total-time");
    const searchInput = document.getElementById("search");
    const genreFilter = document.getElementById("genre-filter");
    const platformFilter = document.getElementById("platform-filter");
    const yearFilter = document.getElementById("year-filter");
    const scoreFilter = document.getElementById("score-filter");
    const clearFiltersBtn = document.getElementById("clear-filters");
    const formatGenres = (genres) => {
        return genres.join(", ");
    };

    const calculateAverageNote = () => {
        const sum = games.reduce((acc, game) => acc + game.nota, 0);
        return (sum / games.length).toFixed(1);
    };

    const calculateTotalTime = () => {
        let totalHours = 0;
        let totalMinutes = 0;

        games.forEach((game) => {
            const timeParts = game.tempo.split("h ");
            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10) || 0;

            totalHours += hours;
            totalMinutes += minutes;
        });

        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes = totalMinutes % 60;

        return `${totalHours}h ${totalMinutes}m`;
    };
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            document.querySelectorAll(".view-container").forEach((view) => {
                view.classList.remove("active-view");
            });
            tab.classList.add("active");
            const targetView = document.getElementById(tab.dataset.target);
            targetView.classList.add("active-view");
            if (tab.dataset.target === "stats-view") {
                createCharts();
            }
        });
    });
    function createCharts() {
        createGenreChart();
        createRatingsChart();
        createPlatformChart();
    }
    function createGenreChart() {
        // Obter contagem de cada gênero
        const genreCounts = {};
        games.forEach((game) => {
            game.genero.forEach((genre) => {
                genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            });
        });

        // Ordenar gêneros por frequência (descendente)
        const sortedGenres = Object.entries(genreCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10); // Limitar aos 10 principais gêneros

        const genreLabels = sortedGenres.map((entry) => entry[0]);
        const genreValues = sortedGenres.map((entry) => entry[1]);

        // Cores para o gráfico
        const colors = [
            "#4e79a7",
            "#f28e2b",
            "#e15759",
            "#76b7b2",
            "#59a14f",
            "#edc948",
            "#b07aa1",
            "#ff9da7",
            "#9c755f",
            "#bab0ac",
        ];

        // Verificar se já existe um gráfico e destruí-lo
        if (window.genreChartInstance) {
            window.genreChartInstance.destroy();
        }

        // Criar o gráfico de distribuição por gênero
        const ctx = document.getElementById("genre-chart").getContext("2d");
        window.genreChartInstance = new Chart(ctx, {
            type: "pie",
            data: {
                labels: genreLabels,
                datasets: [
                    {
                        data: genreValues,
                        backgroundColor: colors,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "right",
                        labels: {
                            boxWidth: 12,
                            font: {
                                family: "Tahoma",
                            },
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || "";
                                const value = context.raw;
                                const percentage = Math.round((value / games.length) * 100);
                                return `${label}: ${value} jogos (${percentage}%)`;
                            },
                        },
                    },
                },
            },
        });
    }

    // Função para criar o gráfico de quantidade de jogos por período
    function createRatingsChart() {
        // Agrupar jogos por ano
        const yearGroups = {};
        games.forEach((game) => {
            const dataParts = game.data.split("/");
            const year = dataParts[2].slice(0, 4);

            if (!yearGroups[year]) {
                yearGroups[year] = [];
            }
            yearGroups[year].push(game);
        });

        // Calcular quantidade de jogos por ano
        const years = Object.keys(yearGroups).sort();
        const gameCounts = years.map((year) => {
            return yearGroups[year].length;
        });

        // Verificar se já existe um gráfico e destruí-lo
        if (window.ratingsChartInstance) {
            window.ratingsChartInstance.destroy();
        }

        // Criar o gráfico de quantidade de jogos por período
        const ctx = document.getElementById("ratings-chart").getContext("2d");
        window.ratingsChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: years,
                datasets: [
                    {
                        label: "Quantidade de Jogos",
                        data: gameCounts,
                        backgroundColor: "#4e79a7",
                        borderColor: "#3a5f8a",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.dataset.label || "";
                                const value = context.raw;
                                const year = context.label;
                                const avgNote = (
                                    yearGroups[year].reduce((acc, game) => acc + game.nota, 0) / yearGroups[year].length
                                ).toFixed(1);
                                return `${label}: ${value} jogos (nota média: ${avgNote})`;
                            },
                        },
                    },
                },
            },
        });
    }

    // Função para criar o gráfico de distribuição por plataforma
    function createPlatformChart() {
        // Obter contagem de cada plataforma
        const platformCounts = {};
        games.forEach((game) => {
            platformCounts[game.versao] = (platformCounts[game.versao] || 0) + 1;
        });

        // Ordenar plataformas por frequência (descendente)
        const sortedPlatforms = Object.entries(platformCounts).sort((a, b) => b[1] - a[1]);

        const platformLabels = sortedPlatforms.map((entry) => entry[0]);
        const platformValues = sortedPlatforms.map((entry) => entry[1]);

        // Cores para o gráfico
        const colors = [
            "#4e79a7",
            "#f28e2b",
            "#e15759",
            "#76b7b2",
            "#59a14f",
            "#edc948",
            "#b07aa1",
            "#ff9da7",
            "#9c755f",
            "#bab0ac",
        ];

        // Verificar se já existe um gráfico e destruí-lo
        if (window.platformChartInstance) {
            window.platformChartInstance.destroy();
        }

        // Criar o gráfico de distribuição por plataforma
        const ctx = document.getElementById("platform-chart").getContext("2d");
        window.platformChartInstance = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: platformLabels,
                datasets: [
                    {
                        data: platformValues,
                        backgroundColor: colors,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "right",
                        labels: {
                            boxWidth: 12,
                            font: {
                                family: "Tahoma",
                            },
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || "";
                                const value = context.raw;
                                const percentage = Math.round((value / games.length) * 100);
                                return `${label}: ${value} jogos (${percentage}%)`;
                            },
                        },
                    },
                },
            },
        });
    }

    initializeFilters();
    applyFilters();

    totalGamesElement.textContent = `Total de jogos: ${games.length}`;
    avgNoteElement.textContent = `Nota média: ${calculateAverageNote()}`;
    totalTimeElement.textContent = `Tempo total: ${calculateTotalTime()}`;
    const headers = document.querySelectorAll("#games-table th");
    headers.forEach((header, index) => {
        header.addEventListener("click", () => {
            sortTable(index);
        });

        header.addEventListener("mousedown", (e) => {
            if (e.detail > 1) {
                e.preventDefault();
            }
        });
        header.setAttribute("title", "Clique para ordenar");
    });

    // Marcar a coluna de data como ordenada por padrão em ordem decrescente
    headers[2].classList.add("sorted-desc");
    function sortTable(columnIndex) {
        const table = document.getElementById("games-table");
        const tbody = document.getElementById("games-list");
        let dir = "asc";

        const header = headers[columnIndex];
        if (header.classList.contains("sorted-asc")) {
            dir = "desc";
        } else if (header.classList.contains("sorted-desc")) {
            dir = "asc";
        }

        headers.forEach((h) => {
            h.classList.remove("sorted-asc", "sorted-desc");
        });

        header.classList.add(dir === "asc" ? "sorted-asc" : "sorted-desc");

        // Armazenar configuração de ordenação como variáveis globais para uso em applyFilters
        window.sortColumn = columnIndex;
        window.sortDirection = dir;

        // Reaplicar os filtros que também ordenará os resultados
        applyFilters();
    }

    // Função para ordenar jogos
    function sortGames(gamesToSort, columnIndex, dir) {
        return [...gamesToSort].sort((a, b) => {
            switch (columnIndex) {
                case 0: // Nota
                    return dir === "asc" ? a.nota - b.nota : b.nota - a.nota;

                case 1: // Nome
                    return dir === "asc" ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome);

                case 2: // Data
                    const datePartsA = a.data.split("/");
                    const datePartsB = b.data.split("/");

                    const dayA = parseInt(datePartsA[0], 10);
                    const monthA = datePartsA[1].toLowerCase();
                    const yearA = datePartsA[2];

                    const dayB = parseInt(datePartsB[0], 10);
                    const monthB = datePartsB[1].toLowerCase();
                    const yearB = datePartsB[2];

                    const monthsAbbr = [
                        "jan",
                        "fev",
                        "mar",
                        "abr",
                        "mai",
                        "jun",
                        "jul",
                        "ago",
                        "set",
                        "out",
                        "nov",
                        "dez",
                    ];

                    const monthNumA = monthsAbbr.findIndex((m) => monthA.includes(m)) + 1;
                    const monthNumB = monthsAbbr.findIndex((m) => monthB.includes(m)) + 1;

                    const dateA = new Date(yearA, monthNumA - 1, dayA);
                    const dateB = new Date(yearB, monthNumB - 1, dayB);

                    return dir === "asc" ? dateA - dateB : dateB - dateA;

                case 3: // Gênero
                    return dir === "asc"
                        ? a.genero[0].localeCompare(b.genero[0])
                        : b.genero[0].localeCompare(a.genero[0]);

                case 4: // Tempo
                    const timePartsA = a.tempo.split("h ");
                    const timePartsB = b.tempo.split("h ");

                    const hoursA = parseInt(timePartsA[0], 10);
                    const minutesA = parseInt(timePartsA[1], 10) || 0;
                    const totalMinutesA = hoursA * 60 + minutesA;

                    const hoursB = parseInt(timePartsB[0], 10);
                    const minutesB = parseInt(timePartsB[1], 10) || 0;
                    const totalMinutesB = hoursB * 60 + minutesB;

                    return dir === "asc" ? totalMinutesA - totalMinutesB : totalMinutesB - totalMinutesA;

                case 5: // Versão
                    return dir === "asc" ? a.versao.localeCompare(b.versao) : b.versao.localeCompare(a.versao);

                default:
                    return 0;
            }
        });
    }

    // Função para inicializar os filtros com valores únicos do conjunto de dados
    function initializeFilters() {
        // Coletar valores únicos
        const genres = new Set();
        const platforms = new Set();
        const years = new Set();

        games.forEach((game) => {
            // Adicionar cada gênero individualmente
            game.genero.forEach((genre) => genres.add(genre));

            // Adicionar plataforma (versão)
            platforms.add(game.versao);

            // Extrair o ano da data
            const year = game.data.split("/")[2];
            years.add(year);
        });

        // Preencher os dropdowns
        populateFilterOptions(genreFilter, [...genres].sort());
        populateFilterOptions(platformFilter, [...platforms].sort());
        populateFilterOptions(
            yearFilter,
            [...years].sort((a, b) => b - a)
        ); // Anos em ordem decrescente

        // Adicionar event listeners para os filtros
        searchInput.addEventListener("input", applyFilters);
        genreFilter.addEventListener("change", applyFilters);
        platformFilter.addEventListener("change", applyFilters);
        yearFilter.addEventListener("change", applyFilters);
        scoreFilter.addEventListener("change", applyFilters);
        clearFiltersBtn.addEventListener("click", clearFilters);
    }

    // Função para preencher as opções de um select
    function populateFilterOptions(selectElement, options) {
        options.forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            selectElement.appendChild(optionElement);
        });
    }
    // Função para aplicar filtros
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedGenre = genreFilter.value;
        const selectedPlatform = platformFilter.value;
        const selectedYear = yearFilter.value;
        const selectedScore = scoreFilter.value ? parseInt(scoreFilter.value) : 0;

        // Limpar tabela atual
        tableBody.innerHTML = "";

        // Filtrar jogos
        let filteredGames = games.filter((game) => {
            // Filtro de pesquisa
            const matchesSearch =
                searchTerm === "" ||
                game.nome.toLowerCase().includes(searchTerm) ||
                game.genero.some((g) => g.toLowerCase().includes(searchTerm)) ||
                game.versao.toLowerCase().includes(searchTerm);

            // Filtro de gênero
            const matchesGenre = selectedGenre === "" || game.genero.includes(selectedGenre);

            // Filtro de plataforma
            const matchesPlatform = selectedPlatform === "" || game.versao === selectedPlatform;

            // Filtro de ano
            const gameYear = game.data.split("/")[2];
            const matchesYear = selectedYear === "" || gameYear === selectedYear;

            // Filtro de nota
            const matchesScore = selectedScore === 0 || game.nota >= selectedScore;

            return matchesSearch && matchesGenre && matchesPlatform && matchesYear && matchesScore;
        }); // Ordenar resultados se houver uma coluna de ordenação definida
        if (window.sortColumn !== undefined && window.sortDirection) {
            filteredGames = sortGames(filteredGames, window.sortColumn, window.sortDirection);
        } else {
            // Ordenação padrão por data mais recente
            filteredGames = sortGames(filteredGames, 2, "desc"); // Índice 2 é a coluna de data, "desc" para ordem decrescente (mais recente primeiro)
        }

        // Renderizar jogos filtrados
        renderGames(filteredGames);

        // Atualizar estatísticas com base nos filtros
        updateFilteredStats(filteredGames);
    }

    // Função para limpar todos os filtros
    function clearFilters() {
        searchInput.value = "";
        genreFilter.value = "";
        platformFilter.value = "";
        yearFilter.value = "";
        scoreFilter.value = "";

        applyFilters();
    }

    // Atualiza estatísticas com base nos jogos filtrados
    function updateFilteredStats(filteredGames) {
        if (filteredGames.length === 0) {
            totalGamesElement.textContent = "Total de jogos: 0";
            avgNoteElement.textContent = "Nota média: N/A";
            totalTimeElement.textContent = "Tempo total: 0h 0m";
            return;
        }

        const avgNote = filteredGames.reduce((acc, game) => acc + game.nota, 0) / filteredGames.length;

        // Calcular tempo total dos jogos filtrados
        let totalHours = 0;
        let totalMinutes = 0;

        filteredGames.forEach((game) => {
            const timeParts = game.tempo.split("h ");
            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10) || 0;

            totalHours += hours;
            totalMinutes += minutes;
        });

        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes = totalMinutes % 60;

        // Atualizar elementos na interface
        totalGamesElement.textContent = `Total de jogos: ${filteredGames.length}`;
        avgNoteElement.textContent = `Nota média: ${avgNote.toFixed(1)}`;
        totalTimeElement.textContent = `Tempo total: ${totalHours}h ${totalMinutes}m`;
    }

    // Função para renderizar jogos na tabela
    function renderGames(gamesToRender) {
        tableBody.innerHTML = ""; // Limpa a tabela

        gamesToRender.forEach((game) => {
            const row = document.createElement("tr");

            // Adicionar classe de cor baseada na nota
            if (game.nota === 10) {
                row.classList.add("perfect-score");
            } else if (game.nota === 9) {
                row.classList.add("excellent-score");
            } else if (game.nota === 8) {
                row.classList.add("great-score");
            } else if (game.nota === 7) {
                row.classList.add("good-score");
            } else if (game.nota === 6) {
                row.classList.add("above-average-score");
            } else if (game.nota === 5) {
                row.classList.add("average-score");
            } else if (game.nota === 4) {
                row.classList.add("below-average-score");
            } else if (game.nota === 3) {
                row.classList.add("poor-score");
            } else if (game.nota === 2) {
                row.classList.add("very-poor-score");
            } else {
                row.classList.add("terrible-score");
            }

            row.innerHTML = `
                <td class="nota" style="color: black;">${game.nota}</td>
                <td class="nome">${game.nome}</td>
                <td class="data">${game.data}</td>
                <td class="genero">${formatGenres(game.genero)}</td>
                <td class="tempo">${game.tempo}</td>
                <td class="versao">${game.versao}</td>
            `;

            row.addEventListener("mouseover", function () {
                this.classList.add("hover");
            });

            row.addEventListener("mouseout", function () {
                this.classList.remove("hover");
            });

            tableBody.appendChild(row);
        });
    }
});
