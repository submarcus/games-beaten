import type { Game } from "../types";

export const parseDate = (dateString: string): Date => {
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
