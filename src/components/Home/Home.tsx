import { useState, useMemo } from "react";
import GameCard from "../GameCard/GameCard";
import { IoMdClose } from "react-icons/io";

interface Game {
   nota: number;
   nome: string;
   data: string;
   genero: string[];
   tempo: string;
   versao: string;
   cover?: string;
   review?: string;
}

interface HomeProps {
   games: Game[];
}

interface FilterState {
   genero: string;
   nota: string;
   versao: string;
   sortBy: string;
}

const Home = ({ games }: HomeProps) => {
   const [isFilterOpen, setIsFilterOpen] = useState(false);
   const [selectedGame, setSelectedGame] = useState<Game | null>(null);
   const [filters, setFilters] = useState<FilterState>({
      genero: "",
      nota: "",
      versao: "",
      sortBy: "data",
   });

   const parseDate = (dateString: string): Date => {
      const monthMap: { [key: string]: number } = {
         jan: 0,
         fev: 1,
         mar: 2,
         abr: 3,
         mai: 4,
         jun: 5,
         jul: 6,
         ago: 7,
         set: 8,
         out: 9,
         nov: 10,
         dez: 11,
      };

      const [day, month, year] = dateString.split("/");
      const monthIndex = monthMap[month.toLowerCase()];

      return new Date(parseInt(year), monthIndex, parseInt(day));
   };

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
         switch (filters.sortBy) {
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

   const openGameModal = (game: Game) => {
      if (game.review) {
         setSelectedGame(game);
      }
   };

   const closeGameModal = () => {
      setSelectedGame(null);
   };

   const activeFiltersCount = Object.values(filters).filter((value) => value && value !== "data").length;

   return (
      <>
         {/* Floating Filter Button */}
         <div className="fixed top-4 right-4 z-50 ">
            <button
               onClick={() => setIsFilterOpen(!isFilterOpen)}
               className="group relative flex h-12 w-12 items-center justify-center  border border-neutral-800 transition-all duration-300 hover:bg-neutral-800"
            >
               <div className="relative h-5 w-5">
                  <div
                     className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${isFilterOpen ? "rotate-45 translate-y-2" : "translate-y-0"
                        }`}
                  ></div>
                  <div
                     className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${isFilterOpen ? "opacity-0" : "translate-y-2"
                        }`}
                  ></div>
                  <div
                     className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${isFilterOpen ? "-rotate-45 translate-y-2" : "translate-y-4"
                        }`}
                  ></div>
               </div>

               {/* Active filters badge */}
               {activeFiltersCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                     {activeFiltersCount}
                  </span>
               )}
            </button>

            {/* Filter Panel */}
            <div
               className={`absolute right-0 top-14 w-80  border border-neutral-800 bg-neutral-950 p-4 shadow-xl transition-all duration-300 modal-scroll ${isFilterOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                  }`}
            >
               <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Filtros</h3>
                  {activeFiltersCount > 0 && (
                     <button
                        onClick={clearFilters}
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                     >
                        Limpar
                     </button>
                  )}
               </div>

               <div className="space-y-4">
                  {/* Genre Filter */}
                  <div>
                     <label className="block text-sm font-medium text-neutral-300 mb-2">Gênero</label>
                     <select
                        value={filters.genero}
                        onChange={(e) => handleFilterChange("genero", e.target.value)}
                        className="w-full  border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
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
                     <label className="block text-sm font-medium text-neutral-300 mb-2">Nota</label>
                     <select
                        value={filters.nota}
                        onChange={(e) => handleFilterChange("nota", e.target.value)}
                        className="w-full  border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
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
                     <label className="block text-sm font-medium text-neutral-300 mb-2">Plataforma</label>
                     <select
                        value={filters.versao}
                        onChange={(e) => handleFilterChange("versao", e.target.value)}
                        className="w-full  border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
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
                     <label className="block text-sm font-medium text-neutral-300 mb-2">Ordenar por</label>
                     <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                        className="w-full  border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
                     >
                        <option value="data">Data (mais recente)</option>
                        <option value="nome">Nome (A-Z)</option>
                        <option value="nota">Nota (maior-menor)</option>
                     </select>
                  </div>
               </div>

               <div className="mt-4 pt-4 border-t border-neutral-800">
                  <div className="text-sm text-neutral-400">
                     Mostrando {filteredAndSortedGames.length} de {games.length} jogos
                  </div>
               </div>
            </div>
         </div>

         <div className="text-neutral-200 text-xl text-center mb-1 hover:text-neutral-400">
            <a href="https://coelhomarcus.com" target="_blank" rel="noopener noreferrer">
               Marcus
            </a>
         </div>
         <div className="text-neutral-400 text-sm text-center mb-4">
            {filters.sortBy === "data"
               ? "Mais Recentes"
               : filters.sortBy === "nome"
                  ? "Ordem Alfabética"
                  : "Melhores Avaliados"}
         </div>

         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredAndSortedGames.map((game, index) => (
               <div key={`${game.nome}-${index}`} onClick={() => openGameModal(game)}>
                  <GameCard {...game} />
               </div>
            ))}
         </div>

         {/* Modal de Detalhes do Jogo */}
         {selectedGame && (
            <div
               className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
               onClick={closeGameModal}
            >
               <div
                  className="relative max-w-4xl max-h-[90vh] w-full mx-4 bg-neutral-950 border border-neutral-800 -xl shadow-2xl overflow-y-auto modal-scroll"
                  onClick={(e) => e.stopPropagation()}
               >
                  {/* Header do Modal */}
                  <div className="sticky top-0 bg-neutral-950 border-b border-neutral-800 p-6 flex justify-between items-start">
                     <div>
                        <h2 className="text-2xl font-bold text-white mb-1">{selectedGame.nome}</h2>
                        <div className="flex items-center gap-4 text-sm text-neutral-400">
                           <span>{selectedGame.data}</span>
                           <span>•</span>
                           <span>{selectedGame.tempo}</span>
                           <span>•</span>
                           <span>{selectedGame.versao}</span>
                           <span>•</span>
                           <span>{selectedGame.genero[0]}</span>
                        </div>
                     </div>
                     <button
                        onClick={closeGameModal}
                        className="text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
                     >
                        <IoMdClose className="w-6 h-6" />
                     </button>
                  </div>

                  {/* Conteúdo do Modal */}
                  <div className="p-6">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Capa do Jogo */}
                        {selectedGame.cover && (
                           <div className="md:col-span-1 space-y-4">
                              <img
                                 src={selectedGame.cover}
                                 alt={selectedGame.nome}
                                 className="w-full max-w-48 aspect-[258/352] object-cover  mx-auto"
                              />
                           </div>
                        )}

                        {/* Review */}
                        <div
                           className={`${selectedGame.cover ? "md:col-span-2" : "md:col-span-3"
                              } flex flex-col gap-4`}
                        >
                           {/* Nota */}
                           <div className="flex items-center gap-2">
                              <span className="text-neutral-300">Nota:</span>
                              <span
                                 className={`text-xl font-bold ${selectedGame.nota === 10
                                    ? "text-green-400"
                                    : selectedGame.nota === 9
                                       ? "text-lime-400"
                                       : selectedGame.nota === 8
                                          ? "text-green-500"
                                          : selectedGame.nota === 7
                                             ? "text-yellow-400"
                                             : "text-red-400"
                                    }`}
                              >
                                 {selectedGame.nota}/10
                              </span>
                           </div>

                           {selectedGame.review && (
                              <div>
                                 <span className="text-neutral-300 block mb-2">Review:</span>
                                 <div className="bg-neutral-900 border border-neutral-800  p-4">
                                    <p className="text-neutral-200 leading-relaxed whitespace-pre-line">
                                       {selectedGame.review}
                                    </p>
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Home;
