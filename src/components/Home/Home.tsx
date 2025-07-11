// import React from "react";
import GameCard from "../GameCard/GameCard";

interface Game {
    nota: number;
    nome: string;
    data: string;
    genero: string[];
    tempo: string;
    versao: string;
    cover?: string;
}

interface HomeProps {
    games: Game[];
}

const Home = ({ games }: HomeProps) => {
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
        <>
            <div className="text-neutral-200 text-2xl text-center mb-1">Jogos</div>
            <div className="text-neutral-400 text-sm text-center mb-4">Últimos Zerados</div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {sortedGames.map((game, index) => (
                    <GameCard key={`${game.nome}-${index}`} {...game} />
                ))}
            </div>
        </>
    );
};

export default Home;
