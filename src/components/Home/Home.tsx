import { useState } from "react";
import type { Game } from "../../types";
import { useGameFilters } from "../../hooks/useGameFilters";
import { usePagination } from "../../hooks/usePagination";
import FilterButton from "../FilterButton/FilterButton";
import FilterPanel from "../FilterPanel/FilterPanel";
import GameGrid from "../GameGrid/GameGrid";
import Pagination from "../Pagination/Pagination";

interface HomeProps {
   games: Game[];
}

const Home = ({ games }: HomeProps) => {
   const [isFilterOpen, setIsFilterOpen] = useState(false);

   const {
      filters,
      filteredAndSortedGames,
      uniqueGenres,
      uniqueVersions,
      uniqueRatings,
      handleFilterChange,
      clearFilters,
      activeFiltersCount,
   } = useGameFilters(games);

   const [paginationData, paginationActions] = usePagination(filteredAndSortedGames, {
      itemsPerPage: 24
   });

   const getSortDisplayText = () => {
      switch (filters.sortBy) {
         case "data":
            return "Mais Recentes";
         case "nome":
            return "Ordem Alfabética";
         case "nota":
            return "Melhores Avaliados";
         default:
            return "Mais Recentes";
      }
   };

   return (
      <>
         {/* Floating Filter Button */}
         <div className="fixed top-4 right-4 z-50">
            <FilterButton
               isOpen={isFilterOpen}
               activeFiltersCount={activeFiltersCount}
               onClick={() => setIsFilterOpen(!isFilterOpen)}
            />

            {/* Filter Panel */}
            <div
               className={`absolute right-0 top-14 transition-all duration-300 ${isFilterOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                  }`}
            >
               <FilterPanel
                  filters={filters}
                  uniqueGenres={uniqueGenres}
                  uniqueVersions={uniqueVersions}
                  uniqueRatings={uniqueRatings}
                  activeFiltersCount={activeFiltersCount}
                  totalGames={games.length}
                  filteredCount={filteredAndSortedGames.length}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
               />
            </div>
         </div>

         <div className="text-neutral-200 text-xl text-center mb-1 cursor-default">
            Marcus
         </div>
         <div className="text-neutral-400 text-sm text-center mb-4 cursor-default">
            {getSortDisplayText()}
         </div>

         <GameGrid games={paginationData.paginatedItems} />

         <Pagination
            paginationData={paginationData}
            paginationActions={paginationActions}
         />
      </>
   );
};

export default Home;
