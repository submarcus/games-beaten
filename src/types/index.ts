export interface Game {
   nota: number;
   nome: string;
   data: string;
   genero: string[];
   tempo: string;
   versao: string;
   cover?: string;
   review?: string;
}

export interface FilterState {
   genero: string;
   nota: string;
   versao: string;
   sortBy: string;
   search: string;
}

export type SortType = "data" | "nome" | "nota";

export interface GameStats {
   totalGames: number;
   totalHours: number;
}
