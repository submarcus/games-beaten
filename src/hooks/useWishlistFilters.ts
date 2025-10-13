import { useState, useMemo } from "react";
import type { WishlistGame, WishlistFilterState } from "../types";

export const useWishlistFilters = (games: WishlistGame[]) => {
   const [filters, setFilters] = useState<WishlistFilterState>({
      genero: "",
      versao: "",
      sortBy: "tempo",
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

   // Filter and sort games
   const filteredAndSortedGames = useMemo(() => {
      const filtered = games.filter((game) => {
         const matchesGenre = !filters.genero || game.genero.includes(filters.genero);
         const matchesVersion = !filters.versao || game.versao === filters.versao;
         const matchesSearch = !filters.search || game.nome.toLowerCase().includes(filters.search.toLowerCase());

         return matchesGenre && matchesVersion && matchesSearch;
      });

      // Sort games
      filtered.sort((a, b) => {
         switch (filters.sortBy) {
            case "nome":
               return a.nome.localeCompare(b.nome);
            case "tempo": {
               // Sort by estimated hours (extract numeric part)
               const getHours = (tempo: string) => {
                  const match = tempo.match(/(\d+)h/);
                  return match ? parseInt(match[1]) : 0;
               };
               return getHours(b.tempo) - getHours(a.tempo);
            }
            default:
               return a.nome.localeCompare(b.nome);
         }
      });

      return filtered;
   }, [games, filters]);

   const handleFilterChange = (key: keyof WishlistFilterState, value: string) => {
      setFilters((prev) => ({
         ...prev,
         [key]: value,
      }));
   };

   const clearFilters = () => {
      setFilters({
         genero: "",
         versao: "",
         sortBy: "tempo",
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
      handleFilterChange,
      clearFilters,
      activeFiltersCount,
   };
};
