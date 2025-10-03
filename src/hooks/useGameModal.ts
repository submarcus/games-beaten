import { useState } from "react";
import type { Game } from "../types";

export const useGameModal = () => {
   const [selectedGame, setSelectedGame] = useState<Game | null>(null);

   const openGameModal = (game: Game) => {
      if (game.review) {
         setSelectedGame(game);
      }
   };

   const closeGameModal = () => {
      setSelectedGame(null);
   };

   return {
      selectedGame,
      openGameModal,
      closeGameModal,
   };
};
