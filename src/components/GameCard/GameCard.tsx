import type { Game } from "../../types";
import { getRatingColor } from "../../utils/gameUtils";

const GameCard = (game: Game) => {

   return (
      <div
         className="group border border-neutral-900 bg-neutral-950 p-3 transition-colors hover:border-neutral-800"
      >
         <div className="relative">
            <img
               className="w-full aspect-[258/352] object-cover  transition-colors"
               src={game.cover}
               alt={game.nome}
            />

            {/* Sobreposição */}
            <div className="absolute inset-0 flex flex-col items-center justify-center  bg-black/70 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 *:cursor-default">
               <span className="text-md font-medium">{game.data}</span>
               <span className="text-sm text-neutral-300">{game.tempo}</span>
            </div>

            {/* Nota do Jogo */}
            <span
               className={`cursor-default absolute right-1 top-1 w-6 h-6 flex items-center justify-center bg-black text-sm font-normal ${getRatingColor(
                  game.nota
               )}`}
            >
               {game.nota}
            </span>

            {/* Versão do Jogo */}
            <span className="cursor-default absolute bottom-2 left-2 bg-black/80 px-2 py-1 text-xs text-white">
               {game.versao}
            </span>
         </div>

         <div className="mt-2 flex flex-col gap-1 *:cursor-default">
            <h3 className="truncate text-sm font-medium text-white" title={game.nome}>
               {game.nome}
            </h3>

            {/* Gênero */}
            <span className="w-fit text-xs text-neutral-300">{game.genero[0]}</span>
         </div>
      </div >
   );
};

export default GameCard;
