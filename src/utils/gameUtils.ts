import type { Game } from "../types";

export const parseDate = (dateString: string): Date => {
   // Expects format "dd/mm/yyyy"
   const [day, month, year] = dateString.split("/");

   // month - 1 because Date months are 0-indexed (January = 0, December = 11)
   return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

// Helper function to extract year from date string
export const getYearFromDate = (dateString: string): number => {
   const [, , year] = dateString.split("/");
   return parseInt(year);
};

export const getRatingColor = (rating: number): string => {
   if (rating === 10) return "text-green-400";
   if (rating === 9) return "text-lime-400";
   if (rating === 8) return "text-green-500";
   if (rating === 7) return "text-yellow-400";
   return "text-red-400";
};

export const extractHoursFromTimeString = (timeString: string): number => {
   const match = timeString.match(/(\d+)h/);
   return match ? parseInt(match[1]) : 0;
};

export const calculateTotalHours = (games: Game[]): number => {
   return games.reduce((sum, game) => {
      return sum + extractHoursFromTimeString(game.tempo);
   }, 0);
};
