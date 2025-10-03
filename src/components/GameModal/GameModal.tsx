import { IoMdClose } from "react-icons/io";
import type { Game } from "../../types";
import { getRatingColor } from "../../utils/gameUtils";

interface GameModalProps {
   game: Game;
   onClose: () => void;
}

const GameModal = ({ game, onClose }: GameModalProps) => {
   return (
      <div
         className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
         onClick={onClose}
      >
         <div
            className="relative max-w-4xl max-h-[90vh] w-full mx-4 bg-neutral-950 border border-neutral-800 shadow-2xl overflow-y-auto modal-scroll"
            onClick={(e) => e.stopPropagation()}
         >
            {/* Header do Modal */}
            <div className="sticky top-0 bg-neutral-950 border-b border-neutral-800 p-6 flex justify-between items-start">
               <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{game.nome}</h2>
                  <div className="flex items-center gap-4 text-sm text-neutral-400">
                     <span>{game.data}</span>
                     <span>•</span>
                     <span>{game.tempo}</span>
                     <span>•</span>
                     <span>{game.versao}</span>
                     <span>•</span>
                     <span>{game.genero[0]}</span>
                  </div>
               </div>
               <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
               >
                  <IoMdClose className="w-6 h-6" />
               </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Capa do Jogo */}
                  {game.cover && (
                     <div className="md:col-span-1 space-y-4">
                        <img
                           src={game.cover}
                           alt={game.nome}
                           className="w-full max-w-48 aspect-[258/352] object-cover mx-auto"
                        />
                     </div>
                  )}

                  {/* Review */}
                  <div
                     className={`${game.cover ? "md:col-span-2" : "md:col-span-3"
                        } flex flex-col gap-4`}
                  >
                     {/* Nota */}
                     <div className="flex items-center gap-2">
                        <span className="text-neutral-300">Nota:</span>
                        <span className={`text-xl font-bold ${getRatingColor(game.nota)}`}>
                           {game.nota}/10
                        </span>
                     </div>

                     {game.review && (
                        <div>
                           <span className="text-neutral-300 block mb-2">Review:</span>
                           <div className="bg-neutral-900 border border-neutral-800 p-4">
                              <p className="text-neutral-200 leading-relaxed whitespace-pre-line">
                                 {game.review}
                              </p>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default GameModal;
