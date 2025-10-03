import { useState, useMemo } from "react";
import type { Game, FilterState, SortType } from "../types";
import { parseDate } from "../utils/gameUtils";

export const useGameFilters = (games: Game[]) => {
   const [filters, setFilters] = useState<FilterState>({
      genero: "",
      nota: "",
      versao: "",
      sortBy: "data",
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

   // Filter and sort games
   const filteredAndSortedGames = useMemo(() => {
      const filtered = games.filter((game) => {
         const matchesGenre = !filters.genero || game.genero.includes(filters.genero);
         const matchesRating = !filters.nota || game.nota.toString() === filters.nota;
         const matchesVersion = !filters.versao || game.versao === filters.versao;

         return matchesGenre && matchesRating && matchesVersion;
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
         sortBy: "data",
      });
   };

   const activeFiltersCount = Object.values(filters).filter(
      (value) => value && value !== "data"
   ).length;

   return {
      filters,
      filteredAndSortedGames,
      uniqueGenres,
      uniqueVersions,
      uniqueRatings,
      handleFilterChange,
      clearFilters,
      activeFiltersCount,
   };
};
