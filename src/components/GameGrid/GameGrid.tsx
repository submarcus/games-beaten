import type { Game } from "../../types";
import GameCard from "../GameCard/GameCard";

interface GameGridProps {
   games: Game[];
}

const GameGrid = ({ games }: GameGridProps) => {
   return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
         {games.map((game, index) => (
            <div key={`${game.nome}-${index}`}>
               <GameCard {...game} />
            </div>
         ))}
      </div>
   );
};

export default GameGrid;
