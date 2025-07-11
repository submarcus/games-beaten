interface Game {
    nota: number;
    nome: string;
    data: string;
    genero: string[];
    tempo: string;
    versao: string;
    cover?: string;
}

interface HeaderProps {
    games: Game[];
}

const Header = ({ games }: HeaderProps) => {
    const totalGames = games.length;

    const totalHours = games.reduce((sum, game) => {
        const match = game.tempo.match(/(\d+)h/);
        return sum + (match ? parseInt(match[1]) : 0);
    }, 0);

    return (
        <div className="bg-neutral-950 rounded-lg p-6 border border-neutral-800 mb-6 shadow-inner shadow-neutral-800 cursor-default">
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

export default Header;
