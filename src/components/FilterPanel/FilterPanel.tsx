import type { FilterState } from "../../types";
import SearchBar from "../SearchBar/SearchBar";

interface FilterPanelProps {
   filters: FilterState;
   uniqueGenres: string[];
   uniqueVersions: string[];
   uniqueRatings: number[];
   activeFiltersCount: number;
   totalGames: number;
   filteredCount: number;
   onFilterChange: (key: keyof FilterState, value: string) => void;
   onClearFilters: () => void;
}

const FilterPanel = ({
   filters,
   uniqueGenres,
   uniqueVersions,
   uniqueRatings,
   activeFiltersCount,
   totalGames,
   filteredCount,
   onFilterChange,
   onClearFilters,
}: FilterPanelProps) => {
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
                  className="w-full border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
               >
                  <option value="">Todos os gêneros</option>
                  {uniqueGenres.map((genre) => (
                     <option key={genre} value={genre}>
                        {genre}
                     </option>
                  ))}
               </select>
            </div>

            {/* Rating Filter */}
            <div>
               <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Nota
               </label>
               <select
                  value={filters.nota}
                  onChange={(e) => onFilterChange("nota", e.target.value)}
                  className="w-full border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
               >
                  <option value="">Todas as notas</option>
                  {uniqueRatings.map((rating) => (
                     <option key={rating} value={rating.toString()}>
                        {rating}
                     </option>
                  ))}
               </select>
            </div>

            {/* Version Filter */}
            <div>
               <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Plataforma
               </label>
               <select
                  value={filters.versao}
                  onChange={(e) => onFilterChange("versao", e.target.value)}
                  className="w-full border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
               >
                  <option value="">Todas as plataformas</option>
                  {uniqueVersions.map((version) => (
                     <option key={version} value={version}>
                        {version}
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
                  className="w-full border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
               >
                  <option value="data">Data (mais recente)</option>
                  <option value="nome">Nome (A-Z)</option>
                  <option value="nota">Nota (maior-menor)</option>
               </select>
            </div>
         </div>

         <div className="mt-4 pt-4 border-t border-neutral-800">
            <div className="text-sm text-neutral-400">
               Mostrando {filteredCount} de {totalGames} jogos
            </div>
         </div>
      </div>
   );
};

export default FilterPanel;
