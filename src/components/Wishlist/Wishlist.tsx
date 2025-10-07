import { useState } from "react";
import { wishlist } from "../../assets/wishlist";
import WishlistCard from "../WishlistCard/WishlistCard";
import FilterButton from "../FilterButton/FilterButton";
import WishlistFilterPanel from "../WishlistFilterPanel/WishlistFilterPanel";
import { useWishlistFilters } from "../../hooks/useWishlistFilters";
import type { WishlistGame } from "../../types";

const Wishlist = () => {
   const [isFilterOpen, setIsFilterOpen] = useState(false);

   const {
      filters,
      filteredAndSortedGames,
      uniqueGenres,
      uniqueVersions,
      handleFilterChange,
      clearFilters,
      activeFiltersCount,
   } = useWishlistFilters(wishlist);

   const getSortDisplayText = () => {
      switch (filters.sortBy) {
         case "nome":
            return "Ordem Alfabética";
         case "tempo":
            return "Por Tempo Estimado";
         default:
            return "Ordem Alfabética";
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
               <WishlistFilterPanel
                  filters={filters}
                  uniqueGenres={uniqueGenres}
                  uniqueVersions={uniqueVersions}
                  activeFiltersCount={activeFiltersCount}
                  totalGames={wishlist.length}
                  filteredCount={filteredAndSortedGames.length}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
               />
            </div>
         </div>

         <div className="text-neutral-200 text-xl text-center mb-1 cursor-default">
            Lista de Desejos
         </div>
         <div className="text-neutral-400 text-sm text-center mb-4 cursor-default">
            {getSortDisplayText()}
         </div>

         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredAndSortedGames.map((game: WishlistGame, index: number) => (
               <div key={`${game.nome}-${index}`}>
                  <WishlistCard {...game} />
               </div>
            ))}
         </div>

         {filteredAndSortedGames.length === 0 && wishlist.length > 0 && (
            <div className="text-center text-neutral-400 mt-16">
               <p>Nenhum jogo encontrado com os filtros aplicados.</p>
            </div>
         )}

         {wishlist.length === 0 && (
            <div className="text-center text-neutral-400 mt-16">
               <p>Sua lista de desejos está vazia.</p>
            </div>
         )}
      </>
   );
};

export default Wishlist;
