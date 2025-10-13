import type { WishlistGame } from "../../types";

const WishlistCard = (game: WishlistGame) => {
   return (
      <div
         className="group border border-neutral-900 bg-neutral-950 transition-colors hover:border-neutral-800"
      >
         <div className="relative">
            <img
               className="w-full aspect-[258/352] object-cover transition-colors"
               src={game.cover}
               alt={game.nome}
            />

            {/* Sobreposição */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 *:cursor-default px-2">
               <span className="text-xs text-neutral-300">
                  {Array.isArray(game.genero) ? game.genero.slice(0, 2).join(", ") : game.genero}
               </span>
               <span className="text-sm font-medium text-center line-clamp-2 max-w-full overflow-hidden break-words text-neutral-200">
                  {game.nome}
               </span>
               <span className="text-xs text-neutral-300">{game.tempo}</span>

               <span className="cursor-default absolute bottom-2 left-2 bg-black/80 px-2 py-1 text-xs text-white">
                  {game.versao}
               </span>
            </div>
         </div>
      </div>
   );
};

export default WishlistCard;
