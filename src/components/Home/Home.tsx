import React from "react";
import { games } from "../../assets/games";

interface Game {
    nota: number;
    nome: string;
    data: string;
    genero: string[];
    tempo: string;
    versao: string;
    cover?: string;
}

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
    const getRatingColor = (rating: number) => {
        if (rating >= 9) return "text-green-400";
        if (rating >= 7) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <div className="group rounded-lg border border-neutral-900 bg-neutral-950 p-3 shadow-inner shadow-neutral-800 transition-colors hover:border-neutral-800">
            <div className="relative">
                <img
                    className="w-full aspect-[258/352] object-cover rounded-lg transition-colors"
                    src={game.cover}
                    alt={game.nome}
                />

                {/* Sobreposição com Tempo e Data (aparece no hover) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/60 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-sm font-medium">{game.tempo}</span>
                    <span className="text-xs text-neutral-300">{game.data}</span>
                </div>

                {/* Nota do Jogo */}
                <span
                    className={`absolute right-2 top-2 rounded-lg border bg-black/80 px-2 py-1 text-sm font-bold ${getRatingColor(
                        game.nota
                    )}`}
                >
                    {game.nota}
                </span>

                {/* Versão do Jogo */}
                <span className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                    {game.versao}
                </span>
            </div>

            <div className="mt-2 flex flex-col gap-1">
                <h3 className="truncate text-sm font-medium text-white" title={game.nome}>
                    {game.nome}
                </h3>

                {/* Gênero */}
                <span className="w-fit rounded-full bg-neutral-800 px-2 py-1 text-xs text-neutral-300">
                    {game.genero[0]}
                </span>
            </div>
        </div>
    );
};

const ProfileHeader = () => {
    const totalGames = games.length;

    const totalHours = games.reduce((sum, game) => {
        const match = game.tempo.match(/(\d+)h/);
        return sum + (match ? parseInt(match[1]) : 0);
    }, 0);

    return (
        <div className="bg-neutral-950 rounded-lg p-6 border border-neutral-800 mb-6 shadow-inner shadow-neutral-800">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center">
                    <img
                        src="https://static-cdn.jtvnw.net/jtv_user_pictures/acaaed40-6259-41da-9a8d-7688650fa685-profile_image-70x70.png"
                        className="rounded-full"
                    />
                </div>
                <div>
                    <h1 className="text-white text-2xl font-medium">maah</h1>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="border border-neutral-800 bg-neutral-950 shadow-inner shadow-neutral-800 rounded-lg p-3">
                    <div className="text-white font-bold text-lg">{totalGames}</div>
                    <div className="text-neutral-400 text-sm">Jogos</div>
                </div>
                <div className="border border-neutral-800 bg-neutral-950 shadow-inner shadow-neutral-800 rounded-lg p-3">
                    <div className="text-white font-bold text-lg">{totalHours}h</div>
                    <div className="text-neutral-400 text-sm">Tempo</div>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const parseDate = (dateString: string): Date => {
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

    const sortedGames = [...games].sort((a, b) => {
        const dateA = parseDate(a.data);
        const dateB = parseDate(b.data);
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-4">
            <div className="max-w-6xl mx-auto">
                <ProfileHeader />

                <div className="text-neutral-200 text-2xl text-center mb-1">Jogos</div>
                <div className="text-neutral-400 text-sm text-center mb-4">Últimos Zerados</div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {sortedGames.map((game, index) => (
                        <GameCard key={`${game.nome}-${index}`} game={game} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
