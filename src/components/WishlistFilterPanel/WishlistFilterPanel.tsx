import type { WishlistFilterState } from "../../types";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router";

interface WishlistFilterPanelProps {
   filters: WishlistFilterState;
   uniqueGenres: string[];
   uniqueVersions: string[];
   activeFiltersCount: number;
   totalGames: number;
   filteredCount: number;
   onFilterChange: (key: keyof WishlistFilterState, value: string) => void;
   onClearFilters: () => void;
}

const WishlistFilterPanel = ({
   filters,
   uniqueGenres,
   uniqueVersions,
   activeFiltersCount,
   totalGames,
   filteredCount,
   onFilterChange,
   onClearFilters,
}: WishlistFilterPanelProps) => {
   return (
      <div className="w-80 border border-neutral-800 bg-neutral-950 p-4 shadow-xl modal-scroll">
         <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Filtros</h3>
            {activeFiltersCount > 0 && (
               <button
                  onClick={onClearFilters}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
               >
                  Limpar
               </button>
            )}
         </div>

         <div className="space-y-4">
            {/* Search Bar */}
            <SearchBar
               searchTerm={filters.search}
               onSearchChange={(value) => onFilterChange("search", value)}
               placeholder="Buscar por nome..."
            />

            {/* Genre Filter */}
            <div>
               <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Gênero
               </label>
               <select
                  value={filters.genero}
                  onChange={(e) => onFilterChange("genero", e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-white p-2 focus:border-blue-500 focus:outline-none"
               >
                  <option value="">Todos os gêneros</option>
                  {uniqueGenres.map((genero) => (
                     <option key={genero} value={genero}>
                        {genero}
                     </option>
                  ))}
               </select>
            </div>

            {/* Version Filter */}
            <div>
               <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Versão
               </label>
               <select
                  value={filters.versao}
                  onChange={(e) => onFilterChange("versao", e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-white p-2 focus:border-blue-500 focus:outline-none"
               >
                  <option value="">Todas as versões</option>
                  {uniqueVersions.map((versao) => (
                     <option key={versao} value={versao}>
                        {versao}
                     </option>
                  ))}
               </select>
            </div>

            {/* Sort By */}
            <div>
               <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Ordenar por
               </label>
               <select
                  value={filters.sortBy}
                  onChange={(e) => onFilterChange("sortBy", e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-white p-2 focus:border-blue-500 focus:outline-none"
               >
                  <option value="nome">Nome (A-Z)</option>
                  <option value="tempo">Tempo (Maior primeiro)</option>
               </select>
            </div>
         </div>

         {/* Navigation Button */}
         <div className="mt-6 pt-4 border-t border-neutral-700">
            <Link
               to="/"
               className="w-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium py-2 px-4 transition-colors duration-200 flex items-center justify-center mb-3"
            >
               Jogos Zerados
            </Link>

            <div className="text-sm text-neutral-400">
               Mostrando {filteredCount} de {totalGames} jogos
            </div>
         </div>
      </div>
   );
};

export default WishlistFilterPanel;
