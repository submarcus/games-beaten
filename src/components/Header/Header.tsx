import type { Game } from "../../types";
import { calculateTotalHours } from "../../utils/gameUtils";
import { FaSteam } from "react-icons/fa";

interface HeaderProps {
   games: Game[];
}

const Header = ({ games }: HeaderProps) => {
   const totalGames = games.length;
   const totalHours = calculateTotalHours(games);

   return (
      <div className="bg-neutral-950 mb-4 cursor-default">
         <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 gap-4 text-center">
               <div className="invisible sm:visible flex flex-col items-center justify-center border border-neutral-800 bg-neutral-950   p-3">
                  <div className="text-white font-bold text-lg">{totalGames}</div>
                  <div className="text-neutral-400 text-sm">Total</div>
               </div>
               <a href="https://steamcommunity.com/id/maahlune" target="_blank" className="group relative">
                  <img
                     src="https://i.pinimg.com/736x/62/0f/ad/620fadb07a64c8654a3ee5097c86e018.jpg"
                     className="border border-neutral-800 bg-neutral-950 size-20 object-cover transition-all duration-300"
                  />
                  {/* Steam overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 border border-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <FaSteam className="text-white text-4xl" />
                  </div>
               </a>
               <div className="invisible sm:visible flex flex-col items-center justify-center border border-neutral-800 bg-neutral-950   p-3">
                  <div className="text-white font-bold text-lg">{totalHours}h</div>
                  <div className="text-neutral-400 text-sm">Tempo</div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
