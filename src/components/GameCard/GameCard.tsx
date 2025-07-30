import { HiDocumentText } from "react-icons/hi";

interface Game {
    nota: number;
    nome: string;
    data: string;
    genero: string[];
    tempo: string;
    versao: string;
    cover?: string;
    review?: string;
}

const GameCard = (game: Game) => {
    const getRatingColor = (rating: number) => {
        if (rating == 10) return "text-green-400";
        if (rating == 9) return "text-lime-400";
        if (rating == 8) return "text-green-500";
        if (rating == 7) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <div
            className={`group rounded-lg border border-neutral-900 bg-neutral-950 p-3 shadow-inner shadow-neutral-800 transition-colors hover:border-neutral-800 ${
                game.review ? "cursor-pointer" : "cursor-default"
            }`}
        >
            <div className="relative">
                <img
                    className="w-full aspect-[258/352] object-cover rounded-lg transition-colors"
                    src={game.cover}
                    alt={game.nome}
                />

                {/* Sobreposição */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/70 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-md font-medium">{game.data}</span>
                    <span className="text-sm text-neutral-300">{game.tempo}</span>
                </div>

                {/* Nota do Jogo */}
                <span
                    className={`absolute right-1 top-1 w-6 h-6 flex items-center justify-center rounded-lg bg-black text-sm font-bold ${getRatingColor(
                        game.nota
                    )}`}
                >
                    {game.nota}
                </span>

                {/* Versão do Jogo */}
                <span className="absolute bottom-2 left-2 rounded-lg bg-black/80 px-2 py-1 text-xs text-white">
                    {game.versao}
                </span>

                {/* Indicador de Review */}
                {game.review && (
                    <span className="absolute bottom-2 right-2 w-6 h-6 flex items-center justify-center rounded-lg bg-black/80  text-white">
                        <HiDocumentText />
                    </span>
                )}
            </div>

            <div className="mt-2 flex flex-col gap-1">
                <h3 className="truncate text-sm font-medium text-white" title={game.nome}>
                    {game.nome}
                </h3>

                {/* Gênero */}
                <span className="w-fit text-xs text-neutral-300">{game.genero[0]}</span>
            </div>
        </div>
    );
};

export default GameCard;
