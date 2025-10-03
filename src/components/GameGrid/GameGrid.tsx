import type { Game } from "../../types";
import GameCard from "../GameCard/GameCard";

interface GameGridProps {
   games: Game[];
   onGameClick: (game: Game) => void;
}

const GameGrid = ({ games, onGameClick }: GameGridProps) => {
   return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
         {games.map((game, index) => (
            <div key={`${game.nome}-${index}`} onClick={() => onGameClick(game)}>
               <GameCard {...game} />
            </div>
         ))}
      </div>
   );
};

export default GameGrid;
