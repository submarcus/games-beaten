import { useState, useMemo } from "react";
import type { Game, FilterState, SortType } from "../types";
import { parseDate, getYearFromDate } from "../utils/gameUtils";

export const useGameFilters = (games: Game[]) => {
   const [filters, setFilters] = useState<FilterState>({
      genero: "",
      nota: "",
      versao: "",
      ano: "",
      sortBy: "data",
      search: "",
   });

   // Get unique values for filter options
   const uniqueGenres = useMemo(() => {
      const genres = new Set<string>();
      games.forEach((game) => {
         game.genero.forEach((genre) => genres.add(genre));
      });
      return Array.from(genres).sort();
   }, [games]);

   const uniqueVersions = useMemo(() => {
      const versions = new Set(games.map((game) => game.versao));
      return Array.from(versions).sort();
   }, [games]);

   const uniqueRatings = useMemo(() => {
      const ratings = new Set(games.map((game) => game.nota));
      return Array.from(ratings).sort((a, b) => b - a);
   }, [games]);

   const uniqueYears = useMemo(() => {
      const years = new Set(games.map((game) => getYearFromDate(game.data)));
      return Array.from(years).sort((a, b) => b - a);
   }, [games]);

   // Filter and sort games
   const filteredAndSortedGames = useMemo(() => {
      const filtered = games.filter((game) => {
         const matchesGenre = !filters.genero || game.genero.includes(filters.genero);
         const matchesRating = !filters.nota || game.nota.toString() === filters.nota;
         const matchesVersion = !filters.versao || game.versao === filters.versao;
         const matchesYear = !filters.ano || getYearFromDate(game.data).toString() === filters.ano;
         const matchesSearch = !filters.search || game.nome.toLowerCase().includes(filters.search.toLowerCase());

         return matchesGenre && matchesRating && matchesVersion && matchesYear && matchesSearch;
      });

      // Sort games
      filtered.sort((a, b) => {
         switch (filters.sortBy as SortType) {
            case "data":
               return parseDate(b.data).getTime() - parseDate(a.data).getTime();
            case "nome":
               return a.nome.localeCompare(b.nome);
            case "nota":
               return b.nota - a.nota;
            default:
               return 0;
         }
      });

      return filtered;
   }, [games, filters]);

   const handleFilterChange = (key: keyof FilterState, value: string) => {
      setFilters((prev) => ({
         ...prev,
         [key]: value,
      }));
   };

   const clearFilters = () => {
      setFilters({
         genero: "",
         nota: "",
         versao: "",
         ano: "",
         sortBy: "data",
         search: "",
      });
   };

   const activeFiltersCount = Object.entries(filters).filter(
      ([key, value]) => value && key !== "sortBy"
   ).length;

   return {
      filters,
      filteredAndSortedGames,
      uniqueGenres,
      uniqueVersions,
      uniqueRatings,
      uniqueYears,
      handleFilterChange,
      clearFilters,
      activeFiltersCount,
   };
};
