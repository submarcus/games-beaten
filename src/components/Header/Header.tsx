import type { Game } from "../../types";
import { calculateTotalHours } from "../../utils/gameUtils";

interface HeaderProps {
   games: Game[];
}

const Header = ({ games }: HeaderProps) => {
   const totalGames = games.length;
   const totalHours = calculateTotalHours(games);

   return (
      <div className="bg-neutral-950  mb-10 cursor-default">
         <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 gap-4 text-center">
               <div className="invisible sm:visible flex flex-col items-center justify-center border border-neutral-800 bg-neutral-950   p-3">
                  <div className="text-white font-bold text-lg">{totalGames}</div>
                  <div className="text-neutral-400 text-sm">Total</div>
               </div>
               <a href="https://steamcommunity.com/id/maahlune" target="_blank">
                  <img
                     src="https://i.pinimg.com/736x/a2/b9/62/a2b962edef6e36a594c52fcbf559976d.jpg"
                     className="border border-neutral-800 bg-neutral-950   size-20 object-cover"
                  />
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
